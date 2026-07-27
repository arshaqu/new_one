"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";



export default function RotatePDFPage(){


const [file,setFile] =
useState(null);


const [angle,setAngle] =
useState(90);


const [pages,setPages] =
useState("");


const [loading,setLoading] =
useState(false);


const [message,setMessage] =
useState("");








function handleFile(e){


const selected =
e.target.files?.[0];


if(
selected &&
selected.type==="application/pdf"
){

setFile(selected);

setMessage("");

}


}









function handleDrop(e){


e.preventDefault();


const dropped =
e.dataTransfer.files?.[0];


if(
dropped &&
dropped.type==="application/pdf"
){

setFile(dropped);

setMessage("");

}


}









function parsePages(value,total){


if(!value.trim()){

return [...Array(total)]
.map((_,i)=>i);

}



let result=[];



value.split(",")
.forEach(item=>{


if(item.includes("-")){


const [start,end] =
item.split("-")
.map(Number);



for(
let i=start;
i<=end;
i++
){

result.push(i-1);

}


}

else{


result.push(
Number(item)-1
);


}


});



return result.filter(
p=>p>=0 && p<total
);


}









async function rotatePDF(){


if(!file){

setMessage(
"Please upload a PDF file"
);

return;

}



try{


setLoading(true);

setMessage("");




const bytes =
await file.arrayBuffer();




const pdfDoc =
await PDFDocument.load(bytes);




const totalPages =
pdfDoc.getPageCount();





const selectedPages =
parsePages(
pages,
totalPages
);







selectedPages.forEach(index=>{


const page =
pdfDoc.getPage(index);



const current =
page.getRotation()
.angle;



page.setRotation(
degrees(
current + Number(angle)
)
);



});







const pdfBytes =
await pdfDoc.save();







const blob =
new Blob(
[pdfBytes],
{
type:"application/pdf"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download=
"rotated.pdf";


link.click();





setMessage(
"PDF rotated successfully"
);




}

catch(error){


console.log(error);


setMessage(
"Rotation failed"
);


}

finally{


setLoading(false);


}



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

Rotate PDF

</span>


</div>









<h1 className="text-5xl font-bold mt-6">

Rotate PDF

</h1>






<p className="mt-3 text-muted">

Rotate all or specific pages in a PDF by 90°,
180°, or 270°. Download the corrected PDF instantly
— no server needed.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label


onDragOver={
e=>e.preventDefault()
}


onDrop={handleDrop}



className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center justify-center
cursor-pointer hover:bg-black/5 transition"


>



<div className="text-5xl">

🔄

</div>






<h3 className="text-xl font-semibold mt-4">

Click or drag a PDF here

</h3>







<p className="text-sm text-muted mt-2">

Files are processed locally — never uploaded to any server

</p>






<input

type="file"

accept="application/pdf"

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

{
(file.size/1024/1024)
.toFixed(2)
}
MB

</p>


</div>


}









<div className="grid md:grid-cols-2 gap-5 mt-8">






<div>


<label className="text-sm text-muted">

Rotation Angle

</label>



<select


value={angle}


onChange={
e=>setAngle(e.target.value)
}



className="mt-2 w-full bg-input border rounded-md px-3 py-2"


>


<option value="90">

90°

</option>


<option value="180">

180°

</option>


<option value="270">

270°

</option>



</select>


</div>









<div>


<label className="text-sm text-muted">

Pages (optional)

</label>



<input


value={pages}


onChange={
e=>setPages(e.target.value)
}



placeholder="Example: 1,3,5-7"


className="mt-2 w-full bg-input border rounded-md px-3 py-2"


/>



</div>






</div>









<p className="mt-5 text-sm text-muted">

Leave pages empty to rotate all pages.

Example:
1,3,5-7 rotates pages 1, 3, and 5 to 7.

</p>









<button


onClick={rotatePDF}


disabled={loading}



className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"


>


{

loading

?

"Rotating..."

:

"Rotate PDF"

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

1. Upload your PDF

</h3>


<p className="text-muted">

Select the PDF file you want to rotate.

</p>

</div>







<div>

<h3 className="font-bold">

2. Select pages and angle

</h3>


<p className="text-muted">

Choose rotation angle and specific pages if needed.

</p>

</div>







<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Download the corrected rotated PDF.

</p>

</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>




<p className="mt-4 text-muted leading-7">

This tool rotates PDF pages directly inside your
browser using the pdf-lib library.
Your files never leave your device.

</p>







<h3 className="text-xl font-bold mt-8">

Rotating specific pages vs whole document

</h3>





<p className="mt-4 text-muted leading-7">

Leave the page field empty to rotate every page.
Enter page numbers like 1,3,5-7 to rotate only
selected pages.

</p>





</section>






</div>

</div>

);

}