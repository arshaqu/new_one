"use client";
import Link from "next/dist/client/link";

import { useState } from "react";

export default function PercentageCalculatorPage() {

  const [mode, setMode] = useState("of");

  const [percentage, setPercentage] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const [result, setResult] = useState(null);



  function calculatePercentage() {

    const X = Number(percentage);
    const A = Number(value1);
    const B = Number(value2);


    let answer = null;



    if(mode === "of") {

      if(isNaN(X) || isNaN(A)) {
        setResult(null);
        return;
      }

      answer = (X / 100) * A;

    }






    if(mode === "what") {

      if(isNaN(A) || isNaN(B) || B === 0) {
        setResult(null);
        return;
      }


      answer = (A / B) * 100;

    }






    if(mode === "change") {

      if(isNaN(A) || isNaN(B) || A === 0) {
        setResult(null);
        return;
      }


      answer =
      ((B - A) / Math.abs(A)) * 100;

    }



    setResult(answer);

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
            <span className="text-white p-2">Compound Interest Calculator</span>
            </div>





<h1 className="text-5xl p-2 font-bold mt-5">
Percentage Calculator
</h1>



<p className="mt-3 text-muted">
Calculate percentages in three ways: X% of Y,
X is what % of Y, and percentage change between two values.
</p>







<div className="mt-8 bg-card border border-card rounded-xl p-6">





<div className="flex flex-wrap gap-3 mb-6">



<button
onClick={()=>{
setMode("of");
setResult(null);
}}
className={`px-5 py-2 rounded-md ${
mode==="of"
?"bg-indigo-600 text-white"
:"border"
}`}
>
X% of Y
</button>







<button
onClick={()=>{
setMode("what");
setResult(null);
}}
className={`px-5 py-2 rounded-md ${
mode==="what"
?"bg-indigo-600 text-white"
:"border"
}`}
>
X is what % of Y
</button>







<button
onClick={()=>{
setMode("change");
setResult(null);
}}
className={`px-5 py-2 rounded-md ${
mode==="change"
?"bg-indigo-600 text-white"
:"border"
}`}
>
% Change
</button>



</div>









<div className="grid md:grid-cols-2 gap-5">





{
mode==="of" &&

<div>

<label className="text-sm text-muted">
Percentage (%)
</label>


<input
value={percentage}
onChange={(e)=>setPercentage(e.target.value)}
placeholder="e.g. 25"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>

}







<div>


<label className="text-sm text-muted">


{
mode==="change"
?
"Old Value"
:
mode==="what"
?
"Value (X)"
:
"Value"

}


</label>


<input
value={value1}
onChange={(e)=>setValue1(e.target.value)}
placeholder="e.g. 200"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>








{
mode !== "of" &&

<div>


<label className="text-sm text-muted">


{
mode==="change"
?
"New Value"
:
"Total (Y)"

}


</label>


<input
value={value2}
onChange={(e)=>setValue2(e.target.value)}
placeholder="e.g. 400"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>

}





</div>








<button
onClick={calculatePercentage}
className="mt-6 px-6 py-2 rounded-md bg-indigo-600 text-white"
>
Calculate
</button>









{
result !== null &&

<div className="mt-8 border rounded-lg p-6">


<p className="text-sm text-muted">
Result
</p>





<h2 className="text-2xl font-bold mt-3">



{

mode==="what"

?

`${value1} is ${result.toFixed(2)}% of ${value2}`



:

mode==="of"


?


`${percentage}% of ${value1} = ${result.toLocaleString("en-IN",{
maximumFractionDigits:2
})}`



:


`${value2} is ${Math.abs(result).toFixed(2)}% ${
result >= 0 ? "increase" : "decrease"
} from ${value1}`


}



</h2>



</div>


}





</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">
How to Use
</h2>




<div className="mt-5 space-y-5">


<p>
<b>1. Choose a mode</b>
<br/>

<span className="text-muted">
Select X% of Y, X is what % of Y,
or % Change.
</span>

</p>





<p>
<b>2. Enter values</b>
<br/>

<span className="text-muted">
Fill the required input fields.
</span>

</p>





<p>
<b>3. Calculate</b>
<br/>

<span className="text-muted">
Get your percentage result instantly.
</span>

</p>



</div>


</section>









<section className="mt-12">


<h2 className="text-2xl font-bold">
How It Works
</h2>



<p className="mt-4 text-muted leading-7">

Percentage calculations usually fall into three
different types. Each mode uses a different formula.

</p>






<h3 className="mt-6 font-bold">
Mode 1 — X% of Y
</h3>


<p className="mt-3 text-muted">
Formula: (X ÷ 100) × Y
</p>






<h3 className="mt-6 font-bold">
Mode 2 — X is what % of Y
</h3>


<p className="mt-3 text-muted">
Formula: (X ÷ Y) × 100
</p>







<h3 className="mt-6 font-bold">
Mode 3 — Percentage change
</h3>


<p className="mt-3 text-muted">
Formula: ((New − Old) ÷ |Old|) × 100
</p>




</section>









<section className="mt-12">


<h2 className="text-2xl font-bold">
Examples
</h2>



<div className="mt-4 space-y-4 text-muted">


<p>
<b>Restaurant tip:</b><br/>
18% of ₹1,240 = ₹223.20 tip.
</p>



<p>
<b>Exam score:</b><br/>
68 out of 85 = 80%.
</p>




<p>
<b>Salary hike:</b><br/>
₹45,000 to ₹52,000 = 15.56% increase.
</p>



</div>


</section>









<section className="mt-12">


<h2 className="text-2xl font-bold">
Common Use Cases
</h2>


<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Calculating discounts, tips, taxes and commissions.
</li>


<li>
Converting marks into percentages.
</li>


<li>
Calculating salary increases.
</li>


<li>
Measuring price changes.
</li>


</ul>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">
Tips
</h2>



<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Always divide percentage change by the original value.
</li>


<li>
Percentage points and percentage change are different.
</li>


<li>
Repeated percentage changes do not cancel exactly.
</li>


</ul>


</section>






</div>

</div>

);

}