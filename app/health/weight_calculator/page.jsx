"use client";

import Link from "next/link";
import { useState } from "react";


export default function IdealWeightCalculatorPage(){


const [unit,setUnit] =
useState("metric");


const [gender,setGender] =
useState("male");


const [height,setHeight] =
useState(170);


const [result,setResult] =
useState(null);









function calculateIdealWeight(){



let heightCm =
Number(height);





if(unit==="imperial"){


heightCm =
Number(height) *
2.54;


}






let inches =
heightCm / 2.54;





let devine;
let robinson;
let miller;
let hamwi;








if(gender==="male"){



// Devine formula
devine =
50 +
(2.3 *
(inches - 60));



// Robinson formula
robinson =
52 +
(1.9 *
(inches - 60));



// Miller formula
miller =
56.2 +
(1.41 *
(inches - 60));



// Hamwi formula
hamwi =
48 +
(2.7 *
(inches - 60));



}

else{



// Devine formula
devine =
45.5 +
(2.3 *
(inches - 60));



// Robinson formula
robinson =
49 +
(1.7 *
(inches - 60));



// Miller formula
miller =
53.1 +
(1.36 *
(inches - 60));



// Hamwi formula
hamwi =
45.5 +
(2.2 *
(inches - 60));



}








devine =
Number(
devine.toFixed(1)
);



robinson =
Number(
robinson.toFixed(1)
);



miller =
Number(
miller.toFixed(1)
);



hamwi =
Number(
hamwi.toFixed(1)
);









const values = [

devine,

robinson,

miller,

hamwi

];





const min =
Math.min(
...values
);



const max =
Math.max(
...values
);



const average =
Math.round(

values.reduce(
(a,b)=>a+b,
0
)
/
values.length

);









setResult({

range:

`${min} kg – ${max} kg`,

average,

formulas:[

{
name:"Devine",
value:devine
},

{
name:"Robinson",
value:robinson
},

{
name:"Miller",
value:miller
},

{
name:"Hamwi",
value:hamwi
}

]

});



}









function changeUnit(value){



setUnit(value);



if(value==="metric"){


setHeight(170);


}

else{


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

Ideal Weight Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Ideal Weight Calculator

</h1>






<p className="mt-3 text-muted">

Find your ideal body weight using 4 formulas —
Devine, Robinson, Miller, and Hamwi.
Supports metric and imperial units.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<h2 className="font-bold">

Units

</h2>





<div className="flex gap-4 mt-3">



<button

onClick={()=>changeUnit("metric")}

className={`px-6 py-3 rounded-lg border ${
unit==="metric"
?
"bg-indigo-600 text-white"
:
""
}`}

>

Metric

</button>







<button

onClick={()=>changeUnit("imperial")}

className={`px-6 py-3 rounded-lg border ${
unit==="imperial"
?
"bg-indigo-600 text-white"
:
""
}`}

>

Imperial

</button>



</div>









<div className="mt-8">


<h2 className="font-bold">

Gender

</h2>





<div className="flex gap-4 mt-3">



<button

onClick={()=>setGender("male")}

className={`px-6 py-3 rounded-lg border ${
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

className={`px-6 py-3 rounded-lg border ${
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









<div className="mt-8">


<label className="text-sm text-muted">

Height ({unit==="metric"?"cm":"in"})

</label>



<input

type="number"

value={height}

onChange={
e=>
setHeight(
Number(e.target.value)
)
}

className="mt-2 w-full md:w-1/3 bg-input border rounded-md px-3 py-2"

/>



</div>








<button

onClick={calculateIdealWeight}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Calculate Ideal Weight

</button>









{

result &&


<div className="mt-10">






<div className="border rounded-xl p-6">


<h2 className="text-2xl font-bold">

Ideal weight range

</h2>



<p className="text-4xl font-bold mt-4">

{result.range}

</p>



<p className="mt-3 text-muted">

Average: {result.average} kg

</p>


</div>









<h2 className="text-2xl font-bold mt-10">

Formula breakdown

</h2>








<div className="grid md:grid-cols-4 gap-5 mt-5">



{

result.formulas.map(item=>(


<div

key={item.name}

className="border rounded-xl p-5"

>


<h3 className="font-bold">

{item.name}

</h3>



<p className="text-3xl font-bold mt-3">

{item.value} kg

</p>



</div>


))


}



</div>








<p className="mt-8 text-sm text-muted">

These formulas are based on height and
gender. Athletes and muscular individuals
may be healthy outside this range.

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

1. Select units and gender

</h3>


<p className="text-muted">

Choose metric or imperial, and select your gender.

</p>


</div>







<div>

<h3 className="font-bold">

2. Enter your height

</h3>


<p className="text-muted">

Enter your height in cm or inches.

</p>


</div>







<div>

<h3 className="font-bold">

3. View your ideal range

</h3>


<p className="text-muted">

See your ideal weight range and individual
results from 4 medical formulas.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This calculator estimates a healthy weight
range using four established clinical formulas —
Devine, Robinson, Miller, and Hamwi — instead
of relying on a single number.

</p>








<h3 className="text-xl font-bold mt-8">

Why four different formulas

</h3>






<p className="mt-4 text-muted leading-7">

Each formula was developed independently
using different reference populations and
assumptions. Because each produces slightly
different results, showing all four and their
average provides a more realistic healthy
weight range.

</p>








<h3 className="text-xl font-bold mt-8">

What these formulas don't account for

</h3>






<p className="mt-4 text-muted leading-7">

All formulas use only height and gender.
They do not consider muscle mass, frame size,
or body composition. A muscular or large-framed
person may be healthy outside these estimates.

</p>







</section>







</div>

</div>

);

}
