const ratingQuestions=[
 [2,'qualidade','Como você avalia a qualidade e o sabor da nossa comida?'],
 [3,'variedade','Como você avalia a variedade do nosso buffet?'],
 [4,'atendimento','Como você avalia nosso atendimento?'],
 [5,'limpeza','Como você avalia a limpeza e organização do restaurante?'],
 [6,'custo_beneficio','Como você avalia o custo-benefício do restaurante?']
];
const labels=['Muito ruim','Ruim','Regular','Bom','Excelente'];
const ratings=document.querySelector('#ratings');
ratingQuestions.forEach(([n,name,title])=>{const s=document.createElement('section');s.className='card';s.innerHTML=`<div class="num">${n}</div><h2>${title}</h2><div class="rating" data-required>${[1,2,3,4,5].map((v,i)=>`<label><input type="radio" name="${name}" value="${v}"><span><b>★</b>${v}<br><small>${labels[i]}</small></span></label>`).join('')}</div>`;ratings.appendChild(s)});
document.querySelector('#nps').innerHTML=Array.from({length:11},(_,v)=>`<label><input type="radio" name="recomendacao" value="${v}"><span>${v}</span></label>`).join('');
const form=document.querySelector('#survey'), bar=document.querySelector('#bar'), ptxt=document.querySelector('#progressText');
function answered(){let n=0;document.querySelectorAll('[data-required]').forEach(g=>{if(g.querySelector('input:checked'))n++});bar.style.width=(n/11*100)+'%';ptxt.textContent=`${n} de 11 respondidas`;return n}
form.addEventListener('change',answered);answered();
form.addEventListener('submit',async e=>{e.preventDefault();const err=document.querySelector('#error');err.style.display='none';if(answered()<11){err.textContent='Por favor, responda todas as perguntas obrigatórias antes de enviar.';err.style.display='block';err.scrollIntoView({behavior:'smooth',block:'center'});return}const fd=new FormData(form);const data=Object.fromEntries(fd.entries());data.sobremesas=fd.getAll('sobremesas');const btn=form.querySelector('.submit');btn.disabled=true;btn.textContent='Enviando...';try{const r=await fetch('/api/respostas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();form.hidden=true;document.querySelector('.intro').hidden=true;document.querySelector('#thanks').hidden=false;window.scrollTo({top:0,behavior:'smooth'})}catch(e){err.textContent='Não foi possível enviar agora. Tente novamente em instantes.';err.style.display='block';btn.disabled=false;btn.textContent='Enviar minha opinião'}});
