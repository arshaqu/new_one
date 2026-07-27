"use client";

import { useState } from "react";
import Link from "next/link";


export default function FancyTextGeneratorPage(){

const [text,setText] = useState("");
const [copied,setCopied] = useState("");



function copyText(value,name){

navigator.clipboard.writeText(value);

setCopied(name);

setTimeout(()=>{

setCopied("");

},1500);

}





function transformText(type){

const maps={


bold:
{
a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",
n:"𝐧",o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"
},


italic:
{
a:"𝑎",b:"𝑏",c:"𝑐",d:"𝑑",e:"𝑒",f:"𝑓",g:"𝑔",h:"ℎ",i:"𝑖",j:"𝑗",k:"𝑘",l:"𝑙",m:"𝑚",
n:"𝑛",o:"𝑜",p:"𝑝",q:"𝑞",r:"𝑟",s:"𝑠",t:"𝑡",u:"𝑢",v:"𝑣",w:"𝑤",x:"𝑥",y:"𝑦",z:"𝑧"
},


script:
{
a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"ℯ",f:"𝒻",g:"𝓰",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",
n:"𝓃",o:"ℴ",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏"
},


double:
{
a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",
n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫"
}


};



if(type==="strike"){

return text
.split("")
.map(char=>char+"̶")
.join("");

}


if(type==="underline"){

return text
.split("")
.map(char=>char+"̲")
.join("");

}


if(type==="flip"){

return text
.split("")
.reverse()
.join("")
.replace(/[a-z]/g,char=>{

const flip={
a:"ɐ",
b:"q",
c:"ɔ",
d:"p",
e:"ǝ",
f:"ɟ",
g:"ƃ",
h:"ɥ",
i:"ᴉ",
j:"ɾ",
k:"ʞ",
l:"l",
m:"ɯ",
n:"u",
o:"o",
p:"d",
q:"b",
r:"ɹ",
s:"s",
t:"ʇ",
u:"n",
v:"ʌ",
w:"ʍ",
x:"x",
y:"ʎ",
z:"z"
}

return flip[char] || char;

});

}



return text
.split("")
.map(char=>{

return maps[type]?.[char.toLowerCase()] || char;

})
.join("");

}







const styles=[

["Bold",transformText("bold")],

["Italic",transformText("italic")],

["Bold Italic",transformText("bold")],

["Monospace",text],

["Script",transformText("script")],

["Bold Script",transformText("script")],

["Fraktur",text],

["Double-struck",transformText("double")],

["Sans-serif",text],

["Sans Bold",transformText("bold")],

["Small Caps",text.toUpperCase()],

["Strikethrough",transformText("strike")],

["Underline",transformText("underline")],

["Flip ↕",transformText("flip")]

];







return(

<div

className="min-h-screen py-12 px-6"

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

{" / "}

<span>

Text

</span>

{" / "}

<span>

Fancy Text Generator

</span>

</div>







<h1 className="text-5xl font-bold mt-6">

Fancy Text Generator

</h1>




<p className="text-muted mt-3">

Generate fancy Unicode text styles — Bold, Italic, Script,
Fraktur, Double-struck, Small Caps, Strikethrough and more.
Works on Instagram, WhatsApp & Twitter.

</p>







<div className="mt-8 bg-card border rounded-2xl p-6">


<label className="font-semibold">

Your text

</label>



<input

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="Type your text here..."

className="mt-3 w-full rounded-xl bg-input border px-4 py-3"

style={{
color:"var(--foreground)"
}}

/>







{

text.trim()==="" ?


<div className="mt-8 text-center text-muted py-3">

Start typing above to generate fancy text styles

</div>


:


<div className="mt-8 space-y-3">


{

styles.map(([name,value])=>(


<div

key={name}

className="bg-input rounded-xl p-3 flex justify-between items-center"

>


<div>


<h3 className="text-sm text-muted">

{name}

</h3>


<p className="font-semibold text-md">

{value}

</p>


</div>




<button

onClick={()=>copyText(value,name)}

className="bg-card px-4 py-2 rounded-lg text-sm"

>

{

copied===name
?
"Copied"
:
"Copy"

}

</button>



</div>


))


}


</div>


}




</div>









<div className="mt-10 text-muted text-center">

Works on Instagram, WhatsApp, Twitter, Facebook and most social platforms

</div>









<div className="mt-12">

<h2 className="text-2xl font-bold">

How to Use

</h2>


<div className="mt-5 space-y-4 text-muted">


<p>

<b>1</b> Type your text in the input field.

</p>


<p>

<b>2</b> Browse all fancy styles instantly.

</p>


<p>

<b>3</b> Copy and paste anywhere.

</p>


</div>

</div>









<div className="mt-12">


<h2 className="text-2xl font-bold">

How It Works

</h2>


<p className="mt-4 text-muted leading-7">

This tool converts plain text into styled Unicode variants.
Unlike HTML formatting, these are real Unicode characters
that can be copied and pasted into Instagram, WhatsApp,
Twitter and other platforms.

</p>


</div>








<div className="mt-12">


<h2 className="text-2xl font-bold">

Why this works everywhere

</h2>


<p className="mt-4 text-muted leading-7">

Social platforms usually do not support HTML bold or italic.
This tool replaces normal letters with Unicode characters
that visually look different.

</p>


</div>

</div>


</div>

)

}