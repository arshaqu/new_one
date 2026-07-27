"use client";

import Link from "next/link";
import { useState } from "react";
import { jsPDF } from "jspdf";



export default function ImageToPDFPage(){


const [images,setImages] = useState([]);

const [pageSize,setPageSize] = useState("a4");

const [orientation,setOrientation] = useState("portrait");

const [message,setMessage] = useState("");

const [loading,setLoading] = useState(false);








function addImages(files){


const selected = Array.from(files).filter(
(file)=>
file.type.startsWith("image/")
);



const newImages = selected.map(file=>({

file,

url:URL.createObjectURL(file),

name:file.name

}));


setImages(prev=>[

...prev,

...newImages

]);


setMessage("");

}









function handleFile(e){

addImages(
e.target.files
);

}









function handleDrop(e){

e.preventDefault();


addImages(
e.dataTransfer.files
);


}









function removeImage(index){


setImages(
images.filter(
(_,i)=>i!==index
)
);


}









function moveImage(index,direction){


const updated=[...images];


const newIndex=index+direction;


if(
newIndex<0 ||
newIndex>=images.length
)
return;



[
updated[index],
updated[newIndex]
]=
[
updated[newIndex],
updated[index]
];



setImages(updated);


}









async function convertPDF(){


if(images.length===0){

setMessage(
"Please upload images"
);

return;

}



try{


setLoading(true);





const pdf =
new jsPDF({

orientation,

unit:"mm",

format:pageSize

});





for(
let i=0;
i<images.length;
i++
){


const img =
images[i];



const imageData =
await loadImage(img.url);





if(i>0){

pdf.addPage();

}






const pageWidth =
pdf.internal.pageSize.getWidth();


const pageHeight =
pdf.internal.pageSize.getHeight();





const ratio =
Math.min(

pageWidth/imageData.width,

pageHeight/imageData.height

);




const width =
imageData.width*ratio;


const height =
imageData.height*ratio;



const x =
(pageWidth-width)/2;


const y =
(pageHeight-height)/2;





pdf.addImage(

imageData.url,

"JPEG",

x,

y,

width,

height

);



}





pdf.save(
"images-to-pdf.pdf"
);



setMessage(
"PDF created successfully"
);



}

catch(error){

console.log(error);

setMessage(
"Conversion failed"
);


}

finally{

setLoading(false);

}



}









function loadImage(src){


return new Promise((resolve)=>{


const img =
new Image();


img.onload=()=>{


resolve({

url:src,

width:img.width,

height:img.height

});


};


img.src=src;


});


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


<span>
PDF
</span>


{" / "}


<span className="text-white">

Image to PDF

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Image to PDF

</h1>







<p className="mt-3 text-muted">

Convert JPG, PNG, or WebP images into a single PDF file.
Each image becomes one page — processed entirely in
your browser.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label


onDragOver={
e=>e.preventDefault()
}


onDrop={handleDrop}


className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center justify-center
cursor-pointer hover:bg-black/5"


>



<div className="text-5xl">

📷

</div>





<h3 className="text-xl font-semibold mt-4">

Click or drag images here

</h3>






<p className="text-sm text-muted mt-2">

JPG, PNG supported · Files never leave your device

</p>





<input

type="file"

multiple

accept="image/*"

onChange={handleFile}

className="hidden"

/>



</label>









{
images.length>0 &&


<div className="mt-8 grid md:grid-cols-3 gap-5">


{
images.map((img,index)=>(


<div

key={index}

className="border rounded-xl p-3 bg-card"

>


<img

src={img.url}

className="rounded-lg w-full h-40 object-cover"

/>



<p className="text-sm mt-2 truncate">

{img.name}

</p>




<div className="flex gap-2 mt-3">


<button

onClick={()=>moveImage(index,-1)}

className="px-3 py-1 border rounded"

>

↑

</button>



<button

onClick={()=>moveImage(index,1)}

className="px-3 py-1 border rounded"

>

↓

</button>




<button

onClick={()=>removeImage(index)}

className="px-3 py-1 bg-red-500 text-white rounded"

>

✕

</button>



</div>


</div>


))

}


</div>


}









<div className="grid md:grid-cols-2 gap-5 mt-8">


<div>

<label className="text-sm text-muted">

Page Size

</label>


<select

value={pageSize}

onChange={
e=>setPageSize(e.target.value)
}

className="mt-2 w-full bg-input border rounded px-3 py-2"

>

<option value="a4">

A4

</option>


<option value="letter">

Letter

</option>


</select>

</div>









<div>

<label className="text-sm text-muted">

Orientation

</label>


<select

value={orientation}

onChange={
e=>setOrientation(e.target.value)
}

className="mt-2 w-full bg-input border rounded px-3 py-2"

>


<option value="portrait">

Portrait

</option>


<option value="landscape">

Landscape

</option>


</select>


</div>



</div>









<button

onClick={convertPDF}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Creating PDF..."

:

"Convert Images to PDF"

}


</button>







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




<div className="mt-6 space-y-5">


<div>

<h3 className="font-bold">

1. Upload images

</h3>

<p className="text-muted">

Upload one or more JPG, PNG, or WebP images.

</p>

</div>



<div>

<h3 className="font-bold">

2. Arrange and configure

</h3>

<p className="text-muted">

Change image order and select page settings.

</p>

</div>




<div>

<h3 className="font-bold">

3. Download PDF

</h3>

<p className="text-muted">

Click convert and download your PDF file.

</p>

</div>


</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>



<p className="mt-4 text-muted leading-7">

This tool converts images into a PDF file directly
inside your browser. Images are never uploaded
to any server.

</p>



<h3 className="text-xl font-bold mt-8">

One image, one page

</h3>


<p className="mt-4 text-muted leading-7">

Each uploaded image becomes its own PDF page.
The image is automatically resized while keeping
its original aspect ratio.

</p>



</section>






</div>

</div>


);

}