"use client";

import Link from "next/dist/client/link";
import { useState } from "react";

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("5");
  const [months, setMonths] = useState("10");

  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const [schedule, setSchedule] = useState<any[]>([]);
  const [showSchedule, setShowSchedule] = useState(true);

  function calculateEmi() {
    const P = Number(principal);
    const annualRate = Number(rate);
    const n = Number(months);

    if (!P || !annualRate || !n) return;

    const r = annualRate / 12 / 100;

    let monthlyEmi = 0;

    if (r === 0) {
      monthlyEmi = P / n;
    } else {
      const x = Math.pow(1 + r, n);
      monthlyEmi = (P * r * x) / (x - 1);
    }

    const total = monthlyEmi * n;
    const interest = total - P;

    setEmi(monthlyEmi);
    setTotalInterest(interest);
    setTotalPayment(total);


    let balance = P;
    let rows = [];

    for (let i = 1; i <= n; i++) {
      const interestPart = balance * r;
      const principalPart = monthlyEmi - interestPart;

      balance = balance - principalPart;

      if (balance < 0) balance = 0;

      rows.push({
        month: i,
        emi: monthlyEmi,
        principal: principalPart,
        interest: interestPart,
        balance: balance,
      });
    }

    setSchedule(rows);
  }


  function copyEmi() {
    if (emi) {
      navigator.clipboard.writeText(`₹${emi.toFixed(0)}`);
    }
  }


  return (
    <div
      className="min-h-screen py-12 px-6"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
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
            <span className="text-white p-2">Age Calculator</span>
            </div>
        {/* Header */}

        <h1 className="text-5xl p-2 font-bold mt-5">
          EMI Calculator
        </h1>

        <p className="mt-3 text-muted">
          Calculate monthly EMI, total interest, total payment,
          and view full amortization schedule for any loan.
        </p>



        {/* Calculator Card */}

        <div className="mt-8 bg-card border border-card rounded-xl p-6">


          <div className="grid md:grid-cols-3 gap-4">


            <div>
              <label className="text-sm text-muted">
                Loan Amount (₹)
              </label>

              <input
                value={principal}
                onChange={(e)=>setPrincipal(e.target.value)}
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              />

            </div>



            <div>

              <label className="text-sm text-muted">
                Annual Interest Rate (%)
              </label>

              <input
                value={rate}
                onChange={(e)=>setRate(e.target.value)}
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              />

            </div>




            <div>

              <label className="text-sm text-muted">
                Tenure (months)
              </label>

              <input
                value={months}
                onChange={(e)=>setMonths(e.target.value)}
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              />

            </div>


          </div>



          <button
            onClick={calculateEmi}
            className="mt-6 px-5 py-2 rounded-md bg-indigo-600 text-white"
          >
            Calculate EMI
          </button>



          {
            emi !== null && (

            <div className="mt-8 grid md:grid-cols-3 gap-4">


              <div className="border rounded-lg p-4">

                <div className="text-sm text-muted">
                  Monthly EMI
                </div>

                <div className="text-2xl font-bold mt-2">
                  ₹{emi.toFixed(0)}
                </div>

                <button
                  onClick={copyEmi}
                  className="mt-3 text-sm"
                >
                  📋 Copy
                </button>

              </div>




              <div className="border rounded-lg p-4">

                <div className="text-sm text-muted">
                  Total Interest
                </div>

                <div className="text-2xl font-bold mt-2">
                  ₹{totalInterest?.toFixed(0)}
                </div>

              </div>





              <div className="border rounded-lg p-4">

                <div className="text-sm text-muted">
                  Total Payment
                </div>

                <div className="text-2xl font-bold mt-2">
                  ₹{totalPayment?.toFixed(0)}
                </div>

              </div>


            </div>

            )
          }




          {
            schedule.length > 0 && (

              <div className="mt-8">


                <button
                  onClick={()=>setShowSchedule(!showSchedule)}
                  className="mb-4 underline"
                >
                  {
                    showSchedule
                    ? "Hide Amortization Schedule"
                    : "Show Amortization Schedule"
                  }
                </button>



                {
                  showSchedule && (

                  <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                  <thead>

                  <tr className="border-b">

                  <th className="p-3 text-left">
                    Month
                  </th>

                  <th className="p-3">
                    EMI
                  </th>

                  <th className="p-3">
                    Principal
                  </th>

                  <th className="p-3">
                    Interest
                  </th>

                  <th className="p-3">
                    Balance
                  </th>


                  </tr>

                  </thead>



                  <tbody>


                  {
                    schedule.map((row)=>(
                      
                      <tr key={row.month} className="border-b">

                      <td className="p-3">
                        {row.month}
                      </td>

                      <td>
                        ₹{row.emi.toFixed(0)}
                      </td>

                      <td>
                        ₹{row.principal.toFixed(0)}
                      </td>


                      <td>
                        ₹{row.interest.toFixed(0)}
                      </td>


                      <td>
                        ₹{row.balance.toFixed(0)}
                      </td>


                      </tr>

                    ))
                  }


                  </tbody>

                  </table>


                  </div>

                  )
                }


              </div>

            )
          }



        </div>






        {/* How To Use */}


        <section className="mt-12">

        <h2 className="text-2xl font-bold">
          How to Use
        </h2>


        <ol className="mt-5 space-y-5">

        <li>
          <b>1. Enter loan details</b>
          <p className="text-muted">
          Enter your loan amount, annual interest rate,
          and tenure in months.
          </p>
        </li>


        <li>
          <b>2. Calculate EMI</b>
          <p className="text-muted">
          Click Calculate to see your monthly EMI,
          total interest, and total payment.
          </p>
        </li>



        <li>
          <b>3. View amortization schedule</b>
          <p className="text-muted">
          Toggle the amortization table to see a
          month-by-month breakdown.
          </p>
        </li>


        </ol>


        </section>







        {/* Explanation */}

        <section className="mt-12">


        <h2 className="text-2xl font-bold">
          How It Works
        </h2>


        <p className="mt-4 text-muted leading-7">

        EMI (Equated Monthly Installment) is the fixed amount
        you pay every month to repay a loan — a mix of principal
        and interest that stays constant even though the split
        changes every month.

        </p>



        <h3 className="mt-6 font-bold">
          The EMI formula
        </h3>


        <p className="mt-2 text-muted">

        EMI = P × r × (1+r)ⁿ ÷ [(1+r)ⁿ − 1]

        </p>



        <p className="mt-3 text-muted">

        P is the loan principal, r is the monthly interest rate
        (annual rate ÷ 12 ÷ 100), and n is the total number
        of monthly installments.

        </p>



        </section>






        {/* Examples */}

        <section className="mt-12">

        <h2 className="text-2xl font-bold">
          Examples
        </h2>


        <p className="mt-4 text-muted">
        ₹10,00,000 loan at 9% for 20 years
        </p>


        <p className="mt-3 text-muted">
        EMI ≈ ₹8,997/month. Total payment ≈ ₹21,59,280.
        Total interest ≈ ₹11,59,280.
        </p>


        <p className="mt-5 text-muted">
        Same loan, 10 years instead of 20 years:
        EMI increases but total interest reduces significantly.
        </p>


        </section>






        {/* Uses */}

        <section className="mt-12">

        <h2 className="text-2xl font-bold">
          Common Use Cases
        </h2>


        <ul className="mt-4 list-disc pl-6 text-muted space-y-2">

        <li>
        Comparing loan offers from different banks
        </li>

        <li>
        Choosing between shorter and longer tenure
        </li>

        <li>
        Planning monthly budgets before taking loans
        </li>

        <li>
        Understanding prepayment benefits
        </li>

        </ul>


        </section>






        {/* Tips */}

        <section className="mt-12 pb-10">

        <h2 className="text-2xl font-bold">
          Tips
        </h2>


        <ul className="mt-4 list-disc pl-6 text-muted space-y-3">

        <li>
        Always compare total interest, not only interest rate.
        </li>

        <li>
        Early principal prepayments save more interest.
        </li>

        <li>
        Reducing tenure usually saves more money than reducing EMI.
        </li>


        </ul>


        </section>


      </div>

    </div>
  );
}