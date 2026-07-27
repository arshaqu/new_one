"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoremIpsumGeneratorPage() {

const [amount,setAmount] = useState(5);
const [unit,setUnit] = useState("Words");
const [startLorem,setStartLorem] = useState(true);
const [text,setText] = useState("");
const [copied,setCopied] = useState(false);


const words = [
"Lorem","ipsum","dolor","sit","amet","consectetur",
"adipiscing","elit","sed","do","eiusmod","tempor",
"incididunt","ut","labore","et","dolore","magna",
"aliqua","enim","ad","minim","veniam"
];


function generateLorem(){

let result="";

if(startLorem){
result="Lorem ipsum dolor sit amet, ";
}


let count = amount;


if(unit==="Sentences"){
count = amount * 12;
}


if(unit==="Paragraphs"){
count = amount * 60;
}



for(let i=0;i<count;i++){

result += words[Math.floor(Math.random()*words.length)] + " ";

}


result=result.trim();


if(unit==="Sentences" || unit==="Paragraphs"){
result+=".";
}


setText(result);

}



function copyText(){

navigator.clipboard.writeText(text);

setCopied(true);

setTimeout(()=>{

setCopied(false);

},1500);

}




return(

<div

className="min-h-screen py-8 px-5"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-3xl mx-auto">



<div className="text-xs text-muted">


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

Lorem Ipsum Generator

</span>


</div>





<h1 className="text-3xl font-bold mt-4">

Lorem Ipsum Generator

</h1>



<p className="text-muted mt-2 text-xs">

Generate Lorem Ipsum placeholder text by words,
sentences or paragraphs. Instant copy. Perfect for
designers and developers.

</p>





<div className="mt-5 bg-card border rounded-xl p-4">



<label className="font-semibold text-sm">

Amount: {amount}

</label>



<input

type="range"

min="1"

max="50"

value={amount}

onChange={(e)=>setAmount(Number(e.target.value))}

className="w-full mt-3"

/>



<div className="flex justify-between text-xs text-muted">

<span>1</span>

<span>50</span>

</div>





<h3 className="font-semibold mt-5 text-sm">

Unit

</h3>




<div className="grid sm:grid-cols-3 gap-2 mt-3">


{
["Words","Sentences","Paragraphs"].map((item)=>(


<label

key={item}

className="bg-input rounded-lg p-2 flex gap-2 items-center cursor-pointer text-sm"

>


<input

type="radio"

name="unit"

checked={unit===item}

onChange={()=>setUnit(item)}

/>


<span>

{item}

</span>


</label>


))

}


</div>




<label className="bg-input rounded-lg p-2 mt-3 flex gap-2 items-center cursor-pointer text-sm">


<input

type="checkbox"

checked={startLorem}

onChange={(e)=>setStartLorem(e.target.checked)}

/>


<span>

✓ Start with “Lorem ipsum dolor sit amet…”

</span>


</label>





<button

onClick={generateLorem}

className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm"

>

Generate

</button>

{

text ?


<div className="mt-4 bg-input rounded-lg p-3">


<div className="flex justify-between items-center mb-2">


<p className="font-semibold text-xs">

Generated Text

</p>



<button

onClick={copyText}

className="bg-card px-3 py-1.5 rounded-lg text-xs"

>

{

copied

?

"Copied"

:

"Copy"

}


</button>


</div>



<p className="text-xs leading-6 break-words">

{text}

</p>



</div>


:

<div className="mt-4 text-center text-muted text-xs">

Click Generate to create Lorem Ipsum text

</div>


}



</div>







<div className="mt-8">


<h2 className="text-lg font-bold">

How to Use

</h2>



<div className="mt-3 space-y-2 text-xs text-muted">


<p>

<b>1</b> Choose unit

</p>


<p className="ml-4">

Select Words, Sentences, or Paragraphs.

</p>




<p>

<b>2</b> Set amount

</p>


<p className="ml-4">

Use the slider to choose how many units to generate.

</p>




<p>

<b>3</b> Generate and copy

</p>


<p className="ml-4">

Click Generate, then copy the placeholder text to use in your designs.

</p>


</div>


</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

How It Works

</h2>



<p className="mt-2 text-xs text-muted leading-6">


This generates classic Lorem Ipsum placeholder text by word,
sentence, or paragraph count — the standard filler text used
across design and publishing so a layout can be evaluated
without waiting for final copy.


</p>


</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

Why designers use nonsense Latin instead of real sentences

</h2>



<p className="mt-2 text-xs text-muted leading-6">


Lorem Ipsum is derived from a scrambled passage of Cicero's
classical Latin text. Because it reads as meaningless to most
viewers, it doesn't distract from evaluating layout,
typography, and spacing the way real readable sentences would.


</p>


</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

Examples

</h2>




<div className="mt-3 space-y-4 text-xs text-muted">



<div>


<b>

Filling a design mockup

</b>


<p className="mt-1 leading-6">

Generating 3 paragraphs gives enough text to check how a blog
layout handles line height, paragraph spacing, and column width
before real content is written.

</p>


</div>





<div>


<b>

Testing a UI component

</b>


<p className="mt-1 leading-6">

Generating just 5-10 words checks how a card title or button
label truncates or wraps at different lengths.

</p>


</div>



</div>


</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

Common Use Cases

</h2>



<ul className="mt-3 space-y-1 text-xs text-muted list-disc ml-4">


<li>

Filling design mockups and wireframes before final copy is written

</li>



<li>

Testing how a UI layout handles varying text lengths

</li>



<li>

Populating a CMS or demo site with placeholder content during development

</li>


</ul>


</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

Tips

</h2>



<p className="mt-2 text-xs text-muted leading-6">


Generate text at multiple lengths (a short headline-length
version and a long paragraph version) to stress-test how your
layout handles both extremes.


<br/><br/>


Always replace Lorem Ipsum before publishing — leftover
placeholder text makes content look unfinished.


</p>


</div>






</div>

</div>


)

}