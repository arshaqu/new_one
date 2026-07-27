"use client";

import Link from "next/link";
import { useState } from "react";


export default function PregnancyDueDateCalculatorPage(){


const [method,setMethod] =
useState("lmp");


const [date,setDate] =
useState("");



const [result,setResult] =
useState(null);









const methods = [

{
id:"lmp",
title:"Last Period (LMP)",
description:"First day of your last period"
},

{
id:"conception",
title:"Conception date",
description:"Date of ovulation / conception"
},

{
id:"ivf3",
title:"IVF (Day 3 transfer)",
description:"Day 3 embryo transfer date"
},

{
id:"ivf5",
title:"IVF (Day 5 transfer)",
description:"Day 5 blastocyst transfer date"
}

];









function addDays(input,days){


const result =
new Date(input);



result.setDate(
result.getDate()+days
);



return result;


}









function formatDate(value){


return new Intl.DateTimeFormat(
"en-US",
{
year:"numeric",
month:"long",
day:"numeric"
}
)
.format(value);


}









function calculateDueDate(){



if(!date)
return;





let dueDate;





const selectedDate =
new Date(date);








if(method==="lmp"){


dueDate =
addDays(
selectedDate,
280
);


}







if(method==="conception"){


dueDate =
addDays(
selectedDate,
266
);


}








if(method==="ivf3"){


dueDate =
addDays(
selectedDate,
263
);


}








if(method==="ivf5"){


dueDate =
addDays(
selectedDate,
261
);


}









const today =
new Date();





const pregnancyStart =
addDays(
dueDate,
-280
);






const passedDays =
Math.floor(

(today - pregnancyStart)
/
(1000*60*60*24)

);









const totalDays =
280;







let weeks =
Math.floor(
passedDays / 7
);



let days =
passedDays % 7;








if(weeks<0){

weeks=0;
days=0;

}








if(weeks>40){

weeks=40;
days=0;

}









let trimester =
"First trimester";





if(weeks>=13 && weeks<27){

trimester =
"Second trimester";

}





if(weeks>=27){

trimester =
"Third trimester";

}









let progress =
Math.round(

(passedDays /
totalDays)
*
100

);







if(progress<0)
progress=0;



if(progress>100)
progress=100;









setResult({

dueDate:formatDate(dueDate),

weeks,

days,

trimester,

progress

});



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

Pregnancy Due Date Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Pregnancy Due Date Calculator

</h1>






<p className="mt-3 text-muted">

Calculate your pregnancy due date from last
menstrual period, conception date, or IVF
transfer date. Shows current week, trimester,
and key milestones.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<h2 className="font-bold">

Calculation method

</h2>








<div className="grid md:grid-cols-2 gap-4 mt-5">



{

methods.map(item=>(


<button

key={item.id}

onClick={()=>setMethod(item.id)}

className={`text-left p-4 rounded-xl border ${
method===item.id
?
"bg-indigo-600 text-white"
:
""
}`}

>


<h3 className="font-bold">

{item.title}

</h3>


<p className="text-sm mt-1">

{item.description}

</p>


</button>


))


}



</div>









<div className="mt-8">


<label className="text-sm text-muted">

{

method==="lmp"

?

"Last Period (LMP) date"

:

method==="conception"

?

"Conception date"

:

"IVF transfer date"

}

</label>






<input

type="date"

value={date}

onChange={(e)=>
setDate(e.target.value)
}

onClick={(e)=>{
if(e.target.showPicker){
e.target.showPicker();
}
}}

className="
mt-2
bg-input
border
rounded-md
border
px-3
py-2
w-full
md:w-1/3
cursor-pointer
"

/>



</div>









<button

onClick={calculateDueDate}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Calculate Due Date

</button>









{

result &&


<div className="mt-10 border rounded-xl p-6">





<h2 className="text-2xl font-bold">

Estimated due date

</h2>





<p className="text-4xl font-bold mt-4">

{result.dueDate}

</p>








<div className="grid md:grid-cols-3 gap-5 mt-8">





<div className="border rounded-xl p-5">


<h3 className="font-bold">

Current week

</h3>


<p className="text-3xl font-bold mt-2">

{result.weeks}

<span className="text-lg">

w

</span>

{" "}

{result.days}

<span className="text-lg">

d

</span>

</p>


</div>







<div className="border rounded-xl p-5">


<h3 className="font-bold">

Trimester

</h3>


<p className="text-xl font-bold mt-3">

{result.trimester}

</p>


</div>







<div className="border rounded-xl p-5">


<h3 className="font-bold">

Progress

</h3>


<p className="text-3xl font-bold mt-2">

{result.progress}%

</p>


</div>






</div>








<div className="mt-8">


<h3 className="text-xl font-bold">

Key milestones

</h3>





<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>

Week 12: First trimester complete

</li>


<li>

Week 20: Detailed anatomy scan period

</li>


<li>

Week 28: Third trimester begins

</li>


<li>

Week 37: Pregnancy reaches full term

</li>


</ul>



</div>







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

1. Choose calculation method

</h3>


<p className="text-muted">

Select Last Period (LMP), Conception date,
or IVF transfer date depending on what you know.

</p>


</div>







<div>

<h3 className="font-bold">

2. Enter the date

</h3>


<p className="text-muted">

Pick the relevant date from the date picker.

</p>


</div>







<div>

<h3 className="font-bold">

3. View your due date

</h3>


<p className="text-muted">

See your estimated due date, current week,
trimester, progress percentage, and key
milestones.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This calculator estimates your due date using
the same methods obstetricians use — Naegele's
Rule from your last menstrual period, or direct
offset calculations from conception or IVF
transfer dates.

</p>







<h3 className="text-xl font-bold mt-8">

Naegele's Rule (from Last Menstrual Period)

</h3>





<p className="mt-4 text-muted leading-7">

Add 280 days (40 weeks) to the first day of
your last menstrual period. Pregnancy is dated
from the LMP even though conception usually
happens around two weeks later.

</p>








<h3 className="text-xl font-bold mt-8">

From a known conception or IVF date

</h3>





<p className="mt-4 text-muted leading-7">

For a known conception date, the due date is
calculated as 266 days later. IVF calculations
use the transfer date plus the embryo age,
making them one of the most precise methods
because fertilization timing is known.

</p>







</section>







</div>

</div>

);

}