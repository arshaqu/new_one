"use client";

import Link from "next/link";
import { useState } from "react";

export default function MortgageCalculator() {

  const [homePrice, setHomePrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(8);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1000);
  const [loanTerm, setLoanTerm] = useState(30);

  const [result, setResult] = useState<any>(null);



  const calculateMortgage = () => {

    const loanAmount = homePrice - downPayment;

    const monthlyRate = interestRate / 100 / 12;

    const months = loanTerm * 12;


    let monthlyPI = 0;

    if(monthlyRate === 0){

      monthlyPI = loanAmount / months;

    }
    else{

      monthlyPI =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    }



    const monthlyTax = propertyTax / 12;

    const monthlyInsurance = insurance / 12;


    const totalPayment =
    monthlyPI + monthlyTax + monthlyInsurance;


    const totalInterest =
    monthlyPI * months - loanAmount;



    setResult({

      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      totalPayment,
      totalInterest

    });


  };





return (

<div
className="min-h-screen py-12 px-6"
style={{
background:"var(--background)",
color:"var(--foreground)"
}}
>


<div className="max-w-5xl mx-auto">



{/* Breadcrumb */}

<div className="text-sm text-muted">

<Link
href="/"
className="hover:text-blue-500 p-2 transition"
>
Home
</Link>

{" / "}

<span className="p-2">
Calculator
</span>

{" / "}

<span className="p-2">
Mortgage Calculator
</span>

</div>






<h1 className="text-5xl font-bold mt-5 p-2">

Mortgage Calculator

</h1>



<p className="mt-3 text-muted">

Calculate monthly mortgage payments including principal,
interest, property tax, and insurance.

</p>








<div className="
mt-8
bg-card
border
border-card
rounded-xl
p-6
">





<div className="
grid
md:grid-cols-2
gap-5
">



<Input
label="Home Price (₹)"
value={homePrice}
setValue={setHomePrice}
/>




<Input
label="Down Payment (₹)"
value={downPayment}
setValue={setDownPayment}
/>




<Input
label="Annual Interest Rate (%)"
value={interestRate}
setValue={setInterestRate}
/>





<Input
label="Annual Property Tax (₹)"
value={propertyTax}
setValue={setPropertyTax}
/>





<Input
label="Annual Home Insurance (₹)"
value={insurance}
setValue={setInsurance}
/>







<div>

<label className="text-sm text-muted">

Loan Term

</label>


<select

value={loanTerm}

onChange={(e)=>setLoanTerm(Number(e.target.value))}

className="
mt-2
w-full
rounded-md
bg-input
border
px-3
py-2
"

>


<option value={15}>
15 years
</option>


<option value={20}>
20 years
</option>


<option value={30}>
30 years
</option>


</select>


</div>




</div>







<button

onClick={calculateMortgage}

className="
mt-6
px-6
py-3
rounded-md
bg-indigo-600
text-white
hover:bg-indigo-700
transition
"

>

Calculate Mortgage

</button>







{
result &&

<>


<div className="
mt-8
bg-blue-50
dark:bg-blue-900/30
rounded-xl
p-6
text-center
">


<p className="text-muted">

Total Monthly Payment

</p>


<h2 className="
text-4xl
font-bold
mt-2
text-blue-600
">

₹{Math.round(result.totalPayment)}

</h2>


</div>







<div className="
mt-5
grid
grid-cols-2
md:grid-cols-4
gap-4
">


<Card
title="Principal & Interest"
value={result.monthlyPI}
/>



<Card
title="Property Tax"
value={result.monthlyTax}
/>



<Card
title="Insurance"
value={result.monthlyInsurance}
/>



<Card
title="Total Interest"
value={result.totalInterest}
/>



</div>




<p className="mt-5 text-muted">

Loan Principal:
₹{result.loanAmount.toLocaleString()}

</p>


</>


}





</div>









<section className="mt-12">


<h2 className="text-3xl font-bold">

How to Use

</h2>


<Step
number="1"
title="Enter home price and down payment"
text="Enter the property price and your initial payment amount."
/>


<Step
number="2"
title="Set interest rate and loan term"
text="Choose your annual interest rate and repayment period."
/>


<Step
number="3"
title="Add taxes and insurance"
text="Include yearly costs for a more accurate monthly estimate."
/>


<Step
number="4"
title="View results"
text="See your complete monthly mortgage breakdown."
/>


</section>








<section className="mt-12">


<h2 className="text-3xl font-bold">

How It Works

</h2>



<p className="mt-4 text-muted leading-7">

Mortgage payments usually include principal,
interest, taxes, and insurance (PITI).
This calculator combines all these costs to estimate
your real monthly housing expense.

</p>



<h3 className="mt-6 text-xl font-bold">

Principal & Interest

</h3>


<p className="mt-2 text-muted">

Calculated using standard mortgage amortization formula.

</p>



<h3 className="mt-6 text-xl font-bold">

Taxes and Insurance

</h3>


<p className="mt-2 text-muted">

Annual property tax and insurance are divided monthly
and added to your payment.

</p>



</section>








</div>


</div>


);

}








function Input({label,value,setValue}:any){

return (

<div>


<label className="text-sm text-muted">

{label}

</label>


<input

type="number"

value={value}

onChange={(e)=>setValue(Number(e.target.value))}

className="
mt-2
w-full
rounded-md
bg-input
border
px-3
py-2
outline-none
"

/>


</div>


)

}








function Card({title,value}:any){

return (

<div className="
bg-card
border
border-card
rounded-lg
p-4
text-center
">


<h3 className="text-xl font-bold">

₹{Math.round(value)}

</h3>


<p className="text-muted text-sm mt-2">

{title}

</p>


</div>


)

}








function Step({number,title,text}:any){

return (

<div className="flex gap-4 mt-6">


<div className="
w-8
h-8
rounded-full
bg-indigo-600
text-white
flex
items-center
justify-center
">

{number}

</div>



<div>

<h3 className="font-bold">

{title}

</h3>


<p className="text-muted">

{text}

</p>


</div>



</div>

)

}