"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";


export default function QRCodeGeneratorPage(){


const canvasRef = useRef(null);



const [type,setType] = useState("url");


const [url,setUrl] = useState("https://example.com");

const [text,setText] = useState("");

const [wifiName,setWifiName] = useState("");

const [wifiPassword,setWifiPassword] = useState("");

const [wifiSecurity,setWifiSecurity] = useState("WPA");

const [phone,setPhone] = useState("");

const [email,setEmail] = useState("");



const [size,setSize] = useState(256);



const [foreground,setForeground] = useState("#000000");

const [background,setBackground] = useState("#ffffff");



const [qrGenerated,setQrGenerated] = useState(false);




function getQRData(){


switch(type){



case "url":

return url;


case "text":

return text;


case "wifi":

return `WIFI:S:${wifiName};T:${wifiSecurity};P:${wifiPassword};;`;


case "phone":

return `tel:${phone}`;


case "email":

return `mailto:${email}`;


default:

return "";

}


}


async function generateQR(){



const data =
getQRData();



if(!data){

setQrGenerated(false);

return;

}



try{



await QRCode.toCanvas(

canvasRef.current,

data,

{

width:size,

margin:2,

color:{

dark:foreground,

light:background

}

}

);



setQrGenerated(true);



}

catch(error){


console.log(error);


}


}

useEffect(()=>{


generateQR();


},[

type,

url,

text,

wifiName,

wifiPassword,

wifiSecurity,

phone,

email,

size,

foreground,

background

]);


function downloadQR(){


const canvas =
canvasRef.current;



if(!canvas)
return;



const link =
document.createElement("a");



link.download =
"qr-code.png";



link.href =
canvas.toDataURL(
"image/png"
);



link.click();

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

QR Code Generator

</span>


</div>


<h1 className="text-5xl font-bold mt-6">

QR Code Generator

</h1>


<p className="mt-3 text-muted">

Generate QR codes for URLs, text, WiFi,
phone numbers, and emails.
Download as PNG. Free and instant.

</p>


<div className="mt-8 bg-card border rounded-xl p-6">


<div className="flex flex-wrap gap-3">



{

[

["url","URL"],

["text","Text"],

["wifi","WiFi"],

["phone","Phone"],

["email","Email"]

].map(([value,label])=>(


<button

key={value}

onClick={()=>setType(value)}

className={`px-4 py-2 rounded-lg border ${
type===value
?
"bg-indigo-600 text-white"
:
""
}`}

>

{label}

</button>


))


}



</div>


<div className="mt-6 space-y-4">


{

type==="url" &&


<input

value={url}

onChange={
e=>setUrl(
e.target.value
)
}

placeholder="https://example.com"

className="w-full bg-input border rounded-md px-3 py-2"

/>


}


{

type==="text" &&


<textarea

value={text}

onChange={
e=>setText(
e.target.value
)
}

placeholder="Enter text"

className="w-full bg-input border rounded-md px-3 py-2"

/>


}

{

type==="wifi" &&


<>


<input

value={wifiName}

onChange={
e=>setWifiName(
e.target.value
)
}

placeholder="WiFi name"

className="w-full bg-input border rounded-md px-3 py-2"

/>


<select

value={wifiSecurity}

onChange={
e=>setWifiSecurity(
e.target.value
)
}

className="w-full bg-input border rounded-md px-3 py-2"

>

<option value="WPA">

WPA

</option>


<option value="WEP">

WEP

</option>


<option value="">

None

</option>


</select>


<input

type="password"

value={wifiPassword}

onChange={
e=>setWifiPassword(
e.target.value
)
}

placeholder="WiFi password"

className="w-full bg-input border rounded-md px-3 py-2"

/>


</>


}


{

type==="phone" &&


<input

value={phone}

onChange={
e=>setPhone(
e.target.value
)
}

placeholder="Phone number"

className="w-full bg-input border rounded-md px-3 py-2"

/>


}


{

type==="email" &&


<input

value={email}

onChange={
e=>setEmail(
e.target.value
)
}

placeholder="Email address"

className="w-full bg-input border rounded-md px-3 py-2"

/>


}



</div>


<div className="mt-8">


<label className="text-sm text-muted">

Size: {size}px

</label>


<input

type="range"

min="128"

max="1024"

step="64"

value={size}

onChange={
e=>setSize(
Number(e.target.value)
)
}

className="w-full mt-3"

/>


</div>


<div className="mt-6 grid md:grid-cols-2 gap-5">



<div>


<label className="text-sm text-muted">

Foreground

</label>


<input

type="color"

value={foreground}

onChange={
e=>setForeground(
e.target.value
)
}

className="mt-2 w-full h-10"

/>


</div>


<div>


<label className="text-sm text-muted">

Background

</label>


<input

type="color"

value={background}

onChange={
e=>setBackground(
e.target.value
)
}

className="mt-2 w-full h-10"

/>


</div>

</div>



<div className="mt-8 flex flex-col items-center">



<canvas

ref={canvasRef}

className="border rounded-lg"

/>



{

!qrGenerated &&

<p className="mt-4 text-sm text-muted">

Enter content above to generate

</p>

}



</div>


<button

onClick={downloadQR}

disabled={!qrGenerated}

className="mt-8 px-6 py-3 rounded-lg bg-indigo-600 text-white"

>

Download PNG

</button>



</div>


<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>

<div className="mt-6 space-y-6">



<div>

<h3 className="font-bold">

1. Choose content type

</h3>


<p className="text-muted">

Select URL, Text, WiFi, Phone, or Email
from the mode tabs.

</p>


</div>


<div>

<h3 className="font-bold">

2. Enter your content

</h3>


<p className="text-muted">

Type the URL, text, or details you want
to encode into the QR code.

</p>


</div>


<div>

<h3 className="font-bold">

3. Customize and download

</h3>


<p className="text-muted">

Adjust size and colors, then click
Download PNG to save your QR code.

</p>


</div>

</div>

</section>

<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

QR codes encode text, links, or contact data
into a scannable grid of black-and-white
squares. Built-in error correction allows
the code to remain readable even if part of
it is damaged.

</p>


<h3 className="text-xl font-bold mt-8">

What's actually inside the code

</h3>


<p className="mt-4 text-muted leading-7">

Different QR data types use specific formats.
For example, WiFi credentials are encoded as
WIFI:S:name;T:WPA;P:password;; so phones
recognize them as a network connection.

</p>


<h3 className="text-xl font-bold mt-8">

Error correction and size

</h3>

<p className="mt-4 text-muted leading-7">

QR codes contain redundant information so
scanners can still read them even when part
of the code is damaged. Larger sizes and
higher contrast improve scanning reliability.

</p>

</section>

</div>

</div>

);

}