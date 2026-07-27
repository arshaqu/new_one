"use client";

import Link from "next/dist/client/link";
import { useState } from "react";

export default function AgeCalculatorPage() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!day || !month || !year) return;

    const birth = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    if (birth > today) {
      alert("Invalid Date");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
    });
  };

  const reset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12 px-6" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-sm gap-6 text-muted">
            <Link
                href="/"
                className="hover:text-blue-500  transition-colors"
            >
                Home
            </Link>
            {" / "}
            <span className="p-2">Calculator</span>
            {" / "}
            <span className="text-white p-2">Age Calculator</span>
            </div>

        {/* Heading */}
        <h1 className="text-5xl p-2 font-bold mt-5">
          Age Calculator
        </h1>

        <p className="text-muted mt-3">
          Calculate your exact age in years, months, days, hours and minutes
          from your date of birth.
        </p>

        {/* Card */}
        <div className="mt-10 rounded-2xl border border-card bg-card p-8">

          <label className="block text-sm text-muted mb-4">
            Date of Birth (DD / MM / YYYY)
          </label>

          <div className="flex flex-wrap items-center gap-3">

            <input
              maxLength={2}
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-24 h-14 rounded-lg bg-input border border-card text-center text-lg outline-none"
              style={{ color: 'var(--foreground)' }}
            />

            <span className="text-2xl">/</span>

            <input
              maxLength={2}
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-24 h-14 rounded-lg bg-input border border-card text-center text-lg outline-none"
              style={{ color: 'var(--foreground)' }}
            />

            <span className="text-2xl">/</span>

            <input
              maxLength={4}
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-40 h-14 rounded-lg bg-input border border-card text-center text-lg outline-none"
              style={{ color: 'var(--foreground)' }}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={calculateAge}
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-semibold"
            >
              Calculate Age
            </button>

            <button
              onClick={reset}
              className="border border-card px-8 py-3 rounded-lg hover:bg-gray-100 transition text-[var(--foreground)]"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="bg-card border border-card rounded-xl p-6 text-center">
                <h2 className="text-5xl font-bold text-blue-500">
                {result.years}
              </h2>
                <p className="mt-2 text-muted">Years</p>
            </div>

            <div className="bg-card border border-card rounded-xl p-6 text-center">
              <h2 className="text-5xl font-bold text-blue-500">
                {result.months}
              </h2>
              <p className="mt-2 text-muted">Months</p>
            </div>

            <div className="bg-card border border-card rounded-xl p-6 text-center">
              <h2 className="text-5xl font-bold text-blue-500">
                {result.days}
              </h2>
              <p className="mt-2 text-muted">Days</p>
            </div>

          </div>
        )}

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
                  Enter your date of birth
                </h3>
                <p className="text-gray-400">
                  Enter the day, month and year correctly.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Click Calculate
                </h3>
                <p className="text-gray-400">
                  Instantly calculate your exact age.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  View your results
                </h3>
                <p className="text-gray-400">
                  See your age in years, months and days.
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
                  This calculator finds the exact time between two dates by counting whole years, then whole months, then the remaining days — not just dividing the total day count by 365. That's why it stays accurate even across leap years and months of different lengths.
                </p>
            </div>

            <div className="flex gap-5">
              
              <div>
                <h3 className="font-semibold text-lg">
                 Why the calculation isn't just "today minus birthdate"
                </h3>
                <p className="text-gray-400">
                 A naive approach (total days ÷ 365.25) gives a rough estimate, but it drifts because February has 28 or 29 days while other months have 30 or 31. This tool instead walks forward from the birth date one calendar unit at a time: it counts how many full years have passed, then how many full months remain after that, then how many days remain after that — so "32 years, 4 months, 18 days" always means what it says.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}