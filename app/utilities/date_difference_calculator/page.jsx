"use client";

import Link from "next/link";
import { useState } from "react";


export default function DateDifferenceCalculatorPage(){


const today =
new Date()
.toISOString()
.split("T")[0];



const [startDate,setStartDate] =
useState(today);


const [endDate,setEndDate] =
useState(today);



const [difference,setDifference] =
useState(null);









function calculateDifference(){


const start =
new Date(startDate);


const end =
new Date(endDate);



if(start>end){


const temp = startDate;

setStartDate(endDate);

setEndDate(temp);


return;


}






let years =
end.getFullYear()
-
start.getFullYear();



let months =
end.getMonth()
-
start.getMonth();



let days =
end.getDate()
-
start.getDate();





if(days<0){


months--;


const previousMonth =
new Date(

end.getFullYear(),

end.getMonth(),

0

);



days +=
previousMonth.getDate();


}





if(months<0){


years--;

months +=12;


}








const totalMilliseconds =
end-start;



const totalMinutes =
Math.floor(

totalMilliseconds /
(1000*60)

);



const totalHours =
Math.floor(

totalMilliseconds /
(1000*60*60)

);



const totalDays =
Math.floor(

totalMilliseconds /
(1000*60*60*24)

);



const weeks =
Math.floor(
totalDays/7
);







setDifference({

years,

months,

days,

weeks,

totalDays,

hours:totalHours,

minutes:totalMinutes

});



}









function resetDates(){


setStartDate(today);

setEndDate(today);

setDifference(null);


}









function setLastYear(){



const end =
new Date();


const start =
new Date();



start.setFullYear(

end.getFullYear()-1

);



setStartDate(

start
.toISOString()
.split("T")[0]

);



setEndDate(

end
.toISOString()
.split("T")[0]

);



setTimeout(
calculateDifference,
50
);


}









function setLastSixMonths(){



const end =
new Date();



const start =
new Date();



start.setMonth(

end.getMonth()-6

);



setStartDate(

start
.toISOString()
.split("T")[0]

);



setEndDate(

end
.toISOString()
.split("T")[0]

);



setTimeout(
calculateDifference,
50
);



}

return (

    <div

className="min-h-screen px-6 py-12"

style={{

background:"var(--background)",

color:"var(--foreground)"

}}

>


<div className="max-w-4xl mx-auto">







<div className="text-sm text-muted">


<Link
href="/"
className="hover:text-blue-500"
>

Home

</Link>


{" / "}


<Link
href="/utilities"
className="hover:text-blue-500"
>

Utilities

</Link>


{" / "}


<span>

Date Difference Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Date Difference Calculator

</h1>






<p className="mt-3 text-muted">

Calculate the exact difference between two
dates in years, months, weeks, days, hours,
and minutes.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<div className="grid md:grid-cols-2 gap-6">



<div>


<label className="text-sm text-muted">

Start date

</label>


<input

type="date"

value={startDate}

onChange={
e=>
setStartDate(
e.target.value
)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>



</div>








<div>


<label className="text-sm text-muted">

End date

</label>


<input

type="date"

value={endDate}

onChange={
e=>
setEndDate(
e.target.value
)
}

className="mt-2 w-full bg-input border rounded-md px-3 py-2"

/>



</div>



</div>









<div className="flex flex-wrap gap-3 mt-6">



<button

onClick={calculateDifference}

className="px-5 py-2 rounded-lg bg-indigo-600 text-white"

>

Calculate

</button>







<button

onClick={resetDates}

className="px-5 py-2 border rounded-lg"

>

Reset

</button>







<button

onClick={setLastYear}

className="px-5 py-2 border rounded-lg"

>

Last 1 year

</button>







<button

onClick={setLastSixMonths}

className="px-5 py-2 border rounded-lg"

>

Last 6 months

</button>



</div>









{

difference &&



<div className="mt-8 border rounded-xl p-5">


<h2 className="text-xl font-bold">

Difference

</h2>




<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">



<div>

<p className="text-muted text-sm">

Years

</p>

<p className="text-2xl font-bold">

{difference.years}

</p>

</div>








<div>

<p className="text-muted text-sm">

Months

</p>

<p className="text-2xl font-bold">

{difference.months}

</p>

</div>








<div>

<p className="text-muted text-sm">

Days

</p>

<p className="text-2xl font-bold">

{difference.days}

</p>

</div>








<div>

<p className="text-muted text-sm">

Weeks

</p>

<p className="text-2xl font-bold">

{difference.weeks}

</p>

</div>








<div>

<p className="text-muted text-sm">

Hours

</p>

<p className="text-2xl font-bold">

{difference.hours}

</p>

</div>








<div>

<p className="text-muted text-sm">

Minutes

</p>

<p className="text-2xl font-bold">

{difference.minutes}

</p>

</div>






</div>


</div>



}









{

difference &&

difference.totalDays===0 &&


<p className="mt-5 text-sm text-muted">

Both dates are the same — difference is 0 days.

</p>


}









</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>





<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Set start date

</h3>


<p className="text-muted">

Select the start date from the date picker.

</p>


</div>







<div>

<h3 className="font-bold">

2. Set end date

</h3>


<p className="text-muted">

Select the end date — past or future,
any range works.

</p>


</div>







<div>

<h3 className="font-bold">

3. View the difference

</h3>


<p className="text-muted">

See the result in years, months, days,
weeks, hours, and minutes.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool calculates the exact difference
between any two dates — past or future —
showing the result in years, months, weeks,
days, hours, and minutes simultaneously.

</p>







<h3 className="text-xl font-bold mt-8">

Why it's not just total days ÷ conversion factors

</h3>




<p className="mt-4 text-muted leading-7">

The calculator walks forward from the earlier
date to the later date, counting whole years,
then months, then days. This gives a more
accurate calendar difference than dividing
total days by average conversion values.

</p>








<h3 className="text-xl font-bold mt-8">

Inclusive vs. exclusive end date

</h3>






<p className="mt-4 text-muted leading-7">

By default, the difference is calculated
exclusive of the end date. The result shows
the actual span between dates without adding
the end date as an extra day.

</p>







<h3 className="text-xl font-bold mt-8">

Examples

</h3>






<p className="mt-4 text-muted leading-7">

Days until an event:
From 13 July 2026 to 25 December 2026:
165 days — useful for countdown planning
to weddings, deadlines, or holidays.

</p>






<p className="mt-4 text-muted leading-7">

Duration of employment:
From 1 March 2020 to 15 September 2026:
6 years, 6 months, 14 days — useful for
calculating tenure or contract duration.

</p>








<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>




<ul className="mt-4 list-disc pl-6 text-muted space-y-2">

<li>
Counting down or up to future events
</li>

<li>
Calculating employment or contract duration
</li>

<li>
Legal and administrative date calculations
</li>

</ul>








<h3 className="text-xl font-bold mt-8">

Tips

</h3>





<p className="mt-4 text-muted leading-7">

If you need the count to include the end date
as a full day, manually add one day to the
result for legal or contractual situations.

</p>





<p className="mt-4 text-muted leading-7">

For calculating age from birth date to today,
use the dedicated Age Calculator because it
is designed specifically for age calculations.

</p>






</section>







</div>

</div>

);

}