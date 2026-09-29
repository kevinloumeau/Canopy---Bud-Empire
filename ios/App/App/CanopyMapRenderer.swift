import MetalKit
import UIKit
import simd

/// Native world-space renderer. Canvas pixels are never uploaded: shared scene descriptions
/// become instanced 3D meshes with a depth buffer, a shadow pass and material lighting.
final class CanopyMapRenderer: NSObject, MTKViewDelegate {
    struct Vertex { var position: SIMD4<Float>; var normal: SIMD4<Float> }
    struct Instance {
        var positionType: SIMD4<Float>; var sizeEmission: SIMD4<Float>
        var rotation: SIMD4<Float>; var color: SIMD4<Float>
        var extra: SIMD4<Float>; var material: SIMD4<Float>
    }
    struct Uniforms {
        var viewport = SIMD4<Float>(1,1,1,0.57)
        var camera = SIMD4<Float>(0,0,0,0)
        var sun = SIMD4<Float>(0,0,0,0)
        var background = SIMD4<Float>(0.19,0.25,0.21,1)
    }
    struct Light { var positionRadius = SIMD4<Float>(repeating: 0); var color = SIMD4<Float>(repeating: 0) }
    struct Batch { let kind: Int; let start: Int; var count: Int; let transparent: Bool }
    let mapView: MTKView
    private let gpu: MTLDevice
    private let queue: MTLCommandQueue
    private let pipeline: MTLRenderPipelineState
    private let shadowPipeline: MTLRenderPipelineState
    private let characterPipeline: MTLRenderPipelineState
    private let characterShadowPipeline: MTLRenderPipelineState
    private let characters: [Int: CanopyCharacterAsset]
    private let characterTexture: MTLTexture
    var hasCustomCharacter: Bool { characters[4] != nil }
    var hasCaramelCharacter: Bool { characters[5] != nil }
    var hasBeanieCharacter: Bool { characters[6] != nil }
    var hasCreamCharacter: Bool { characters[7] != nil }
    var availableCharacterKinds: [Int] { characters.keys.sorted() }
    private let backgroundPipeline: MTLRenderPipelineState
    private let opaqueDepth: MTLDepthStencilState
    private let glassDepth: MTLDepthStencilState
    private let shadowTexture: MTLTexture
    private var meshes: [(MTLBuffer, Int)] = []
    private var instances: MTLBuffer?
    private var batches: [Batch] = []
    private var uniforms = Uniforms()
    private var lights = [Light](repeating: Light(), count: 32)
    enum Result { case drawn, retry, failed }
    private var completion: ((Result) -> Void)?
    private var pending = false
    private var consecutiveErrors = 0

    init?(frame: CGRect) {
        guard let device = MTLCreateSystemDefaultDevice(), let queue = device.makeCommandQueue(),
              let shaderURL = Bundle.main.url(forResource: "CanopyMapShaders", withExtension: "txt"),
              let source = try? String(contentsOf: shaderURL, encoding: .utf8) else { return nil }
        let library: MTLLibrary
        do { library = try device.makeLibrary(source: source, options: nil) }
        catch { NSLog("Canopy Metal shader: %@", String(describing: error)); return nil }
        gpu = device; self.queue = queue
        characters = [4: "TieDye", 5: "Caramel", 6: "Beanie", 7: "Cream", 8: "Bearded", 9: "Chef", 10: "Colorful", 11: "Blazer", 12: "Office", 13: "Plaid", 14: "Utility", 15: "Security", 16: "GreenMan", 17: "GreenWoman", 18: "GrayEmployee", 19: "DarkHairedEmployee", 20: "YoungEmployee"].compactMapValues { CanopyCharacterAsset(device: device, name: $0) }
        if let texture = characters[4]?.texture { characterTexture = texture }
        else {
            let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .rgba8Unorm, width: 1, height: 1, mipmapped: false)
            guard let texture = device.makeTexture(descriptor: descriptor) else { return nil }
            var white: UInt32 = 0xffffffff
            texture.replace(region: MTLRegionMake2D(0,0,1,1), mipmapLevel: 0, withBytes: &white, bytesPerRow: 4)
            characterTexture = texture
        }
        mapView = MTKView(frame: frame, device: device)
        mapView.colorPixelFormat = .bgra8Unorm
        mapView.depthStencilPixelFormat = .depth32Float
        mapView.sampleCount = device.supportsTextureSampleCount(4) ? 4 : 1
        mapView.isUserInteractionEnabled = false
        mapView.isPaused = true; mapView.enableSetNeedsDisplay = false
        mapView.accessibilityIdentifier = "canopy-native-metal-map"
        let sampleCount = mapView.sampleCount
        func makePipeline(_ vertex: String, _ fragment: String?, shadow: Bool = false) throws -> MTLRenderPipelineState {
            let d = MTLRenderPipelineDescriptor()
            d.vertexFunction = library.makeFunction(name: vertex)
            d.fragmentFunction = fragment.flatMap { library.makeFunction(name: $0) }
            d.rasterSampleCount = shadow ? 1 : sampleCount
            d.depthAttachmentPixelFormat = .depth32Float
            if !shadow {
                let a = d.colorAttachments[0]!
                a.pixelFormat = .bgra8Unorm; a.isBlendingEnabled = true
                a.sourceRGBBlendFactor = .sourceAlpha; a.destinationRGBBlendFactor = .oneMinusSourceAlpha
                a.sourceAlphaBlendFactor = .one; a.destinationAlphaBlendFactor = .oneMinusSourceAlpha
            }
            return try device.makeRenderPipelineState(descriptor: d)
        }
        do {
            pipeline = try makePipeline("mapVertex", "mapFragment")
            characterPipeline = try makePipeline("characterVertex", "mapFragment")
            characterShadowPipeline = try makePipeline("characterShadow", nil, shadow: true)
            shadowPipeline = try makePipeline("mapShadow", nil, shadow: true)
            backgroundPipeline = try makePipeline("mapBackground", "mapBackgroundFragment")
        } catch { NSLog("Canopy native renderer initialization: %@", String(describing: error)); return nil }
        let depth = MTLDepthStencilDescriptor(); depth.depthCompareFunction = .lessEqual; depth.isDepthWriteEnabled = true
        guard let opaque = device.makeDepthStencilState(descriptor: depth) else { return nil }
        opaqueDepth = opaque; depth.isDepthWriteEnabled = false
        guard let glass = device.makeDepthStencilState(descriptor: depth) else { return nil }
        glassDepth = glass
        let texture = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .depth32Float, width: 1536, height: 1536, mipmapped: false)
        texture.usage = [.renderTarget, .shaderRead]; texture.storageMode = .private
        guard let shadow = device.makeTexture(descriptor: texture) else { return nil }
        shadowTexture = shadow
        super.init()
        for vertices in [Self.boxMesh(), Self.sphereMesh(), Self.cylinderMesh(), Array(Self.boxMesh().prefix(3))] {
            guard let buffer = device.makeBuffer(bytes: vertices, length: MemoryLayout<Vertex>.stride * vertices.count) else { return nil }
            meshes.append((buffer, vertices.count))
        }
        mapView.delegate = self
    }

    /// A frame that cannot be drawn *right now* (one already in flight, the app inactive) is `.retry`, never
    /// `.failed`: only a malformed packet or repeated GPU errors turn the native map off for good.
    func receive(_ p: [String: Any], completion: @escaping (Result) -> Void) {
        guard !pending, UIApplication.shared.applicationState == .active else { completion(.retry); return }
        guard p["version"] as? Int == 1, let encoded = p["data"] as? String,
              encoded.count <= 12_000_000, let data = Data(base64Encoded: encoded),
              !data.isEmpty, data.count % MemoryLayout<Instance>.stride == 0,
              let width = p["width"] as? Double, let height = p["height"] as? Double,
              let unit = p["unit"] as? Double, let x = p["x"] as? Double, let y = p["y"] as? Double,
              [width,height,unit,x,y].allSatisfy({ $0.isFinite }), width > 0, height > 0, unit > 0 else { completion(.failed); return }
        let count = data.count / MemoryLayout<Instance>.stride
        guard count <= 100_000, let buffer = gpu.makeBuffer(length: data.count, options: .storageModeShared) else { completion(.failed); return }
        data.copyBytes(to: buffer.contents().assumingMemoryBound(to: UInt8.self), count: data.count)
        let records = buffer.contents().bindMemory(to: Instance.self, capacity: count)
        var newBatches: [Batch] = []; var lightCells: [String: Light] = [:]
        let highestKind = Float(max(3, characters.keys.max() ?? 3))
        for i in 0..<count {
            let r = records[i]
            guard r.positionType.x.isFinite, r.positionType.y.isFinite, r.positionType.z.isFinite,
                  r.positionType.w.isFinite, r.positionType.w >= 0, r.positionType.w <= highestKind,
                  r.positionType.w.rounded(.towardZero) == r.positionType.w else { completion(.failed); return }
            let kind = Int(r.positionType.w), transparent = r.color.w < 0.98
            if kind >= 4 && characters[kind] == nil { completion(.failed); return }
            if let last = newBatches.last, last.kind == kind, last.transparent == transparent {
                newBatches[newBatches.count-1].count += 1
            } else { newBatches.append(Batch(kind: kind, start: i, count: 1, transparent: transparent)) }
            if r.sizeEmission.w > 0.5 && r.color.w > 0.5 && lightCells.count < 32 {
                let pos = r.positionType
                let key = "\(Int(floor(pos.x/3))):\(Int(floor(pos.y/3))):\(Int(floor(pos.z/3)))"
                if lightCells[key] == nil { lightCells[key] = Light(positionRadius: SIMD4(pos.x,pos.y+0.15,pos.z,4.5), color: SIMD4(r.color.x,r.color.y,r.color.z,1)) }
            }
        }
        instances = buffer; batches = newBatches
        uniforms.viewport = SIMD4(Float(width),Float(height),Float(unit),Float(p["angle"] as? Double ?? 0.57))
        uniforms.camera = SIMD4(Float(x),Float(y),Float(p["night"] as? Double ?? 0),0)
        if let bg = p["background"] as? [Double], bg.count == 3 { uniforms.background = SIMD4(Float(bg[0]),Float(bg[1]),Float(bg[2]),1) }
        lights = Array(lightCells.sorted { $0.key < $1.key }.map(\.value).prefix(32))
        lights += Array(repeating: Light(), count: 32-lights.count)
        self.completion = completion; pending = true
        mapView.draw()
    }
    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {}
    func draw(in view: MTKView) {
        guard pending else { return }
        guard let instances, let pass = view.currentRenderPassDescriptor, let drawable = view.currentDrawable,
              let command = queue.makeCommandBuffer() else { finish(.retry); return }
        command.label = "Canopy native world"
        let shadowPass = MTLRenderPassDescriptor()
        shadowPass.depthAttachment.texture = shadowTexture
        shadowPass.depthAttachment.loadAction = .clear; shadowPass.depthAttachment.storeAction = .store
        shadowPass.depthAttachment.clearDepth = 1
        guard let shadows = command.makeRenderCommandEncoder(descriptor: shadowPass) else { finish(.retry); return }
        shadows.label = "Directional soft shadows"
        shadows.setRenderPipelineState(shadowPipeline); shadows.setDepthStencilState(opaqueDepth)
        shadows.setCullMode(.none); shadows.setDepthBias(0.001, slopeScale: 1, clamp: 0.003)
        drawBatches(shadows, instances: instances, shadow: true)
        shadows.endEncoding()
        guard let encoder = command.makeRenderCommandEncoder(descriptor: pass) else { finish(.retry); return }
        encoder.setRenderPipelineState(backgroundPipeline); encoder.setDepthStencilState(glassDepth)
        encoder.setFragmentBytes(&uniforms, length: MemoryLayout<Uniforms>.stride, index: 0)
        encoder.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)
        encoder.setRenderPipelineState(pipeline); encoder.setCullMode(.none)
        encoder.setFragmentTexture(shadowTexture, index: 0)
        encoder.setFragmentTexture(characterTexture, index: 1)
        encoder.setFragmentBytes(lights, length: MemoryLayout<Light>.stride*32, index: 1)
        drawBatches(encoder, instances: instances, shadow: false)
        encoder.endEncoding(); command.present(drawable)
        command.addCompletedHandler { [weak self] command in
            let succeeded = command.status == .completed
            DispatchQueue.main.async {
                guard let self else { return }
                // A GPU error while backgrounding is transient; only a run of them in the foreground is fatal.
                if succeeded { self.consecutiveErrors = 0; self.finish(.drawn); return }
                self.consecutiveErrors += 1
                let foreground = UIApplication.shared.applicationState == .active
                self.finish(foreground && self.consecutiveErrors >= 3 ? .failed : .retry)
            }
        }
        command.commit()
    }
    private func drawBatches(_ encoder: MTLRenderCommandEncoder, instances: MTLBuffer, shadow: Bool) {
        encoder.setVertexBytes(&uniforms, length: MemoryLayout<Uniforms>.stride, index: 2)
        for batch in batches {
            if shadow && batch.transparent { continue }
            if !shadow { encoder.setDepthStencilState(batch.transparent ? glassDepth : opaqueDepth) }
            encoder.setVertexBuffer(instances, offset: batch.start*MemoryLayout<Instance>.stride, index: 1)
            if let character = characters[batch.kind] {
                if !shadow { encoder.setFragmentTexture(character.texture, index: 1) }
                encoder.setRenderPipelineState(shadow ? characterShadowPipeline : characterPipeline)
                encoder.setVertexBuffer(character.vertices, offset: 0, index: 0)
                encoder.setVertexBuffer(character.poses, offset: 0, index: 3)
                var bones = character.boneCount
                encoder.setVertexBytes(&bones, length: MemoryLayout<UInt32>.stride, index: 4)
                encoder.drawIndexedPrimitives(type: .triangle, indexCount: character.indexCount, indexType: .uint32, indexBuffer: character.indices, indexBufferOffset: 0, instanceCount: batch.count)
            } else {
                encoder.setRenderPipelineState(shadow ? shadowPipeline : pipeline)
                encoder.setVertexBuffer(meshes[batch.kind].0, offset: 0, index: 0)
                encoder.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: meshes[batch.kind].1, instanceCount: batch.count)
            }
        }
    }
    private func finish(_ result: Result) { pending = false; let done = completion; completion = nil; done?(result) }

    private static func vertex(_ p: SIMD3<Float>, _ n: SIMD3<Float>) -> Vertex { Vertex(position: SIMD4(p,1), normal: SIMD4(n,0)) }
    /// Subdivided rounded box: real bevel normals catch light along furniture edges.
    private static func boxMesh() -> [Vertex] {
        var result: [Vertex] = []
        let steps: [Float] = [-0.5,-0.45,0.45,0.5]
        for axis in 0..<3 { for side: Float in [-1,1] {
            func point(_ a: Float,_ b: Float) -> Vertex {
                var p = SIMD3<Float>(repeating: 0); p[axis] = side*0.5; p[(axis+1)%3] = a; p[(axis+2)%3] = b
                let inner = simd_clamp(p,SIMD3(repeating: -0.45),SIMD3(repeating: 0.45))
                let normal = simd_normalize(p-inner); return vertex(inner+normal*0.05,normal)
            }
            for a in 0..<3 { for b in 0..<3 {
                let p0=point(steps[a],steps[b]),p1=point(steps[a+1],steps[b]),p2=point(steps[a+1],steps[b+1]),p3=point(steps[a],steps[b+1])
                result += [p0,p1,p2,p0,p2,p3]
            }}
        }}
        return result
    }
    private static func sphereMesh() -> [Vertex] {
        var result: [Vertex] = []
        func point(_ lat: Int,_ lon: Int) -> Vertex {
            let a=Float(lat)/8*Float.pi,b=Float(lon)/12*Float.pi*2
            let n=SIMD3<Float>(sin(a)*cos(b),cos(a),sin(a)*sin(b));return vertex(n*0.5,n)
        }
        for a in 0..<8 { for b in 0..<12 { result += [point(a,b),point(a+1,b),point(a+1,b+1),point(a,b),point(a+1,b+1),point(a,b+1)] }}
        return result
    }
    private static func cylinderMesh() -> [Vertex] {
        var result: [Vertex] = []
        for i in 0..<12 {
            let a=Float(i)/12*Float.pi*2,b=Float(i+1)/12*Float.pi*2
            let n0=SIMD3<Float>(cos(a),0,sin(a)),n1=SIMD3<Float>(cos(b),0,sin(b))
            let p0=n0*0.5+SIMD3(0,-0.5,0),p1=n1*0.5+SIMD3(0,-0.5,0),p2=p1+SIMD3(0,1,0),p3=p0+SIMD3(0,1,0)
            result += [vertex(p0,n0),vertex(p1,n1),vertex(p2,n1),vertex(p0,n0),vertex(p2,n1),vertex(p3,n0)]
            result += [vertex(SIMD3(0,0.5,0),SIMD3(0,1,0)),vertex(p2,SIMD3(0,1,0)),vertex(p3,SIMD3(0,1,0)),vertex(SIMD3(0,-0.5,0),SIMD3(0,-1,0)),vertex(p0,SIMD3(0,-1,0)),vertex(p1,SIMD3(0,-1,0))]
        }
        return result
    }
}

/// Offline-prepared, shared mesh/texture and bone-pose atlas. No asset decoding in the frame loop.
private final class CanopyCharacterAsset {
    let vertices: MTLBuffer
    let indices: MTLBuffer
    let poses: MTLBuffer
    let texture: MTLTexture
    let indexCount: Int
    let boneCount: UInt32
    init?(device: MTLDevice, name: String) {
        func url(_ ext: String) -> URL? { Bundle.main.url(forResource: name, withExtension: ext, subdirectory: "Characters") }
        func data(_ ext: String) -> Data? { url(ext).flatMap { try? Data(contentsOf: $0) } }
        guard let manifest = data("json"), let info = try? JSONSerialization.jsonObject(with: manifest) as? [String: Any],
              info["version"] as? Int == 1, let vertexCount = info["vertices"] as? Int,
              let count = info["indices"] as? Int, let bones = info["bones"] as? Int,
              let frames = info["totalFrames"] as? Int, vertexCount > 0, count > 0, bones == 23, frames > 1,
              let vertexData = data("vertices"), vertexData.count == vertexCount * 80,
              let indexData = data("indices"), indexData.count == count * 4,
              let poseData = data("poses"), poseData.count == frames * bones * 64,
              let textureURL = url("jpg"),
              let texture = try? MTKTextureLoader(device: device).newTexture(URL: textureURL, options: [.SRGB: false, .generateMipmaps: true]) else { return nil }
        func buffer(_ data: Data) -> MTLBuffer? {
            data.withUnsafeBytes { raw in guard let base = raw.baseAddress else { return nil }; return device.makeBuffer(bytes: base, length: data.count, options: .storageModeShared) }
        }
        guard let vertices = buffer(vertexData), let indices = buffer(indexData), let poses = buffer(poseData) else { return nil }
        self.vertices = vertices; self.indices = indices; self.poses = poses; self.texture = texture
        self.indexCount = count; self.boneCount = UInt32(bones)
    }
}
