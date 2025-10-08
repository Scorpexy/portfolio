

// Header shadow on scroll
document.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 8);
});

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Curtain reveal
window.addEventListener('load', () => {
  const c = document.getElementById('curtain');
  if (!c) return;
  if (!prefersReduced){
    setTimeout(() => c.classList.add('hide'), 600);
    setTimeout(() => c.remove(), 1400);
  } else {
    c.remove();
  }
});

// this does some freaky calculations so the cool cursor glow works :)
document.addEventListener('pointermove', (e) => {
  if (prefersReduced) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.setProperty('--mx', `${x}%`);
  document.body.style.setProperty('--my', `${y}%`);
});

// more glow tracking
document.querySelectorAll('#hero .cta a:first-child').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    btn.style.setProperty('--mx', `${x}%`);
    btn.style.setProperty('--my', `${y}%`);
  });
});

// weird code behind the scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

// copy email pill
document.querySelectorAll('.copy-pill[data-copy]')?.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(btn.dataset.copy);
      const prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(()=> btn.textContent = prev, 1200);
    }catch(e){ console.warn('Copy failed', e); }
  });
});

