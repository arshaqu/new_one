"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TextRepeaterPage() {


const [text,setText] = useState("");

const [amount,setAmount] = useState(5);

const [separator,setSeparator] = useState("New line");

const [result,setResult] = useState("");

const [copied,setCopied] = useState(false);



useEffect(()=>{

let sep="";


if(separator==="New line"){
sep="\n";
}


if(separator==="Space"){
sep=" ";
}


if(separator==="Comma"){
sep=", ";
}


if(separator==="None"){
sep="";
}



if(text.trim()){


const output = Array(amount)
.fill(text)
.join(sep);


setResult(output);


}
else{

setResult("");

}


},[text,amount,separator]);







function copyResult(){


navigator.clipboard.writeText(result);


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

Text Repeater

</span>


</div>









<h1 className="text-3xl font-bold mt-4">

Text Repeater

</h1>





<p className="text-muted mt-2 text-xs">

Repeat any text multiple times with custom separator —
new line, space, comma or none. Great for testing and
content creation.

</p>









<div className="mt-5 bg-card border rounded-xl p-4">







<label className="font-semibold text-sm">

Text to repeat

</label>






<textarea

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="Type the text you want to repeat…"

className="w-full mt-3 bg-input rounded-lg p-3 text-sm min-h-[100px] outline-none"

/>









<label className="font-semibold text-sm mt-5 block">

Repeat {amount} times

</label>







<input

type="range"

min="1"

max="100"

value={amount}

onChange={(e)=>setAmount(Number(e.target.value))}

className="w-full mt-3"

/>






<div className="flex justify-between text-xs text-muted">

<span>

1

</span>


<span>

100

</span>


</div>









<h3 className="font-semibold text-sm mt-5">

Separator

</h3>







<div className="grid sm:grid-cols-4 gap-2 mt-3">


{

["New line","Space","Comma","None"].map((item)=>(



<label

key={item}

className="bg-input rounded-lg p-2 flex gap-2 items-center cursor-pointer text-sm"

>



<input

type="radio"

name="separator"

checked={separator===item}

onChange={()=>setSeparator(item)}

/>



<span>

{item}

</span>



</label>



))


}



</div>









{

result ?


<div className="mt-4 bg-input rounded-lg p-3">


<div className="flex justify-between items-center mb-2">


<p className="font-semibold text-xs">

Result

</p>



<button

onClick={copyResult}

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





<p className="text-xs leading-6 whitespace-pre-wrap break-words">

{result}

</p>



</div>


:

<div className="mt-4 text-center text-muted text-xs">

Type text above to generate result

</div>


}





</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

How to Use

</h2>






<div className="mt-3 space-y-3 text-xs text-muted">



<p>

<b>1</b> Enter text to repeat

</p>


<p className="ml-4">

Type or paste the word or phrase you want repeated.

</p>





<p>

<b>2</b> Set repeat count

</p>


<p className="ml-4">

Enter how many times you want the text repeated.

</p>





<p>

<b>3</b> Choose separator

</p>


<p className="ml-4">

Select newline, space, comma, or no separator between repetitions.

</p>





<p>

<b>4</b> Copy the result

</p>


<p className="ml-4">

Click Copy to copy the repeated text to your clipboard.

</p>




</div>



</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

How It Works

</h2>




<p className="mt-2 text-xs text-muted leading-6">


This tool repeats any text a set number of times with your
choice of separator — useful for generating test data,
stress-testing text fields, or simple repetitive content
creation tasks.


</p>



</div>









<div className="mt-8">


<h2 className="text-lg font-bold">

How it works

</h2>




<p className="mt-2 text-xs text-muted leading-6">


Enter the text you want repeated, choose a separator
(new line, space, comma, or none), and set a repeat count
up to 100 — the tool concatenates the text that many times
with the chosen separator between each repetition.


</p>



</div>









</div>


</div>


)

}