"use client";

import Link from "next/dist/client/link";
import { useState } from "react";

export default function CurrencyConverterPage() {


const currencies = [

{
code:"USD",
name:"US Dollar",
symbol:"$"
},

{
code:"INR",
name:"Indian Rupee",
symbol:"₹"
},

{
code:"AED",
name:"UAE Dirham",
symbol:"د.إ"
},

{
code:"PKR",
name:"Pakistani Rupee",
symbol:"₨"
},

{
code:"SAR",
name:"Saudi Riyal",
symbol:"﷼"
},

{
code:"QAR",
name:"Qatari Riyal",
symbol:"﷼"
},

{
code:"KWD",
name:"Kuwaiti Dinar",
symbol:"د.ك"
},

{
code:"GBP",
name:"British Pound",
symbol:"£"
},

{
code:"EUR",
name:"Euro",
symbol:"€"
},

{
code:"JPY",
name:"Japanese Yen",
symbol:"¥"
},

{
code:"CAD",
name:"Canadian Dollar",
symbol:"$"
},

{
code:"AUD",
name:"Australian Dollar",
symbol:"$"
},

{
code:"CNY",
name:"Chinese Yuan",
symbol:"¥"
},

{
code:"SGD",
name:"Singapore Dollar",
symbol:"$"
},

{
code:"MYR",
name:"Malaysian Ringgit",
symbol:"RM"
}

];





const [amount,setAmount] = useState("1");

const [from,setFrom] = useState("USD");

const [to,setTo] = useState("INR");


const [result,setResult] = useState(null);

const [rate,setRate] = useState(null);

const [date,setDate] = useState("");


const [loading,setLoading] = useState(false);


const [copied,setCopied] = useState(false);









function getCurrency(code){

return currencies.find(
(item)=>item.code===code
);

}









async function convertCurrency(){


const value = Number(amount);


if(!value) return;


setLoading(true);



try{


const response = await fetch(

`https://open.er-api.com/v6/latest/${from}`

);



const data = await response.json();



const exchangeRate =
data.rates[to];



if(!exchangeRate){

alert("Currency not available");

setLoading(false);

return;

}




setResult(
value * exchangeRate
);


setRate(exchangeRate);



setDate(

new Date(
data.time_last_update_utc
)
.toLocaleDateString()

);



}

catch(error){

console.log(error);

}



setLoading(false);


}









function swapCurrency(){

const old = from;

setFrom(to);

setTo(old);

}








function copyResult(){


const text =

`${amount} ${getCurrency(from)?.name} = ${result.toFixed(2)} ${getCurrency(to)?.name}`;



navigator.clipboard.writeText(text);



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
            <span className="text-white p-2">Currency Converter</span>
            </div>






<h1 className="text-5xl p-2 font-bold mt-5">

Currency Converter

</h1>




<p className="mt-3 text-muted">

Convert between currencies using updated exchange rates.
Fast, free, and no signup required.

</p>









<div className="mt-8 bg-card border border-card rounded-xl p-6">








<label className="text-sm text-muted">

Amount

</label>



<input

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="mt-2 w-full rounded-md bg-input border px-3 py-2"

/>









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
currencies.map(currency=>(


<option

key={currency.code}

value={currency.code}

>

{currency.name} ({currency.code})

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
currencies.map(currency=>(


<option

key={currency.code}

value={currency.code}

>

{currency.name} ({currency.code})

</option>


))

}


</select>


</div>







</div>








<div className="flex gap-3 mt-6">


<button

onClick={convertCurrency}

className="px-6 py-2 rounded-md bg-indigo-600 text-white"

>

{

loading

?

"Loading..."

:

"Convert"

}


</button>






<button

onClick={swapCurrency}

className="px-5 py-2 border rounded-md"

>

⇄ Swap

</button>



</div>









{
result !== null &&


<div className="mt-8 border rounded-xl p-6">





<div className="flex justify-between items-start">





<div>


<p className="text-sm text-muted">

{amount} {getCurrency(from)?.name}

</p>





<h2 className="text-4xl font-bold mt-2">

{getCurrency(to)?.symbol}

{result.toLocaleString(
"en-IN",
{
maximumFractionDigits:4
}
)}

</h2>





<p className="text-muted mt-2">

{getCurrency(to)?.name}

</p>


</div>








<button

onClick={copyResult}

className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"

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







<p className="mt-5 text-muted">

1 {getCurrency(from)?.name}

=

{getCurrency(to)?.symbol}

{rate}

{getCurrency(to)?.name}

</p>






<p className="text-sm text-muted mt-2">

Rates last updated: {date}

</p>






</div>


}





</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

Quick Select

</h2>



<div className="flex flex-wrap gap-3 mt-5">



{
currencies.slice(0,8).map(currency=>(


<button

key={currency.code}

onClick={()=>setFrom(currency.code)}

className="border px-4 py-2 rounded-md hover:bg-black/5"

>

{currency.symbol} {currency.name}

</button>


))

}


</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>



<p className="mt-4 text-muted leading-7">

This converter uses current exchange rates from
a currency exchange service and calculates the
converted amount instantly.

</p>




<p className="mt-4 text-muted leading-7">

Exchange rates may vary slightly from banks and
money exchange providers because they include
their own fees and margins.

</p>



</section>






</div>

</div>

);

}