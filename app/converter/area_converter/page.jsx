"use client";

import { useState } from "react";
import Link from "next/link";


export default function AreaConverterPage(){


const units = {

"Square Millimeter":0.000001,

"Square Centimeter":0.0001,

"Square Meter":1,

"Square Kilometer":1000000,

"Square Inch":0.00064516,

"Square Foot":0.09290304,

"Square Yard":0.83612736,

"Acre":4046.8564224,

"Hectare":10000,

"Cent":40.468564224,

"Gunta":108.8909038,

"Square Mile":2589988.1103

};





const [value,setValue]=useState("1");

const [from,setFrom]=useState("Square Foot");

const [to,setTo]=useState("Square Meter");

const [result,setResult]=useState(null);

const [copied,setCopied]=useState(false);







function calculate(){


const num = Number(value);


if(!num){

setResult(null);

return;

}



const squareMeter = 
num * units[from];


const converted =
squareMeter / units[to];


setResult(converted);


}








function allConversions(){


const num = Number(value);


if(!num) return {};



const squareMeter =
num * units[from];


let results={};



Object.keys(units).forEach(unit=>{


results[unit] =
squareMeter / units[unit];


});


return results;


}









function copyResult(){


navigator.clipboard.writeText(

`${value} ${from} = ${result.toFixed(8)} ${to}`

);


setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


}







function quickSelect(type){


const data={


"sq ft → sq m":
[
"Square Foot",
"Square Meter"
],


"sq m → sq ft":
[
"Square Meter",
"Square Foot"
],


"cent → sq ft":
[
"Cent",
"Square Foot"
],


"acre → sq m":
[
"Acre",
"Square Meter"
],


"hectare → acre":
[
"Hectare",
"Acre"
]


};


setFrom(data[type][0]);

setTo(data[type][1]);


}







return(


<div

className="min-h-screen py-12 px-6"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-4xl mx-auto">






<div className="text-sm text-muted">


<Link

href="/"

className="hover:text-blue-500 p-2 transition-colors"

>

Home

</Link>


{" / "}


<span className="p-2">

Converter

</span>


{" / "}


<span className="p-2 text-white">

Area Converter

</span>


</div>








<h1 className="text-5xl p-2 font-bold mt-5">

Area Converter

</h1>



<p className="mt-3 p-2 text-muted">

Convert between square feet, square meters,
acres, hectares, cent, gunta and more.
Popular for land measurement.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">






<h2 className="font-semibold">

Common conversions

</h2>





<div className="flex flex-wrap gap-3 mt-4">


{

[

"sq ft → sq m",

"sq m → sq ft",

"cent → sq ft",

"acre → sq m",

"hectare → acre"

].map(item=>(


<button

key={item}

onClick={()=>quickSelect(item)}

className="border px-4 py-2 rounded-md hover:bg-black/5"

>

{item}

</button>


))

}



</div>









<div className="mt-6">


<label className="text-sm text-muted">

Value

</label>


<input

value={value}

onChange={(e)=>setValue(e.target.value)}

className="mt-2 w-full rounded-md bg-input border px-3 py-2"

/>


</div>








<div className="grid md:grid-cols-2 gap-5 mt-5">





<div>

<label className="text-sm text-muted">

From

</label>



<select

value={from}

onChange={(e)=>setFrom(e.target.value)}

className="mt-2 w-full rounded-md bg-input border px-3 py-2"

>


{

Object.keys(units).map(unit=>(


<option key={unit}>

{unit}

</option>


))

}


</select>



</div>







<div>


<label className="text-sm text-muted">

To

</label>



<select

value={to}

onChange={(e)=>setTo(e.target.value)}

className="mt-2 w-full rounded-md bg-input border px-3 py-2"

>


{

Object.keys(units).map(unit=>(


<option key={unit}>

{unit}

</option>


))

}


</select>



</div>


</div>


<button

onClick={calculate}

className="mt-6 px-6 py-2 rounded-md bg-indigo-600 text-white"

>

Convert

</button>


{
result !== null &&



<div className="mt-8 border rounded-xl p-6">





<div className="flex justify-between">


<div>


<p className="text-sm text-muted">

{value} {from}

</p>



<h2 className="text-4xl font-bold mt-2">

{result.toFixed(8)}

</h2>



<p className="text-muted mt-2">

{to}

</p>



</div>


<button

onClick={copyResult}

className="px-4 py-2 bg-indigo-600 text-white rounded-lg"

>

{

copied

?

"✓ Copied"

:

"📋 Copy"

}


</button>



</div>



</div>


}

{
result !== null &&


<div className="mt-8 border rounded-xl p-6">


<h2 className="text-xl font-bold">

{value} {from} in all units

</h2>




<div className="mt-5 space-y-3">


{

Object.entries(allConversions()).map(

([unit,val])=>(


<div

key={unit}

className="flex justify-between"

>


<span>

{unit}

</span>


<span>

{val.toFixed(8)}

</span>


</div>


)

)


}



</div>


</div>


}


</div>

<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>


<div className="mt-5 space-y-5">


<p>

<b>1. Enter a value</b>

<br/>

<span className="text-muted">

Type the area amount you want to convert.

</span>

</p>



<p>

<b>2. Select input unit</b>

<br/>

<span className="text-muted">

Choose square meters, acres, square feet,
cents, and more.

</span>

</p>



<p>

<b>3. See all results</b>

<br/>

<span className="text-muted">

All equivalent areas update instantly.

</span>

</p>



</div>


</section>


<section className="mt-12">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

All area conversions are calculated through
square meters as the base unit. This keeps
square feet, acres, hectares, cent and gunta
values accurate.

</p>


</section>


<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

Examples

</h2>


<p className="mt-4 text-muted">

5 cents = approximately 2178 square feet.

</p>


<p className="mt-3 text-muted">

10 acres = approximately 4.047 hectares.

</p>


</section>

</div>

</div>


)

}