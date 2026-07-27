"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";


export default function CropImagePage(){


const canvasRef = useRef(null);

const imageRef = useRef(null);



const [file,setFile] = useState(null);

const [preview,setPreview] = useState("");

const [image,setImage] = useState(null);



const [crop,setCrop] = useState({

x:0,

y:0,

width:200,

height:200

});



const [dragging,setDragging] = useState(false);

const [start,setStart] = useState({

x:0,

y:0

});



const [croppedURL,setCroppedURL] = useState("");

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



img.src = url;



img.onload = ()=>{


imageRef.current = img;


setImage(img);



setCrop({

x:0,

y:0,

width:
Math.min(
img.width,
300
),

height:
Math.min(
img.height,
300
)

});



drawCanvas(img);

};



}









function drawCanvas(img){



const canvas =
canvasRef.current;



if(!canvas)
return;



const ctx =
canvas.getContext("2d");



const maxWidth = 700;



const scale =
Math.min(
1,
maxWidth / img.width
);



canvas.width =
img.width * scale;



canvas.height =
img.height * scale;



ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



ctx.drawImage(

img,

0,

0,

canvas.width,

canvas.height

);






// crop selection box


ctx.strokeStyle =
"red";


ctx.lineWidth =
2;


ctx.strokeRect(

crop.x * scale,

crop.y * scale,

crop.width * scale,

crop.height * scale

);



}









useEffect(()=>{


if(image){

drawCanvas(image);

}


},[crop]);









function getMousePosition(e){


const canvas =
canvasRef.current;


const rect =
canvas.getBoundingClientRect();



return {

x:
e.clientX - rect.left,

y:
e.clientY - rect.top

};


}









function startCrop(e){


const pos =
getMousePosition(e);



setDragging(true);



setStart(pos);



setCrop({

x:pos.x,

y:pos.y,

width:0,

height:0

});


}









function moveCrop(e){


if(!dragging)
return;



const pos =
getMousePosition(e);



setCrop({

x:start.x,

y:start.y,

width:
pos.x - start.x,

height:
pos.y - start.y

});


}









function endCrop(){


setDragging(false);


}









function applyPreset(type){



if(!image)
return;



const w =
image.width;



const h =
image.height;



if(type==="square"){



const size =
Math.min(w,h);



setCrop({

x:
(w-size)/2,

y:
(h-size)/2,

width:size,

height:size

});


}



if(type==="top"){


setCrop({

x:0,

y:0,

width:w,

height:h/2

});


}



if(type==="bottom"){


setCrop({

x:0,

y:h/2,

width:w,

height:h/2

});


}



if(type==="left"){


setCrop({

x:0,

y:0,

width:w/2,

height:h

});


}



if(type==="right"){


setCrop({

x:w/2,

y:0,

width:w/2,

height:h

});


}



}









function cropImage(){


if(!image){

setMessage(
"Upload an image first"
);

return;

}



try{


setLoading(true);



const canvas =
document.createElement("canvas");



const ctx =
canvas.getContext("2d");



canvas.width =
Math.abs(crop.width);



canvas.height =
Math.abs(crop.height);





ctx.drawImage(

image,

crop.x,

crop.y,

crop.width,

crop.height,

0,

0,

Math.abs(crop.width),

Math.abs(crop.height)

);






canvas.toBlob(

(blob)=>{


const url =
URL.createObjectURL(blob);



setCroppedURL(url);



setMessage(
"Image cropped successfully"
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
"Cropping failed"
);


setLoading(false);


}



}









function downloadImage(){


if(!croppedURL)
return;



const link =
document.createElement("a");


link.href =
croppedURL;



link.download =
"cropped-image.jpg";


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

Crop Image

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Crop Image

</h1>






<p className="mt-3 text-muted">

Crop any image to exact pixel coordinates.
Set X, Y, width, and height manually, or choose
from quick presets like square center crop.

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

✂️

</div>



<h3 className="text-xl font-semibold mt-4">

Click or drag an image here

</h3>



<p className="text-sm text-muted mt-2">

Drag on the image to select your crop area

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

<div className="mt-8">


<canvas

ref={canvasRef}

onMouseDown={startCrop}

onMouseMove={moveCrop}

onMouseUp={endCrop}

onMouseLeave={endCrop}

className="border rounded-lg mx-auto cursor-crosshair"

/>


</div>


}









{

image &&


<div className="mt-6 grid md:grid-cols-4 gap-3">


<input

type="number"

value={Math.round(crop.x)}

onChange={
e=>
setCrop({
...crop,
x:Number(e.target.value)
})
}

placeholder="X"

className="bg-input border rounded-md px-3 py-2"

/>



<input

type="number"

value={Math.round(crop.y)}

onChange={
e=>
setCrop({
...crop,
y:Number(e.target.value)
})
}

placeholder="Y"

className="bg-input border rounded-md px-3 py-2"

/>



<input

type="number"

value={Math.round(crop.width)}

onChange={
e=>
setCrop({
...crop,
width:Number(e.target.value)
})
}

placeholder="Width"

className="bg-input border rounded-md px-3 py-2"

/>



<input

type="number"

value={Math.round(crop.height)}

onChange={
e=>
setCrop({
...crop,
height:Number(e.target.value)
})
}

placeholder="Height"

className="bg-input border rounded-md px-3 py-2"

/>



</div>


}









{

image &&


<div className="mt-6">


<p className="text-sm text-muted mb-3">

Quick presets

</p>



<div className="flex flex-wrap gap-3">


<button

onClick={()=>applyPreset("square")}

className="px-4 py-2 border rounded-lg"

>

Square Center

</button>



<button

onClick={()=>applyPreset("top")}

className="px-4 py-2 border rounded-lg"

>

Top Half

</button>



<button

onClick={()=>applyPreset("bottom")}

className="px-4 py-2 border rounded-lg"

>

Bottom Half

</button>



<button

onClick={()=>applyPreset("left")}

className="px-4 py-2 border rounded-lg"

>

Left Half

</button>



<button

onClick={()=>applyPreset("right")}

className="px-4 py-2 border rounded-lg"

>

Right Half

</button>



</div>



</div>


}









<button

onClick={cropImage}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Cropping..."

:

"Crop Image"

}


</button>









{

croppedURL &&


<button

onClick={downloadImage}

className="ml-3 mt-8 px-6 py-3 rounded-lg bg-green-600 text-white"

>

Download Cropped Image

</button>


}









{

message &&

<p className="mt-4 text-sm">

{message}

</p>

}





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

2. Drag to crop

</h3>


<p className="text-muted">

Click and drag on the preview canvas to
draw your crop area.

</p>


</div>








<div>

<h3 className="font-bold">

3. Use presets

</h3>


<p className="text-muted">

Choose quick presets like Square,
Top half, or Left half.

</p>


</div>







<div>

<h3 className="font-bold">

4. Download

</h3>


<p className="text-muted">

Click Crop & Download to save the cropped image.

</p>


</div>




</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool crops any image to exact pixel
coordinates, with manual X/Y/width/height
control or a quick center-square preset.
All processing happens inside your browser.

</p>







<h3 className="text-xl font-bold mt-8">

Manual coordinates vs. presets

</h3>





<p className="mt-4 text-muted leading-7">

Manual mode lets you specify the exact
top-left corner X, Y and crop width and
height in pixels. This provides precise
control but requires knowing the desired
coordinates.

</p>





<p className="mt-4 text-muted leading-7">

The Square Center preset automatically
calculates the largest centered square crop.
It is useful for profile photos and social
media images.

</p>



</section>







</div>

</div>

);

}