"use client";

import { useState } from "react";
import Link from "next/link";

export default function TemperatureConverterPage() {

  const units = [
    "Celsius (°C)",
    "Fahrenheit (°F)",
    "Kelvin (K)",
    "Rankine (°R)"
  ];


  const [value, setValue] = useState("100");
  const [from, setFrom] = useState("Celsius (°C)");
  const [to, setTo] = useState("Fahrenheit (°F)");

  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);



  function toCelsius(temp, unit) {

    switch(unit) {

      case "Celsius (°C)":
        return temp;

      case "Fahrenheit (°F)":
        return (temp - 32) * 5 / 9;

      case "Kelvin (K)":
        return temp - 273.15;

      case "Rankine (°R)":
        return (temp - 491.67) * 5 / 9;

      default:
        return temp;
    }

  }




  function fromCelsius(temp, unit) {

    switch(unit) {

      case "Celsius (°C)":
        return temp;

      case "Fahrenheit (°F)":
        return (temp * 9 / 5) + 32;

      case "Kelvin (K)":
        return temp + 273.15;

      case "Rankine (°R)":
        return (temp + 273.15) * 9 / 5;

      default:
        return temp;

    }

  }







  function calculate() {

    const number = Number(value);


    if(Number.isNaN(number)) {

      setResult(null);
      return;

    }


    const celsius = toCelsius(number, from);


    const converted = fromCelsius(celsius, to);


    setResult(converted);

  }








  function allConversions() {


    const number = Number(value);


    if(Number.isNaN(number)) return {};



    const celsius = toCelsius(number, from);



    return {

      "Celsius (°C)": fromCelsius(
        celsius,
        "Celsius (°C)"
      ),

      "Fahrenheit (°F)": fromCelsius(
        celsius,
        "Fahrenheit (°F)"
      ),

      "Kelvin (K)": fromCelsius(
        celsius,
        "Kelvin (K)"
      ),

      "Rankine (°R)": fromCelsius(
        celsius,
        "Rankine (°R)"
      )

    };


  }








  function quickSelect(type) {


    const data = {


      "°C → °F":
      [
        "Celsius (°C)",
        "Fahrenheit (°F)"
      ],


      "°F → °C":
      [
        "Fahrenheit (°F)",
        "Celsius (°C)"
      ],


      "°C → K":
      [
        "Celsius (°C)",
        "Kelvin (K)"
      ],


      "K → °C":
      [
        "Kelvin (K)",
        "Celsius (°C)"
      ]


    };


    setFrom(data[type][0]);

    setTo(data[type][1]);

  }








  function copyResult(){


    navigator.clipboard.writeText(

      `${value} ${from} = ${result.toFixed(4)} ${to}`

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
Temperature Converter
</span>


</div>






<h1 className="text-5xl font-bold mt-5 p-2">

Temperature Converter

</h1>





<p className="mt-3 p-2 text-muted">

Convert between Celsius, Fahrenheit,
Kelvin and Rankine. Instant temperature
conversion with formula.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">





<h2 className="font-semibold">

Common conversions

</h2>






<div className="flex flex-wrap gap-3 mt-4">


{
[
"°C → °F",
"°F → °C",
"°C → K",
"K → °C"

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
units.map(unit=>(

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
units.map(unit=>(

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
result !== null && (


<div className="mt-8 border rounded-xl p-6">


<div className="flex justify-between">



<div>


<p className="text-sm text-muted">

{value} {from.replace(/\s*\(.*?\)/,"")} =

</p>



<h2 className="text-4xl font-bold mt-2">

{result.toFixed(4)}

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

{val.toFixed(4)}

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

<b>1. Enter a temperature</b>

<br/>

<span className="text-muted">

Type the temperature value to convert.

</span>

</p>



<p>

<b>2. Select input scale</b>

<br/>

<span className="text-muted">

Choose Celsius, Fahrenheit, Kelvin or Rankine.

</span>

</p>



<p>

<b>3. See all results</b>

<br/>

<span className="text-muted">

Equivalent temperatures appear instantly.

</span>

</p>


</div>


</section>







<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

Temperature conversion uses standard formulas
between Celsius, Fahrenheit, Kelvin and Rankine.

</p>


</section>





</div>

</div>


);


}