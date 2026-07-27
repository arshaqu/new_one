"use client";

import Link from "next/link";
import { useState } from "react";


export default function UUIDGeneratorPage(){


const [quantity,setQuantity] = useState(1);

const [uuids,setUuids] = useState([]);

const [message,setMessage] = useState("");





function generateUUIDs(){


const generated=[];


for(let i=0;i<quantity;i++){

generated.push(
crypto.randomUUID()
);

}


setUuids(generated);

setMessage("");

}







async function copyUUID(uuid){


try{

await navigator.clipboard.writeText(uuid);

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







async function copyAll(){


if(!uuids.length)
return;


try{


await navigator.clipboard.writeText(
uuids.join("\n")
);


setMessage(
"All UUIDs copied."
);


}
catch{


setMessage(
"Unable to copy."
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

UUID Generator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

UUID Generator

</h1>





<p className="mt-3 text-muted">

Generate cryptographically secure UUID v4 identifiers.
Generate up to 20 at once. Copy individually or all at once.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label className="font-semibold">

Generate:

</label>






<div className="flex flex-wrap gap-3 mt-4">


{
[1,5,10,20].map((num)=>(


<button

key={num}

onClick={()=>setQuantity(num)}

className={`px-5 py-2 rounded-lg ${
quantity===num
?
"bg-blue-600 text-white"
:
"border"
}`}

>

{num}

</button>


))

}


</div>







<button

onClick={generateUUIDs}

className="
mt-6
px-6
py-3
rounded-lg
bg-blue-600
text-white
font-semibold
"

>

Generate

</button>









{
uuids.length > 0 &&


<div className="mt-8 space-y-4">


<div className="flex justify-between items-center">


<h2 className="font-bold text-xl">

Generated UUIDs

</h2>



<button

onClick={copyAll}

className="
px-5
py-2
rounded-lg
border
"

>

Copy All

</button>



</div>







{
uuids.map((uuid,index)=>(


<div

key={index}

className="
flex
items-center
justify-between
gap-4
border
rounded-xl
p-4
"

>


<span className="
font-mono
break-all
text-sm
">

{index+1}

&nbsp;

{uuid}

</span>





<button

onClick={()=>copyUUID(uuid)}

className="
px-4
py-2
rounded-lg
bg-blue-600
text-white
"

>

Copy

</button>





</div>


))

}



</div>


}






{

message &&

<p className="mt-5 text-green-500">

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


<div className="
w-8
h-8
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
">

1

</div>



<div>


<h3 className="font-bold">

Set quantity

</h3>



<p className="text-muted">

Choose how many UUIDs to generate —
1, 5, 10, or 20 at once.

</p>


</div>


</div>










<div className="flex gap-4">


<div className="
w-8
h-8
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
">

2

</div>



<div>


<h3 className="font-bold">

Click Generate

</h3>



<p className="text-muted">

Click the Generate button to create
cryptographically secure UUID v4 values.

</p>


</div>


</div>










<div className="flex gap-4">


<div className="
w-8
h-8
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
">

3

</div>



<div>


<h3 className="font-bold">

Copy one or all

</h3>



<p className="text-muted">

Click Copy next to a single UUID,
or Copy All to get all generated UUIDs.

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

This tool generates cryptographically random
UUID v4 identifiers using the browser's built-in
crypto.randomUUID() function — up to 20 at once,
ready to copy individually or all together.

</p>


<h3 className="text-xl font-bold mt-8">

What a UUID is for

</h3>

<p className="mt-4 text-muted leading-7">

A UUID (Universally Unique Identifier) is a
128-bit value designed to be unique across
systems without needing a central coordinating
authority.

Two different services generating UUIDs
independently will, in practice, essentially never
produce the same value by chance.

UUIDs are commonly used as database record IDs,
API identifiers, and session identifiers in
distributed systems.

</p>

<h3 className="text-xl font-bold mt-8">

Why v4 specifically

</h3>

<p className="mt-4 text-muted leading-7">

UUID v4 is generated using random or
pseudo-random numbers with no embedded
timestamp or hardware information.

Unlike other UUID versions that may include
time or machine details, UUID v4 provides a
unique and non-guessable identifier without
exposing metadata.

</p>

</section>

</div>

</div>

);


}