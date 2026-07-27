"use client";

import Link from "next/link";
import { useState, useEffect } from "react";


export default function ColorConverterPage(){


const [hex,setHex] = useState("#3b82f6");


const [rgb,setRgb] = useState({

r:59,

g:130,

b:246

});



const [hsl,setHsl] = useState({

h:217,

s:91,

l:60

});



const [cmyk,setCmyk] = useState({

c:76,

m:47,

y:0,

k:4

});



const [copied,setCopied] = useState("");









function hexToRgb(hexValue){


let value =
hexValue.replace("#","");



if(value.length===3){

value =
value.split("")
.map(
x=>x+x
)
.join("");

}



const number =
parseInt(
value,
16
);



return {

r:
(number >> 16) & 255,


g:
(number >> 8) & 255,


b:
number & 255

};


}









function rgbToHex(r,g,b){


return (

"#" +

[

r,

g,

b

]

.map(
x=>

{

const hex =
x.toString(16);

return hex.length===1
?
"0"+hex
:
hex;

}

)

.join("")

.toUpperCase()

);


}









function rgbToHsl(r,g,b){



r/=255;

g/=255;

b/=255;



const max =
Math.max(
r,g,b
);


const min =
Math.min(
r,g,b
);



let h;

let s;

const l =
(max+min)/2;



if(max===min){

h=0;

s=0;

}

else{


const d =
max-min;



s =
l>0.5
?
d/(2-max-min)
:
d/(max+min);



switch(max){



case r:

h =
(g-b)/d +
(g<b?6:0);

break;



case g:

h =
(b-r)/d + 2;

break;



case b:

h =
(r-g)/d + 4;

break;



}



h =
h/6;



}



return {

h:Math.round(h*360),

s:Math.round(s*100),

l:Math.round(l*100)

};


}









function rgbToCmyk(r,g,b){


let r1 =
r/255;


let g1 =
g/255;


let b1 =
b/255;



const k =
1 -
Math.max(
r1,
g1,
b1
);



if(k===1){

return {

c:0,

m:0,

y:0,

k:100

};

}



return {


c:
Math.round(
((1-r1-k)/(1-k))*100
),



m:
Math.round(
((1-g1-k)/(1-k))*100
),



y:
Math.round(
((1-b1-k)/(1-k))*100
),



k:
Math.round(
k*100
)



};


}









function updateFromRgb(r,g,b){


const newHex =
rgbToHex(
r,
g,
b
);



const newHsl =
rgbToHsl(
r,
g,
b
);



const newCmyk =
rgbToCmyk(
r,
g,
b
);



setRgb({

r,

g,

b

});


setHex(newHex);


setHsl(newHsl);


setCmyk(newCmyk);


}









function handleHexChange(value){



setHex(value);



if(
value.match(
/^#[0-9A-Fa-f]{6}$/
)

){



const color =
hexToRgb(value);



updateFromRgb(

color.r,

color.g,

color.b

);



}



}









function copyText(value,name){



navigator.clipboard.writeText(value);



setCopied(name);



setTimeout(()=>{


setCopied("");

},1500);



}









useEffect(()=>{


updateFromRgb(

rgb.r,

rgb.g,

rgb.b

);


},[]);


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

Color Converter

</span>


</div>








<h1 className="text-5xl font-bold mt-6">

Color Converter

</h1>






<p className="mt-3 text-muted">

Convert colors between HEX, RGB, HSL,
and CMYK instantly. Visual color picker
included. Copy any format with one click.

</p>









<div className="mt-8 bg-card border rounded-xl p-6">







<div className="flex flex-col md:flex-row gap-6">



<div className="flex-1">


<label className="text-sm text-muted">

HEX

</label>


<div className="flex gap-3 mt-2">


<input

type="color"

value={hex}

onChange={
e=>
handleHexChange(
e.target.value
)
}

className="w-16 h-12 rounded"

/>





<input

value={hex}

onChange={
e=>
handleHexChange(
e.target.value
)
}

className="flex-1 bg-input border rounded-md px-3"

/>


</div>


</div>









<div

className="w-full md:w-40 h-32 rounded-xl border"

style={{

background:hex

}}

/>



</div>









<div className="mt-8 space-y-5">






<div className="border rounded-xl p-4">


<h3 className="font-bold">

HEX

</h3>


<div className="flex justify-between mt-2">


<p>

{hex.toUpperCase()}

</p>



<button

onClick={()=>
copyText(
hex.toUpperCase(),
"hex"
)
}

className="text-blue-500"

>

{

copied==="hex"

?

"Copied"

:

"Copy"

}

</button>


</div>


</div>








<div className="border rounded-xl p-4">


<h3 className="font-bold">

RGB

</h3>



<div className="flex justify-between mt-2">


<p>

rgb(
{rgb.r},
{rgb.g},
{rgb.b}
)

</p>



<button

onClick={()=>
copyText(
`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
"rgb"
)

}

className="text-blue-500"

>

{

copied==="rgb"

?

"Copied"

:

"Copy"

}

</button>


</div>


</div>








<div className="border rounded-xl p-4">


<h3 className="font-bold">

HSL

</h3>



<div className="flex justify-between mt-2">


<p>

hsl(
{hsl.h}°,
{hsl.s}%,
{hsl.l}%
)

</p>



<button

onClick={()=>
copyText(
`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
"hsl"
)

}

className="text-blue-500"

>

{

copied==="hsl"

?

"Copied"

:

"Copy"

}

</button>


</div>


</div>









<div className="border rounded-xl p-4">


<h3 className="font-bold">

CMYK

</h3>



<div className="flex justify-between mt-2">


<p>

cmyk(
{cmyk.c}%,
{cmyk.m}%,
{cmyk.y}%,
{cmyk.k}%
)

</p>



<button

onClick={()=>
copyText(
`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
"cmyk"
)

}

className="text-blue-500"

>

{

copied==="cmyk"

?

"Copied"

:

"Copy"

}

</button>


</div>


</div>






</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

Adjust RGB

</h2>







{

[

["R","r"],

["G","g"],

["B","b"]

].map(([label,key])=>(


<div
key={key}
className="mt-4"
>


<label className="text-sm text-muted">

{label}

</label>


<input

type="range"

min="0"

max="255"

value={rgb[key]}

onChange={
e=>

updateFromRgb(

key==="r"
?
Number(e.target.value)
:
rgb.r,

key==="g"
?
Number(e.target.value)
:
rgb.g,

key==="b"
?
Number(e.target.value)
:
rgb.b

)

}

className="w-full"

/>


<p>

{rgb[key]}

</p>


</div>


))


}



</div>









<div className="mt-10">


<h2 className="text-xl font-bold">

Adjust HSL

</h2>


<p className="mt-4 text-muted">

H {hsl.h}°

</p>

<p className="text-muted">

S {hsl.s}%

</p>

<p className="text-muted">

L {hsl.l}%

</p>


</div>









</div>









<section className="mt-12">


<h2 className="text-2xl font-bold">

How to Use

</h2>




<div className="mt-6 space-y-6">


<div>

<h3 className="font-bold">

1. Pick a color

</h3>


<p className="text-muted">

Use the color picker or type a HEX code
directly into the input.

</p>


</div>





<div>

<h3 className="font-bold">

2. View all formats

</h3>


<p className="text-muted">

HEX, RGB, HSL, and CMYK values are shown
and updated instantly.

</p>


</div>





<div>

<h3 className="font-bold">

3. Copy your format

</h3>


<p className="text-muted">

Click Copy next to any format to copy it
to your clipboard.

</p>


</div>


</div>


</section>









<section className="mt-12 pb-10">


<h2 className="text-2xl font-bold">

How It Works

</h2>





<p className="mt-4 text-muted leading-7">

This tool converts a color between HEX,
RGB, HSL, and CMYK simultaneously, with
a visual picker — useful whenever a design
tool or codebase needs a different color
format.

</p>







<h3 className="text-xl font-bold mt-8">

What each format is actually for

</h3>




<p className="mt-4 text-muted leading-7">

HEX and RGB are commonly used in web design
and CSS. HSL is easier for humans to adjust
because it describes hue, saturation, and
lightness. CMYK is mainly used for print
because printers mix physical ink.

</p>







<h3 className="text-xl font-bold mt-8">

Why RGB-to-CMYK conversion is approximate

</h3>



<p className="mt-4 text-muted leading-7">

RGB uses emitted screen light while CMYK
uses absorbed ink on paper. Because they
represent different color models, conversion
between them is always an approximation.

</p>





</section>







</div>

</div>

);

}