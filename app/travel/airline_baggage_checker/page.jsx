"use client";

import {useState} from "react";
import Link from "next/link";


export default function AirlineBaggageChecker(){


const airlines={


India:{


"IndiGo":{

verified:"2026-06",
carry:"7 kg",
size:[55,35,25],
checked:"15 kg",
bags:"1 free bag",
excess:"₹500/kg"

},


"Air India":{

verified:"2026-06",
carry:"7 kg",
size:[55,40,20],
checked:"15 kg",
bags:"1 free bag",
excess:"₹600/kg"

},


"SpiceJet":{

verified:"2026-06",
carry:"7 kg",
size:[55,35,25],
checked:"15 kg",
bags:"1 free bag",
excess:"₹500/kg"

},


"Vistara":{

verified:"2026-06",
carry:"7 kg",
size:[55,40,20],
checked:"15 kg",
bags:"1 free bag",
excess:"₹550/kg"

},


"AirAsia India":{

verified:"2026-06",
carry:"7 kg",
size:[56,36,23],
checked:"15 kg",
bags:"1 free bag",
excess:"₹600/kg"

}


},



"Middle East":{


"Emirates":{

verified:"2026-06",
carry:"7 kg",
size:[55,40,20],
checked:"25 kg",
bags:"1 free bag",
excess:"AED 75/kg"

},


"Qatar Airways":{

verified:"2026-06",
carry:"7 kg",
size:[50,37,25],
checked:"25 kg",
bags:"1 free bag",
excess:"QAR 80/kg"

}


},




Europe:{


"Ryanair":{

verified:"2026-06",
carry:"7 kg",
size:[55,40,20],
checked:"20 kg",
bags:"Paid",
excess:"€12/kg"

}


},




USA:{


"American Airlines":{

verified:"2026-06",
carry:"7 kg",
size:[56,36,23],
checked:"23 kg",
bags:"1 free bag",
excess:"$30/kg"

}


},



Asia:{


"Singapore Airlines":{

verified:"2026-06",
carry:"7 kg",
size:[55,40,20],
checked:"25 kg",
bags:"1 free bag",
excess:"SGD/kg"

}

}


};






const [region,setRegion]=useState("India");

const [airline,setAirline]=useState("IndiGo");

const [bagLength,setBagLength]=useState("");

const [bagWidth,setBagWidth]=useState("");

const [bagHeight,setBagHeight]=useState("");

const [fit,setFit]=useState(null);


const data=airlines[region][airline];








function changeRegion(e){

const r=e.target.value;

setRegion(r);

setAirline(Object.keys(airlines[r])[0]);

setFit(null);

}







function checkBag(){


const l=Number(bagLength);

const w=Number(bagWidth);

const h=Number(bagHeight);


if(!l||!w||!h){

setFit(null);

return;

}


const [a,b,c]=data.size;



if(
l<=a &&
w<=b &&
h<=c
){

setFit(true);

}else{

setFit(false);

}


}









function copy(){


navigator.clipboard.writeText(

`${airline}

Carry-on:
${data.carry}

Size:
${data.size.join("×")} cm

Checked:
${data.checked}`

);


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


<Link href="/" className="hover:text-blue-500 p-2">

Home

</Link>


{" / "}


<span className="p-2">

Travel

</span>


{" / "}


<span className="p-2 text-white">

Airline Baggage Checker

</span>


</div>









<h1 className="text-5xl font-bold mt-5 p-2">

Airline Baggage Checker

</h1>


<p className="mt-3 p-2 text-muted">

Check carry-on and checked baggage allowances
before you fly.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label>

Region

</label>


<select

value={region}

onChange={changeRegion}

className="mt-2 w-full bg-input border rounded px-3 py-2"

>


{
Object.keys(airlines).map(r=>(

<option key={r}>

{r}

</option>

))

}


</select>









<label className="block mt-5">

Airline

</label>


<select

value={airline}

onChange={(e)=>setAirline(e.target.value)}

className="mt-2 w-full bg-input border rounded px-3 py-2"

>


{
Object.keys(airlines[region]).map(a=>(

<option key={a}>

{a}

</option>

))

}


</select>










<label className="block mt-5">

Class

</label>


<select

className="mt-2 w-full bg-input border rounded px-3 py-2"

>

<option>

Economy

</option>

<option>

Business

</option>

<option>

First

</option>


</select>









<div className="mt-8 border rounded-xl p-6">



<div className="flex justify-between">


<div>


<h2 className="text-xl font-bold">

{airline} — Economy

</h2>


<p className="text-sm text-muted">

Verified {data.verified}

</p>






<div className="mt-5">


<p>

🎒 Carry-on

</p>


<h3 className="text-2xl font-bold">

{data.carry}

</h3>


<p>

{data.size.join("×")} cm

</p>


</div>







<div className="mt-5">


<p>

🧳 Checked bag

</p>


<h3 className="text-2xl font-bold">

{data.checked}

</h3>


<p>

{data.bags}

</p>

</div>





<p className="mt-4">

Excess / add-on:
{data.excess}

</p>




</div>







<button

onClick={copy}

className="bg-indigo-600 text-white px-4 py-2 rounded h-10"

>

📋 Copy

</button>


</div>


</div>









<h2 className="text-xl font-bold mt-8">

📏 Check if your bag fits

</h2>








<div className="grid md:grid-cols-3 gap-4 mt-4">


<input

placeholder="Length (cm)"

value={bagLength}

onChange={(e)=>setBagLength(e.target.value)}

className="bg-input border rounded px-3 py-2"

/>


<input

placeholder="Width (cm)"

value={bagWidth}

onChange={(e)=>setBagWidth(e.target.value)}

className="bg-input border rounded px-3 py-2"

/>


<input

placeholder="Height (cm)"

value={bagHeight}

onChange={(e)=>setBagHeight(e.target.value)}

className="bg-input border rounded px-3 py-2"

/>


</div>






<button

onClick={checkBag}

className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded"

>

Check

</button>









{
fit!==null &&

<div className={`mt-5 p-4 rounded border ${
fit
?
""
:
""
}`}>

{

fit

?

"✅ Your bag fits within the allowed cabin size."

:

"❌ Your bag exceeds the allowed cabin size."

}


</div>


}





</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>


<div className="mt-5 text-muted space-y-4">


<p>
1. Select region and airline.
</p>


<p>
2. Choose travel class.
</p>


<p>
3. Check baggage allowance and bag size.
</p>


</div>


</section>








<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted">

This tool compares your bag dimensions with airline
carry-on limits and helps you verify baggage rules
before travelling.

</p>


</section>





</div>

</div>


)

}