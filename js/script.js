const LOGO='assets/quesano-logo.png';
document.querySelectorAll('.logo-src').forEach(i=>i.src=LOGO);
const PH='573102981542', P=14000, fmt=v=>'$'+v.toLocaleString('es-CO');

const F=[
 {
   n:'Tradicional',
   full:'Queso costeño tradicional',
   tag:'El clásico costeño',
   image:'assets/queso-costeno-tradicional.jpeg',
   imageAlt:'Queso costeño tradicional natural servido en una mesa',
   base:'#FAF3DF', edge:'#E5D19A', labelBg:'#F7F0D8',
   d:'El auténtico queso costeño artesanal en presentación redonda tradicional. Sabor suave para acompañar tus comidas.'
 },
 {
   n:'Picante',
   full:'Queso costeño con ají',
   tag:'Con toque de ají',
   image:'assets/queso-costeno-picante.jpeg',
   imageAlt:'Queso picante gourmet Quesaño con trozos de ají',
   base:'#F2AC6B', edge:'#D87B37', labelBg:'#FCE5C8',
   d:'Variedad anaranjada con trocitos de ají visible y un toque picante único. Ideal para picar o asados.'
 },
 {
   n:'Finas hierbas',
   full:'Queso costeño con finas hierbas',
   tag:'Aromático y fresco',
   image:'assets/queso-costeno-finas-hierbas.jpeg',
   imageAlt:'Queso con finas hierbas acompañado de pimentón rojo y cebolla morada',
   base:'#E6EED0', edge:'#A8BD7A', labelBg:'#EEF3E2',
   d:'Queso redondo salpicado con finas hierbas integradas. Exquisito para tablas de quesos y gratinados.'
 }
];

function rnd(s){return()=>(s=Math.imul(s^s>>>15,1|s),s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296)}

function cheese(i){
  const f=F[i], r=rnd(19+i*31);
  let o='';
  
  o+='<ellipse cx="200" cy="335" rx="145" ry="32" fill="#174B3A" opacity=".18"/>';
  
  o+='<path d="M 60 200 L 60 275 C 60 325 340 325 340 275 L 340 200 Z" fill="'+f.edge+'"/>';
  
  o+='<ellipse cx="200" cy="200" rx="140" ry="85" fill="'+f.base+'" stroke="'+f.edge+'" stroke-width="4"/>';
  
  if(i === 1) {
    for(let k=0; k<65; k++){
      const angle = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 118;
      const x = 200 + Math.cos(angle) * rad;
      const y = 200 + Math.sin(angle) * (rad * 0.58);
      const sz = 2.5 + r() * 4;
      o+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="'+sz.toFixed(1)+'" ry="'+(sz*0.6).toFixed(1)+'" fill="#C8342F" opacity=".88" transform="rotate('+(r()*360|0)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>';
    }
  } else if(i === 2) {
    for(let k=0; k<75; k++){
      const angle = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 122;
      const x = 200 + Math.cos(angle) * rad;
      const y = 200 + Math.sin(angle) * (rad * 0.58);
      const sz = 2 + r() * 3.5;
      o+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="'+sz.toFixed(1)+'" ry="'+(sz*0.5).toFixed(1)+'" fill="#2C592B" opacity=".85" transform="rotate('+(r()*360|0)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>';
    }
  } else {
    for(let k=0; k<40; k++){
      const angle = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 115;
      const x = 200 + Math.cos(angle) * rad;
      const y = 200 + Math.sin(angle) * (rad * 0.58);
      o+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(2 + r()*3.5).toFixed(1)+'" fill="'+f.edge+'" opacity=".55"/>';
    }
  }

  o+='<ellipse cx="200" cy="195" rx="68" ry="42" fill="'+f.labelBg+'" stroke="#D18F08" stroke-width="3"/>';
  o+='<ellipse cx="200" cy="195" rx="64" ry="38" fill="none" stroke="#252A25" stroke-width="1.5" stroke-dasharray="3 3"/>';
  
  o+='<image href="'+LOGO+'" x="154" y="152" width="92" height="64" preserveAspectRatio="xMidYMid meet"/>';

  if(i === 0) {
    o+='<path d="M 160 215 Q 200 225 240 215 L 235 228 Q 200 236 165 228 Z" fill="#E2C77A"/>';
    o+='<text x="200" y="225" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="9" fill="#252A25">Tradicional</text>';
  } else if(i === 1) {
    o+='<path d="M 155 215 Q 200 226 245 215 L 240 228 Q 200 238 160 228 Z" fill="#C8342F"/>';
    o+='<text x="200" y="225" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="9" fill="#FFFFFF">Picante</text>';
  } else {
    o+='<path d="M 150 215 Q 200 226 250 215 L 245 228 Q 200 238 155 228 Z" fill="#2C592B"/>';
    o+='<text x="200" y="225" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="8.5" fill="#FFFFFF">Finas hierbas</text>';
  }

  if(i === 1) {
    o+='<g transform="translate(225, 280) rotate(-15)">';
    o+='<path d="M 0 0 Q 32 18 55 0 Q 32 28 0 0 Z" fill="#C8342F" stroke="#8B1A17" stroke-width="2"/>';
    o+='<path d="M 0 0 Q -8 -10 -15 -5" fill="none" stroke="#2C592B" stroke-width="3" stroke-linecap="round"/>';
    o+='</g>';
  } else if(i === 2) {
    o+='<g transform="translate(255, 275)">';
    o+='<path d="M 0 20 Q 15 0 35 10 Q 15 25 0 20 Z" fill="#4F805B" stroke="#22422A" stroke-width="1.5"/>';
    o+='<path d="M 10 28 Q 25 15 45 28 Q 20 40 10 28 Z" fill="#386143" stroke="#22422A" stroke-width="1.5"/>';
    o+='</g>';
  }

  return o;
}

const cover=document.getElementById('cover');

function draw(i){
  cover.innerHTML=cheese(i);
  document.querySelectorAll('.pick button').forEach((b,j)=>b.setAttribute('aria-pressed',j===i));
  sel.selectedIndex=i;
  upd();
}

document.querySelectorAll('.pick button').forEach(b=>b.onclick=()=>draw(+b.dataset.f));

document.getElementById('cat').innerHTML=F.map((f,i)=>`
  <article class="card prod rev">
    <div class="pic" data-flavor="${i}">
      <img src="${f.image}" alt="${f.imageAlt}" loading="lazy" decoding="async">
      <span class="tg">${f.tag}</span>
    </div>
    <div class="bd">
      <h3>${f.full}</h3>
      <p style="margin:0;color:var(--muted);font-size:.9rem">${f.d}</p>
      <div class="row">
        <div class="price">${fmt(P)}<small>COP / unidad (500 g)</small></div>
        <button class="btn" data-a="${i}" style="padding:10px 18px">Agregar</button>
      </div>
    </div>
  </article>
`).join('');

document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
  window.quesanoCart.add(+b.dataset.a,1);
  window.quesanoCart.open(true);
});

const orderForm=document.querySelector('#pedido form');
const orderFields=document.getElementById('orderFields');
const orderReview=document.getElementById('orderReview');
const reviewItems=document.getElementById('reviewItems');
const reviewTotal=document.getElementById('reviewTotal');
const nameInput=document.getElementById('nm');
const sel=document.getElementById('sel');
const qs=document.getElementById('qs');
const ent=document.getElementById('ent');
const addressInput=document.getElementById('ci');
const notesInput=document.getElementById('de');
const reviewedName=document.getElementById('reviewName');
const reviewedDelivery=document.getElementById('reviewDelivery');
const reviewedAddress=document.getElementById('reviewAddress');
const reviewedNotes=document.getElementById('reviewNotes');
const reviewedNotesRow=document.getElementById('reviewNotesRow');
const orderStatus=document.getElementById('orderStatus');
const sendOrderButton=document.getElementById('sendOrder');
let reviewedOrder=null;

sel.innerHTML=F.map(f=>`<option>${f.full}</option>`).join('');
qs.innerHTML=Array.from({length:12},(_,k)=>`<option value="${k+1}"${k===0?' selected':''}>${k+1} unidad${k?'es':''} (500g c/u)</option>`).join('');

function upd(){
  document.getElementById('tot').textContent=fmt(+qs.value*P);
}

sel.onchange=()=>draw(sel.selectedIndex);
qs.onchange=upd;

document.getElementById('add').onclick=()=>{
  window.quesanoCart.add(sel.selectedIndex,+qs.value);
  window.quesanoCart.open(true);
};

function buildOrder(){
  const cartItems=window.quesanoCart.getItems();
  const fromCart=cartItems.length>0;
  const items=cartItems.length
    ? cartItems.map(item=>({name:item.product.full,quantity:item.quantity}))
    : [{name:sel.value,quantity:+qs.value}];

  return {
    name:nameInput.value.trim(),
    fromCart,
    cartSnapshot:cartItems.map(item=>`${item.index}:${item.quantity}`).sort().join('|'),
    items,
    delivery:ent.value,
    address:addressInput.value.trim(),
    notes:notesInput.value.trim(),
    total:items.reduce((sum,item)=>sum+item.quantity*P,0)
  };
}

function showOrderReview(){
  if(!orderForm.reportValidity()) return;

  reviewedOrder=buildOrder();
  reviewItems.replaceChildren();
  reviewedOrder.items.forEach(item=>{
    const line=document.createElement('p');
    line.textContent=`${item.quantity} x ${item.name} (500 g) — ${fmt(item.quantity*P)}`;
    reviewItems.append(line);
  });
  reviewedName.textContent=reviewedOrder.name;
  reviewedDelivery.textContent=reviewedOrder.delivery;
  reviewedAddress.textContent=reviewedOrder.address;
  reviewedNotes.textContent=reviewedOrder.notes;
  reviewedNotesRow.hidden=!reviewedOrder.notes;
  reviewTotal.textContent=`${fmt(reviewedOrder.total)} COP`;
  orderStatus.hidden=true;
  sendOrderButton.disabled=false;
  orderFields.hidden=true;
  orderReview.hidden=false;
  orderReview.scrollIntoView({behavior:'smooth',block:'nearest'});
  document.getElementById('orderReviewTitle').focus({preventScroll:true});
}

document.getElementById('reviewOrder').addEventListener('click',showOrderReview);

document.getElementById('editOrder').addEventListener('click',()=>{
  reviewedOrder=null;
  orderStatus.hidden=true;
  sendOrderButton.disabled=false;
  orderReview.hidden=true;
  orderFields.hidden=false;
  nameInput.focus();
});

sendOrderButton.addEventListener('click',()=>{
  if(!reviewedOrder) return;

  const currentCart=window.quesanoCart.getItems();
  const currentCartSnapshot=currentCart.map(item=>`${item.index}:${item.quantity}`).sort().join('|');
  if((reviewedOrder.fromCart&&currentCartSnapshot!==reviewedOrder.cartSnapshot)||(!reviewedOrder.fromCart&&currentCart.length)){
    reviewedOrder=null;
    sendOrderButton.disabled=true;
    orderStatus.textContent='La canasta cambió después de la revisión. Edita los datos y vuelve a revisar el pedido antes de continuar.';
    orderStatus.hidden=false;
    return;
  }

  const lines=reviewedOrder.items
    .map(item=>`• ${item.quantity} x ${item.name} (500 g)`)
    .join('\n');
  const message=[
    'Hola QUESANO, quiero realizar este pedido:',
    '',
    lines,
    '',
    `Nombre de quien recibe: ${reviewedOrder.name}`,
    `Método de entrega: ${reviewedOrder.delivery}`,
    `Dirección o punto de recogida: ${reviewedOrder.address}`,
    reviewedOrder.notes?`Indicaciones: ${reviewedOrder.notes}`:'',
    `Total estimado: ${fmt(reviewedOrder.total)} COP.`
  ].filter(Boolean).join('\n');

  const whatsappWindow=window.open(`https://wa.me/${PH}?text=${encodeURIComponent(message)}`,'_blank');
  if(!whatsappWindow){
    orderStatus.textContent='No se pudo abrir WhatsApp. Permite ventanas emergentes para continuar o inténtalo nuevamente.';
    orderStatus.hidden=false;
  } else {
    whatsappWindow.opener=null;
  }
});

orderForm.addEventListener('reset',()=>{
  reviewedOrder=null;
  orderStatus.hidden=true;
  sendOrderButton.disabled=false;
  orderReview.hidden=true;
  orderFields.hidden=false;
});

const who=[
 {t:'Para tu hogar',d:'Queso costeño fresco y sabroso para tus desayunos, arepas y comidas de la semana.',l:['Envío directo a domicilio empacado al vacío','Mantiene su frescura en refrigeración por semanas','Ideal para rallar, freír o consumirse directo']},
 {t:'Para tu restaurante o cafetería',d:'Queso costeño artesanal para desayunos, preparaciones y menús de tu negocio.',l:['Atención para pedidos recurrentes','Consulta disponibilidad y condiciones por WhatsApp','Orientación para elegir una presentación']},
 {t:'Para tu tienda o minimarket',d:'Una presentación artesanal para ofrecer a tus clientes.',l:['Empaque al vacío de 500 g','Consulta disponibilidad para tu negocio','Atención directa por WhatsApp']}
];

function tab(i){
  const x=who[i];
  pt.textContent=x.t;
  pd.textContent=x.d;
  pl.innerHTML=x.l.map(a=>'<li>'+a+'</li>').join('');
  document.querySelectorAll('.tabs button').forEach((b,j)=>b.setAttribute('aria-selected',j===i));
}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>tab(+b.dataset.t));

document.querySelectorAll('.hero > div, section .wrap > .eyebrow, section .wrap > h2, section .wrap > .sub, section .split, section .ord, section .contact, footer .wrap > *')
  .forEach(el=>el.classList.add('rev'));
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null;
document.querySelectorAll('.rev').forEach(el=>io?io.observe(el):el.classList.add('in'));

tab(0);
draw(0);

const themeToggle=document.getElementById('themeToggle');
const systemPrefersDark=window.matchMedia('(prefers-color-scheme: dark)');

function updateThemeButton(){
  const isDark=document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme==='dark'
    : systemPrefersDark.matches;
  themeToggle.setAttribute('aria-pressed',String(isDark));
  themeToggle.setAttribute('aria-label',`Cambiar a modo ${isDark?'claro':'oscuro'}`);
  themeToggle.querySelector('span').textContent=isDark?'☀':'☾';
}

themeToggle.addEventListener('click',()=>{
  const isDark=document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme==='dark'
    : systemPrefersDark.matches;
  const nextTheme=isDark?'light':'dark';
  document.documentElement.dataset.theme=nextTheme;
  updateThemeButton();
  try {
    localStorage.setItem('quesano-theme',nextTheme);
  } catch(error) {
    console.warn('No se pudo guardar la preferencia de tema.',error);
  }
});

updateThemeButton();
