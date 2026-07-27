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
adjustment:1.18
},

{
code:"AE",
flag:"🇦🇪",
name:"UAE",
currency:"AED",
symbol:"د.إ",
adjustment:1.03
},

{
code:"SA",
flag:"🇸🇦",
name:"Saudi Arabia",
currency:"SAR",
symbol:"﷼",
adjustment:1.05
},

{
code:"US",
flag:"🇺🇸",
name:"USA",
currency:"USD",
symbol:"$",
adjustment:1.02
},

{
code:"UK",
flag:"🇬🇧",
name:"UK",
currency:"GBP",
symbol:"£",
adjustment:1.03
}

];



const CACHE_TIME =
24 * 60 * 60 * 1000;



export default function GoldRatePage(){


const [country,setCountry] =
useState("IN");


const [gold,setGold] =
useState<number | null>(null);


const [updated,setUpdated] =
useState("");

const [weight,setWeight] =
useState("1");


const [copied,setCopied] =
useState(false);





const selectedCountry =
countries.find(
c=>c.code===country
);






function goldPrice(
purity:number
){

if(!gold)
return 0;


return gold * purity;

}







async function fetchGold(){


try{


const cacheKey =
`gold-price-${country}`;



const saved =
localStorage.getItem(cacheKey);



if(saved){


const data =
JSON.parse(saved);



if(
Date.now()-data.time <
CACHE_TIME
){


setGold(data.price);


setUpdated(
new Date(data.time)
.toLocaleString()
);


return;

}


}





// Gold spot price

const goldResponse =
await fetch(
"https://api.gold-api.com/price/XAU"
);



const goldData =
await goldResponse.json();



const ouncePrice =
Number(goldData.price);




// ounce to gram

const usdGram =

ouncePrice /
31.1034768;






// Currency conversion

const currencyResponse =
await fetch(

"https://open.er-api.com/v6/latest/USD"

);



const currencyData =
await currencyResponse.json();



const currencyRate =

currencyData.rates[
selectedCountry?.currency || "INR"
];






// Local country gold price

const finalPrice =

usdGram *

currencyRate *

(
selectedCountry?.adjustment || 1
);






localStorage.setItem(

cacheKey,

JSON.stringify({

price:finalPrice,

time:Date.now()

})

);





setGold(finalPrice);



setUpdated(
new Date()
.toLocaleString()
);



}

catch(error){


console.log(
error
);



setGold(10000);



setUpdated(
"API Error"
);


}


}






useEffect(()=>{


setGold(null);


fetchGold();



},[country]);









function calculator(
purity:number
){

return (

goldPrice(purity)
*
Number(weight)

);

}








function copyGold(){


const text = `

Gold Rate Today

${selectedCountry?.name}


24K:
${selectedCountry?.symbol}
${goldPrice(1).toFixed(0)}


22K:
${selectedCountry?.symbol}
${goldPrice(.916).toFixed(0)}


21K:
${selectedCountry?.symbol}
${goldPrice(.875).toFixed(0)}


18K:
${selectedCountry?.symbol}
${goldPrice(.75).toFixed(0)}

`;



navigator.clipboard.writeText(text);



setCopied(true);



setTimeout(()=>{

setCopied(false)

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


<Link href="/">

Home

</Link>


{" / "}


<span>
Live Rates
</span>


{" / "}


<span>
Gold Rate Today
</span>


</div>







<h1 className="text-5xl font-bold mt-6">

Gold Rate Today

</h1>



<p className="mt-3 text-muted">

Live gold price today for 24K,
22K, 21K and 18K per gram.
Select your country to see local rates.

</p>








<div className="mt-8 bg-card border rounded-xl p-6">



<label className="text-sm text-muted">

Select Country

</label>



<select

value={country}

onChange={
e=>setCountry(e.target.value)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

>


{

countries.map(c=>(

<option
key={c.code}
value={c.code}
>

{c.flag} {c.name} ({c.currency})

</option>

))

}


</select>








<div className="mt-8 border rounded-xl p-6">


<p className="text-sm text-muted">

LBMA international gold spot price

</p>



<p className="mt-2 text-sm">

Updated:
{" "}
{updated || "Loading..."}

</p>






<div className="grid md:grid-cols-2 gap-5 mt-6">



{

[
["24K",1],
["22K",0.916],
["21K",0.875],
["18K",0.75]

].map(item=>(


<div

key={item[0]}

className="border rounded-xl p-5"

>


<p className="text-muted">

{item[0]} Karat

</p>


<h2 className="text-3xl font-bold mt-3">

{selectedCountry?.symbol}


{

gold

?

goldPrice(
Number(item[1])
)
.toLocaleString(
"en-IN",
{
maximumFractionDigits:0
}
)

:

"Loading..."

}


</h2>


<p className="text-sm text-muted">

per gram

</p>


</div>


))


}


</div>


</div>


</div>







<div className="mt-8 bg-card border rounded-xl p-6">


<h2 className="text-2xl font-bold">

Gold Value Calculator

</h2>



<label className="block mt-5 text-sm text-muted">

Weight (grams)

</label>



<input

value={weight}

onChange={
e=>setWeight(e.target.value)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>






<div className="mt-5 space-y-4">


{

[
["24K",1],
["22K",0.916],
["21K",0.875],
["18K",0.75]

].map(item=>(


<div

key={item[0]}

className="flex justify-between border-b pb-3"

>


<span>

{item[0]}

</span>


<b>

{selectedCountry?.symbol}


{

calculator(
Number(item[1])
)
.toLocaleString(
"en-IN",
{
maximumFractionDigits:0
}
)

}

</b>


</div>


))


}


</div>





<button

onClick={copyGold}

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



<p className="mt-4 text-muted">

This page shows the live gold price for 24K, 22K, 21K, and 18K purity per gram, based on the LBMA (London Bullion Market Association) spot price — the global benchmark banks and bullion dealers use — with local retail conversion for your selected country.

</p>


</section>






<section className="mt-12">

<h2 className="text-2xl font-bold mt-3 mb-3">

Why karat purity changes the price
</h2>
<p>
24K gold is 99.9% pure. 22K (91.6% pure), 21K (87.5% pure), and 18K (75% pure) are alloyed with other metals like silver or copper for durability — jewelry is rarely made in 24K because pure gold is too soft for everyday wear. The price per gram scales roughly with purity: 22K gold costs about 22/24 (≈91.6%) of the 24K price per gram.
</p>





</section>

<section className="mt-12">

<h2 className="text-2xl font-bold mt-3 mb-3">

Why the number differs from what your local jeweller quotes
</h2>
<p>
The LBMA spot price is the pure wholesale market rate. Local jewellers add making charges (typically 2-10% of the gold value, sometimes more for intricate designs), plus applicable local taxes — so the retail price you pay in a store will always be somewhat higher than the base rate shown here.
</p>





</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">
Tips
</h2>



<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Always ask your jeweller to break down the making charges and taxes separately from the base gold rate — this makes it easy to compare prices fairly between different jewellers for the same design.
</li>


<li>
Gold sold as an investment (coins, bars) typically has much lower making charges than ornamental jewelry, since you're paying mostly for the metal value rather than craftsmanship.
</li>


</ul>


</section>



</div>

</div>


);

}