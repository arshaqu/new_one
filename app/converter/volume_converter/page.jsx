"use client";

import { useState } from "react";
import Link from "next/link";

export default function VolumeConverterPage() {


const units = {

"Liter (L)": 1,

"Milliliter (ml)": 0.001,

"Cubic Meter (m³)": 1000,

"Cubic Centimeter (cm³)": 0.001,

"Cubic Inch (in³)": 0.0163871,

"Cubic Foot (ft³)": 28.3168,

"Teaspoon (US)": 0.00492892,

"Tablespoon (US)": 0.0147868,

"Cup (US)": 0.236588,

"Pint (US)": 0.473176,

"Quart (US)": 0.946353,

"Gallon (US)": 3.78541,

"Fluid Ounce (US)": 0.0295735

};



const [value,setValue]=useState("1");

const [from,setFrom]=useState("Liter (L)");

const [to,setTo]=useState("Gallon (US)");

const [result,setResult]=useState(null);

const [copied,setCopied]=useState(false);





function convert(){


const number = Number(value);


if(isNaN(number)){

setResult(null);
return;

}



const literValue =
number * units[from];


const converted =
literValue / units[to];


setResult(converted);


}








function allConversions(){


const number = Number(value);


if(isNaN(number)) return {};



const literValue =
number * units[from];



let result = {};



Object.keys(units).forEach(unit=>{


result[unit] =
literValue / units[unit];


});



return result;


}









function quickSelect(type){


const data={


"L → gal":[
"Liter (L)",
"Gallon (US)"
],


"gal → L":[
"Gallon (US)",
"Liter (L)"
],


"ml → fl oz":[
"Milliliter (ml)",
"Fluid Ounce (US)"
],


"cup → ml":[
"Cup (US)",
"Milliliter (ml)"
],


"L → ml":[
"Liter (L)",
"Milliliter (ml)"
]


};



setFrom(data[type][0]);

setTo(data[type][1]);


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









return (

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

Volume Converter

</span>


</div>







<h1 className="text-5xl font-bold mt-5 p-2">

Volume Converter

</h1>




<p className="mt-3 p-2 text-muted">

Convert between milliliters, liters, gallons,
cups, pints, fluid ounces, cubic meters and more.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">





<h2 className="font-semibold">

Common conversions

</h2>





<div className="flex flex-wrap gap-3 mt-4">


{

[
"L → gal",
"gal → L",
"ml → fl oz",
"cup → ml",
"L → ml"

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

onClick={convert}

className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md"

>

Convert

</button>









{

result !== null && (


<div className="mt-8 border rounded-xl p-6">



<div className="flex justify-between">



<div>


<p className="text-sm text-muted">

{value} {from.replace(/\s*\(.*?\)/,"")} =

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


)

}









{

result !== null && (


<div className="mt-8 border rounded-xl p-6">



<h2 className="text-xl font-bold">

{value} {from.replace(/\s*\(.*?\)/,"")} in all units

</h2>



<div className="mt-5 space-y-3">


{

Object.entries(allConversions()).map(([unit,val])=>(


<div

key={unit}

className="flex justify-between"

>


<span>

{unit}

</span>



<span>

{val.toLocaleString(undefined,{
maximumFractionDigits:8
})}

</span>


</div>


))


}



</div>


</div>


)

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

Type the volume amount you want to convert.

</span>

</p>



<p>

<b>2. Select input unit</b>

<br/>

<span className="text-muted">

Choose liters, gallons, cups, milliliters and more.

</span>

</p>



<p>

<b>3. See all results</b>

<br/>

<span className="text-muted">

Equivalent volumes update instantly.

</span>

</p>


</div>


</section>







<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

All volume conversions are calculated through
liters as the base unit for accurate results.

</p>


</section>





</div>

</div>

);

}