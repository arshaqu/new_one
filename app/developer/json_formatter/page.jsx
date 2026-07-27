"use client";

import Link from "next/link";
import { useState } from "react";

export default function JSONFormatterValidatorPage() {

const [input,setInput] =
useState(`{
  "name": "John",
  "age": 30
}`);

const [indent,setIndent] =
useState(2);

const [message,setMessage] =
useState("");

const [isError,setIsError] =
useState(false);









function formatJSON(){

try{

const parsed =
JSON.parse(input);

const formatted =
JSON.stringify(
parsed,
null,
Number(indent)
);

setInput(formatted);

setIsError(false);

setMessage(
"✓ Valid JSON formatted successfully."
);

}

catch(error){

setIsError(true);

setMessage(
`Invalid JSON: ${error.message}`
);

}

}










function minifyJSON(){

try{

const parsed =
JSON.parse(input);

const minified =
JSON.stringify(parsed);

setInput(minified);

setIsError(false);

setMessage(
"✓ JSON minified successfully."
);

}

catch(error){

setIsError(true);

setMessage(
`Invalid JSON: ${error.message}`
);

}

}










async function copyJSON(){

try{

await navigator.clipboard.writeText(input);

setIsError(false);

setMessage(
"Copied to clipboard."
);

}

catch{

setIsError(true);

setMessage(
"Unable to copy."
);

}

}










function clearJSON(){

setInput("");

setIsError(false);

setMessage("");

}










function validateJSON(){

try{

JSON.parse(input);

setIsError(false);

setMessage(
"✓ JSON is valid."
);

}

catch(error){

setIsError(true);

setMessage(
`Invalid JSON: ${error.message}`
);

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
JSON Formatter & Validator
</span>

</div>

<h1 className="text-5xl font-bold mt-6">
JSON Formatter & Validator
</h1>

<p className="mt-3 text-muted">
Format, beautify, and validate JSON instantly.
Minify for production or pretty-print for readability.
Error highlighting included.
</p>

<div className="mt-8 bg-card border rounded-xl p-6">

<div className="flex flex-wrap items-center gap-3">

<label className="font-medium">
Indent:
</label>

<select
value={indent}
onChange={(e)=>setIndent(Number(e.target.value))}
className="bg-input border rounded-md px-3 py-2"
>
<option value={2}>
2 spaces
</option>

<option value={4}>
4 spaces
</option>

</select>

<button
onClick={formatJSON}
className="px-5 py-2 rounded-lg bg-indigo-600 text-white"
>
Format
</button>

<button
onClick={minifyJSON}
className="px-5 py-2 rounded-lg bg-green-600 text-white"
>
Minify
</button>

<button
onClick={validateJSON}
className="px-5 py-2 rounded-lg bg-amber-600 text-white"
>
Validate
</button>

<button
onClick={copyJSON}
className="px-5 py-2 rounded-lg bg-blue-600 text-white"
>
Copy
</button>

<button
onClick={clearJSON}
className="px-5 py-2 rounded-lg bg-red-600 text-white"
>
Clear
</button>

</div>

<div className="mt-8">

<label className="font-semibold">
Input JSON
</label>

<textarea

value={input}

onChange={(e)=>
setInput(e.target.value)
}

rows={18}

spellCheck={false}

className="mt-3 w-full bg-input border rounded-lg p-4 font-mono text-sm resize-y outline-none"

placeholder='{
  "name":"John"
}'

/>

</div>

{

message &&

<div
className={`mt-5 rounded-lg border p-4 ${
isError
?
"border-red-500 text-red-500"
:
"border-green-500 text-green-500"
}`}
>

{message}

</div>

}

</div>

<section className="mt-12">

<h2 className="text-2xl font-bold">
How to Use
</h2>

<div className="mt-6 space-y-6">

<div>

<h3 className="font-bold">
1. Paste your JSON
</h3>

<p className="text-muted">
Paste raw or minified JSON into the input area.
</p>

</div>

<div>

<h3 className="font-bold">
2. Format or minify
</h3>

<p className="text-muted">
Click Format to pretty-print with indentation,
or Minify to compress it.
</p>

</div>

<div>

<h3 className="font-bold">
3. Copy the result
</h3>

<p className="text-muted">
Click Copy to copy the formatted JSON to your clipboard.
</p>

</div>

</div>

</section>

<section className="mt-12 pb-10">

<h2 className="text-2xl font-bold">
How It Works
</h2>

<p className="mt-4 text-muted leading-7">
This tool parses your JSON, checks that it's
syntactically valid, and reprints it either
indented for readability or minified for
production — all inside your browser, so
nothing you paste is uploaded anywhere.
</p>

<h3 className="text-xl font-bold mt-8">
What "valid JSON" actually requires
</h3>

<p className="mt-4 text-muted leading-7">
JSON is stricter than JavaScript object
literals. Property names must use double
quotes, trailing commas are not allowed,
and values can only be strings, numbers,
booleans, null, arrays, or objects.
Functions, comments, and <code>undefined</code>
are not valid JSON.
</p>

<h3 className="text-xl font-bold mt-8">
Pretty-print vs minify
</h3>

<p className="mt-4 text-muted leading-7">
Pretty-printing adds indentation and line
breaks, making nested data much easier to
read and debug. Minifying removes all
unnecessary whitespace, producing the
smallest possible JSON payload for APIs,
configuration files, and production use.
</p>

</section>

</div>

</div>

);

}