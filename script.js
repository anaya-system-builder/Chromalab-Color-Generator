let currentColor={r:0,g:0,b:0};
let history=[];
let autoInterval=null;
let isAuto=false;

function randomColor(){
return{
r:Math.floor(Math.random()*256),
g:Math.floor(Math.random()*256),
b:Math.floor(Math.random()*256)
};

}
function rgbToHex(r,g,b){
return "#"+
[r,g,b]
.map(x=>x.toString(16).padStart(2,"0"))
.join("");
}

function rgbToHsl(r,g,b){
r/=255;
g/=255;
b/=255;
let max=Math.max(r,g,b);
let min=Math.min(r,g,b);
let l=(max+min)/2;
let h,s;

if(max===min){
h=s=0;
}

else{
let d=max-min;
s=l>0.5?
d/(2-max-min):
d/(max+min);


switch(max){
case r:
h=(g-b)/d;
break;
case g:
h=(b-r)/d+2;
break;
case b:
h=(r-g)/d+4;
break;
}

h*=60;
if(h<0)h+=360;
}
return `hsl(${Math.round(h)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;

}

function updateUI(){
let {r,g,b}=currentColor;
let hex=rgbToHex(r,g,b);
let hsl=rgbToHsl(r,g,b);

document.getElementById("preview")
.style.backgroundColor=hex;

document.getElementById("hex")
.textContent=hex;

document.getElementById("rgb")
.textContent=`rgb(${r},${g},${b})`;

document.getElementById("hsl")
.textContent=hsl;

document.getElementById("r").value=r;
document.getElementById("g").value=g;
document.getElementById("b").value=b;

document.getElementById("rval").textContent=r;

document.getElementById("gval").textContent=g;

document.getElementById("bval").textContent=b;

addToHistory(hex);

}

function addToHistory(color){

if(history[0]!==color){

history.unshift(color);

}


history=history.slice(0,12);


let historyDiv=document.getElementById("history");

historyDiv.innerHTML="";


history.forEach(c=>{

let div=document.createElement("div");

div.style.backgroundColor=c;


div.onclick=()=>{

currentColor=hexToRgb(c);

updateUI();

};


historyDiv.appendChild(div);

});

}



function hexToRgb(hex){

let bigint=parseInt(hex.slice(1),16);


return{

r:(bigint>>16)&255,

g:(bigint>>8)&255,

b:bigint&255

};

}



document.getElementById("generate").onclick=()=>{
currentColor=randomColor();
updateUI();
};



document.getElementById("preview").onclick=()=>{
currentColor=randomColor();
updateUI();
};



document.getElementById("copy").onclick=()=>{

navigator.clipboard.writeText(

document.getElementById("hex").textContent

);

showToast();

};



function showToast(){

let toast=document.getElementById("toast");

toast.classList.add("show");


setTimeout(()=>{

toast.classList.remove("show");

},1500);

}



const autoBtn=document.getElementById("auto");


autoBtn.onclick=()=>{

isAuto=!isAuto;


if(isAuto){

autoBtn.textContent="AUTO-OFF";


autoInterval=setInterval(()=>{

currentColor=randomColor();

updateUI();

},1400);

}

else{

autoBtn.textContent="AUTO-ON";
clearInterval(autoInterval);

}

};



["r","g","b"]

.forEach(id=>{
document.getElementById(id)
.oninput=(e)=>{
currentColor[id]=Number(e.target.value);

updateUI();

};

});



document.getElementById("reset").onclick=()=>{

history=[];

currentColor={r:0,g:0,b:0};
updateUI();
};

document.addEventListener("keydown",(e)=>{

if(e.code==="Space"){
currentColor=randomColor();
updateUI();
}
});
updateUI();