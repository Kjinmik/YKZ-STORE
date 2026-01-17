const enchantImg="https://i.imgur.com/PEvL7hw.png";
const diamondImg="https://i.imgur.com/1S5YNGM.png";

const enchantments=[
 ["Eficiencia V",5000],
 ["Inquebrável III",10000]
];

const items=[
 ["64 Esmeraldas",6400],
 ["Totem Da Imortalidade",3500].
];

const cart={};
let discountPercent=0;

function render(){
  enchantments.forEach(([n,p])=>createItem("encantamentos",enchantImg,n,p));
  items.forEach(([n,p])=>createItem("itens",diamondImg,n,p));
}

function createItem(id,img,n,p){
  cart[n]=0;
  document.getElementById(id).innerHTML+=`
  <div class="item">
    <img src="${img}">
    <span>${n}</span>
    <b>${p}</b>
    <div class="qty">
      <button onclick="add('${n}',-1)">−</button>
      <span id="q-${n}">0</span>
      <button onclick="add('${n}',1)">+</button>
    </div>
  </div>`;
}

function add(n,v){
  cart[n]=Math.max(0,cart[n]+v);
  document.getElementById("q-"+n).innerText=cart[n];
  updateCart();
}

function updateCart(){
  let total=0;
  let html="";
  for(let i in cart){
    if(cart[i]>0){
      const price=getPrice(i);
      const sub=cart[i]*price;
      total+=sub;
      html+=`<div>${cart[i]}x ${i} - ${sub}</div>`;
    }
  }
  if(discountPercent>0){
    total-=total*discountPercent;
  }
  document.getElementById("cartList").innerHTML=html;
  document.getElementById("total").innerText=Math.floor(total);
}

function getPrice(n){
  return [...enchantments,...items].find(x=>x[0]==n)[1];
}

function applyCoupon(){
  discountPercent=0;
  if(cupom.value.toUpperCase()==="VIP10"){
    discountPercent=0.10;
  }
  updateCart();
}

function buy(){
  if(!nick.value.trim()){
    alert("Digite seu nick para continuar.");
    return;
  }

  let msg=`Olá! Quero comprar:\n👤 Nick: ${nick.value}\n\n🛒 Itens:\n`;
  for(let i in cart) if(cart[i]>0) msg+=`• ${cart[i]}x ${i}\n`;
  msg+=`\n🎟 Cupom: ${cupom.value||"Nenhum"}\n\nTotal: ${total.innerText}`;
  window.open("https://wa.me/5515998438443?text="+encodeURIComponent(msg));
}

function setTheme(t){
  document.body.className="theme-"+t;
  particleColor=t;
}

function toggleCat(btn){
  btn.nextElementSibling.classList.toggle("open");
}

/* PARTICLES */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
let particleColor="dark";
let particles=[];

function resize(){
  canvas.width=innerWidth;
  canvas.height=innerHeight;
}
window.onresize=resize;
resize();

for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*3+1,
    s:Math.random()*0.6+0.2
  });
}

function color(){
  return {
    dark:"#ffffff",
    light:"#111111",
    rose:"#ffb6d5",
    marine:"#7ddcff"
  }[particleColor];
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=color();
  particles.forEach(p=>{
    p.y-=p.s;
    if(p.y<0)p.y=canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
render();

