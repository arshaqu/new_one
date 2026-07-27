"use client";

import { useState } from "react";
import Link from "next/link";


export default function PasswordGeneratorPage(){


const [length,setLength] = useState(16);

const [uppercase,setUppercase] = useState(true);
const [lowercase,setLowercase] = useState(true);
const [numbers,setNumbers] = useState(true);
const [symbols,setSymbols] = useState(true);
const [ambiguous,setAmbiguous] = useState(true);

const [password,setPassword] = useState("");

const [copied,setCopied] = useState(false);





function generatePassword(){


let chars="";


if(uppercase)
chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";


if(lowercase)
chars+="abcdefghijklmnopqrstuvwxyz";


if(numbers)
chars+="0123456789";


if(symbols)
chars+="!@#$%^&*()_+-={}[]<>?";



if(ambiguous){

chars = chars.replace(/[O0lI]/g,"");

}



let result="";


const array = new Uint32Array(length);

crypto.getRandomValues(array);



for(let i=0;i<length;i++){

result += chars[array[i] % chars.length];

}



setPassword(result);

}





function copyPassword(){


navigator.clipboard.writeText(password);

setCopied(true);


setTimeout(()=>{

setCopied(false);

},1500);


}







return(


<div

className="min-h-screen py-10 px-6"

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

Text

</span>


{" / "}


<span>

Password Generator

</span>


</div>







<h1 className="text-4xl font-bold mt-5">

Password Generator

</h1>




<p className="text-muted mt-2 text-sm">

Generate strong random passwords. Choose length,
include uppercase, lowercase, numbers and symbols.
Instant strength meter.

</p>








<div className="mt-6 bg-card border rounded-2xl p-5">





<div className="flex justify-between items-center">


<label className="font-semibold text-sm">

Length: {length} characters

</label>



</div>






<input

type="range"

min="6"

max="64"

value={length}

onChange={(e)=>setLength(Number(e.target.value))}

className="w-full mt-4"

/>




<div className="flex justify-between text-xs text-muted">

<span>6</span>

<span>64</span>

</div>









<h3 className="font-semibold mt-6 text-sm">

Include

</h3>






<div className="grid sm:grid-cols-2 gap-3 mt-4">



<label className="bg-input rounded-xl p-3 flex gap-3 items-center cursor-pointer">

<input

type="checkbox"

checked={uppercase}

onChange={(e)=>setUppercase(e.target.checked)}

/>

<span>

✓ A–Z Uppercase

</span>


</label>





<label className="bg-input rounded-xl p-3 flex gap-3 items-center cursor-pointer">


<input

type="checkbox"

checked={lowercase}

onChange={(e)=>setLowercase(e.target.checked)}

/>


<span>

✓ a–z Lowercase

</span>


</label>







<label className="bg-input rounded-xl p-3 flex gap-3 items-center cursor-pointer">


<input

type="checkbox"

checked={numbers}

onChange={(e)=>setNumbers(e.target.checked)}

/>


<span>

✓ 0–9 Numbers

</span>


</label>







<label className="bg-input rounded-xl p-3 flex gap-3 items-center cursor-pointer">


<input

type="checkbox"

checked={symbols}

onChange={(e)=>setSymbols(e.target.checked)}

/>


<span>

✓ !@# Symbols

</span>


</label>



</div>







<label className="bg-input rounded-xl p-3 mt-3 flex gap-3 items-center cursor-pointer">


<input

type="checkbox"

checked={ambiguous}

onChange={(e)=>setAmbiguous(e.target.checked)}

/>


<span>

No ambiguous (O,0,l,I)

</span>


</label>








<button

onClick={generatePassword}

className="mt-5 w-full bg-blue-600 text-white py-3 rounded-xl"

>


Generate

</button>









{

password ?


<div className="mt-5 bg-input rounded-xl p-4 flex justify-between items-center">


<p className="break-all font-mono">

{password}

</p>



<button

onClick={copyPassword}

className="bg-card px-4 py-2 rounded-lg text-sm"

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



:


<div className="mt-5 text-center text-muted text-sm">

Click Generate to create password

</div>


}







</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

How to Use

</h2>



<div className="mt-4 space-y-3 text-sm text-muted">


<p>

<b>1</b> Set password length using the slider.

</p>


<p>

<b>2</b> Choose character types you want.

</p>


<p>

<b>3</b> Generate and copy your password.

</p>


</div>


</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

How It Works

</h2>



<p className="mt-3 text-sm text-muted leading-7">


This tool generates random passwords using your browser's
cryptographically secure random number generator
(crypto.getRandomValues()). It creates unpredictable
passwords instead of simple random sequences.



</p>



</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

What makes a password hard to guess: entropy

</h2>



<p className="mt-3 text-sm text-muted leading-7">


Password strength depends on entropy — the number of possible
combinations. Longer passwords create exponentially more
possible combinations, making them harder to brute-force.



</p>



</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

Why length matters more than complexity rules

</h2>



<p className="mt-3 text-sm text-muted leading-7">


Adding more characters increases the number of possible
password combinations dramatically. A longer random password
is usually stronger than a short password with many symbols.



</p>



</div>








</div>


</div>


)

}