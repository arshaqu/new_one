"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";



export default function ReorderPDFPage(){


const [file,setFile] = useState(null);

const [pages,setPages] = useState([]);

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");





async function handleFile(e){


const pdfFile =
e.target.files[0];


if(
pdfFile &&
pdfFile.type==="application/pdf"
){


setFile(pdfFile);

setMessage("");

await generatePreview(pdfFile);


}


}







async function generatePreview(pdfFile){


const bytes =
await pdfFile.arrayBuffer();


const pdf =
await PDFDocument.load(bytes);



let preview=[];



for(
let i=0;
i<pdf.getPageCount();
i++
){


preview.push({

id:i,

page:i+1

});


}



setPages(preview);


}









function movePage(
from,
to
){


const updated =
[...pages];


const item =
updated.splice(from,1)[0];


updated.splice(
to,
0,
item
);


setPages(updated);



}








async function reorderPDF(){


if(!file)
return;


try{


setLoading(true);

setMessage("");



const bytes =
await file.arrayBuffer();


const oldPdf =
await PDFDocument.load(bytes);



const newPdf =
await PDFDocument.create();



const copiedPages =
await newPdf.copyPages(
oldPdf,
pages.map(
p=>p.id
)
);




copiedPages.forEach(
page=>{

newPdf.addPage(page);

}

);





const output =
await newPdf.save();





const blob =
new Blob(
[output],
{
type:"application/pdf"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download =
"reordered.pdf";


link.click();



URL.revokeObjectURL(url);



setMessage(
"PDF reordered successfully"
);



}

catch(error){

console.log(error);

setMessage(
"Failed to reorder PDF"
);


}

finally{


setLoading(false);


}



}








return(


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


<span>
Reorder PDF Pages
</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Reorder PDF Pages

</h1>





<p className="mt-3 text-muted">

Rearrange PDF pages in any order.
Download the reordered PDF instantly —
processed completely in your browser.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label

className="
border-2 border-dashed
rounded-xl
p-10
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-black/5
"

>


<div className="text-5xl">

🔀

</div>



<h3 className="text-xl font-semibold mt-4">

Click or drag a PDF here

</h3>



<p className="text-sm text-muted mt-2">

Files are processed locally — never uploaded

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

{(file.size/1024/1024).toFixed(2)}
MB

</p>


</div>


}









{
pages.length>0 &&


<div className="mt-8">


<h2 className="text-xl font-bold mb-4">

Drag Pages To Reorder

</h2>





<div className="grid md:grid-cols-4 gap-4">


{
pages.map(
(page,index)=>(


<div

key={page.id}

draggable

onDragStart={
e=>
e.dataTransfer.setData(
"index",
index
)
}


onDragOver={
e=>e.preventDefault()
}



onDrop={

e=>{


const from =
Number(
e.dataTransfer.getData(
"index"
)
);


movePage(
from,
index
);


}

}


className="
border
rounded-xl
p-5
cursor-move
text-center
hover:border-indigo-500
transition
"

>



<div className="text-4xl">

📄

</div>



<p className="mt-3 font-semibold">

Page {page.page}

</p>


</div>


)

)

}


</div>







</div>



}









<button


onClick={reorderPDF}


disabled={
loading ||
!file
}


className="
mt-8
px-6
py-3
rounded-lg
bg-indigo-600
text-white
"


>


{

loading

?

"Processing..."

:

"Save Order"

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

Select the PDF whose pages you want to reorder.

</p>


</div>





<div>

<h3 className="font-bold">

2. Drag to reorder

</h3>


<p className="text-muted">

Drag pages into your preferred sequence.

</p>


</div>





<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Click Save Order to download the new PDF.

</p>


</div>



</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>



<p className="mt-4 text-muted leading-7">

This tool copies PDF pages into a new document
according to your selected order.
Everything happens locally inside your browser.

</p>





<h3 className="text-xl font-bold mt-8">

Specifying the new order

</h3>



<p className="mt-4 text-muted leading-7">

Pages can be rearranged by dragging thumbnails.
The original PDF remains unchanged and a new
ordered PDF is created.

</p>



</section>






</div>


</div>


);


}