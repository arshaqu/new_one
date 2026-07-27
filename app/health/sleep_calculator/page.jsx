"use client";

import Link from "next/link";
import { useState } from "react";


export default function SleepCalculatorPage(){


const [mode,setMode] =
useState("wake");



const [time,setTime] =
useState("");



const [results,setResults] =
useState([]);









const cycles = [

{
cycle:7,
hours:10.5,
label:"Recommended",
emoji:"😊"
},

{
cycle:6,
hours:9,
label:"Good",
emoji:"🙂"
},

{
cycle:5,
hours:7.5,
label:"Fair",
emoji:"😐"
},

{
cycle:4,
hours:6,
label:"Minimum",
emoji:"😔"
}

];









function formatTime(date){



return new Intl.DateTimeFormat(

"en-US",

{

hour:"2-digit",

minute:"2-digit",

hour12:true

}

).format(date);


}









function getNow(){


const now =
new Date();


setTime(

now.toTimeString()
.slice(0,5)

);


}









function calculateSleep(){



if(!time)
return;





const [hours,minutes] =
time
.split(":")
.map(Number);





let base =
new Date();



base.setHours(
hours
);

base.setMinutes(
minutes
);

base.setSeconds(0);









let output=[];









cycles.forEach(item=>{



let result =
new Date(base);





const minutesChange =

item.cycle *
90;






if(mode==="wake"){



// Work backwards from wake time

result.setMinutes(

result.getMinutes()
-
minutesChange
-
15

);



}

else{



// Work forward from sleep time

result.setMinutes(

result.getMinutes()
+
minutesChange
+
15

);



}









output.push({

time:formatTime(result),

cycle:item.cycle,

sleep:item.hours,

label:item.label,

emoji:item.emoji

});



});


setResults(output);


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

Sleep Calculator

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Sleep Calculator

</h1>






<p className="mt-3 text-muted">

Find the best bedtime or wake-up time based
on 90-minute sleep cycles. Wake up refreshed
by timing your alarm to the end of a cycle.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<div className="flex gap-4">


<button

onClick={()=>setMode("wake")}

className={`px-5 py-3 rounded-lg border ${
mode==="wake"
?
"bg-indigo-600 text-white"
:
""
}`}

>

I want to wake up at…

</button>







<button

onClick={()=>setMode("sleep")}

className={`px-5 py-3 rounded-lg border ${
mode==="sleep"
?
"bg-indigo-600 text-white"
:
""
}`}

>

I want to sleep at…

</button>



</div>









<div className="mt-8">


<label className="text-sm text-muted">

{
mode==="wake"
?
"Wake-up time"
:
"Bedtime"
}

</label>





<div className="flex gap-3 mt-2">


<input

type="time"

value={time}

onChange={
e=>
setTime(
e.target.value
)
}

className="bg-input border rounded-md px-3 py-2"

/>







<button

onClick={getNow}

className="px-5 py-2 rounded-lg border"

>

Now

</button>



</div>








<p className="mt-4 text-muted">

💡 Includes 15 minutes to fall asleep.
Each sleep cycle is 90 minutes of light,
deep, and REM sleep.

</p>


</div>









<button

onClick={calculateSleep}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Calculate

</button>









{

results.length>0 &&


<div className="mt-10">



<h2 className="text-2xl font-bold">

{
mode==="wake"
?
"Go to sleep at…"
:
"Wake up at…"
}

</h2>








<div className="grid md:grid-cols-2 gap-5 mt-6">



{

results.map((item,index)=>(


<div

key={index}

className="border rounded-xl p-5"

>


<div className="text-3xl">

{item.emoji}

</div>





<h3 className="text-xl font-bold mt-3">

{item.time}

</h3>





<p className="mt-2 text-muted">

{item.cycle} cycles · {item.sleep}
hours of sleep

</p>







<p className="mt-3 font-medium">

{item.label}

</p>






</div>


))


}



</div>








<p className="mt-6 text-sm text-muted">

Most adults need 5–6 complete cycles
(7.5–9 hours) for optimal rest.

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

1. Choose your mode

</h3>


<p className="text-muted">

Select Wake-up time if you know when you
need to wake, or Bedtime if you know when
you want to sleep.

</p>


</div>







<div>

<h3 className="font-bold">

2. Enter the time

</h3>


<p className="text-muted">

Type your target wake-up time or bedtime.
Click Now to use the current time.

</p>


</div>







<div>

<h3 className="font-bold">

3. Pick the best option

</h3>


<p className="text-muted">

Choose from recommended sleep times —
6 cycles (9 hours) or 5 cycles (7.5 hours)
are ideal.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This calculator finds the optimal bedtime or
wake-up time based on 90-minute sleep cycles,
so your alarm lines up with the end of a cycle
rather than interrupting deep sleep.

</p>







<h3 className="text-xl font-bold mt-8">

Why sleep cycles matter for how rested you feel

</h3>





<p className="mt-4 text-muted leading-7">

Sleep progresses through roughly 90-minute
cycles of light sleep, deep sleep, and REM
sleep. Waking near the end of a cycle often
feels more refreshing than waking during deep
sleep.

</p>








<h3 className="text-xl font-bold mt-8">

The two calculation modes

</h3>





<p className="mt-4 text-muted leading-7">

If you know your wake-up time, the calculator
works backwards in 90-minute steps to suggest
bedtimes. If you know your bedtime, it works
forward to suggest wake-up times and adds
around 15 minutes for falling asleep.

</p>







</section>







</div>

</div>

);

}