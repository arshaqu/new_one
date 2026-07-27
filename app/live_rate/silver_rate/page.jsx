"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const countries = [

{
code:"IN",
flag:"🇮🇳",
name:"India",
currency:"INR",
symbol:"₹",
adjustment:1.09
},

{
code:"AE",
flag:"🇦🇪",
name:"UAE",
currency:"AED",
symbol:"د.إ",
adjustment:1.02
},

{
code:"SA",
flag:"🇸🇦",
name:"Saudi Arabia",
currency:"SAR",
symbol:"﷼",
adjustment:1.03
},

{
code:"US",
flag:"🇺🇸",
name:"USA",
currency:"USD",
symbol:"$",
adjustment:1.01
}

];


const CACHE_TIME =
12 * 60 * 60 * 1000;



export default function SilverRatePage(){


const [country,setCountry] =
useState("IN");


const [silver,setSilver] =
useState(null);


const [updated,setUpdated] =
useState("");


const [weight,setWeight] =
useState("100");


const [copied,setCopied] =
useState(false);



const selectedCountry =
countries.find(
(item)=>item.code===country
);





async function fetchSilver(){


try{


const cacheKey =
`silver-rate-${country}`;


const saved =
localStorage.getItem(cacheKey);



if(saved){


const data =
JSON.parse(saved);



if(
Date.now() - data.time <
CACHE_TIME
){


setSilver(data.price);


setUpdated(
new Date(data.time)
.toLocaleString()
);


return;

}

}





const silverResponse =
await fetch(

"https://api.gold-api.com/price/XAG"

);



const silverData =
await silverResponse.json();



const ouncePrice =
Number(silverData.price);




// Convert ounce to gram

const usdPerGram =
ouncePrice / 31.1034768;






const currencyResponse =
await fetch(

"https://open.er-api.com/v6/latest/USD"

);



const currencyData =
await currencyResponse.json();



const exchangeRate =
currencyData.rates[
selectedCountry.currency
];







const finalPrice =

usdPerGram *
exchangeRate *
selectedCountry.adjustment;







localStorage.setItem(

cacheKey,

JSON.stringify({

price:finalPrice,

time:Date.now()

})

);





setSilver(finalPrice);



setUpdated(
new Date()
.toLocaleString()
);



}

catch(error){


console.log(
"Silver API Error:",
error
);


// fallback

setSilver(2);


setUpdated(
"Manual update"
);


}



}







useEffect(()=>{


setSilver(null);

fetchSilver();


},[country]);









function perKg(){

return (

silver *
1000

);

}



function perTola(){

return (

silver *
11.664

);

}




function totalValue(){

return (

silver *
Number(weight)

);

}







function copySilver(){


const text = `

Silver Rate Today

${selectedCountry.name}


Per Gram:
${selectedCountry.symbol}
${silver.toFixed(2)}


Per KG:
${selectedCountry.symbol}
${perKg().toFixed(2)}


Per Tola:
${selectedCountry.symbol}
${perTola().toFixed(2)}

`;



navigator.clipboard.writeText(text);



setCopied(true);



setTimeout(()=>{

setCopied(false);

},2000);


}








return (

<div

className="min-h-screen px-6 py-12"

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
Live Rates
</span>


{" / "}


<span>
Silver Rate Today
</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Silver Rate Today

</h1>





<p className="mt-3 text-muted">

Live silver price today per gram,
per kg, and per tola.
Select your country to see local silver rates.

</p>








<div className="mt-8 bg-card border rounded-xl p-6">





<label className="text-sm text-muted">

Select Country

</label>



<select

value={country}

onChange={
(e)=>setCountry(e.target.value)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

>


{

countries.map((item)=>(


<option

key={item.code}

value={item.code}

>

{item.flag} {item.name} ({item.currency})

</option>


))

}


</select>







<div className="mt-8 border rounded-xl p-6">


<p className="text-sm text-muted">

LBMA international silver spot price

</p>



<p className="mt-2 text-sm">

Updated:
{" "}
{updated || "Loading..."}

</p>





<h3 className="mt-6 text-xl font-bold">

{selectedCountry.flag}

{" "}

Showing approximate {selectedCountry.name} retail price

</h3>






<div className="grid md:grid-cols-3 gap-5 mt-6">





<div className="border rounded-xl p-5">

<p className="text-muted">

Per Gram

</p>


<h2 className="text-3xl font-bold mt-3">

{selectedCountry.symbol}

{silver ? silver.toFixed(2) : "Loading..."}

</h2>


</div>







<div className="border rounded-xl p-5">


<p className="text-muted">

Per KG

</p>


<h2 className="text-3xl font-bold mt-3">

{selectedCountry.symbol}

{silver ? perKg().toLocaleString() : "Loading..."}

</h2>


</div>







<div className="border rounded-xl p-5">


<p className="text-muted">

Per Tola

</p>


<h2 className="text-3xl font-bold mt-3">

{selectedCountry.symbol}

{silver ? perTola().toFixed(2) : "Loading..."}

</h2>


</div>





</div>




</div>



</div>








<div className="mt-8 bg-card border rounded-xl p-6">


<h2 className="text-2xl font-bold">

Silver Value Calculator

</h2>




<label className="block mt-5 text-sm text-muted">

Weight (grams)

</label>



<input

value={weight}

onChange={
(e)=>setWeight(e.target.value)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>






<div className="mt-6 flex justify-between border-b pb-3">


<span>

Total Value

</span>


<b>

{selectedCountry.symbol}

{silver ? totalValue().toLocaleString("en-IN",
{
maximumFractionDigits:2
}) : "Loading..."}

</b>


</div>






<button

onClick={copySilver}

className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-md"

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








<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

This page shows live silver price per gram,
per kilogram, and per tola based on LBMA
silver spot price converted into local currency.

</p>



<p className="mt-4 text-muted leading-7">

Actual market prices may vary depending on
location, dealer margin, taxes and daily market movement.

</p>



</section>






</div>

</div>


);

}