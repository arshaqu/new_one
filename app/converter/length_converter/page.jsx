"use client";

import Link from "next/dist/client/link";
import { useState } from "react";

export default function LengthConverterPage() {


const units = {

"Millimeter (mm)":0.001,

"Centimeter (cm)":0.01,

"Meter (m)":1,

"Kilometer (km)":1000,

"Inch (in)":0.0254,

"Foot (ft)":0.3048,

"Yard (yd)":0.9144,

"Mile (mi)":1609.34,

"Nautical Mile (nmi)":1852,

"Micrometer (µm)":0.000001,

"Nanometer (nm)":0.000000001

};





const [value,setValue] = useState("1");

const [from,setFrom] = useState("Centimeter (cm)");

const [to,setTo] = useState("Inch (in)");

const [result,setResult] = useState(null);

const [copied,setCopied] = useState(false);









function convert(valueInMeter){

return valueInMeter / units[to];

}








function calculate(){


const number = Number(value);


if(!number){

setResult(null);

return;

}



const meterValue =
number * units[from];


setResult(
convert(meterValue)
);


}









function allConversions(){


const number = Number(value);


if(!number) return {};



const meterValue =
number * units[from];



const data={};



Object.keys(units).forEach(unit=>{


data[unit] =
meterValue / units[unit];


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








function quickChange(type){


const list={

"cm → in":
["Centimeter (cm)","Inch (in)"],

"m → ft":
["Meter (m)","Foot (ft)"],

"km → mi":
["Kilometer (km)","Mile (mi)"],

"in → cm":
["Inch (in)","Centimeter (cm)"],

"ft → m":
["Foot (ft)","Meter (m)"]

};


setFrom(list[type][0]);

setTo(list[type][1]);


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

<div className="text-sm gap-6 text-muted">
            <Link
                href="/"
                className="hover:text-blue-500 p-2 transition-colors"
            >
                Home
            </Link>
            {" / "}
            <span className="p-2">Calculator</span>
            {" / "}
            <span className="text-white p-2">Length Converter</span>
            </div>






<h1 className="text-5xl p-2 font-bold mt-5">

Length Converter

</h1>



<p className="mt-3 text-muted">

Convert between mm, cm, meters, km, inches,
feet, yards, miles and more. Instant results
with all-units table.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">





<h2 className="font-semibold">

Common conversions

</h2>





<div className="flex flex-wrap gap-3 mt-4">


{

Object.keys({

"cm → in":1,

"m → ft":1,

"km → mi":1,

"in → cm":1,

"ft → m":1

}).map(item=>(


<button

key={item}

onClick={()=>quickChange(item)}

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

onChange={(e)=>{

setValue(e.target.value);

}}

onBlur={calculate}

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

onChange={(e)=>{

setFrom(e.target.value);

}}

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

onChange={(e)=>{

setTo(e.target.value);

}}

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

className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md"

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


<span className="font-medium">

{val.toFixed(8)}

</span>


</div>


))

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

Type the number you want to convert.

</span>

</p>




<p>

<b>2. Select input unit</b>

<br/>

<span className="text-muted">

Choose the unit you are converting from.

</span>

</p>




<p>

<b>3. See results</b>

<br/>

<span className="text-muted">

All equivalent values update instantly.

</span>

</p>



</div>


</section>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

All conversions are calculated through meters
as the base unit. This keeps every conversion
accurate and consistent.

</p>


</section>








<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

Examples

</h2>


<div className="mt-4 text-muted space-y-3">


<p>

5 feet 9 inches = 175.26 cm

</p>


<p>

26.2 miles = 42.195 km

</p>


</div>


</section>







</div>

</div>


);

}