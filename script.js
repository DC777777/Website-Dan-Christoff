const TOKEN = "BewerbungDC";
function initGate(){
  const gate = document.getElementById('gate');
  const content = document.getElementById('content');
  if(!gate || !content) return;
  const ok = (new URLSearchParams(location.search).get('k') === TOKEN) || (localStorage.getItem('gate_ok') === TOKEN);
  if(ok){ gate.style.display='none'; content.style.display='block'; localStorage.setItem('gate_ok',TOKEN); }
  else{ gate.style.display='flex'; content.style.display='none'; }
  const form = document.getElementById('gateForm');
  if(form) form.addEventListener('submit', e=>{
    e.preventDefault();
    const v = document.getElementById('pin').value.trim();
    if(v===TOKEN){ localStorage.setItem('gate_ok',TOKEN); gate.style.display='none'; content.style.display='block'; }
  });
}
function setActiveNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .navlinks a').forEach(a=>{ if(a.getAttribute('href')===here) a.classList.add('active'); });
}
function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved==='dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
  const t = document.getElementById('themeToggle');
  if(t) t.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark')?'dark':'light');
  });
}
window.addEventListener('DOMContentLoaded', ()=>{ initGate(); setActiveNav(); initTheme(); });
