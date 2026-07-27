"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";


export default function SplitPDFPage(){


const [file,setFile] =
useState(null);


const [range,setRange] =
useState("");


const [loading,setLoading] =
useState(false);


const [message,setMessage] =
useState("");







function handleFile(e){


const selected =
e.target.files[0];


if(
selected &&
selected.type==="application/pdf"
){

setFile(selected);

}


}







function parseRanges(input,totalPages){


let pages=[];


const parts =
input.split(",");



parts.forEach(part=>{


part =
part.trim();



if(part.includes("-")){


const [start,end] =
part.split("-")
.map(Number);



for(
let i=start;
i<=end;
i++
){

if(
i>=1 &&
i<=totalPages
){

pages.push(i-1);

}

}


}

else{


const page =
Number(part);



if(
page>=1 &&
page<=totalPages
){

pages.push(page-1);

}


}



});



return [
...new Set(pages)
];


}









async function splitPDF(){



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



const pdf =
await PDFDocument.load(bytes);



const totalPages =
pdf.getPageCount();





let selectedPages=[];



if(range.trim()){


selectedPages =
parseRanges(
range,
totalPages
);


}
else{


// If no range,
// split every page

selectedPages =
Array.from(
{
length:totalPages
},
(_,i)=>i
);


}







if(
selectedPages.length===0
){

setMessage(
"Invalid page range"
);

setLoading(false);

return;

}








for(
let i=0;
i<selectedPages.length;
i++
){



const newPDF =
await PDFDocument.create();



const pages =
await newPDF.copyPages(

pdf,

[
selectedPages[i]
]

);



pages.forEach(
page=>
newPDF.addPage(page)
);





const output =
await newPDF.save();





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
`split-page-${selectedPages[i]+1}.pdf`;


link.click();


URL.revokeObjectURL(url);



}







setMessage(

`Successfully split ${selectedPages.length} page(s)`

);



}

catch(error){


console.log(error);


setMessage(
"Unable to split PDF"
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


<span>
Split PDF
</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Split PDF

</h1>






<p className="mt-3 text-muted">

Split a PDF into individual pages or
custom page ranges.
Download split files instantly.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">






<label

className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center
justify-center cursor-pointer"

>


<div className="text-5xl">

✂️

</div>



<h3 className="text-xl font-semibold mt-4">

Click or drag a PDF here

</h3>



<p className="text-sm text-muted mt-2">

Files are processed locally —
never uploaded to any server

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









<div className="mt-6">


<label className="text-sm text-muted">

Page ranges (optional)

</label>



<input

value={range}

onChange={
e=>setRange(e.target.value)
}

placeholder="Example: 1-3,5,7-9"

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>



<p className="text-sm text-muted mt-2">

Leave empty to split every page separately.

</p>


</div>







<button

onClick={splitPDF}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Splitting..."

:

"Split PDF"

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

Select the PDF file you want to split.

</p>

</div>

<div>

<h3 className="font-bold">

2. Choose split mode

</h3>

<p className="text-muted">

Use page ranges like 1-3,5,7-9
to extract specific pages.

</p>

</div>

<div>

<h3 className="font-bold">

3. Download

</h3>

<p className="text-muted">

Your split PDF files are created
and downloaded instantly.

</p>

</div>

</div>

</section>

<section className="mt-12 pb-10">

<h2 className="text-2xl font-bold">

How It Works

</h2>

<p className="mt-4 text-muted leading-7">

This tool splits PDF documents using
JavaScript running inside your browser.

No files are uploaded to any server.

</p>

<h3 className="text-xl font-bold mt-8">

Specifying page ranges

</h3>

<p className="mt-4 text-muted leading-7">

Enter ranges like "1-3, 5, 7-9"
to extract selected pages into
new PDF files.

</p>

<h3 className="text-xl font-bold mt-8">

The original file is untouched

</h3>

<p className="mt-4 text-muted leading-7">

Splitting creates new PDF files.
Your original document remains unchanged.

</p>
</section>
</div>

</div>

);

}