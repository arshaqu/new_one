"use client";

import { useState } from "react";
import Link from "next/link";


export default function FuelCostCalculatorPage(){


const fuelData={

INR:{
name:"Indian Rupee",
symbol:"₹",
price:100
},

AED:{
name:"UAE Dirham",
symbol:"د.إ",
price:2.57
},

USD:{
name:"US Dollar",
symbol:"$",
price:3.20
},

SAR:{
name:"Saudi Riyal",
symbol:"﷼",
price:2.33
},

KWD:{
name:"Kuwaiti Dinar",
symbol:"د.ك",
price:0.105
}

};



const [unit,setUnit]=useState("KM");

const [currency,setCurrency]=useState("INR");


const [distance,setDistance]=useState("100");

const [mileage,setMileage]=useState("15");

const [passengers,setPassengers]=useState("1");


const [result,setResult]=useState(null);


const [copied,setCopied]=useState(false);





function calculate(){


let dist=Number(distance);

let efficiency=Number(mileage);


if(isNaN(dist)||isNaN(efficiency)){

setResult(null);

return;

}




if(unit==="MILES"){


dist=dist*1.60934;


efficiency=efficiency*0.425144;


}




const fuelRequired =
dist / efficiency;



const fuelPrice =
fuelData[currency].price;



const totalCost =
fuelRequired * fuelPrice;



const people =
Math.max(1,Number(passengers));




setResult({

fuel:fuelRequired,

total:totalCost,

person:totalCost/people,

costKm:totalCost/dist

});


}









function copyResult(){


navigator.clipboard.writeText(

`
Fuel Required: ${result.fuel.toFixed(2)} L

Total Cost:
${fuelData[currency].symbol}${result.total.toFixed(2)}

Cost Per Person:
${fuelData[currency].symbol}${result.person.toFixed(2)}
`

);


setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


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

Travel

</span>


{" / "}


<span className="p-2 text-white">

Fuel Cost Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-5 p-2">

Fuel Cost Calculator

</h1>



<p className="mt-3 p-2 text-muted">

Calculate trip fuel cost by distance,
mileage and fuel price. Split cost by passengers.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<label className="text-sm text-muted">

Unit System

</label>



<div className="flex gap-3 mt-3">


<button

onClick={()=>setUnit("KM")}

className={`border px-4 py-2 rounded ${
unit==="KM"?"bg-indigo-600 text-white":""
}`}

>

KM / Litre

</button>




<button

onClick={()=>setUnit("MILES")}

className={`border px-4 py-2 rounded ${
unit==="MILES"?"bg-indigo-600 text-white":""
}`}

>

Miles / Gallon

</button>



</div>









<div className="mt-6">


<label>

Currency

</label>


<select

value={currency}

onChange={(e)=>setCurrency(e.target.value)}

className="mt-2 w-full bg-input border rounded px-3 py-2"

>


<option value="INR">
🇮🇳 INR — Indian Rupee
</option>


<option value="AED">
🇦🇪 AED — UAE Dirham
</option>


<option value="USD">
🇺🇸 USD — US Dollar
</option>


<option value="SAR">
🇸🇦 SAR — Saudi Riyal
</option>


<option value="KWD">
🇰🇼 KWD — Kuwaiti Dinar
</option>


</select>


</div>









<div className="grid md:grid-cols-2 gap-5 mt-5">





<div>

<label>

Trip Distance ({unit==="KM"?"km":"miles"})

</label>


<input

value={distance}

onChange={(e)=>setDistance(e.target.value)}

className="mt-2 w-full bg-input border rounded px-3 py-2"

/>


</div>






<div>


<label>

Vehicle Mileage

</label>


<input

value={mileage}

onChange={(e)=>setMileage(e.target.value)}

className="mt-2 w-full bg-input border rounded px-3 py-2"

/>


</div>




</div>









<div className="mt-5">


<label>

Fuel Price ({fuelData[currency].symbol}/litre)

</label>


<input

value={fuelData[currency].price}

readOnly

className="mt-2 w-full bg-input border rounded px-3 py-2"

/>


</div>









<div className="mt-5">


<label>

Number of Passengers

</label>


<input

value={passengers}

onChange={(e)=>setPassengers(e.target.value)}

className="mt-2 w-full bg-input border rounded px-3 py-2"

/>


</div>








<button

onClick={calculate}

className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"

>

Calculate

</button>









{
result && (


<div className="mt-8 border rounded-xl p-6">


<div className="flex justify-between">


<div>


<p className="text-muted">

Fuel Required

</p>


<h2 className="text-3xl font-bold">

{result.fuel.toFixed(2)} L

</h2>





<p className="text-muted mt-5">

Total Fuel Cost

</p>


<h2 className="text-2xl font-bold">

{fuelData[currency].symbol}

{result.total.toFixed(2)}

</h2>







<p className="text-muted mt-5">

Cost per Person

</p>


<h2>

{fuelData[currency].symbol}

{result.person.toFixed(2)}

</h2>


</div>








<button

onClick={copyResult}

className="bg-indigo-600 text-white px-4 py-2 rounded h-10"

>

{copied?"✓ Copied":"📋 Copy"}

</button>




</div>






<p className="mt-5 text-muted">

Cost per km:
{fuelData[currency].symbol}
{result.costKm.toFixed(2)}

</p>



</div>


)


}





</div>








<section className="mt-12">


  {/* How to use */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            How to Use
          </h2>

          <div className="space-y-6">

            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Enter the distance
                </h3>
                <p className="text-gray-400">
                  Type the total distance of your trip in km or miles.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Enter mileage and fuel price
                </h3>
                <p className="text-gray-400">
                 Enter your vehicle's fuel efficiency and current fuel price.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  View fuel cost
                </h3>
                <p className="text-gray-400">
                 See estimated fuel required and total trip cost.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* how it works */}
  <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            How it Works
          </h2>

          <div className="space-y-6">

            <div className="flex gap-5">
                <p className="text-gray-400">
                  This calculator estimates trip fuel cost from distance, your vehicle's mileage, and the current fuel price — and can split the total cost evenly across passengers for shared trips.
                </p>
            </div>

           
              
              <div>
                <h3 className="font-semibold text-lg">
                 The core formula
                </h3>
                <p className="text-gray-400">
                Fuel Cost = (Distance ÷ Mileage) × Fuel Price per litre (or per gallon). Distance ÷ Mileage gives the litres or gallons needed for the trip; multiplying by the current fuel price gives the total cost.
                </p>
              </div>

                <div>
                <h3 className="font-semibold text-lg">
                 Splitting cost by passengers
                </h3>
                <p className="text-gray-400">
                Once the total fuel cost is calculated, dividing by the number of passengers (including the driver, if you choose) gives a fair per-person share for a shared road trip or carpool.
                </p>
              </div>

           

          </div>
        </div>


</section>






</div>

</div>


)


}