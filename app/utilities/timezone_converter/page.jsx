"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function TimezoneConverterPage(){


const timezoneList = [

{
city:"Kolkata",
region:"Asia",
zone:"Asia/Kolkata"
},

{
city:"New York",
region:"America",
zone:"America/New_York"
},

{
city:"London",
region:"Europe",
zone:"Europe/London"
},

{
city:"Dubai",
region:"Asia",
zone:"Asia/Dubai"
},

{
city:"Singapore",
region:"Asia",
zone:"Asia/Singapore"
},

{
city:"Tokyo",
region:"Asia",
zone:"Asia/Tokyo"
},

{
city:"Sydney",
region:"Australia",
zone:"Australia/Sydney"
},

{
city:"Los Angeles",
region:"America",
zone:"America/Los_Angeles"
},

{
city:"Paris",
region:"Europe",
zone:"Europe/Paris"
}

];









const [mode,setMode] =
useState("live");



const [currentTime,setCurrentTime] =
useState(
new Date()
);



const [customTime,setCustomTime] =
useState("05:50");



const [zones,setZones] =
useState([

"Asia/Kolkata",

"America/New_York",

"Europe/London",

"Asia/Dubai"

]);









useEffect(()=>{


if(mode!=="live")
return;



const timer =
setInterval(()=>{


setCurrentTime(
new Date()
);


},1000);



return ()=>clearInterval(timer);



},[mode]);









function formatTime(
zone
){



const date =
mode==="live"

?

currentTime

:

getCustomDate();





return new Intl.DateTimeFormat(

"en-US",

{

timeZone:zone,

hour:"2-digit",

minute:"2-digit",

second:"2-digit",

hour12:true

}

).format(date);



}









function formatDate(
zone
){


const date =
mode==="live"

?

currentTime

:

getCustomDate();





return new Intl.DateTimeFormat(

"en-US",

{

timeZone:zone,

weekday:"short",

month:"short",

day:"numeric"

}

).format(date);



}









function getOffset(
zone
){


const date =
new Date();



const formatter =
new Intl.DateTimeFormat(

"en-US",

{

timeZone:zone,

timeZoneName:"shortOffset"

}

);



const parts =
formatter.formatToParts(date);



const offset =
parts.find(

item=>

item.type==="timeZoneName"

);



return offset
?
offset.value
:
"UTC";


}









function getCustomDate(){


const [hour,minute] =
customTime.split(":")
.map(Number);



const date =
new Date();



date.setHours(
hour
);

date.setMinutes(
minute
);

date.setSeconds(
0
);



return date;


}









function addTimezone(){



if(zones.length>=5)
return;



setZones([

...zones,

"Asia/Tokyo"

]);



}









function removeTimezone(index){



if(zones.length<=1)
return;



setZones(

zones.filter(
(_,i)=>
i!==index
)

);



}









function updateTimezone(
index,
value
){



const updated =
[...zones];



updated[index]=value;



setZones(updated);



}









function getTimezoneInfo(zone){



return timezoneList.find(

item=>

item.zone===zone

)

||
{

city:zone,

region:"",

zone

};


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
href="/utilities"
className="hover:text-blue-500"
>

Utilities

</Link>


{" / "}


<span>

Timezone Converter

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Timezone Converter

</h1>






<p className="mt-3 text-muted">

Convert time across multiple time zones
instantly. Compare up to 5 cities side by side.
Perfect for scheduling international meetings.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<div className="flex gap-3 mb-8">


<button

onClick={()=>setMode("live")}

className={`px-5 py-2 rounded-lg border ${
mode==="live"
?
"bg-indigo-600 text-white"
:
""
}`}

>

Live clock

</button>







<button

onClick={()=>setMode("custom")}

className={`px-5 py-2 rounded-lg border ${
mode==="custom"
?
"bg-indigo-600 text-white"
:
""
}`}

>

Custom time

</button>



</div>









{

mode==="custom" &&


<div className="mb-8">


<label className="text-sm text-muted">

Select time

</label>


<input

type="time"

value={customTime}

onChange={
e=>
setCustomTime(
e.target.value
)
}

className="mt-2 bg-input border rounded-md px-3 py-2"

/>


</div>


}









<div className="space-y-5">



{

zones.map((zone,index)=>{


const info =
getTimezoneInfo(zone);



return (


<div

key={index}

className="border rounded-xl p-5"

>






<div className="flex justify-between items-center">


<div>

<h3 className="font-bold text-lg">

{info.city}

</h3>


<p className="text-sm text-muted">

{info.region}

</p>


</div>






{

zones.length>1 &&


<button

onClick={()=>removeTimezone(index)}

className="text-red-500"

>

×

</button>


}



</div>








<select

value={zone}

onChange={
e=>
updateTimezone(
index,
e.target.value
)
}

className="mt-4 w-full bg-input border rounded-md px-3 py-2"

>


{

timezoneList.map(item=>(


<option

key={item.zone}

value={item.zone}

>

{item.city} — {item.region}

</option>


))


}



</select>









<div className="mt-5">


<p className="text-3xl font-bold">

{formatTime(zone)}

</p>


<p className="text-muted">

{formatDate(zone)}

</p>


<p className="text-sm text-muted mt-2">

{getOffset(zone)}

</p>


</div>






</div>


)


})


}



</div>









{

zones.length<5 &&


<button

onClick={addTimezone}

className="mt-8 px-5 py-3 rounded-lg border"

>

+ Add timezone

</button>


}









</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>





<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Choose mode

</h3>


<p className="text-muted">

Select Live clock to see current times,
or Custom time to enter a specific time.

</p>


</div>







<div>

<h3 className="font-bold">

2. Add timezones

</h3>


<p className="text-muted">

Each row shows a city. Change the city using
the dropdown, or add up to 5 zones.

</p>


</div>







<div>

<h3 className="font-bold">

3. Compare times

</h3>


<p className="text-muted">

All zones update simultaneously so you can
compare times side by side.

</p>


</div>




</div>



</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool converts time across multiple
timezones simultaneously, comparing up to
5 cities side by side. It helps schedule
meetings and calls across different regions
without manual UTC calculations.

</p>







<h3 className="text-xl font-bold mt-8">

IANA timezones and automatic DST handling

</h3>





<p className="mt-4 text-muted leading-7">

The tool uses the browser's built-in Intl API
with standard IANA timezone identifiers such
as "America/New_York" and "Asia/Kolkata".
This automatically handles Daylight Saving
Time changes.

</p>








<h3 className="text-xl font-bold mt-8">

Why simple UTC-offset math often goes wrong

</h3>





<p className="mt-4 text-muted leading-7">

Fixed UTC offsets can become inaccurate during
Daylight Saving Time changes. Using specific
city timezone names avoids these scheduling
mistakes.

</p>








<h3 className="text-xl font-bold mt-8">

Examples

</h3>





<p className="mt-4 text-muted leading-7">

Scheduling an international meeting:
Compare New York, London, Dubai, and Mumbai
times instantly instead of calculating each
offset manually.

</p>







<p className="mt-4 text-muted leading-7">

Checking DST transitions:
Compare cities during March or November
changes to see the correct local times.

</p>









<h3 className="text-xl font-bold mt-8">

Common Use Cases

</h3>




<ul className="mt-4 list-disc pl-6 text-muted space-y-2">


<li>
Scheduling meetings across countries
</li>


<li>
Checking flight, event, or livestream times
</li>


<li>
Comparing multiple cities for international planning
</li>


</ul>








<h3 className="text-xl font-bold mt-8">

Tips

</h3>






<p className="mt-4 text-muted leading-7">

Always use specific city names instead of
fixed UTC offsets when accuracy matters,
especially around Daylight Saving Time periods.

</p>







<p className="mt-4 text-muted leading-7">

Double-check cities in countries with
multiple timezones, such as the US or
Australia, because selecting the wrong city
can create incorrect conversions.

</p>







</section>







</div>

</div>

);

}