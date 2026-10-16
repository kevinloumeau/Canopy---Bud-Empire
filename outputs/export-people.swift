import Foundation
import CoreGraphics
import ImageIO

let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true)
let out = root.appendingPathComponent("game-scale", isDirectory: true)
try FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)
func loadImage(_ url: URL) -> CGImage {
    let src = CGImageSourceCreateWithURL(url as CFURL, nil)!
    return CGImageSourceCreateImageAtIndex(src, 0, nil)!
}
func bounds(_ im: CGImage) -> (top: Int, bottom: Int) {
    let w=im.width, h=im.height
    var pixels=[UInt8](repeating:0,count:w*h*4)
    let ctx=CGContext(data:&pixels,width:w,height:h,bitsPerComponent:8,bytesPerRow:w*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.draw(im,in:CGRect(x:0,y:0,width:w,height:h))
    var lo=h, hi=0
    for y in 0..<h { for x in 0..<w { if pixels[(y*w+x)*4+3] >= 128 { lo=min(lo,y);hi=max(hi,y+1) } } }
    return (lo,hi)
}
let files=try FileManager.default.contentsOfDirectory(at:root,includingPropertiesForKeys:nil).filter{$0.pathExtension=="png"}
var scales=[String:Double]()
for url in files where url.lastPathComponent.contains(".stand.") {
    let im=loadImage(url), b=bounds(im)
    let key=url.lastPathComponent.replacingOccurrences(of:".stand.bag.png",with:"")
    scales[key]=299.0/Double(b.bottom-b.top)*Double(im.height)
}
for url in files {
    let im=loadImage(url), b=bounds(im)
    let key=url.lastPathComponent.replacingOccurrences(of:".stand.bag.png",with:"").replacingOccurrences(of:".walk.bag.png",with:"")
    let scale=scales[key]!/Double(im.height)
    let ctx=CGContext(data:nil,width:224,height:320,bitsPerComponent:8,bytesPerRow:224*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.interpolationQuality = .high
    let width=Double(im.width)*scale, height=Double(im.height)*scale
    let y=5.0-Double(im.height-b.bottom)*scale
    ctx.draw(im,in:CGRect(x:(224.0-width)/2.0,y:y,width:width,height:height))
    let image=ctx.makeImage()!
    let dest=CGImageDestinationCreateWithURL(out.appendingPathComponent(url.lastPathComponent) as CFURL,"public.png" as CFString,1,nil)!
    CGImageDestinationAddImage(dest,image,nil)
    guard CGImageDestinationFinalize(dest) else { fatalError("PNG export failed") }
}
print("Exported \(files.count) normalized character frames")
