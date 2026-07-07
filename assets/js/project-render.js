/* ─────────────────────────────────────────────
   PORTFOLIO — Aki
   project-render.js

   Renders a project-*.html page from PROJECTS (see projects-data.js)
   based on the slug in body[data-project]. Load projects-data.js
   before this file.
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.06 }
);

(function renderProject() {
  const slug = document.body.dataset.project;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return;

  const catEl = document.querySelector('.project-nav-cat');
  if (catEl) catEl.textContent = project.categoryLabel;

  document.querySelector('.project-eyebrow').innerHTML  = project.hero.eyebrow;
  document.querySelector('.project-title').innerHTML    = project.hero.title;
  document.querySelector('.project-subtitle').innerHTML = project.hero.subtitle;

  document.querySelector('.project-images').innerHTML = project.media.map(m => {
    const cls = ['project-figure', m.wide && 'project-figure--wide', m.gif && 'project-figure--gif', 'reveal']
      .filter(Boolean).join(' ');
    const videoType = { mp4: 'video/mp4', webm: 'video/webm' }[m.src.split('.').pop()];
    const inner = m.video
      ? `<video autoplay muted loop playsinline><source src="${m.src}" type="${videoType}" /></video>`
      : `<img src="${m.src}" alt="${m.alt}" loading="${m.eager ? 'eager' : 'lazy'}" />`;
    return `<figure class="${cls}">${inner}<figcaption>${m.caption}</figcaption></figure>`;
  }).join('');

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();
