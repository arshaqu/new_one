"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";



export default function AddPageNumbersPage(){


const [file,setFile] = useState(null);

const [position,setPosition] =
useState("bottom-center");


const [fontSize,setFontSize] =
useState("12");


const [startNumber,setStartNumber] =
useState("1");


const [prefix,setPrefix] =
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







async function addNumbers(){


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



const font =
await pdf.embedFont(
StandardFonts.Helvetica
);





const pages =
pdf.getPages();



let number =
Number(startNumber);





pages.forEach(
(page)=>{


const {
width,
height
}
=
page.getSize();




const text =
`${prefix}${number}`;



const size =
Number(fontSize);



const textWidth =
font.widthOfTextAtSize(
text,
size
);



let x =
(width-textWidth)/2;



let y =
20;





if(position==="bottom-left"){

x=20;

y=20;

}



if(position==="bottom-right"){

x =
width-textWidth-20;

y=20;

}




if(position==="top-center"){

x =
(width-textWidth)/2;

y =
height-40;

}





page.drawText(
text,
{

x,

y,

size,

font,

color:rgb(
0,
0,
0
)

}

);



number++;


}

);






const output =
await pdf.save();




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
"numbered-document.pdf";


link.click();



URL.revokeObjectURL(url);




setMessage(
"Page numbers added successfully"
);



}

catch(error){


console.log(error);


setMessage(
"Failed to add page numbers"
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

Add Page Numbers

</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Add Page Numbers

</h1>




<p className="mt-3 text-muted">

Add page numbers to every page of your PDF.
Choose position, font size, and starting number —
processed completely in your browser.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label

className="
border-2
border-dashed
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

🔢

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

{(file.size/1024/1024).toFixed(2)}
MB

</p>


</div>


}










<div className="grid md:grid-cols-2 gap-5 mt-8">






<div>


<label className="text-sm text-muted">

Position

</label>


<select

value={position}

onChange={
e=>setPosition(e.target.value)
}

className="
mt-2
w-full
bg-input
border
rounded-md
px-3
py-2
"

>


<option value="bottom-center">

Bottom Center

</option>


<option value="bottom-left">

Bottom Left

</option>


<option value="bottom-right">

Bottom Right

</option>


<option value="top-center">

Top Center

</option>


</select>



</div>








<div>


<label className="text-sm text-muted">

Font size: {fontSize}px

</label>



<input

type="range"

min="8"

max="30"

value={fontSize}

onChange={
e=>setFontSize(e.target.value)
}

className="mt-3 w-full"

/>


</div>





</div>









<div className="grid md:grid-cols-2 gap-5 mt-5">



<div>


<label className="text-sm text-muted">

Start number

</label>



<input

value={startNumber}

onChange={
e=>setStartNumber(e.target.value)
}

className="
mt-2
w-full
bg-input
border
rounded-md
px-3
py-2
"

/>


</div>







<div>


<label className="text-sm text-muted">

Prefix (optional)

</label>



<input

placeholder='e.g. "Page " → Page 1'

value={prefix}

onChange={
e=>setPrefix(e.target.value)
}

className="
mt-2
w-full
bg-input
border
rounded-md
px-3
py-2
"

/>



</div>




</div>









<button


onClick={addNumbers}

disabled={loading}


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

"Add Page Numbers"

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

Select the PDF you want to number.

</p>

</div>





<div>

<h3 className="font-bold">

2. Configure numbering

</h3>


<p className="text-muted">

Choose position, starting number and font size.

</p>


</div>





<div>

<h3 className="font-bold">

3. Download

</h3>


<p className="text-muted">

Download your numbered PDF instantly.

</p>


</div>



</div>


</section>








<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>




<p className="mt-4 text-muted leading-7">

This tool stamps page numbers directly into
your PDF pages using pdf-lib.
All processing happens locally inside your browser.

</p>





<h3 className="text-xl font-bold mt-8">

Positioning and starting number

</h3>




<p className="mt-4 text-muted leading-7">

Choose bottom-center, bottom-left,
bottom-right or top-center placement.
You can also continue numbering from any value.

</p>




</section>






</div>

</div>


);


}