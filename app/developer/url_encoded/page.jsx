"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function URLEncoderDecoderPage() {

const [mode,setMode] = useState("encode");

const [type,setType] = useState("component");

const [input,setInput] = useState(
"https://example.com/search?q=hello world&lang=en"
);

const [output,setOutput] = useState("");

const [message,setMessage] = useState("");




// Encode URL

function encodeURL(value){

try{

let result;


if(type==="component"){

result = encodeURIComponent(value);

}
else{

result = encodeURI(value);

}


setOutput(result);
setMessage("");

}
catch{

setOutput("");

setMessage(
"Unable to encode URL."
);

}

}





// Decode URL

function decodeURL(value){

try{

let result;


if(type==="component"){

result = decodeURIComponent(value);

}
else{

result = decodeURI(value);

}


setOutput(result);
setMessage("");

}
catch{

setOutput("");

setMessage(
"Invalid encoded URL."
);

}

}





// Process

function processURL(){

if(!input.trim()){

setOutput("");
setMessage("");

return;

}



if(mode==="encode"){

encodeURL(input);

}
else{

decodeURL(input);

}

}





useEffect(()=>{

processURL();

},[input,mode,type]);






// Copy

async function copyOutput(){

if(!output)
return;


try{

await navigator.clipboard.writeText(output);

setMessage(
"Copied to clipboard."
);

}
catch{

setMessage(
"Unable to copy."
);

}

}







// Swap

function swap(){

setMode(
mode==="encode"
?
"decode"
:
"encode"
);


setInput(output);

setOutput("");

setMessage("");

}





// Clear

function clearAll(){

setInput("");

setOutput("");

setMessage("");

}





return (

<div
className="min-h-screen px-6 py-12"
style={{
background:"var(--background)",
color:"var(--foreground)"
}}
>


<div className="max-w-5xl mx-auto">



<div className="text-sm text-muted">


<Link
href="/"
className="hover:text-blue-500"
>
Home
</Link>


{" / "}


<Link
href="/developer"
className="hover:text-blue-500"
>
Developer
</Link>


{" / "}


<span>
URL Encoder / Decoder
</span>


</div>






<h1 className="text-5xl font-bold mt-6">

URL Encoder / Decoder

</h1>





<p className="mt-3 text-muted">

Encode special characters in URLs or decode
percent-encoded URLs. Handles full URLs and
individual query parameters.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">





<div className="flex flex-wrap gap-3">



<button

onClick={()=>setMode("encode")}

className={`px-5 py-2 rounded-lg ${
mode==="encode"
?
"bg-blue-600 text-white"
:
"border"
}`}

>

Encode

</button>





<button

onClick={()=>setMode("decode")}

className={`px-5 py-2 rounded-lg ${
mode==="decode"
?
"bg-blue-600 text-white"
:
"border"
}`}

>

Decode

</button>







<button

onClick={()=>setType("component")}

className={`px-5 py-2 rounded-lg ${
type==="component"
?
"bg-slate-600 text-white"
:
"border"
}`}

>

Component

</button>







<button

onClick={()=>setType("full")}

className={`px-5 py-2 rounded-lg ${
type==="full"
?
"bg-slate-600 text-white"
:
"border"
}`}

>

Full URL

</button>







<button

onClick={swap}

className="px-5 py-2 rounded-lg border"

>

⇄ Swap

</button>



<button

onClick={clearAll}

className="px-5 py-2 rounded-lg border"

>

Clear

</button>



</div>







<p className="mt-5 text-sm text-muted">


<strong>

{type==="component"
?
"Component:"
:
"Full URL:"
}

</strong>


{" "}


{

type==="component"

?

"encodes everything including /, ?, &, = — use for query values."

:

"preserves /, ?, &, = — use for complete URLs."

}


</p>








<div className="mt-8">


<label className="font-semibold">

{

mode==="encode"

?

"Text to encode"

:

"Text to decode"

}

</label>





<textarea

value={input}

onChange={(e)=>setInput(e.target.value)}

rows={6}

className="
mt-3
w-full
bg-input
border
rounded-xl
p-4
font-mono
resize-none
outline-none
"

placeholder={
mode==="encode"
?
"https://example.com/search?q=hello world&lang=en"
:
"https%3A%2F%2Fexample.com"
}

/>



</div>









<div className="mt-8">


<div className="flex justify-between items-center">


<label className="font-semibold">

Result

</label>



<button

onClick={copyOutput}

className="
px-5
py-2
rounded-lg
bg-blue-600
text-white
"

>

Copy

</button>



</div>






<textarea

readOnly

value={output}

rows={6}

className="
mt-3
w-full
bg-input
border
rounded-xl
p-4
font-mono
resize-none
outline-none
"

placeholder="Output appears here..."

 />



</div>








{

message &&

<p className="mt-4 text-green-500">

{message}

</p>

}





</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>





<div className="mt-6 space-y-6">





<div className="flex gap-4">

<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">

1

</div>


<div>

<h3 className="font-bold">

Choose mode

</h3>


<p className="text-muted">

Select Encode to percent-encode a URL or
Decode to decode one.

</p>


</div>

</div>









<div className="flex gap-4">

<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">

2

</div>


<div>

<h3 className="font-bold">

Choose encode type

</h3>


<p className="text-muted">

Use Component for query parameter values,
or Full URL to encode a complete URL while
keeping structure intact.

</p>


</div>

</div>










<div className="flex gap-4">

<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">

3

</div>


<div>

<h3 className="font-bold">

Copy the result

</h3>


<p className="text-muted">

The encoded or decoded output appears instantly.
Click Copy to use it.

</p>


</div>

</div>







</div>


</section>








<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool encodes special characters in URLs
(percent-encoding) or decodes an already
encoded URL back to readable text, handling
both full URLs and individual query parameter
values.

</p>







<h3 className="text-xl font-bold mt-8">

What percent-encoding solves

</h3>






<p className="mt-4 text-muted leading-7">

URLs can only safely contain a limited set of
characters. Spaces, special symbols, and
non-ASCII characters are replaced with a %
followed by their hexadecimal code.

For example, a space becomes <code>%20</code>,
keeping URLs valid and unambiguous across
browsers and servers.

</p>








<h3 className="text-xl font-bold mt-8">

Full URL encoding vs. component encoding

</h3>







<p className="mt-4 text-muted leading-7">

Full URL encoding preserves structural
characters like /, ?, &, and =, making it
suitable when encoding an entire URL.

Component encoding encodes everything,
including those structural characters, making
it safer for individual query parameter values
where characters like & or = should not break
the URL structure.

</p>





</section>






</div>

</div>

);

}