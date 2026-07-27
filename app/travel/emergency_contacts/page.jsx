"use client";

import {useState} from "react";
import Link from "next/link";


export default function EmergencyContacts(){


const countries={

India:{
code:"IN",
name:"India",
flag:"🇮🇳",
currency:"INR (₹)",
language:"Hindi, English",

emergency:{
Police:"100",
Fire:"101",
Ambulance:"102",
Tourist:"1363"
},

phrases:[
["Help!","Madad karo! / Help!","Ma-dad ka-ro"],
["I need a doctor","Mujhe doctor chahiye","Mu-jhay doctor cha-hi-yay"],
["Call the police","Police ko bulao","Po-lees ko bu-lao"],
["Where is the hospital?","Aspatal kahan hai?","As-pa-tal ka-han hai"],
["Thank you","Shukriya","Shuk-ri-ya"],
["How much?","Kitna?","Kit-na"]
]

},


UAE:{
code:"AE",
name:"UAE",
flag:"🇦🇪",
currency:"AED",
language:"Arabic, English",

emergency:{
Police:"999",
Fire:"997",
Ambulance:"998",
Tourist:"8004444"
},

phrases:[
["Help!","Musaada","Mu-saa-da"],
["I need a doctor","Ana ahtaj tabib","A-na ah-taj ta-beeb"],
["Thank you","Shukran","Shuk-ran"]
]

},


Saudi:{
code:"SA",
name:"Saudi Arabia",
flag:"🇸🇦",
currency:"SAR",
language:"Arabic",

emergency:{
Police:"999",
Fire:"998",
Ambulance:"997",
Tourist:"930"
},

phrases:[
["Help!","Musaada","Mu-saa-da"],
["Thank you","Shukran","Shuk-ran"]
]

},


USA:{
code:"US",
name:"USA",
flag:"🇺🇸",
currency:"USD",
language:"English",

emergency:{
Police:"911",
Fire:"911",
Ambulance:"911",
Tourist:"311"
},

phrases:[
["Help!","Help!","Help"],
["Doctor","I need a doctor","Ai need doctor"]
]

},


UK:{
code:"GB",
name:"UK",
flag:"🇬🇧",
currency:"GBP",
language:"English",

emergency:{
Police:"999",
Fire:"999",
Ambulance:"999",
Tourist:"101"
},

phrases:[
["Help!","Help!","Help"]
]

},


Germany:{
code:"DE",
name:"Germany",
flag:"🇩🇪",
currency:"EUR",
language:"German",

emergency:{
Police:"110",
Fire:"112",
Ambulance:"112",
Tourist:"115"
},

phrases:[
["Help!","Hilfe","Hil-fe"]
]

},


France:{
code:"FR",
name:"France",
flag:"🇫🇷",
currency:"EUR",
language:"French",

emergency:{
Police:"17",
Fire:"18",
Ambulance:"15",
Tourist:"112"
},

phrases:[
["Help!","Aidez-moi","E-de mwa"]
]

},


Australia:{
code:"AU",
name:"Australia",
flag:"🇦🇺",
currency:"AUD",
language:"English",

emergency:{
Police:"000",
Fire:"000",
Ambulance:"000",
Tourist:"131008"
},

phrases:[
["Help!","Help!","Help"]
]

},


Singapore:{
code:"SG",
name:"Singapore",
flag:"🇸🇬",
currency:"SGD",
language:"English",

emergency:{
Police:"999",
Fire:"995",
Ambulance:"995",
Tourist:"1800"
},

phrases:[
["Help!","Tolong","To-long"]
]

},


Thailand:{
code:"TH",
name:"Thailand",
flag:"🇹🇭",
currency:"THB",
language:"Thai",

emergency:{
Police:"191",
Fire:"199",
Ambulance:"1669",
Tourist:"1155"
},

phrases:[
["Help!","Chuay duay","Chu-ay"]
]

},


Japan:{
code:"JP",
name:"Japan",
flag:"🇯🇵",
currency:"JPY",
language:"Japanese",

emergency:{
Police:"110",
Fire:"119",
Ambulance:"119",
Tourist:"050"
},

phrases:[
["Help!","Tasukete","Ta-su-ke-te"]
]

},


Malaysia:{
code:"MY",
name:"Malaysia",
flag:"🇲🇾",
currency:"MYR",
language:"Malay",

emergency:{
Police:"999",
Fire:"994",
Ambulance:"999",
Tourist:"1300"
},

phrases:[
["Help!","Tolong","To-long"]
]

}


};



const [selected,setSelected]=useState("India");

const [copied,setCopied]=useState("");

const data=countries[selected];



function copy(text,id){

navigator.clipboard.writeText(text);

setCopied(id);

setTimeout(()=>setCopied(""),1500);

}




return(


<div
className="min-h-screen px-6 py-12"
style={{
background:"var(--background)",
color:"var(--foreground)"
}}
>


<div className="max-w-4xl mx-auto">



<div className="text-sm text-muted">

<Link href="/" className="hover:text-blue-500">

Home

</Link>

{" / Travel / "}

<span>

Emergency Contacts & Phrase Hub

</span>

</div>




<h1 className="text-5xl font-bold mt-6">

Emergency Contacts & Phrase Hub

</h1>


<p className="text-muted mt-3">

Emergency numbers and essential travel phrases.

</p>







<div className="mt-8 bg-card border rounded-2xl p-6">



<label className="text-sm font-semibold">

Select country

</label>



<div className="flex flex-wrap gap-3 mt-4">


{

Object.keys(countries).map(item=>(


<button

key={item}

onClick={()=>setSelected(item)}

className={`px-4 py-2 rounded-xl text-sm ${
selected===item
?"bg-blue-600 text-white"
:"bg-input"
}`}

>


{countries[item].code}

&nbsp;

{countries[item].name}


</button>


))


}


</div>








<div className="mt-8 flex gap-4 items-center">


<div className="text-3xl">

{data.code}

</div>


<div>


<h2 className="text-xl font-bold">

{data.name}

</h2>


<p className="text-muted">

{data.currency} · {data.language}

</p>


</div>


</div>









<h2 className="mt-8 font-bold">

🚨 Emergency Numbers

</h2>





<div className="grid md:grid-cols-2 gap-4 mt-5">


{

Object.entries(data.emergency).map(([name,num])=>(



<div

key={name}

className={`rounded-xl border p-5 ${
name==="Police"
?"border-blue-600 bg-blue-950/20"
:
name==="Fire"
?"border-red-600 bg-red-950/20"
:
name==="Ambulance"
?"border-green-600 bg-green-950/20"
:
"border-purple-600 bg-purple-950/20"
}`}


>


<div className="flex justify-between">


<div>


<p className="text-sm text-muted">

{name}

</p>


<a

href={`tel:${num}`}

className="text-3xl font-bold"

>

{num}

</a>


<p className="text-sm text-muted">

Tap number to call

</p>


</div>


<button

onClick={()=>copy(num,name)}

className="bg-input px-3 py-1 rounded-lg text-sm"

>

{copied===name?"Copied":"Copy"}

</button>


</div>


</div>



))

}


</div>








<div className="mt-4 bg-input rounded-xl p-5 flex justify-between">


<div>


<p className="text-sm text-muted">

Universal emergency (works everywhere)

</p>


<p className="text-xl font-bold">

112

</p>


</div>



<button

onClick={()=>copy("112","112")}

className="bg-card px-4 rounded-lg"

>

{copied==="112"?"Copied":"Copy"}

</button>


</div>




<p className="mt-4 text-sm text-muted">

Verified 2026-06

</p>







<h2 className="mt-8 font-bold">

💬 Essential Phrases

</h2>





<div className="space-y-3 mt-4">


{

data.phrases.map((item,index)=>(


<div

key={index}

className="bg-input rounded-xl p-4 flex justify-between"


>


<div>


<p className="text-sm text-muted">

{item[0]}

</p>


<p className="font-bold">

{item[1]}

</p>


<p className="text-blue-400 text-sm">

🔊 {item[2]}

</p>


</div>


<button

onClick={()=>copy(item[1],index)}

className="bg-card px-3 rounded-lg text-sm"

>

{copied===index?"Copied":"Copy"}

</button>



</div>


))


}


</div>







</div>


</div>


</div>


)

}