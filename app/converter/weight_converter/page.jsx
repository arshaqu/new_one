"use client";

import { useState } from "react";
import Link from "next/link";

export default function WeightConverterPage() {


const units = {

"Milligram":0.000001,

"Gram":0.001,

"Kilogram":1,

"Metric Ton":1000,

"Ounce":0.0283495,

"Pound":0.45359237,

"Stone":6.35029318,

"Troy Ounce":0.0311035,

"Grain":0.0000647989,

"Tola":0.0116638

};




const [value,setValue]=useState("1");

const [from,setFrom]=useState("Kilogram");

const [to,setTo]=useState("Pound");

const [result,setResult]=useState(null);

const [copied,setCopied]=useState(false);





function calculate(){


const number = Number(value);


if(!number){

setResult(null);

return;

}



const gramValue =
number * units[from] * 1000;



const converted =
gramValue / (units[to] * 1000);



setResult(converted);


}








function allConversions(){


const number = Number(value);


if(!number) return {};



const gramValue =
number * units[from] * 1000;


const data={};



Object.keys(units).forEach(unit=>{


data[unit] =
gramValue / (units[unit]*1000);


});


return data;


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


"kg → lb":

[
"Kilogram",
"Pound"
],


"lb → kg":

[
"Pound",
"Kilogram"
],


"g → oz":

[
"Gram",
"Ounce"
],


"oz → g":

[
"Ounce",
"Gram"
],


"kg → g":

[
"Kilogram",
"Gram"
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

className="hover:text-blue-500 p-2"

>

Home

</Link>


{" / "}


<span className="p-2">

Converter

</span>


{" / "}


<span className="p-2 text-white">

Weight Converter

</span>


</div>








<h1 className="text-5xl p-2 font-bold mt-5">

Weight Converter

</h1>




<p className="mt-3 p-2 text-muted">

Convert between kg, grams, pounds, ounces,
tons, stone, tola and more. Instant weight conversion.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">






<h2 className="font-semibold">

Common conversions

</h2>





<div className="flex flex-wrap gap-3 mt-4">


{

[

"kg → lb",

"lb → kg",

"g → oz",

"oz → g",

"kg → g"

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





<div className="flex justify-between items-start">






<div>


<p className="text-sm text-muted">

{value} {from} =

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

className="px-4 py-2 rounded-lg bg-indigo-600 text-white"

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

Type the weight or mass you want to convert.

</span>

</p>




<p>

<b>2. Select input unit</b>

<br/>

<span className="text-muted">

Choose from kg, lbs, grams, ounces and more.

</span>

</p>





<p>

<b>3. See all results</b>

<br/>

<span className="text-muted">

Equivalent weights update instantly.

</span>

</p>



</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

All weight conversions are calculated through
grams as the base unit. This keeps metric,
imperial and regional units consistent.

</p>



</section>






</div>

</div>


);


}