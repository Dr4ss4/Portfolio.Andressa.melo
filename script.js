// Utilitários
const $ = (q,ctx=document)=>ctx.querySelector(q);
const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

// Ano no rodapé
$('#year').textContent = new Date().getFullYear();

// Tema com preferência salva
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme){ root.setAttribute('data-theme', savedTheme); themeToggle.textContent = savedTheme==='light'?'☀':'☾' }
themeToggle.addEventListener('click', ()=>{
  const current = root.getAttribute('data-theme')==='light' ? 'light' : 'dark';
  const next = current==='light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  themeToggle.textContent = next==='light'?'☀':'☾';
  localStorage.setItem('theme', next);
});

// Scroll reveal simples
const onScroll = () => {
  const vh = window.innerHeight;
  $$('.reveal').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < vh - 60) el.classList.add('show');
  })
}
document.addEventListener('scroll', onScroll, {passive:true});
window.addEventListener('load', onScroll);

// Barras de skill animadas
window.addEventListener('load', ()=>{
  $$('.skill .fill').forEach(el=>{
    const pct = el.style.getPropertyValue('--w') || '70%';
    requestAnimationFrame(()=>{ el.style.width = pct; el.style.transition = 'width 1s ease' })
  })
});

// Filtros de projetos
const grid = $('#projectGrid');
$$('.filters .btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const f = btn.dataset.filter;
    $$('.filters .btn').forEach(b=>b.classList.remove('primary'));
    btn.classList.add('primary');
    $$('#projectGrid .card').forEach(card=>{
      if(f==='all') { card.style.display='flex'; return }
      const cats = (card.dataset.cat||'').split(' ');
      card.style.display = cats.includes(f) ? 'flex' : 'none';
    })
  })
});

// Links de projetos funcionam normalmente
$$('#projectGrid .actions a').forEach(a=>{
  a.addEventListener('click', ()=>{
    // não intercepta, abre direto o href
  });
});


// Copiar email
$('#copyMail').addEventListener('click', async ()=>{
  const email = $('#mailLink').textContent.trim();
  try{ await navigator.clipboard.writeText(email); $('#copyMail').textContent='Copiado!'; setTimeout(()=>$('#copyMail').textContent='Copiar', 1600) }catch{ alert('Não foi possível copiar.'); }
});

// Formulário: validação básica + mailto
$('#contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const nome = $('#nome').value.trim();
  const from = $('#email').value.trim();
  const msg = $('#mensagem').value.trim();
  if(!nome || !from || !msg){ alert('Preencha todos os campos.'); return }
  const subject = encodeURIComponent(`[Portfólio] Mensagem de ${nome}`);
  const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${from}\n\nMensagem:\n${msg}`);
  const to = 'andressaoliveirapr03@gmail.com';
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  $('#sentFlag').style.display='inline';
  e.target.reset();
});
