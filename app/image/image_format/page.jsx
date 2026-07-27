"use client";

import Link from "next/link";
import { useState, useRef } from "react";


export default function ConvertImageFormatPage(){



const [file,setFile] = useState(null);

const [preview,setPreview] = useState("");

const [format,setFormat] = useState("jpg");

const [convertedURL,setConvertedURL] = useState("");

const [convertedSize,setConvertedSize] = useState(null);

const [originalSize,setOriginalSize] = useState(null);

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");

const canvasRef = useRef(null);









function handleFile(e){


const selected =
e.target.files[0];


processFile(selected);


}









function handleDrop(e){


e.preventDefault();


const dropped =
e.dataTransfer.files[0];


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


setOriginalSize(
selected.size
);



const url =
URL.createObjectURL(selected);


setPreview(url);


setConvertedURL("");

setConvertedSize(null);

setMessage("");



}









function convertImage(){


if(!file){


setMessage(
"Please upload an image"
);


return;


}



setLoading(true);

setMessage("");



const img =
new Image();



img.src =
preview;



img.onload = ()=>{



const canvas =
canvasRef.current;



const ctx =
canvas.getContext("2d");



canvas.width =
img.width;


canvas.height =
img.height;







// Handle transparency when converting to JPG

if(format==="jpg"){


ctx.fillStyle =
"#ffffff";


ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);


}



ctx.drawImage(
img,
0,
0
);








let mime;



if(format==="png"){


mime =
"image/png";


}


else if(format==="webp"){


mime =
"image/webp";


}


else{


mime =
"image/jpeg";


}









canvas.toBlob(

(blob)=>{


if(!blob){


setMessage(
"Conversion failed"
);


setLoading(false);


return;


}





const url =
URL.createObjectURL(blob);



setConvertedURL(url);


setConvertedSize(
blob.size
);



setMessage(
"Image converted successfully"
);



setLoading(false);



},

mime,

0.92


);



};



}









function downloadImage(){


if(!convertedURL)
return;



const link =
document.createElement("a");


link.href =
convertedURL;


link.download =
`converted-image.${format}`;


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
Convert Image Format
</span>

</div>








<h1 className="text-5xl font-bold mt-6">

Convert Image Format

</h1>





<p className="mt-3 text-muted">

Convert images between JPG, PNG, and WebP formats.
Transparent PNGs are handled correctly.
No upload required.

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

🔄

</div>



<h3 className="text-xl font-semibold mt-4">

Click or drag an image here

</h3>



<p className="text-sm text-muted mt-2">

Supports JPG, PNG, WebP, GIF, BMP

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









<div className="mt-6">


<label className="text-sm text-muted">

Convert to

</label>



<div className="flex gap-3 mt-3">


<button

onClick={()=>setFormat("jpg")}

className={`px-5 py-2 rounded-lg border ${
format==="jpg"
?
"bg-indigo-600 text-white"
:
""
}`}

>

JPG

</button>





<button

onClick={()=>setFormat("png")}

className={`px-5 py-2 rounded-lg border ${
format==="png"
?
"bg-indigo-600 text-white"
:
""
}`}

>

PNG

</button>





<button

onClick={()=>setFormat("webp")}

className={`px-5 py-2 rounded-lg border ${
format==="webp"
?
"bg-indigo-600 text-white"
:
""
}`}

>

WebP

</button>



</div>


</div>









<button

onClick={convertImage}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

{

loading

?

"Converting..."

:

"Convert Image"

}


</button>









{

convertedURL &&

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

(originalSize/1024).toFixed(1)

}

KB

</p>


</div>








<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Converted

</h3>


<img

src={convertedURL}

className="rounded-lg max-h-64 mx-auto"

/>



<p className="mt-3 text-sm text-muted">

{

(convertedSize/1024).toFixed(1)

}

KB

</p>


</div>



</div>


}









{

convertedURL &&

<button

onClick={downloadImage}

className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white"

>

Download Converted Image

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

Click to upload or drag and drop an image
in any common format.

</p>

</div>





<div>

<h3 className="font-bold">

2. Choose output format

</h3>


<p className="text-muted">

Select the format you want:
JPG, PNG, WebP, or AVIF.

</p>


</div>






<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Click Convert & Download to save the
converted image.

</p>


</div>



</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>




<p className="mt-4 text-muted leading-7">

This tool converts images between JPG,
PNG, and WebP formats using the browser's
Canvas API, handling transparency correctly
when converting between supported formats.

</p>







<h3 className="text-xl font-bold mt-8">

Why format choice matters

</h3>



<p className="mt-4 text-muted leading-7">

JPG is best for photos because it creates
smaller files but does not support transparency.
PNG is lossless and supports transparency,
making it ideal for logos, graphics, and
screenshots. WebP provides strong compression
with optional transparency support.

</p>








<h3 className="text-xl font-bold mt-8">

What happens to transparency

</h3>



<p className="mt-4 text-muted leading-7">

Converting a transparent PNG to JPG fills
transparent areas with white because JPG
does not support transparency.

</p>








<h3 className="text-xl font-bold mt-8">

Examples

</h3>



<p className="mt-4 text-muted leading-7">

Converting a PNG screenshot to JPG can
reduce file size when transparency is not
needed, such as email attachments.

</p>



<p className="mt-4 text-muted leading-7">

Keeping a logo as PNG or WebP preserves
its transparent background when used on
different website backgrounds.

</p>







<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>


<ul className="mt-4 list-disc pl-6 text-muted space-y-2">

<li>
Converting screenshots or photos for compatibility
</li>

<li>
Preserving transparency for logos and graphics
</li>

<li>
Using WebP for smaller website images
</li>

</ul>








<h3 className="text-xl font-bold mt-8">

Tips

</h3>



<p className="mt-4 text-muted leading-7">

If your image has transparency, avoid JPG.
Use PNG or WebP instead. WebP usually creates
smaller files but make sure your platform
supports it.

</p>




</section>







</div>

</div>

);

}