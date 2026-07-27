"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function CompressImagePage() {


const [file,setFile] = useState(null);

const [preview,setPreview] = useState("");

const [mode,setMode] = useState("quality");

const [quality,setQuality] = useState(80);

const [targetKB,setTargetKB] = useState("");

const [compressedURL,setCompressedURL] = useState("");

const [compressedSize,setCompressedSize] = useState(null);

const [originalSize,setOriginalSize] = useState(null);

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");

const canvasRef = useRef(null);







function handleFile(e){

const selected = e.target.files[0];

processFile(selected);

}







function handleDrop(e){

e.preventDefault();

const dropped = e.dataTransfer.files[0];

processFile(dropped);

}







function processFile(selected){


if(
!selected ||
!selected.type.startsWith("image")
){

setMessage(
"Please select a valid image file"
);

return;

}



setFile(selected);


setOriginalSize(selected.size);


const url =
URL.createObjectURL(selected);


setPreview(url);


setCompressedURL("");

setCompressedSize(null);

setMessage("");

}









function compressWithQuality(
image,
qualityValue
){


return new Promise((resolve)=>{


const canvas =
canvasRef.current;


const ctx =
canvas.getContext("2d");



canvas.width =
image.width;


canvas.height =
image.height;



ctx.drawImage(
image,
0,
0
);



canvas.toBlob(

(blob)=>{

resolve(blob);

},

"image/jpeg",

qualityValue / 100

);


});


}









async function findTargetSize(
image,
target
){


let low = 10;

let high = 95;

let bestBlob = null;



for(
let i=0;
i<8;
i++
){


let mid =
Math.floor(
(low+high)/2
);



const blob =
await compressWithQuality(
image,
mid
);



const size =
blob.size / 1024;



if(
Math.abs(size-target)
<
4
){

bestBlob = blob;

break;

}



if(
size > target
){

high = mid - 1;

}

else{

low = mid + 1;

}



bestBlob = blob;



}



return bestBlob;


}









async function compressImage(){


if(!file){

setMessage(
"Please upload an image"
);

return;

}



try{


setLoading(true);

setMessage("");



const img =
new Image();



img.src =
preview;



await new Promise(
(resolve)=>
{

img.onload = resolve;

}

);





let result;



if(
mode==="quality"
){


result =
await compressWithQuality(
img,
quality
);


}

else{


if(!targetKB){

setMessage(
"Enter target size"
);

setLoading(false);

return;

}



result =
await findTargetSize(
img,
Number(targetKB)
);


}





const url =
URL.createObjectURL(result);



setCompressedURL(url);


setCompressedSize(
result.size
);



setMessage(
"Image compressed successfully"
);



}

catch(error){


console.log(error);


setMessage(
"Compression failed"
);


}

finally{


setLoading(false);


}


}









function downloadImage(){


if(!compressedURL)
return;



const link =
document.createElement("a");


link.href =
compressedURL;


link.download =
"compressed-image.jpg";


link.click();


}







return (

<div

className="min-h-screen px-6 py-12"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-4xl mx-auto">







<div className="text-sm text-muted">


<Link
href="/"
className="hover:text-blue-500"
>

Home

</Link>


{" / "}


<Link
href="/image"
className="hover:text-blue-500"
>

Image

</Link>


{" / "}


<span>

Compress Image

</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Compress Image

</h1>





<p className="mt-3 text-muted">

Reduce image file size by adjusting JPEG quality.
See original vs compressed size comparison and
download instantly.

</p>








<div className="mt-8 bg-card border rounded-xl p-6">







<label

onDragOver={(e)=>e.preventDefault()}

onDrop={handleDrop}

className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center
justify-center cursor-pointer"

>



<div className="text-5xl">

🗜️

</div>




<h3 className="text-xl font-semibold mt-4">

Click or drag an image here

</h3>




<p className="text-sm text-muted mt-2">

Output is always JPEG
(best compression)

</p>



<input

type="file"

accept="image/*"

onChange={handleFile}

className="hidden"

/>



</label>









{

file &&

<div className="mt-5 border rounded-lg p-4">


<p className="font-medium">

{file.name}

</p>


<p className="text-sm text-muted">

Original size:

{" "}

{(originalSize/1024).toFixed(1)}

KB

</p>


</div>


}









<div className="mt-6 flex gap-3">


<button

onClick={()=>setMode("quality")}

className={`px-4 py-2 rounded-lg border ${
mode==="quality"
?
"bg-indigo-600 text-white"
:
""
}`}

>

By Quality %

</button>





<button

onClick={()=>setMode("target")}

className={`px-4 py-2 rounded-lg border ${
mode==="target"
?
"bg-indigo-600 text-white"
:
""
}`}

>

By Target KB

</button>



</div>









{

mode==="quality"

?

<div className="mt-6">


<label className="text-sm text-muted">

JPEG Quality: {quality}%

</label>



<input

type="range"

min="10"

max="95"

value={quality}

onChange={
e=>setQuality(
Number(e.target.value)
)
}

className="w-full mt-3"

/>


</div>


:

<div className="mt-6">


<label className="text-sm text-muted">

Target file size

</label>



<input

value={targetKB}

onChange={
e=>setTargetKB(e.target.value)
}

placeholder="e.g. 200"

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>



<p className="text-sm text-muted mt-2">

The tool will auto-find the best quality
to match your target (±4%).

</p>



</div>


}









<button

onClick={compressImage}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Compressing..."

:

"Compress Image"

}


</button>










{

compressedURL &&


<div className="mt-8 grid md:grid-cols-2 gap-5">



<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Original

</h3>


<img

src={preview}

className="rounded-lg max-h-64 mx-auto"

/>


<p className="mt-3 text-sm text-muted">

{

(originalSize/1024)
.toFixed(1)

}

KB

</p>


</div>








<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Compressed

</h3>


<img

src={compressedURL}

className="rounded-lg max-h-64 mx-auto"

/>


<p className="mt-3 text-sm text-muted">

{

(compressedSize/1024)
.toFixed(1)

}

KB

</p>


</div>



</div>


}









{

compressedURL &&

<button

onClick={downloadImage}

className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white"

>

Download JPEG

</button>


}










{

message &&

<p className="mt-4 text-sm">

{message}

</p>

}





<canvas
ref={canvasRef}
className="hidden"
/>



</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>



<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Upload your image

</h3>

<p className="text-muted">

Click to upload or drag and drop any JPG
or PNG image.

</p>

</div>




<div>

<h3 className="font-bold">

2. Set target size

</h3>

<p className="text-muted">

Enter your desired file size in KB for
automatic quality adjustment.

</p>

</div>




<div>

<h3 className="font-bold">

3. Download

</h3>

<p className="text-muted">

Click Compress & Download to save the
smaller image.

</p>

</div>



</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

This tool reduces image file size by adjusting
JPEG compression quality, showing a side-by-side
original-vs-compressed size comparison so you
can find the right balance before downloading.

</p>




<h3 className="text-xl font-bold mt-8">

How JPEG quality settings trade size for detail

</h3>



<p className="mt-4 text-muted leading-7">

JPEG compression discards some image detail to
reduce file size. Higher quality preserves more
detail but creates larger files, while lower
quality produces smaller files but may introduce
blur or blockiness.

</p>




<h3 className="text-xl font-bold mt-8">

Typical results

</h3>


<p className="mt-4 text-muted leading-7">

At around 80% quality, most photos see a
50-80% file size reduction with minimal visible
difference from the original.

</p>




<h3 className="text-xl font-bold mt-8">

Examples

</h3>



<p className="mt-4 text-muted leading-7">

Preparing a photo for email:
Compressing an 8MB camera photo at 80% quality
often brings it under 2MB.

</p>



<p className="mt-4 text-muted leading-7">

Optimizing for a website:
Compressing product photos before upload
improves page loading speed.

</p>




<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>


<ul className="mt-4 list-disc pl-6 text-muted space-y-2">

<li>
Shrinking photos for email attachments
</li>

<li>
Speeding up website load times
</li>

<li>
Reducing storage space used by photos
</li>

</ul>





<h3 className="text-xl font-bold mt-8">

Tips

</h3>


<p className="mt-4 text-muted leading-7">

Start around 80% quality as a baseline.
For images with text or sharp line art,
PNG may preserve better quality.

</p>



</section>







</div>

</div>

);
}
