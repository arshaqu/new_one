"use client";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function CompoundInterestCalculatorPage() {

  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");

  const [principalResult, setPrincipalResult] = useState(null);
  const [amount, setAmount] = useState(null);
  const [interest, setInterest] = useState(null);



  function calculateCompound() {

    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(years);
    const n = Number(frequency);


    if (!P || !r || !t) {

      setPrincipalResult(null);
      setAmount(null);
      setInterest(null);

      return;
    }



    const A =
      P *
      Math.pow(
        1 + r / n,
        n * t
      );



    setPrincipalResult(P);
    setAmount(A);
    setInterest(A - P);

  }





  return (

    <div
      className="min-h-screen py-12 px-6"
      style={{
        background: "var(--background)",
        color: "var(--foreground)"
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
          Compound Interest Calculator
        </h1>



        <p className="mt-3 text-muted">
          Calculate compound interest with flexible compounding
          frequency — annually, monthly, daily, and more.
        </p>


        <div className="mt-8 bg-card border border-card rounded-xl p-6">



          <div className="grid md:grid-cols-2 gap-5">



            <div>

              <label className="text-sm text-muted">
                Principal Amount (₹)
              </label>


              <input
                value={principal}
                onChange={(e)=>setPrincipal(e.target.value)}
                placeholder="e.g. 100000"
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
                placeholder="e.g. 8"
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              />

            </div>






            <div>

              <label className="text-sm text-muted">
                Time Period (years)
              </label>


              <input
                value={years}
                onChange={(e)=>setYears(e.target.value)}
                placeholder="e.g. 5"
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              />

            </div>







            <div>

              <label className="text-sm text-muted">
                Compounding Frequency
              </label>


              <select
                value={frequency}
                onChange={(e)=>setFrequency(e.target.value)}
                className="mt-2 w-full rounded-md bg-input border px-3 py-2"
              >

                <option value="1">
                  Annually
                </option>


                <option value="2">
                  Half-Yearly
                </option>


                <option value="4">
                  Quarterly
                </option>


                <option value="12">
                  Monthly
                </option>


                <option value="365">
                  Daily
                </option>


              </select>


            </div>




          </div>






          <button
            onClick={calculateCompound}
            className="mt-6 px-6 py-2 rounded-md bg-indigo-600 text-white"
          >
            Calculate
          </button>









          {
            amount !== null && (

              <div className="mt-8 grid md:grid-cols-3 gap-5">





                <div className="border rounded-lg p-5">


                  <p className="text-sm text-muted">
                    Principal
                  </p>



                  <h2 className="text-3xl font-bold mt-2">

                    ₹{principalResult.toLocaleString("en-IN")}

                  </h2>


                </div>







                <div className="border rounded-lg p-5">


                  <p className="text-sm text-muted">
                    Interest Earned
                  </p>



                  <h2 className="text-3xl font-bold mt-2">

                    ₹{interest.toLocaleString("en-IN",{
                      minimumFractionDigits:2,
                      maximumFractionDigits:2
                    })}

                  </h2>


                </div>







                <div className="border rounded-lg p-5">


                  <p className="text-sm text-muted">
                    Total Amount
                  </p>



                  <h2 className="text-3xl font-bold mt-2">

                    ₹{amount.toLocaleString("en-IN",{
                      minimumFractionDigits:2,
                      maximumFractionDigits:2
                    })}

                  </h2>


                </div>




              </div>


            )
          }





        </div>









        <section className="mt-12">


          <h2 className="text-2xl font-bold">
            How to Use
          </h2>




          <div className="mt-5 space-y-5">



            <p>
              <b>1. Enter principal and rate</b>
              <br/>

              <span className="text-muted">
                Enter your initial investment and annual interest rate.
              </span>

            </p>





            <p>
              <b>2. Set time and frequency</b>
              <br/>

              <span className="text-muted">
                Enter the time period and select compounding frequency.
              </span>

            </p>





            <p>
              <b>3. View results</b>
              <br/>

              <span className="text-muted">
                See the total amount and interest earned.
              </span>

            </p>




          </div>


        </section>









        <section className="mt-12">


          <h2 className="text-2xl font-bold">
            How It Works
          </h2>



          <p className="mt-4 text-muted leading-7">

            Compound interest earns you interest on your interest,
            not just your original deposit. This is why the same
            rate produces different results depending on how often
            it compounds and how long you leave money invested.

          </p>






          <h3 className="mt-6 font-bold">
            The formula
          </h3>



          <p className="mt-3 text-muted">
            A = P × (1 + r/n)^(n×t)
          </p>




          <p className="mt-3 text-muted leading-7">

            P is principal, r is annual interest rate as a decimal,
            n is the number of times interest compounds per year,
            and t is time in years.

            A is the final amount; A − P is the interest earned.

          </p>






          <h3 className="mt-6 font-bold">
            Why compounding frequency matters
          </h3>




          <p className="mt-3 text-muted leading-7">

            More frequent compounding means interest starts earning
            its own interest sooner. Daily compounding will usually
            produce a slightly higher final amount than annual
            compounding at the same rate.

          </p>



        </section>









        <section className="mt-12">


          <h2 className="text-2xl font-bold">
            Examples
          </h2>



          <p className="mt-4 text-muted">

            ₹1,00,000 invested at 8% annual interest for 5 years.

          </p>



          <p className="mt-3 text-muted">

            Monthly compounding generates slightly more returns
            compared to annual compounding.

          </p>



        </section>









        <section className="mt-12">


          <h2 className="text-2xl font-bold">
            Common Use Cases
          </h2>



          <ul className="mt-4 list-disc pl-6 text-muted space-y-2">

            <li>
              Calculating investment growth
            </li>

            <li>
              Comparing savings options
            </li>

            <li>
              Understanding long-term wealth creation
            </li>

            <li>
              Planning future financial goals
            </li>


          </ul>


        </section>









        <section className="mt-12 pb-10">


          <h2 className="text-2xl font-bold">
            Tips
          </h2>



          <ul className="mt-4 list-disc pl-6 text-muted space-y-2">


            <li>
              Starting early gives compounding more time to work.
            </li>


            <li>
              Higher rates and longer periods increase growth.
            </li>


            <li>
              Frequent compounding can slightly improve returns.
            </li>


          </ul>



        </section>





      </div>


    </div>


  );

}