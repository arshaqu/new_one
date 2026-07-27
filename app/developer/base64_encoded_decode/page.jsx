"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Base64EncoderDecoderPage() {

const [mode,setMode] =
useState("encode");

const [urlSafe,setUrlSafe] =
useState(false);

const [input,setInput] =
useState("");

const [output,setOutput] =
useState("");

const [message,setMessage] =
useState("");










function unicodeToBase64(text){

try{

const bytes =
new TextEncoder().encode(text);

let binary="";

bytes.forEach(byte=>{

binary +=
String.fromCharCode(byte);

});

return btoa(binary);

}

catch{

return "";

}

}










function base64ToUnicode(base64){

const binary =
atob(base64);

const bytes =
Uint8Array.from(

binary,

char=>char.charCodeAt(0)

);

return new TextDecoder().decode(bytes);

}










function encodeText(text){

try{

let encoded =
unicodeToBase64(text);

if(urlSafe){

encoded =
encoded
.replace(/\+/g,"-")
.replace(/\//g,"_")
.replace(/=+$/,"");

}

setOutput(encoded);

setMessage("");

}

catch{

setOutput("");

setMessage("Unable to encode.");

}

}










function decodeText(text){

try{

let value =
text.trim();

if(value===""){

setOutput("");

setMessage("");

return;

}

if(urlSafe){

value =
value
.replace(/-/g,"+")
.replace(/_/g,"/");

while(
value.length % 4 !== 0
){

value += "=";

}

}

const decoded =
base64ToUnicode(value);

setOutput(decoded);

setMessage("");

}

catch{

setOutput("");

setMessage("Invalid Base64 string.");

}

}










useEffect(()=>{

if(!input.trim()){

setOutput("");

setMessage("");

return;

}

try{

if(mode==="encode"){

encodeText(input);

}

else{

decodeText(input);

}

}

catch{

setOutput("");

setMessage("Invalid Base64 string.");

}

},[
input,
mode,
urlSafe
]);










async function copyOutput(){

if(!output)
return;

try{

await navigator.clipboard.writeText(output);

setMessage("Copied to clipboard.");

}

catch{

setMessage("Unable to copy.");

}

}










function swapMode(){

const currentOutput =
output;

setMode(

mode==="encode"

?

"decode"

:

"encode"

);

setInput(currentOutput);

setOutput("");

setMessage("");

}










function clearAll(){

setInput("");

setOutput("");

setMessage("");

}

return(
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
Base64 Encoder / Decoder
</span>

</div>

<h1 className="text-5xl font-bold mt-6">

Base64 Encoder / Decoder

</h1>

<p className="mt-3 text-muted">

Encode text to Base64 or decode Base64 strings back to plain text.
Supports Unicode and URL-safe Base64.

</p>

<div className="mt-8 bg-card border rounded-xl p-6">

<div className="flex flex-wrap gap-3">

<button
onClick={()=>setMode("encode")}
className={`px-5 py-2 rounded-lg transition ${
mode==="encode"
?
"bg-indigo-600 text-white"
:
"border"
}`}
>

Encode

</button>

<button
onClick={()=>setMode("decode")}
className={`px-5 py-2 rounded-lg transition ${
mode==="decode"
?
"bg-indigo-600 text-white"
:
"border"
}`}
>

Decode

</button>

<button
onClick={()=>setUrlSafe(!urlSafe)}
className={`px-5 py-2 rounded-lg transition ${
urlSafe
?
"bg-green-600 text-white"
:
"border"
}`}
>

URL-safe

</button>

<button
onClick={swapMode}
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

<div className="mt-8">

<label className="font-semibold">

{
mode==="encode"
?
"Plain text"
:
"Base64"
}

</label>

<textarea

value={input}

onChange={(e)=>setInput(e.target.value)}

rows={8}

spellCheck={false}

className="mt-3 w-full bg-input border rounded-lg p-4 outline-none resize-y font-mono"

placeholder={
mode==="encode"
?
"Enter text to encode..."
:
"Enter Base64 to decode..."
}

/>

</div>

<div className="mt-8">

<div className="flex items-center justify-between">

<label className="font-semibold">

{
mode==="encode"
?
"Base64 Output"
:
"Decoded Text"
}

</label>

<button

onClick={copyOutput}

disabled={!output}

className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"

>

Copy

</button>

</div>

<textarea

readOnly

value={output}

rows={8}

spellCheck={false}

className="mt-3 w-full bg-input border rounded-lg p-4 resize-y font-mono"

placeholder="Output will appear here..."

/>

</div>

{

message &&

<p
className={`mt-5 ${
message.toLowerCase().includes("invalid") ||
message.toLowerCase().includes("unable")
?
"text-red-500"
:
"text-green-500"
}`}
>

{message}

</p>

}

</div>

<section className="mt-12">

<h2 className="text-2xl font-bold">

How to Use

</h2>

<div className="mt-6 space-y-6">

<div>

<h3 className="font-bold">

1. Choose encode or decode

</h3>

<p className="text-muted">

Select Encode to convert text to Base64, or Decode to convert Base64 back to plain text.

</p>

</div>

<div>

<h3 className="font-bold">

2. Enter your text

</h3>

<p className="text-muted">

Type or paste the text you want to encode or decode.

</p>

</div>

<div>

<h3 className="font-bold">

3. Copy the output

</h3>

<p className="text-muted">

The result appears instantly. Click Copy to use it anywhere.

</p>

</div>

</div>

</section>

<section className="mt-12 pb-10">

<h2 className="text-2xl font-bold">

How It Works

</h2>

<p className="mt-4 text-muted leading-7">

This tool encodes plain text into Base64 and decodes Base64 strings back to text,
supporting Unicode and URL-safe variants. Everything happens locally in your browser,
so none of your data is uploaded to any server.

</p>

<h3 className="text-xl font-bold mt-8">

What Base64 actually does

</h3>

<p className="mt-4 text-muted leading-7">

Base64 represents binary data using only 64 printable ASCII characters
(A–Z, a–z, 0–9, + and /). This makes binary content safe to include in
JSON, XML, emails, URLs, and other text-based formats.

</p>

<h3 className="text-xl font-bold mt-8">

Standard vs. URL-safe Base64

</h3>

<p className="mt-4 text-muted leading-7">

Standard Base64 uses the characters <strong>+</strong> and <strong>/</strong>,
which may require escaping inside URLs. URL-safe Base64 replaces them with
<strong>-</strong> and <strong>_</strong>, making the encoded string safe
to include directly in URLs without additional encoding.

</p>

</section>

</div>

</div>

);

}