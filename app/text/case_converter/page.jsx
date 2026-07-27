"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaseConverterPage() {

const [text, setText] = useState("");
const [copied, setCopied] = useState("");



function copyText(value, name){

navigator.clipboard.writeText(value);

setCopied(name);

setTimeout(()=>{

setCopied("");

},1500);

}




function upperCase(){

return text.toUpperCase();

}



function lowerCase(){

return text.toLowerCase();

}



function titleCase(){

return text
.toLowerCase()
.split(" ")
.filter(Boolean)
.map(word=>word.charAt(0).toUpperCase()+word.slice(1))
.join(" ");

}



function sentenceCase(){

return text
.toLowerCase()
.replace(/^./, char=>char.toUpperCase());

}



function camelCase(){

let words = text
.toLowerCase()
.split(/\s+/)
.filter(Boolean);


if(words.length === 0) return "";


return words[0] +

words
.slice(1)
.map(word=>word.charAt(0).toUpperCase()+word.slice(1))
.join("");

}



function pascalCase(){

return text
.toLowerCase()
.split(/\s+/)
.filter(Boolean)
.map(word=>word.charAt(0).toUpperCase()+word.slice(1))
.join("");

}




function snakeCase(){

return text
.toLowerCase()
.trim()
.replace(/\s+/g,"_");

}




function kebabCase(){

return text
.toLowerCase()
.trim()
.replace(/\s+/g,"-");

}




function alternatingCase(){

return text
.split("")
.map((char,index)=>

index % 2 === 0
?
char.toLowerCase()
:
char.toUpperCase()

)
.join("");

}





const results = [

["UPPERCASE", upperCase()],

["lowercase", lowerCase()],

["Title Case", titleCase()],

["Sentence case", sentenceCase()],

["camelCase", camelCase()],

["PascalCase", pascalCase()],

["snake_case", snakeCase()],

["kebab-case", kebabCase()],

["aLtErNaTiNg", alternatingCase()]

];





return (

<div

className="min-h-screen py-12 px-6"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-4xl mx-auto">



{/* Breadcrumb */}

<div className="text-sm text-muted">

<Link

href="/"

className="hover:text-blue-500"

>

Home

</Link>


{" / "}


<span>

Text

</span>


{" / "}


<span>

Case Converter

</span>


</div>






<h1 className="text-5xl font-bold mt-6">

Case Converter

</h1>



<p className="text-muted mt-3">

Convert text between UPPERCASE, lowercase,
Title Case, camelCase, snake_case, kebab-case and more instantly.

</p>








<div className="mt-8 bg-card border rounded-2xl p-6">



<label className="font-semibold">

Your text

</label>




<textarea

value={text}

onChange={(e)=>setText(e.target.value)}

className="mt-3 w-full min-h-[140px] rounded-xl bg-input border px-4 py-3"

style={{

color:"var(--foreground)"

}}

placeholder="Type or paste your text here…"

></textarea>








{

text.trim() === "" ?


<div

className="mt-8 text-center text-muted py-8"

>

Start typing above to see all case conversions

</div>



:


<div className="mt-8 space-y-4">


{

results.map(([name,value])=>(


<div

key={name}

className="bg-input rounded-xl p-5"

>



<div className="flex justify-between items-start gap-4">


<div className="flex-1">


<h3 className="font-bold text-lg">

{name}

</h3>



<p className="mt-2 break-all">

{value}

</p>


</div>





<button

onClick={()=>copyText(value,name)}

className="bg-card px-4 py-2 rounded-lg text-sm"

>


{

copied === name

?

"Copied"

:

"Copy"

}


</button>



</div>



</div>


))


}


</div>


}




</div>









{/* How to use */}

<div className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>



<div className="mt-5 space-y-5">



<div>

<span className="font-bold">

1

</span>

<p className="text-muted">

Paste or type your text

</p>

</div>





<div>

<span className="font-bold">

2

</span>

<p className="text-muted">

All 9 case styles appear instantly.

</p>

</div>





<div>

<span className="font-bold">

3

</span>

<p className="text-muted">

Click Copy next to any variant.

</p>

</div>




</div>


</div>









{/* How it works */}

<div className="mt-12">


<h2 className="text-2xl font-bold">

How It Works

</h2>



<p className="mt-4 text-muted leading-7">

This tool converts text between normal writing formats
and programming naming conventions. It supports
uppercase, lowercase, Title Case, Sentence case,
camelCase, PascalCase, snake_case and kebab-case formats.

</p>



</div>








{/* Examples */}

<div className="mt-10">


<h2 className="text-2xl font-bold">

Examples

</h2>



<p className="mt-4 text-muted">

"hello world"

</p>




<ul className="mt-3 space-y-2 text-muted">


<li>

hello world → Hello World

</li>


<li>

hello world → helloWorld

</li>


<li>

hello world → hello_world

</li>


<li>

hello world → hello-world

</li>


</ul>


</div>









{/* Use cases */}

<div className="mt-10">


<h2 className="text-2xl font-bold">

Common Use Cases

</h2>



<ul className="mt-4 space-y-2 text-muted">


<li>

• Converting variable names between programming styles

</li>


<li>

• Formatting article headings and titles

</li>


<li>

• Creating URL-friendly filenames

</li>


<li>

• Preparing database column names

</li>


</ul>


</div>

</div>


</div>


);

}