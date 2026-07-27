"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";



export default function MergePDFPage(){


const [files,setFiles] =
useState([]);


const [loading,setLoading] =
useState(false);



const [message,setMessage] =
useState("");





function handleFiles(e){


const selected =
Array.from(e.target.files);



const pdfFiles =
selected.filter(
file=>file.type==="application/pdf"
);



setFiles(pdfFiles);


}






function removeFile(index){


setFiles(
files.filter(
(_,i)=>i!==index
)
);


}






async function mergePDF(){


if(files.length < 2){

setMessage(
"Please select at least 2 PDF files"
);

return;

}



try{


setLoading(true);

setMessage("");



const mergedPDF =
await PDFDocument.create();





for(const file of files){


const bytes =
await file.arrayBuffer();



const pdf =
await PDFDocument.load(bytes);



const pages =
await mergedPDF.copyPages(
pdf,
pdf.getPageIndices()
);



pages.forEach(
page=>
mergedPDF.addPage(page)
);


}





const mergedBytes =
await mergedPDF.save();





const blob =
new Blob(
[mergedBytes],
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
"merged-document.pdf";


link.click();



URL.revokeObjectURL(url);



setMessage(
"PDF merged successfully"
);



}

catch(error){


console.log(error);


setMessage(
"Unable to merge PDF files"
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
Merge PDF
</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Merge PDF

</h1>





<p className="mt-3 text-muted">

Combine multiple PDF files into one.
Upload PDFs, arrange order, and download
the merged file instantly.

</p>







<div className="mt-8 bg-card border rounded-xl p-6">





<label

className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center
justify-center cursor-pointer"

>


<div className="text-5xl">

📄

</div>


<h3 className="text-xl font-semibold mt-4">

Click or drag PDFs here

</h3>



<p className="text-sm text-muted mt-2">

Files are processed locally —
never uploaded to any server

</p>



<input

type="file"

accept="application/pdf"

multiple

onChange={handleFiles}

className="hidden"

/>



</label>









<div className="mt-6">


<h2 className="font-bold text-xl">

Files ({files.length})

</h2>



<div className="mt-4 space-y-3">


{

files.map(
(file,index)=>(


<div

key={index}

className="flex justify-between items-center border rounded-lg p-3"

>


<div>


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




<button

onClick={
()=>removeFile(index)
}

className="text-red-500"

>

Remove

</button>



</div>


)

)


}



</div>


</div>









<button

onClick={mergePDF}

disabled={loading}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>


{

loading

?

"Merging..."

:

`Merge ${files.length} PDFs`

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

1. Upload PDF files

</h3>

<p className="text-muted">

Click to upload two or more PDF files you want to merge.

</p>

</div>




<div>

<h3 className="font-bold">

2. Arrange order

</h3>

<p className="text-muted">

Files are merged in the selected order.

</p>

</div>




<div>

<h3 className="font-bold">

3. Merge and download

</h3>

<p className="text-muted">

Click merge to create one PDF and download instantly.

</p>

</div>


</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

This tool combines multiple PDF files into
a single document using JavaScript running
inside your browser.

</p>




<p className="mt-4 text-muted leading-7">

Your files are never uploaded to any server.
All processing happens locally, keeping your
documents private and secure.

</p>





<h3 className="text-xl font-bold mt-8">

Why browser-based merging matters

</h3>


<p className="mt-4 text-muted leading-7">

Sensitive documents such as contracts,
identity documents, and financial files
remain on your device instead of being
sent to third-party servers.

</p>




<h3 className="text-xl font-bold mt-8">

Examples

</h3>


<ul className="mt-4 text-muted space-y-2">

<li>
• Merge scanned documents into one PDF
</li>

<li>
• Combine invoices and receipts
</li>

<li>
• Create a single report from multiple PDFs
</li>

</ul>




</section>








</div>

</div>

);

}