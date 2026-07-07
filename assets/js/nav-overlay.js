// Push .project-images below the fixed .project-hero
const projectHero   = document.querySelector('.project-hero');
const projectImages = document.querySelector('.project-images');
if (projectHero && projectImages) {
  const syncOffset = () => { projectImages.style.marginTop = '0 px';/*projectHero.offsetHeight + 'px'; */};
  new ResizeObserver(syncOffset).observe(projectHero);
}

const navOverlay   = document.getElementById('nav-overlay');
const navHamburger = document.getElementById('nav-hamburger');

if (navOverlay && navHamburger) {
  function openOverlay() {
    navOverlay.classList.add('open');
    navHamburger.classList.add('open');
    navHamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay() {
    navOverlay.classList.remove('open');
    navHamburger.classList.remove('open');
    navHamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }
  navHamburger.addEventListener('click', () =>
    navOverlay.classList.contains('open') ? closeOverlay() : openOverlay()
  );
  navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeOverlay));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navOverlay.classList.contains('open')) closeOverlay();
  });
}
