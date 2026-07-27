"use client";

import Link from "next/link";
import { useState, useRef } from "react";


export default function RotateFlipImagePage(){


const canvasRef = useRef(null);



const [file,setFile] = useState(null);

const [preview,setPreview] = useState("");

const [image,setImage] = useState(null);



const [rotation,setRotation] = useState(0);

const [flipHorizontal,setFlipHorizontal] = useState(false);

const [flipVertical,setFlipVertical] = useState(false);



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



setRotation(0);

setFlipHorizontal(false);

setFlipVertical(false);



setResultURL("");

setMessage("");

};


}









function applyTransform(){



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





let width =
image.width;



let height =
image.height;





// swap dimensions for 90/270 rotation

if(
rotation===90 ||
rotation===270
){

canvas.width =
height;

canvas.height =
width;


}

else{


canvas.width =
width;

canvas.height =
height;


}






ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);








ctx.save();







// Move canvas center

ctx.translate(

canvas.width / 2,

canvas.height / 2

);








// Rotation

ctx.rotate(

rotation *
Math.PI /
180

);








// Flip

ctx.scale(

flipHorizontal
?
-1
:
1,

flipVertical
?
-1
:
1

);








ctx.drawImage(

image,

-width / 2,

-height / 2

);







ctx.restore();









canvas.toBlob(

(blob)=>{


const url =
URL.createObjectURL(blob);



setResultURL(url);



setMessage(
"Transformation completed"
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
"Unable to process image"
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
"rotated-flipped-image.jpg";



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

Rotate & Flip Image

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Rotate & Flip Image

</h1>






<p className="mt-3 text-muted">

Rotate images 90°, 180°, or 270° clockwise,
and flip horizontally or vertically.
Download the result instantly.

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

image &&

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








{

resultURL &&

<div className="border rounded-xl p-4">


<h3 className="font-bold mb-3">

Result

</h3>


<img

src={resultURL}

className="rounded-lg max-h-64 mx-auto"

/>


</div>


}



</div>


}









<div className="mt-8">


<h3 className="font-bold">

Rotate

</h3>



<div className="flex flex-wrap gap-3 mt-3">


<button

onClick={()=>setRotation(0)}

className={`px-4 py-2 border rounded-lg ${
rotation===0
?
"bg-indigo-600 text-white"
:
""
}`}

>

No rotation

</button>





<button

onClick={()=>setRotation(90)}

className={`px-4 py-2 border rounded-lg ${
rotation===90
?
"bg-indigo-600 text-white"
:
""
}`}

>

90° CW

</button>





<button

onClick={()=>setRotation(180)}

className={`px-4 py-2 border rounded-lg ${
rotation===180
?
"bg-indigo-600 text-white"
:
""
}`}

>

180° CW

</button>





<button

onClick={()=>setRotation(270)}

className={`px-4 py-2 border rounded-lg ${
rotation===270
?
"bg-indigo-600 text-white"
:
""
}`}

>

270° CW

</button>



</div>


</div>









<div className="mt-8">


<h3 className="font-bold">

Flip

</h3>



<div className="flex flex-wrap gap-3 mt-3">



<button

onClick={()=>
setFlipHorizontal(
!flipHorizontal
)
}

className={`px-4 py-2 border rounded-lg ${
flipHorizontal
?
"bg-indigo-600 text-white"
:
""
}`}

>

↔ Horizontal

</button>







<button

onClick={()=>
setFlipVertical(
!flipVertical
)
}

className={`px-4 py-2 border rounded-lg ${
flipVertical
?
"bg-indigo-600 text-white"
:
""
}`}

>

↕ Vertical

</button>



</div>


</div>









<button

onClick={applyTransform}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Processing..."

:

"Apply & Download"

}


</button>









{

resultURL &&


<button

onClick={downloadImage}

className="ml-3 mt-8 px-6 py-3 rounded-lg bg-green-600 text-white"

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

Click to upload or drag and drop any image.

</p>


</div>







<div>

<h3 className="font-bold">

2. Rotate or flip

</h3>


<p className="text-muted">

Click Rotate 90°, Rotate 180°,
Flip Horizontal, or Flip Vertical.

</p>


</div>







<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Click Download to save the transformed image.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>




<p className="mt-4 text-muted leading-7">

This tool rotates images by 90°, 180°,
or 270° and flips them horizontally or
vertically. Rotation and flip operations
can also be combined together.

</p>








<h3 className="text-xl font-bold mt-8">

Rotation vs. flip — different operations

</h3>




<p className="mt-4 text-muted leading-7">

Rotation turns the image around its center
point like turning a physical photo. A flip
mirrors the image along an axis. Horizontal
flip mirrors left-to-right, while vertical
flip mirrors top-to-bottom.

</p>







<p className="mt-4 text-muted leading-7">

These operations can be combined, such as
rotating 90° and flipping horizontally,
to create transformations that a single
operation cannot produce.

</p>








<h3 className="text-xl font-bold mt-8">

Examples

</h3>




<p className="mt-4 text-muted leading-7">

Fixing a sideways phone photo:
A photo taken sideways can be rotated
90° or 270° to display correctly.

</p>




<p className="mt-4 text-muted leading-7">

Mirroring a photo:
Horizontal flipping can make subjects face
the opposite direction for layouts and designs.

</p>







<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>



<ul className="mt-4 list-disc pl-6 text-muted space-y-2">

<li>
Correcting sideways or upside-down photos
</li>

<li>
Mirroring images for design layouts
</li>

<li>
Preparing images for templates or print layouts
</li>

</ul>








<h3 className="text-xl font-bold mt-8">

Tips

</h3>




<p className="mt-4 text-muted leading-7">

If your image contains text, avoid horizontal
flip because it mirrors the text backward.
Use rotation instead to fix orientation.

</p>



<p className="mt-4 text-muted leading-7">

Combining rotation and flipping can create
different results, so always check the preview
before downloading.

</p>



</section>







</div>

</div>

);

}