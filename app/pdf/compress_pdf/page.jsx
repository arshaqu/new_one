"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";



export default function CompressPDFPage(){


const [file,setFile] = useState(null);

const [level,setLevel] = useState("medium");

const [loading,setLoading] = useState(false);

const [message,setMessage] = useState("");

const [compressedSize,setCompressedSize] = useState(null);








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









async function compressPDF(){


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







// compression settings

let useObjectStreams = true;


if(level==="low"){

useObjectStreams=false;

}







const pdfBytes =
await pdfDoc.save({

useObjectStreams,

addDefaultPage:false

});







const blob =
new Blob(

[pdfBytes],

{
type:"application/pdf"
}

);





setCompressedSize(
blob.size
);






const url =
URL.createObjectURL(blob);




const link =
document.createElement("a");


link.href=url;


link.download=
"compressed.pdf";


link.click();





setMessage(
"PDF compressed successfully"
);





}

catch(error){


console.log(error);


setMessage(
"Compression failed"
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

Compress PDF

</span>


</div>









<h1 className="text-5xl font-bold mt-6">

Compress PDF

</h1>







<p className="mt-3 text-muted">

Reduce PDF file size by re-optimizing the document
structure. Fast, browser-based compression with no
file uploads.

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

🗜️

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

Original size:

{" "}

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

Compression Level

</label>



<select


value={level}


onChange={
e=>setLevel(e.target.value)
}


className="mt-2 w-full bg-input border rounded-md px-3 py-2"


>


<option value="low">

Low compression (better quality)

</option>



<option value="medium">

Medium compression

</option>



<option value="high">

High compression (smaller size)

</option>


</select>


</div>









<p className="mt-5 text-sm text-muted">

Note: Browser compression works best for text PDFs.
Image-heavy PDFs may have limited size reduction.

</p>









<button


onClick={compressPDF}


disabled={loading}



className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"


>


{


loading

?

"Compressing..."

:

"Compress PDF"


}



</button>









{
message &&


<p className="mt-4 text-sm">

{message}

</p>


}






{
compressedSize &&


<p className="mt-2 text-sm text-muted">

New size:

{" "}

{

(compressedSize/1024/1024)
.toFixed(2)

}

MB

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

Select the PDF file you want to compress.

</p>


</div>






<div>

<h3 className="font-bold">

2. Choose compression level

</h3>


<p className="text-muted">

Select low, medium, or high compression.

</p>


</div>






<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Download the optimized smaller PDF file.

</p>


</div>




</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool reduces PDF file size by optimizing
the internal PDF structure directly in your browser.
Your files never leave your device.

</p>







<h3 className="text-xl font-bold mt-8">

What compression changes

</h3>




<p className="mt-4 text-muted leading-7">

The tool removes unnecessary PDF structure data
and rewrites the document efficiently while keeping
the visible content unchanged.

</p>







<h3 className="text-xl font-bold mt-8">

Why results vary

</h3>





<p className="mt-4 text-muted leading-7">

Text-based PDFs usually compress better.
Scanned PDFs with large images may reduce less
because images contain most of the file size.

</p>



</section>






</div>

</div>

);

}