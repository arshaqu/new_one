"use client";

import Link from "next/link";
import { useState } from "react";


export default function WaterIntakeCalculatorPage(){


const [unit,setUnit] =
useState("kg");


const [weight,setWeight] =
useState(70);



const [activity,setActivity] =
useState("sedentary");



const [climate,setClimate] =
useState("temperate");



const [result,setResult] =
useState(null);









const activityLevels = [

{
id:"sedentary",
name:"Sedentary",
description:"Desk job, little movement",
extra:0
},

{
id:"light",
name:"Light",
description:"Walk or light exercise",
extra:250
},

{
id:"moderate",
name:"Moderate",
description:"Exercise 3–5 days/week",
extra:500
},

{
id:"active",
name:"Active",
description:"Intense exercise daily",
extra:750
},

{
id:"very",
name:"Very active",
description:"Athlete / physical labour",
extra:1000
}

];









const climates = [

{
id:"cool",
name:"Cool / indoors",
extra:0
},

{
id:"temperate",
name:"Temperate",
extra:250
},

{
id:"hot",
name:"Hot / humid",
extra:500
}

];









function calculateWater(){



let weightKg =
Number(weight);





if(unit==="lbs"){


weightKg =
Number(weight) *
0.453592;


}









// Base calculation
// 35ml per kg

let waterMl =
weightKg *
35;





const activityData =
activityLevels.find(
item=>
item.id===activity
);



const climateData =
climates.find(
item=>
item.id===climate
);








waterMl +=
activityData.extra;



waterMl +=
climateData.extra;









const litres =
(waterMl/1000)
.toFixed(2);



const glasses =
Math.round(
waterMl/250
);








setResult({

ml:Math.round(waterMl),

litres,

glasses

});



}









function changeUnit(value){



setUnit(value);



if(value==="kg"){


setWeight(70);


}

else{


setWeight(154);


}



}

return (
    <div

className="min-h-screen px-6 py-12"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-5xl mx-auto">







<div className="text-sm text-muted">


<Link
href="/"
className="hover:text-blue-500"
>

Home

</Link>


{" / "}


<Link
href="/health"
className="hover:text-blue-500"
>

Health

</Link>


{" / "}


<span>

Water Intake Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Water Intake Calculator

</h1>






<p className="mt-3 text-muted">

Calculate your daily water intake based on
your weight, activity level, and climate.
Get results in litres and glasses.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<h2 className="font-bold">

Body weight

</h2>







<div className="flex gap-3 mt-3">


<input

type="number"

value={weight}

onChange={
e=>
setWeight(
Number(e.target.value)
)
}

className="bg-input border rounded-md px-3 py-2 w-full md:w-1/3"

/>





<button

onClick={()=>changeUnit("kg")}

className={`px-5 py-2 rounded-lg border ${
unit==="kg"
?
"bg-indigo-600 text-white"
:
""
}`}

>

kg

</button>







<button

onClick={()=>changeUnit("lbs")}

className={`px-5 py-2 rounded-lg border ${
unit==="lbs"
?
"bg-indigo-600 text-white"
:
""
}`}

>

lbs

</button>



</div>









<h2 className="font-bold mt-8">

Activity level

</h2>








<div className="grid md:grid-cols-2 gap-4 mt-4">


{

activityLevels.map(item=>(


<button

key={item.id}

onClick={()=>setActivity(item.id)}

className={`text-left p-4 rounded-xl border ${
activity===item.id
?
"bg-indigo-600 text-white"
:
""
}`}

>


<h3 className="font-bold">

{item.name}

</h3>


<p className="text-sm">

{item.description}

</p>


</button>


))


}



</div>









<h2 className="font-bold mt-8">

Climate / environment

</h2>







<div className="grid md:grid-cols-3 gap-4 mt-4">


{

climates.map(item=>(


<button

key={item.id}

onClick={()=>setClimate(item.id)}

className={`p-4 rounded-xl border ${
climate===item.id
?
"bg-indigo-600 text-white"
:
""
}`}

>

{item.name}

</button>


))


}



</div>









<button

onClick={calculateWater}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Calculate Water Intake

</button>









{

result &&


<div className="mt-10 border rounded-xl p-6">





<h2 className="text-2xl font-bold">

Daily water intake

</h2>





<div className="mt-5">


<p className="text-5xl font-bold">

{result.litres} L

</p>


<p className="mt-2 text-muted">

{result.ml} ml · {result.glasses} glasses

</p>



</div>









<div className="flex flex-wrap gap-2 mt-6 text-3xl">


{

Array.from(

{
length:result.glasses

}

).map((_,i)=>(


<span key={i}>

🥛

</span>


))


}



</div>







<p className="mt-4 text-sm text-muted">

1 glass = 250 ml

</p>








<p className="mt-6 text-sm text-muted">

Individual needs vary. Increase intake if
you sweat heavily, are pregnant, or
breastfeeding.

</p>



</div>


}








</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>





<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Enter your weight

</h3>


<p className="text-muted">

Enter your body weight in kg or lbs.

</p>


</div>







<div>

<h3 className="font-bold">

2. Set activity and climate

</h3>


<p className="text-muted">

Select your activity level and the climate
you live or work in.

</p>


</div>







<div>

<h3 className="font-bold">

3. See your daily target

</h3>


<p className="text-muted">

Your recommended daily water intake is shown
in litres, ml, and number of glasses.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This calculator estimates daily water intake
based on body weight, activity level, and
climate, giving results in litres and standard
glasses.

</p>







<h3 className="text-xl font-bold mt-8">

The base calculation

</h3>





<p className="mt-4 text-muted leading-7">

The baseline is roughly 35ml of water per kg
of body weight per day. Exercise adds extra
requirements because sweat increases fluid
loss, while hot or humid climates increase
water needs further.

</p>








<h3 className="text-xl font-bold mt-8">

What counts toward hydration

</h3>





<p className="mt-4 text-muted leading-7">

Plain water is the most direct contributor,
but herbal tea and water-rich foods such as
fruits, vegetables, and soups also contribute.
Caffeinated drinks contribute somewhat less,
although the effect is smaller than commonly
believed.

</p>








<h3 className="text-xl font-bold mt-8">

Examples

</h3>





<p className="mt-4 text-muted leading-7">

A 70kg sedentary adult in moderate climate:
70 × 35ml = 2450ml, approximately
2.45 litres per day.

</p>





<p className="mt-4 text-muted leading-7">

A person exercising regularly in a hot climate
will require more water because both factors
increase fluid loss.

</p>








<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>




<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Setting a personalized hydration target
</li>


<li>
Understanding extra hydration needs from exercise
</li>


<li>
Tracking water intake with fitness goals
</li>


</ul>








<h3 className="text-xl font-bold mt-8">

Tips

</h3>






<p className="mt-4 text-muted leading-7">

The "8 glasses a day" rule is only a general
guideline. Actual needs vary depending on
weight, activity, and climate.

</p>







<p className="mt-4 text-muted leading-7">

Use this calculation as a daily target, not a
strict requirement. Thirst remains a useful
hydration signal for most healthy adults.

</p>


</section>


</div>

</div>

);

}