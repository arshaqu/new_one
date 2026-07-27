"use client";

import Link from "next/link";
import { useState, useRef } from "react";


export default function AddWatermarkPage(){


const canvasRef = useRef(null);



const [file,setFile] = useState(null);

const [preview,setPreview] = useState("");

const [image,setImage] = useState(null);



const [watermark,setWatermark] = useState("© My Name");


const [position,setPosition] = useState("bottom-right");


const [opacity,setOpacity] = useState(60);


const [fontSize,setFontSize] = useState(32);


const [color,setColor] = useState("#ffffff");



const [resultURL,setResultURL] = useState("");


const [message,setMessage] = useState("");


const [loading,setLoading] = useState(false);









function handleFile(e){


const selected =
e.target.files[0];


loadImage(selected);


}









function handleDrop(e){


e.preventDefault();


const dropped =
e.dataTransfer.files[0];


loadImage(dropped);


}









function loadImage(selected){


if(
!selected ||
!selected.type.startsWith("image")
){

setMessage(
"Please select a valid image"
);

return;

}



setFile(selected);



const url =
URL.createObjectURL(selected);



setPreview(url);



const img =
new Image();



img.src =
url;



img.onload = ()=>{


setImage(img);


setResultURL("");

setMessage("");

};


}









function getPosition(
canvasWidth,
canvasHeight,
ctx
){



const padding = 30;



const textWidth =
ctx.measureText(
watermark
).width;



let x;

let y;





switch(position){



case "top-left":

x = padding;

y = fontSize + padding;

break;





case "top-right":

x =
canvasWidth -
textWidth -
padding;

y =
fontSize + padding;

break;





case "bottom-left":

x = padding;

y =
canvasHeight -
padding;

break;





case "center":

x =
(canvasWidth-textWidth)/2;

y =
canvasHeight/2;

break;





default:

x =
canvasWidth -
textWidth -
padding;

y =
canvasHeight -
padding;


}



return {
x,
y
};


}









function addWatermark(){


if(!image){


setMessage(
"Please upload an image"
);


return;


}



try{


setLoading(true);



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









ctx.globalAlpha =
opacity / 100;



ctx.fillStyle =
color;



ctx.font =
`${fontSize}px Arial`;



ctx.textBaseline =
"bottom";








const pos =
getPosition(

canvas.width,

canvas.height,

ctx

);






ctx.fillText(

watermark,

pos.x,

pos.y

);






ctx.globalAlpha = 1;









canvas.toBlob(

(blob)=>{


const url =
URL.createObjectURL(blob);



setResultURL(url);



setMessage(
"Watermark added successfully"
);



setLoading(false);



},

"image/jpeg",

0.95

);



}

catch(error){


console.log(error);


setMessage(
"Unable to add watermark"
);


setLoading(false);


}


}









function downloadImage(){


if(!resultURL)
return;



const link =
document.createElement("a");



link.href =
resultURL;



link.download =
"watermarked-image.jpg";



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

Add Watermark to Image

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Add Watermark to Image

</h1>






<p className="mt-3 text-muted">

Add a text watermark to any image.
Choose position, opacity, font size,
and color. Download the watermarked image
instantly.

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

💧

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


</div>


}









<div className="mt-6">


<label className="text-sm text-muted">

Watermark text

</label>



<input

value={watermark}

onChange={
e=>setWatermark(
e.target.value
)
}

placeholder="© My Name"

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>



</div>









<div className="mt-6">


<label className="text-sm text-muted">

Position

</label>



<div className="flex flex-wrap gap-3 mt-3">



{

[

["top-left","Top Left"],

["top-right","Top Right"],

["bottom-left","Bottom Left"],

["bottom-right","Bottom Right"],

["center","Center"]

].map(([value,label])=>(


<button

key={value}

onClick={()=>setPosition(value)}

className={`px-4 py-2 border rounded-lg ${
position===value
?
"bg-indigo-600 text-white"
:
""
}`}

>

{label}

</button>


))


}



</div>


</div>









<div className="mt-6">


<label className="text-sm text-muted">

Opacity: {opacity}%

</label>



<input

type="range"

min="10"

max="100"

value={opacity}

onChange={
e=>setOpacity(
Number(e.target.value)
)
}

className="w-full mt-3"

/>



</div>









<div className="mt-6">


<label className="text-sm text-muted">

Font size: {fontSize}px

</label>



<input

type="range"

min="10"

max="100"

value={fontSize}

onChange={
e=>setFontSize(
Number(e.target.value)
)
}

className="w-full mt-3"

/>



</div>









<div className="mt-6">


<label className="text-sm text-muted">

Color

</label>



<input

type="color"

value={color}

onChange={
e=>setColor(
e.target.value
)
}

className="mt-2 w-20 h-10"

/>



<p className="text-sm text-muted mt-2">

{color}

</p>


</div>









<button

onClick={addWatermark}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Adding..."

:

"Add Watermark"

}


</button>









{

resultURL &&


<div className="mt-8 grid md:grid-cols-2 gap-5">



<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Original

</h3>


<img

src={preview}

className="rounded-lg max-h-64 mx-auto"

/>


</div>








<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Watermarked

</h3>


<img

src={resultURL}

className="rounded-lg max-h-64 mx-auto"

/>


</div>



</div>


}









{

resultURL &&


<button

onClick={downloadImage}

className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white"

>

Download Image

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

Click to upload the image you want to
watermark.

</p>


</div>








<div>

<h3 className="font-bold">

2. Enter watermark text

</h3>


<p className="text-muted">

Type your watermark text and choose
font size, color, and opacity.

</p>


</div>








<div>

<h3 className="font-bold">

3. Choose position

</h3>


<p className="text-muted">

Select where the watermark should appear
on the image.

</p>


</div>








<div>

<h3 className="font-bold">

4. Download

</h3>


<p className="text-muted">

Click Apply & Download to save the
watermarked image.

</p>


</div>




</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>






<p className="mt-4 text-muted leading-7">

This tool adds a text watermark to any image
with control over position, opacity, font size,
and color. It is useful for marking ownership
or discouraging unauthorized reuse before
sharing images publicly.

</p>







<h3 className="text-xl font-bold mt-8">

Position and opacity choices

</h3>






<p className="mt-4 text-muted leading-7">

Choose from five standard positions:
corners or center. Set opacity depending
on your goal — low opacity creates a subtle
watermark while high opacity makes ownership
more visible.

</p>


</section>

</div>

</div>

);

}