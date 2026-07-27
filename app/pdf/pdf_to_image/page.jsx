"use client";

import Link from "next/link";
import { useState } from "react";



async function loadPDFJS(){

const pdfjsLib =
await import(
"pdfjs-dist/build/pdf.mjs"
);



pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";



return pdfjsLib;

}







export default function PDFToImagePage(){



const [file,setFile] =
useState(null);



const [format,setFormat] =
useState("jpg");



const [scale,setScale] =
useState("1.5");



const [quality,setQuality] =
useState("0.85");



const [loading,setLoading] =
useState(false);



const [message,setMessage] =
useState("");



const [images,setImages] =
useState([]);








function handleFile(e){


const selected =
e.target.files?.[0];



if(
selected &&
selected.type==="application/pdf"
){

setFile(selected);

setImages([]);

setMessage("");

}


}









function handleDrop(e){


e.preventDefault();



const droppedFile =
e.dataTransfer.files?.[0];



if(
droppedFile &&
droppedFile.type==="application/pdf"
){

setFile(droppedFile);

setImages([]);

setMessage("");

}


}











async function convertPDF(){



if(!file){


setMessage(
"Please upload a PDF file"
);


return;


}







try{


setLoading(true);

setMessage("");

setImages([]);





const pdfjsLib =
await loadPDFJS();






const buffer =
await file.arrayBuffer();






const pdf =
await pdfjsLib
.getDocument({

data:buffer

})
.promise;







let convertedImages = [];







for(
let i=1;
i<=pdf.numPages;
i++
){





const page =
await pdf.getPage(i);






const viewport =
page.getViewport({

scale:Number(scale)

});






const canvas =
document.createElement(
"canvas"
);





const context =
canvas.getContext(
"2d"
);






canvas.width =
viewport.width;



canvas.height =
viewport.height;









await page.render({

canvasContext:context,

viewport

})
.promise;








const mime =

format==="png"

?

"image/png"

:

"image/jpeg";









const image =
canvas.toDataURL(

mime,

format==="jpg"

?

Number(quality)

:

undefined

);







convertedImages.push({

src:image,

name:`page-${i}.${format}`

});





}








setImages(convertedImages);





setMessage(

`Successfully converted ${pdf.numPages} page(s)`

);






}

catch(error){


console.error(
"PDF Error:",
error
);



setMessage(

error.message ||

"Conversion failed"

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

PDF to Image

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

PDF to Image

</h1>





<p className="mt-3 text-muted">

Convert PDF pages to high-quality JPG or PNG images.
Choose resolution and quality — all processed locally
in your browser.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">






<label


onDragOver={(e)=>e.preventDefault()}


onDrop={handleDrop}



className="border-2 border-dashed rounded-xl
p-10 flex flex-col items-center justify-center
cursor-pointer hover:bg-black/5 transition"


>


<div className="text-5xl">

🖼️

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











<div className="grid md:grid-cols-3 gap-5 mt-8">





<div>


<label className="text-sm text-muted">

Format

</label>




<select


value={format}


onChange={(e)=>
setFormat(e.target.value)
}


className="mt-2 w-full bg-input border rounded-md px-3 py-2"


>


<option value="jpg">

JPG (smaller)

</option>



<option value="png">

PNG (higher quality)

</option>



</select>


</div>









<div>


<label className="text-sm text-muted">

Resolution

</label>




<select


value={scale}


onChange={(e)=>
setScale(e.target.value)
}


className="mt-2 w-full bg-input border rounded-md px-3 py-2"


>


<option value="1">

1x

</option>


<option value="1.5">

1.5x

</option>


<option value="2">

2x

</option>


<option value="3">

3x

</option>



</select>


</div>









<div>


<label className="text-sm text-muted">

Quality

</label>





<select


value={quality}


disabled={
format==="png"
}


onChange={(e)=>
setQuality(e.target.value)
}


className="mt-2 w-full bg-input border rounded-md px-3 py-2"


>


<option value="0.6">

60%

</option>



<option value="0.85">

85%

</option>



<option value="1">

100%

</option>



</select>



</div>



</div>









<button


onClick={convertPDF}


disabled={loading}



className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"


>


{


loading

?

"Converting..."

:

"Convert to Images"


}



</button>







{

message &&


<p className="mt-4 text-sm">

{message}

</p>


}






</div>













{

images.length > 0 &&


<section className="mt-10">


<h2 className="text-2xl font-bold mb-5">

Converted Images

</h2>






<div className="grid md:grid-cols-3 gap-6">


{


images.map((img,index)=>(


<div


key={index}


className="relative group border rounded-xl overflow-hidden bg-card"


>



<img


src={img.src}


alt={`Page ${index+1}`}


className="w-full"


/>







<div


className="absolute inset-0
bg-black/60
opacity-0
group-hover:opacity-100
transition
flex
items-center
justify-center"


>


<button


onClick={()=>{


const link =
document.createElement("a");


link.href =
img.src;


link.download =
img.name;


link.click();


}}


className="px-5 py-2 rounded-lg bg-indigo-600 text-white"


>


⬇ Download


</button>



</div>





</div>



))


}



</div>




</section>


}

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

Click the upload box or drag and drop your PDF file.

</p>


</div>









<div>

<h3 className="font-bold">

2. Choose format and quality

</h3>


<p className="text-muted">

Select JPG or PNG, choose resolution and image quality.

</p>


</div>









<div>

<h3 className="font-bold">

3. Download images

</h3>


<p className="text-muted">

After conversion, hover over any image and click
the download button.

</p>


</div>






</div>



</section>




<section className="mt-12 pb-10">



<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

This tool converts PDF pages into image files using
PDF.js running completely inside your browser.
Your PDF files are never uploaded to any server.

</p>


<h3 className="text-xl font-bold mt-8">

JPG vs PNG output

</h3>


<p className="mt-4 text-muted leading-7">

JPG creates smaller image files using compression,
which is useful when file size matters.

PNG keeps maximum quality and sharp text, making
it better for documents, screenshots, and scanned pages.

</p>


<h3 className="text-xl font-bold mt-8">

Resolution and quality control

</h3>


<p className="mt-4 text-muted leading-7">

Higher resolution creates sharper images but also
increases file size.

The quality option controls JPG compression so you
can balance image clarity and storage size.

</p>

</section>


</div>

</div>


);

}