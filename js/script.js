const LOGO='assets/quesano-logo.png';
document.querySelectorAll('.logo-src').forEach(i=>i.src=LOGO);
const PH='573102981542', P=14000, fmt=v=>'$'+v.toLocaleString('es-CO');

const F=[
 {
   full:'Queso costeño tradicional',
   tag:'El clásico costeño',
   image:'assets/queso-costeno-tradicional.jpeg',
   imageAlt:'Queso costeño tradicional natural servido en una mesa',
   d:'El auténtico queso costeño artesanal en presentación redonda tradicional. Sabor suave para acompañar tus comidas.'
 },
 {
   full:'Queso costeño con ají',
   tag:'Con toque de ají',
   image:'assets/queso-costeno-picante.jpeg',
   imageAlt:'Queso picante gourmet Quesaño con trozos de ají',
   d:'Variedad anaranjada con trocitos de ají visible y un toque picante único. Ideal para picar o asados.'
 },
 {
   full:'Queso costeño con finas hierbas',
   tag:'Aromático y fresco',
   image:'assets/queso-costeno-finas-hierbas.jpeg',
   imageAlt:'Queso con finas hierbas acompañado de pimentón rojo y cebolla morada',
   d:'Queso redondo salpicado con finas hierbas integradas. Exquisito para tablas de quesos y gratinados.'
 }
];

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
upd();

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
