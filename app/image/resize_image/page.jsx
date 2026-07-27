"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function ResizeImagePage() {

const [file,setFile] =
useState(null);

const [preview,setPreview] =
useState("");

const [imageObj,setImageObj] =
useState(null);

const [width,setWidth] =
useState("");

const [height,setHeight] =
useState("");

const [originalWidth,setOriginalWidth] =
useState(0);

const [originalHeight,setOriginalHeight] =
useState(0);

const [lockAspect,setLockAspect] =
useState(true);

const [mode,setMode] =
useState("pixel");

const [percentage,setPercentage] =
useState("100");

const [format,setFormat] =
useState("image/png");

const [quality,setQuality] =
useState("0.9");

const [loading,setLoading] =
useState(false);

const [message,setMessage] =
useState("");

const [output,setOutput] =
useState("");

const canvasRef =
useRef(null);







function handleFile(e){

const selected =
e.target.files?.[0];

if(!selected) return;

if(
!selected.type.startsWith("image/")
){

setMessage(
"Please upload an image."
);

return;

}

setFile(selected);

setMessage("");

const reader =
new FileReader();

reader.onload = () => {

const img =
new Image();

img.onload = () => {

setImageObj(img);

setPreview(reader.result);

setOriginalWidth(img.width);

setOriginalHeight(img.height);

setWidth(img.width);

setHeight(img.height);

setOutput("");

};

img.src =
reader.result;

};

reader.readAsDataURL(selected);

}










function updateWidth(value){

setWidth(value);

if(
lockAspect &&
originalWidth &&
originalHeight
){

const ratio =
originalHeight /
originalWidth;

setHeight(
Math.round(
Number(value)*ratio
)
);

}

}










function updateHeight(value){

setHeight(value);

if(
lockAspect &&
originalWidth &&
originalHeight
){

const ratio =
originalWidth /
originalHeight;

setWidth(
Math.round(
Number(value)*ratio
)
);

}

}











async function resizeImage(){

if(!imageObj){

setMessage(
"Upload an image first."
);

return;

}

setLoading(true);

setMessage("");

const canvas =
canvasRef.current;

const ctx =
canvas.getContext("2d");

let newWidth;
let newHeight;

if(mode==="percentage"){

const factor =
Number(percentage)/100;

newWidth =
Math.round(
originalWidth*factor
);

newHeight =
Math.round(
originalHeight*factor
);

}
else{

newWidth =
Number(width);

newHeight =
Number(height);

}

canvas.width =
newWidth;

canvas.height =
newHeight;

ctx.clearRect(
0,
0,
newWidth,
newHeight
);

ctx.drawImage(

imageObj,

0,

0,

newWidth,

newHeight

);

const image =
canvas.toDataURL(

format,

Number(quality)

);

setOutput(image);

setLoading(false);

setMessage(
"Image resized successfully."
);

}









function downloadImage(){

if(!output) return;

const ext =

format==="image/png"

?

"png"

:

format==="image/webp"

?

"webp"

:

"jpg";

const link =
document.createElement("a");

link.href =
output;

link.download =
`resized-image.${ext}`;

link.click();

}









return(

<div

className="min-h-screen py-12 px-6"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>

<div className="max-w-5xl mx-auto">

<div className="text-sm text-muted">

<Link
href="/"
className="hover:text-blue-500"
>

Home

</Link>

{" / "}

<span>

Image

</span>

{" / "}

<span>

Resize Image

</span>

</div>





<h1 className="text-5xl font-bold mt-6">

Resize Image

</h1>

<p className="mt-3 text-muted">

Resize any image to exact pixel dimensions
or a percentage of the original.
Lock aspect ratio to prevent distortion.

</p>





<div className="mt-8 bg-card border rounded-xl p-6">

<label

className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center
justify-center cursor-pointer
hover:bg-black/5 transition"

>

<div className="text-5xl">

📐

</div>

<h3 className="text-xl font-semibold mt-4">

Click or drag an image here

</h3>

<p className="text-sm text-muted mt-2">

Supports JPG, PNG, WebP

</p>

<input

type="file"

accept="image/*"

className="hidden"

onChange={handleFile}

/>

</label>
{
file &&

<div className="mt-6 border rounded-xl p-4">

<p className="font-semibold">

{file.name}

</p>

<p className="text-sm text-muted mt-1">

{(file.size/1024/1024).toFixed(2)} MB

</p>

<p className="text-sm text-muted mt-1">

Original Size :
{originalWidth} × {originalHeight}px

</p>

</div>

}





<div className="grid md:grid-cols-2 gap-8 mt-8">





<div>

<h2 className="text-xl font-bold">

Original Image

</h2>

<div className="mt-4 border rounded-xl overflow-hidden bg-card">

{

preview

?

<img

src={preview}

alt="Preview"

className="w-full object-contain max-h-[420px]"

/>

:

<div className="h-[320px] flex items-center justify-center text-muted">

No image selected

</div>

}

</div>

</div>








<div>

<h2 className="text-xl font-bold">

Resize Settings

</h2>







<div className="mt-5">

<label className="text-sm text-muted">

Resize Mode

</label>

<select

value={mode}

onChange={(e)=>setMode(e.target.value)}

className="mt-2 w-full rounded-md border bg-input px-3 py-2"

>

<option value="pixel">

Pixels

</option>

<option value="percentage">

Percentage

</option>

</select>

</div>








{

mode==="pixel"

&&

<>

<div className="grid grid-cols-2 gap-4 mt-6">

<div>

<label className="text-sm text-muted">

Width (px)

</label>

<input

type="number"

value={width}

onChange={(e)=>updateWidth(e.target.value)}

className="mt-2 w-full rounded-md border bg-input px-3 py-2"

/>

</div>





<div>

<label className="text-sm text-muted">

Height (px)

</label>

<input

type="number"

value={height}

onChange={(e)=>updateHeight(e.target.value)}

className="mt-2 w-full rounded-md border bg-input px-3 py-2"

/>

</div>

</div>







<label className="flex items-center gap-3 mt-5 cursor-pointer">

<input

type="checkbox"

checked={lockAspect}

onChange={()=>setLockAspect(!lockAspect)}

/>

<span>

Lock Aspect Ratio

</span>

</label>

</>

}










{

mode==="percentage"

&&

<div className="mt-6">

<label className="text-sm text-muted">

Resize Percentage

</label>

<select

value={percentage}

onChange={(e)=>setPercentage(e.target.value)}

className="mt-2 w-full rounded-md border bg-input px-3 py-2"

>

<option value="25">

25%

</option>

<option value="50">

50%

</option>

<option value="75">

75%

</option>

<option value="100">

100%

</option>

<option value="125">

125%

</option>

<option value="150">

150%

</option>

<option value="200">

200%

</option>

<option value="300">

300%

</option>

</select>

</div>

}









<div className="mt-6">

<label className="text-sm text-muted">

Output Format

</label>

<select

value={format}

onChange={(e)=>setFormat(e.target.value)}

className="mt-2 w-full rounded-md border bg-input px-3 py-2"

>

<option value="image/png">

PNG

</option>

<option value="image/jpeg">

JPG

</option>

<option value="image/webp">

WebP

</option>

</select>

</div>








<div className="mt-6">

<label className="text-sm text-muted">

Quality

</label>

<input

type="range"

min="0.1"

max="1"

step="0.05"

value={quality}

onChange={(e)=>setQuality(e.target.value)}

className="mt-3 w-full"

/>

<p className="text-sm text-muted mt-2">

{Math.round(Number(quality)*100)}%

</p>

</div>








<div className="flex gap-3 mt-8">

<button

onClick={resizeImage}

disabled={loading}

className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"

>

{

loading

?

"Resizing..."

:

"Resize & Download"

}

</button>





{

output &&

<button

onClick={downloadImage}

className="px-6 py-3 rounded-lg border"

>

⬇ Download

</button>

}

</div>








{

message &&

<p className="mt-5 text-sm">

{message}

</p>

}

</div>

</div>








{

output &&

<section className="mt-12">

<h2 className="text-2xl font-bold">

Resized Preview

</h2>

<div className="mt-6 border rounded-xl overflow-hidden">

<img

src={output}

alt="Resized"

className="w-full object-contain max-h-[550px]"

/>

</div>

</section>

}







<canvas

ref={canvasRef}

className="hidden"

></canvas>





</div>
{/* ================= HOW TO USE ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

How to Use

</h2>

<div className="mt-6 space-y-6">

<div>

<h3 className="font-bold">

1. Upload your image

</h3>

<p className="text-muted mt-2 leading-7">

Click the upload area or drag and drop any JPG, PNG, or WebP image.

</p>

</div>





<div>

<h3 className="font-bold">

2. Set dimensions

</h3>

<p className="text-muted mt-2 leading-7">

Choose Pixel mode or Percentage mode. Enable Aspect Ratio Lock to resize proportionally without stretching the image.

</p>

</div>





<div>

<h3 className="font-bold">

3. Download

</h3>

<p className="text-muted mt-2 leading-7">

Click Resize & Download to generate the resized image, preview it, and save it to your device.

</p>

</div>

</div>

</section>







{/* ================= HOW IT WORKS ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

How It Works

</h2>

<p className="mt-5 text-muted leading-8">

This tool resizes images completely inside your browser using the HTML5 Canvas API. No image is uploaded to any server, making the process fast and private.

</p>





<h3 className="text-xl font-bold mt-10">

Pixel dimensions vs. percentage mode

</h3>

<p className="mt-4 text-muted leading-8">

Pixel mode lets you specify an exact width and height, making it ideal for websites, forms, or social media requirements.

Percentage mode enlarges or shrinks the original image proportionally without needing to calculate new dimensions manually.

</p>





<h3 className="text-xl font-bold mt-10">

Why the aspect ratio lock matters

</h3>

<p className="mt-4 text-muted leading-8">

Keeping the aspect ratio locked prevents images from becoming stretched or squashed.

When enabled, changing either width or height automatically updates the other value while preserving the original proportions.

</p>

</section>







{/* ================= EXAMPLES ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

Examples

</h2>

<div className="mt-6 space-y-6">

<div>

<h3 className="font-semibold">

Website Banner

</h3>

<p className="text-muted mt-2">

Resize a 4000 × 2500 image to 1200 × 750 pixels for faster website loading.

</p>

</div>





<div>

<h3 className="font-semibold">

Social Media

</h3>

<p className="text-muted mt-2">

Resize an image to 1080 × 1080 pixels for Instagram or 1200 × 630 pixels for Facebook sharing.

</p>

</div>





<div>

<h3 className="font-semibold">

Email Attachments

</h3>

<p className="text-muted mt-2">

Reduce image dimensions by 50% to decrease file size before sending by email.

</p>

</div>

</div>

</section>







{/* ================= COMMON USE CASES ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

Common Use Cases

</h2>

<ul className="mt-6 space-y-3 text-muted list-disc pl-6">

<li>Preparing product photos for e-commerce websites.</li>

<li>Reducing image size before uploading online.</li>

<li>Creating profile pictures and social media posts.</li>

<li>Optimizing images for faster website performance.</li>

<li>Generating smaller images for email attachments.</li>

</ul>

</section>







{/* ================= TIPS ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

Tips

</h2>

<ul className="mt-6 space-y-3 text-muted list-disc pl-6">

<li>Keep Aspect Ratio Lock enabled to avoid distortion.</li>

<li>PNG is best for graphics and screenshots.</li>

<li>JPG produces much smaller file sizes for photographs.</li>

<li>WebP offers an excellent balance of quality and file size.</li>

<li>Reducing dimensions usually reduces file size significantly.</li>

</ul>

</section>








{/* ================= FAQ ================= */}

<section className="mt-12">

<h2 className="text-2xl font-bold">

Frequently Asked Questions

</h2>

<div className="mt-6 space-y-6">

<div>

<h3 className="font-semibold">

Does this upload my image?

</h3>

<p className="text-muted mt-2">

No. Everything happens locally inside your browser.

</p>

</div>





<div>

<h3 className="font-semibold">

Will image quality decrease?

</h3>

<p className="text-muted mt-2">

Only if you reduce JPG quality or enlarge the image beyond its original resolution.

</p>

</div>





<div>

<h3 className="font-semibold">

Which formats are supported?

</h3>

<p className="text-muted mt-2">

JPG, PNG and WebP are supported for both upload and download.

</p>

</div>

</div>

</section>








{/* ================= RELATED TOOLS ================= */}

<section className="mt-12 pb-12">

<h2 className="text-2xl font-bold">

Related Tools

</h2>

<div className="grid md:grid-cols-3 gap-5 mt-6">

<Link
href="/image/crop_image"
className="border rounded-xl p-5 hover:border-indigo-500 transition"
>

<h3 className="font-semibold">

Crop Image

</h3>

<p className="text-sm text-muted mt-2">

Crop images to any size.

</p>

</Link>





<Link
href="/image/compress_image"
className="border rounded-xl p-5 hover:border-indigo-500 transition"
>

<h3 className="font-semibold">

Compress Image

</h3>

<p className="text-sm text-muted mt-2">

Reduce image file size while maintaining quality.

</p>

</Link>





<Link
href="/image/convert_image"
className="border rounded-xl p-5 hover:border-indigo-500 transition"
>

<h3 className="font-semibold">

Convert Image

</h3>

<p className="text-sm text-muted mt-2">

Convert between JPG, PNG and WebP.

</p>

</Link>

</div>

</section>

</div>

</div>

);
}