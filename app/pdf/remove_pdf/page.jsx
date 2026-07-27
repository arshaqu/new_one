"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";



export default function RemovePDFPagesPage(){


const [file,setFile] =
useState(null);


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









function getRemovePages(value,total){


if(!value.trim()){

return [];

}



let result=[];



value
.split(",")
.forEach(item=>{


item=item.trim();



if(item.includes("-")){


const parts =
item.split("-")
.map(Number);



for(
let i=parts[0];
i<=parts[1];
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



return [
...new Set(
result.filter(
page=>
page>=0 &&
page<total
)
)

];


}









async function removePages(){



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





const total =
pdfDoc.getPageCount();





const removeList =
getRemovePages(
pages,
total
);





if(
removeList.length===0
){

setMessage(
"No valid pages selected"
);

setLoading(false);

return;

}






const newPdf =
await PDFDocument.create();







for(
let i=0;
i<total;
i++
){


if(
removeList.includes(i)
)
continue;





const [copiedPage] =
await newPdf.copyPages(

pdfDoc,

[i]

);



newPdf.addPage(
copiedPage
);



}







const pdfBytes =
await newPdf.save();







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
"removed-pages.pdf";


link.click();





setMessage(
"Pages removed successfully"
);



}

catch(error){


console.log(error);


setMessage(
"Failed to remove pages"
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

Remove PDF Pages

</span>


</div>









<h1 className="text-5xl font-bold mt-6">

Remove PDF Pages

</h1>








<p className="mt-3 text-muted">

Delete specific pages from a PDF.
Enter page numbers to remove and download
the cleaned PDF — all done in your browser.

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

🗑️

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









<div className="mt-8">


<label className="text-sm text-muted">

Pages to remove

</label>



<input


value={pages}


onChange={
e=>setPages(e.target.value)
}



placeholder="Example: 2,4,6 or 2-5"



className="mt-2 w-full bg-input border rounded-md px-3 py-2"


/>






<p className="mt-3 text-sm text-muted">

Use commas for separate pages.
Use hyphen for ranges.

Example: 1,3,5-7

</p>



</div>









<button


onClick={removePages}


disabled={loading}



className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"


>



{

loading

?

"Removing..."

:

"Remove Pages"

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

Select the PDF file from which you want to remove pages.

</p>


</div>







<div>

<h3 className="font-bold">

2. Select pages to remove

</h3>


<p className="text-muted">

Enter page numbers like 2,4,6 or ranges like 2-5.

</p>


</div>







<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Download the cleaned PDF without removed pages.

</p>


</div>





</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>







<p className="mt-4 text-muted leading-7">

This tool removes selected PDF pages directly
inside your browser using pdf-lib.
Your files are never uploaded anywhere.

</p>








<h3 className="text-xl font-bold mt-8">

How page removal works

</h3>







<p className="mt-4 text-muted leading-7">

The selected pages are skipped while a new PDF
is created. Remaining pages are automatically
renumbered into a continuous document.

</p>

</section>

</div>

</div>

);

}