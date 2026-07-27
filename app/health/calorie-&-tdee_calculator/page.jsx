"use client";

import Link from "next/link";
import { useState } from "react";


export default function CalorieTDEECalculatorPage(){


const [unit,setUnit] = useState("metric");


const [gender,setGender] = useState("male");


const [age,setAge] = useState(25);


const [weight,setWeight] = useState(70);


const [height,setHeight] = useState(170);


const [activity,setActivity] = useState(1.375);



const [result,setResult] = useState(null);









const activityLevels = [

{
name:"Sedentary",
description:"Little or no exercise",
value:1.2
},

{
name:"Lightly active",
description:"Light exercise 1–3 days/week",
value:1.375
},

{
name:"Moderately active",
description:"Moderate exercise 3–5 days/week",
value:1.55
},

{
name:"Very active",
description:"Hard exercise 6–7 days/week",
value:1.725
},

{
name:"Extra active",
description:"Very hard exercise + physical job",
value:1.9
}

];









function calculateTDEE(){



let weightKg =
Number(weight);



let heightCm =
Number(height);







if(unit==="imperial"){



weightKg =
Number(weight) *
0.453592;



heightCm =
Number(height) *
2.54;



}









let bmr;



if(gender==="male"){



bmr =

(10 * weightKg)

+

(6.25 * heightCm)

-

(5 * age)

+

5;



}

else{



bmr =

(10 * weightKg)

+

(6.25 * heightCm)

-

(5 * age)

-

161;



}









bmr =
Math.round(bmr);



const tdee =

Math.round(

bmr * activity

);









setResult({


bmr,


tdee,


goals:[


{

name:"Extreme loss",

calories:tdee-1000,

text:"−1 kg/week"

},



{

name:"Weight loss",

calories:tdee-500,

text:"−0.5 kg/week"

},



{

name:"Mild loss",

calories:tdee-250,

text:"−0.25 kg/week"

},



{

name:"Maintain",

calories:tdee,

text:"Current weight"

},



{

name:"Mild gain",

calories:tdee+250,

text:"+0.25 kg/week"

},



{

name:"Weight gain",

calories:tdee+500,

text:"+0.5 kg/week"

}



]


});



}









function switchUnit(value){



setUnit(value);



if(value==="metric"){



setWeight(70);

setHeight(170);



}

else{


setWeight(154);

setHeight(67);



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

Calorie & TDEE Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Calorie & TDEE Calculator

</h1>






<p className="mt-3 text-muted">

Calculate your daily calorie needs (TDEE)
using the Mifflin-St Jeor formula. Get
personalized targets for weight loss,
maintenance, and muscle gain.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<div className="flex gap-3">


<button

onClick={()=>switchUnit("metric")}

className={`px-5 py-2 rounded-lg border ${
unit==="metric"
?
"bg-indigo-600 text-white"
:
""
}`}

>

metric (kg/cm)

</button>







<button

onClick={()=>switchUnit("imperial")}

className={`px-5 py-2 rounded-lg border ${
unit==="imperial"
?
"bg-indigo-600 text-white"
:
""
}`}

>

imperial (lbs/in)

</button>



</div>









<div className="mt-8">


<label className="text-sm text-muted">

Gender

</label>



<div className="flex gap-4 mt-3">



<button

onClick={()=>setGender("male")}

className={`px-6 py-3 border rounded-lg ${
gender==="male"
?
"bg-indigo-600 text-white"
:
""
}`}

>

♂ Male

</button>







<button

onClick={()=>setGender("female")}

className={`px-6 py-3 border rounded-lg ${
gender==="female"
?
"bg-indigo-600 text-white"
:
""
}`}

>

♀ Female

</button>



</div>


</div>









<div className="grid md:grid-cols-3 gap-5 mt-8">



<div>


<label className="text-sm text-muted">

Age

</label>


<input

type="number"

value={age}

onChange={
e=>setAge(
Number(e.target.value)
)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>


</div>








<div>


<label className="text-sm text-muted">

Weight ({unit==="metric"?"kg":"lbs"})

</label>


<input

type="number"

value={weight}

onChange={
e=>setWeight(
Number(e.target.value)
)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>


</div>








<div>


<label className="text-sm text-muted">

Height ({unit==="metric"?"cm":"in"})

</label>


<input

type="number"

value={height}

onChange={
e=>setHeight(
Number(e.target.value)
)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>


</div>




</div>









<div className="mt-8">


<label className="text-sm text-muted">

Activity level

</label>




<div className="grid md:grid-cols-2 gap-4 mt-4">



{

activityLevels.map(item=>(


<button

key={item.value}

onClick={()=>setActivity(item.value)}

className={`text-left p-4 border rounded-xl ${
activity===item.value
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


</div>









<button

onClick={calculateTDEE}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Calculate Calories

</button>









{

result &&


<div className="mt-10">





<div className="grid md:grid-cols-2 gap-5">



<div className="border rounded-xl p-5">


<p className="text-muted">

BMR

</p>


<h2 className="text-4xl font-bold">

{result.bmr}

</h2>


<p className="text-sm text-muted">

cal/day at rest

</p>


</div>








<div className="border rounded-xl p-5">


<p className="text-muted">

TDEE

</p>


<h2 className="text-4xl font-bold">

{result.tdee}

</h2>


<p className="text-sm text-muted">

cal/day to maintain

</p>


</div>



</div>









<h2 className="text-2xl font-bold mt-10">

Calorie targets by goal

</h2>







<div className="grid md:grid-cols-3 gap-5 mt-5">



{

result.goals.map(goal=>(


<div

key={goal.name}

className="border rounded-xl p-5"

>


<h3 className="font-bold">

{goal.name}

</h3>



<p className="text-3xl font-bold mt-3">

{goal.calories}

</p>


<p className="text-sm text-muted">

{goal.text}

</p>


</div>


))


}



</div>



</div>



}









<p className="mt-8 text-sm text-muted">

Uses Mifflin-St Jeor equation — the most
accurate BMR formula for most adults.

</p>









</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>





<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Enter your details

</h3>


<p className="text-muted">

Select your gender, age, weight, and height.
Switch between metric and imperial units.

</p>


</div>







<div>

<h3 className="font-bold">

2. Choose activity level

</h3>


<p className="text-muted">

Select the activity level that best describes
your typical week.

</p>


</div>







<div>

<h3 className="font-bold">

3. View your targets

</h3>


<p className="text-muted">

See your BMR, TDEE, and calorie goals for
weight loss, maintenance, and muscle gain.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This calculator estimates your Total Daily
Energy Expenditure (TDEE) using the
Mifflin-St Jeor equation, then provides
calorie targets based on your goal.

</p>







<h3 className="text-xl font-bold mt-8">

BMR and TDEE

</h3>





<p className="mt-4 text-muted leading-7">

Basal Metabolic Rate (BMR) is the energy
your body burns at complete rest.
TDEE includes your daily movement and
exercise by applying an activity factor.
TDEE is the important number when setting
your calorie target.

</p>








<h3 className="text-xl font-bold mt-8">

Why Mifflin-St Jeor specifically

</h3>





<p className="mt-4 text-muted leading-7">

Several formulas exist including
Harris-Benedict and Katch-McArdle.
Modern research generally finds
Mifflin-St Jeor more accurate for most
adults, which is why it is used here.

</p>







</section>







</div>

</div>

);

}