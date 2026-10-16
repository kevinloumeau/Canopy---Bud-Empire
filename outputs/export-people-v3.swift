import Foundation
import CoreGraphics
import ImageIO
let root=URL(fileURLWithPath:CommandLine.arguments[1],isDirectory:true)
let out=root.appendingPathComponent("game-scale",isDirectory:true)
try FileManager.default.createDirectory(at:out,withIntermediateDirectories:true)
func loadImage(_ url:URL)->CGImage {
    CGImageSourceCreateImageAtIndex(CGImageSourceCreateWithURL(url as CFURL,nil)!,0,nil)!
}
func bounds(_ im:CGImage)->(top:Int,bottom:Int) {
    let w=im.width,h=im.height
    var pixels=[UInt8](repeating:0,count:w*h*4)
    let ctx=CGContext(data:&pixels,width:w,height:h,bitsPerComponent:8,bytesPerRow:w*4,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.draw(im,in:CGRect(x:0,y:0,width:w,height:h))
    var lo=h,hi=0
    for y in 0..<h {for x in 0..<w {if pixels[(y*w+x)*4+3]>=128 {lo=min(lo,y);hi=max(hi,y+1)}}}
    return(lo,hi)
}
func family(_ url:URL)->String {
    var parts=url.lastPathComponent.components(separatedBy:".")
    parts.remove(at:3);parts.removeLast()
    return parts.joined(separator:".")
}
let files=try FileManager.default.contentsOfDirectory(at:root,includingPropertiesForKeys:nil).filter{$0.pathExtension=="png"}
var scales=[String:Double]()
for url in files where url.lastPathComponent.contains(".stand.") {
    let im=loadImage(url),b=bounds(im)
    scales[family(url)]=299.0/Double(b.bottom-b.top)*Double(im.height)
}
for url in files {
    let im=loadImage(url),b=bounds(im),scale=scales[family(url)]!/Double(im.height)
    let ctx=CGContext(data:nil,width:224,height:320,bitsPerComponent:8,bytesPerRow:896,space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.interpolationQuality = .high
    let width=Double(im.width)*scale,height=Double(im.height)*scale
    ctx.draw(im,in:CGRect(x:(224-width)/2,y:5-Double(im.height-b.bottom)*scale,width:width,height:height))
    let dest=CGImageDestinationCreateWithURL(out.appendingPathComponent(url.lastPathComponent) as CFURL,"public.png" as CFString,1,nil)!
    CGImageDestinationAddImage(dest,ctx.makeImage()!,nil)
    guard CGImageDestinationFinalize(dest) else {fatalError("PNG export failed")}
}
print("Exported \(files.count) normalized frames")
