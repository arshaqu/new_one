"use client";

import Link from "next/dist/client/link";
import { useState } from "react";

export default function SipCalculatorPage() {

  const [type, setType] = useState("regular");

  const [investment, setInvestment] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [stepUp, setStepUp] = useState("");

  const [invested, setInvested] = useState<number | null>(null);
  const [returns, setReturns] = useState<number | null>(null);
  const [maturity, setMaturity] = useState<number | null>(null);



  function calculateSIP() {

    const monthlyInvestment = Number(investment);
    const annualReturn = Number(rate);
    const period = Number(years);
    const step = Number(stepUp);


    if(!monthlyInvestment || !annualReturn || !period){
      return;
    }


    const monthlyRate = annualReturn / 12 / 100;
    let futureValue = 0;
    let totalInvested = 0;



    if(type === "regular"){


      const months = period * 12;


      futureValue =
        monthlyInvestment *
        (((Math.pow(1 + monthlyRate, months) - 1) /
        monthlyRate) *
        (1 + monthlyRate));


      totalInvested = monthlyInvestment * months;


    }



   else {

let currentInvestment = monthlyInvestment;


for(let year = 1; year <= period; year++){

  for(let month = 1; month <= 12; month++){

    // SIP invested at beginning of month
    futureValue =
      (futureValue + currentInvestment) *
      (1 + monthlyRate);


    totalInvested += currentInvestment;

  }


  currentInvestment =
    currentInvestment * (1 + step / 100);

}

}



    setInvested(totalInvested);
    setMaturity(futureValue);
    setReturns(futureValue - totalInvested);


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
            <span className="text-white p-2">Sip Calculator</span>
            </div>

<h1 className="text-5xl p-2 font-bold mt-5">
SIP Calculator
</h1>


<p className="mt-3 text-muted">
Calculate SIP returns with regular and step-up (top-up)
SIP options to plan your mutual fund investments.
</p>




<div className="mt-8 bg-card border border-card rounded-xl p-6">


{/* Tabs */}

<div className="flex gap-3 mb-6">


<button
onClick={()=>setType("regular")}
className={`px-5 py-2 rounded-md ${
type==="regular"
?"bg-indigo-600 text-white"
:"border"
}`}
>
Regular SIP
</button>



<button
onClick={()=>setType("stepup")}
className={`px-5 py-2 rounded-md ${
type==="stepup"
?"bg-indigo-600 text-white"
:"border"
}`}
>
Step-up SIP
</button>



</div>





<div className="grid md:grid-cols-2 gap-5">


<div>

<label className="text-sm text-muted">
Monthly Investment (₹)
</label>


<input
value={investment}
onChange={(e)=>setInvestment(e.target.value)}
placeholder="e.g. 5000"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>

</div>




<div>

<label className="text-sm text-muted">
Expected Annual Return (%)
</label>


<input
value={rate}
onChange={(e)=>setRate(e.target.value)}
placeholder="e.g. 12"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>




<div>

<label className="text-sm text-muted">
Investment Period (years)
</label>


<input
value={years}
onChange={(e)=>setYears(e.target.value)}
placeholder="e.g. 10"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>




{
type==="stepup" &&

<div>

<label className="text-sm text-muted">
Annual Step-up (%)
</label>


<input
value={stepUp}
onChange={(e)=>setStepUp(e.target.value)}
placeholder="e.g. 10"
className="mt-2 w-full rounded-md bg-input border px-3 py-2"
/>


</div>

}


</div>





<button
onClick={calculateSIP}
className="mt-6 px-6 py-2 rounded-md bg-indigo-600 text-white"
>
Calculate
</button>





{
maturity !== null &&

<div className="mt-8 grid md:grid-cols-3 gap-4">


<div className="border rounded-lg p-4">

<p className="text-sm text-muted">
Total Invested
</p>

<h2 className="text-2xl font-bold mt-2">
₹{invested?.toFixed(0)}
</h2>

</div>




<div className="border rounded-lg p-4">

<p className="text-sm text-muted">
Expected Returns
</p>

<h2 className="text-2xl font-bold mt-2">
₹{returns?.toFixed(0)}
</h2>

</div>




<div className="border rounded-lg p-4">

<p className="text-sm text-muted">
Maturity Value
</p>

<h2 className="text-2xl font-bold mt-2">
₹{maturity?.toFixed(0)}
</h2>

</div>



</div>


}



</div>






{/* How to Use */}


<section className="mt-12">


<h2 className="text-2xl font-bold">
How to Use
</h2>



<div className="mt-5 space-y-5">


<p>
<b>1. Choose SIP type</b><br/>
<span className="text-muted">
Select Regular SIP or Step-up SIP.
</span>
</p>



<p>
<b>2. Enter investment details</b><br/>

<span className="text-muted">
Enter monthly investment, expected return,
and investment period.
</span>

</p>



<p>
<b>3. Calculate</b><br/>

<span className="text-muted">
See your estimated maturity value,
total invested, and expected returns.
</span>

</p>



</div>

</section>








<section className="mt-12">


<h2 className="text-2xl font-bold">
How It Works
</h2>


<p className="mt-4 text-muted leading-7">

A Systematic Investment Plan (SIP) invests a fixed amount
every month into a mutual fund. This calculator projects
future value using compound growth on monthly investments.

</p>



<h3 className="mt-6 font-bold">
The regular SIP formula
</h3>



<p className="mt-3 text-muted">

FV = P × [((1+i)ⁿ − 1) / i] × (1+i)

</p>


<p className="mt-3 text-muted">

P is monthly investment, i is expected monthly return
(annual return ÷ 12), and n is total number of months.

</p>






<h3 className="mt-6 font-bold">
Step-up (top-up) SIP
</h3>


<p className="mt-3 text-muted leading-7">

Instead of investing the same amount every month,
step-up SIP increases your contribution every year.
For example, a 10% annual step-up increases your
investment as your income grows.

</p>



</section>









<section className="mt-12">


<h2 className="text-2xl font-bold">
Examples
</h2>


<p className="mt-4 text-muted">

₹5,000 monthly SIP at 12% annual return for 10 years.

</p>


<p className="mt-3 text-muted">

A step-up SIP with 10% yearly increase can create a
larger corpus because your investment amount grows
over time.

</p>



</section>








<section className="mt-12">


<h2 className="text-2xl font-bold">
Common Use Cases
</h2>


<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Planning long-term wealth creation
</li>

<li>
Comparing regular and step-up SIP strategies
</li>

<li>
Estimating retirement investments
</li>

<li>
Understanding power of compounding
</li>


</ul>


</section>







<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">
Tips
</h2>


<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Higher returns usually require accepting higher risk.
</li>


<li>
Longer investment periods allow compounding to work better.
</li>


<li>
Increasing SIP amount yearly can significantly improve
your final corpus.
</li>


</ul>


</section>





</div>

</div>

  );
}