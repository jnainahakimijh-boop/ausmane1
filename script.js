
const $ = (s, scope=document) => scope.querySelector(s);
const $$ = (s, scope=document) => Array.from(scope.querySelectorAll(s));

window.addEventListener('load', () => {
  setTimeout(() => $('.loader')?.classList.add('loaded'), 550);
});

const header = $('.header');
const progress = $('.progress');
const heroMedia = $('.hero-media');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 70);
  if(progress){
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${Math.min(100, y / max * 100)}%`;
  }
  if(heroMedia){
    heroMedia.style.transform = `scale(${1.06 + Math.min(y, 900) / 9000}) translateY(${y * .08}px)`;
  }
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in');
  });
}, {threshold:.12});
$$('.reveal').forEach(el => io.observe(el));

const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  if(!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

$$('[data-count]').forEach(el => {
  const target = Number(el.dataset.count);
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting && !done){
      done = true;
      const start = performance.now();
      const dur = 1300;
      const step = now => {
        const p = Math.min(1, (now - start) / dur);
        const val = Math.round(target * (1 - Math.pow(1-p, 3)));
        el.textContent = el.dataset.prefix ? `${el.dataset.prefix}${val.toLocaleString('fr-FR')}` : val.toLocaleString('fr-FR');
        if(p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, {threshold:.5});
  obs.observe(el);
});
