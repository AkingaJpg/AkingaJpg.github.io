/* ─────────────────────────────────────────────
   PORTFOLIO — Aki
   main.js
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   PROJECT GALLERY
   One thumbnail per project image (unless the image opts
   out via media.gallery === false); every thumb links back
   to that project's page.
───────────────────────────────────────────── */
const galleryItems = PROJECTS.flatMap(p =>
  p.media
    .filter(m => m.gallery !== false)
    .map(m => ({
      title: p.title,
      tag:   m.tag || p.tag,
      cat:   p.category,
      src:   m.src,
      href:  p.page,
      ratio: m.ratio || 1,
    }))
);

function getGalleryColumnCount() {
  const w = window.innerWidth;
  if (w <= 600) return 1;
  if (w <= 900) return 2;
  return 3;
}

let currentGalleryFilter = 'all';
let currentGalleryColumns = null;

function renderGallery(filter = currentGalleryFilter) {
  currentGalleryFilter = filter;
  currentGalleryColumns = getGalleryColumnCount();

  const items = filter === 'all'
    ? galleryItems
    : galleryItems.filter(g => g.cat === filter);

  const shuffled = [...items].sort(() => Math.random() - 0.5);

  // Distribute into columns by real image height (ratio) rather than DOM
  // order, so a single very tall image can't leave one column much longer
  // than the others.
  const columns = Array.from({ length: currentGalleryColumns }, () => ({ items: [], height: 0 }));
  shuffled.forEach(g => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.items.push(g);
    shortest.height += g.ratio || 1;
  });

  const thumbHtml = g => {
    return `
      <div class="gallery-thumb" onclick="location.href='${g.href}'">
        <img src="${g.src}" alt="${g.title}" loading="lazy" />
        <div class="gallery-thumb-info">
          <div class="gallery-thumb-title">${g.title}</div>
          <div class="gallery-thumb-tag">${g.tag}</div>
        </div>
      </div>`;
  };

  document.getElementById('gallery-grid').innerHTML = columns
    .map(col => `<div class="gallery-column">${col.items.map(thumbHtml).join('')}</div>`)
    .join('');
}

let galleryResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(galleryResizeTimer);
  galleryResizeTimer = setTimeout(() => {
    if (getGalleryColumnCount() !== currentGalleryColumns) renderGallery();
  }, 150);
});

document.querySelectorAll('.nav-cat-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-cat-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    renderGallery(link.dataset.cat);
    document.getElementById('index').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelector('.nav-logo').addEventListener('click', e => {
  e.preventDefault();
  document.querySelectorAll('.nav-cat-link').forEach(l => l.classList.toggle('active', l.dataset.cat === 'all'));
  renderGallery('all');
  document.getElementById('index').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

renderGallery();

/* ─────────────────────────────────────────────
   MOBILE NAV OVERLAY
───────────────────────────────────────────── */
const navOverlay   = document.getElementById('nav-overlay');
const navHamburger = document.getElementById('nav-hamburger');

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

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.07 }
);

document.querySelectorAll('section:not(#works)')
  .forEach(s => revealObserver.observe(s));

/* ─────────────────────────────────────────────
   BIRD CURSOR
───────────────────────────────────────────── */
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 36px; height: 36px;
  transform: translate(-8px, -18px);
  filter: drop-shadow(0 0 4px rgba(201, 168, 76, 0.5));
`;

cursor.innerHTML = `
  <svg id="bird-svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <!-- tail feathers -->
    <path d="M4,22 Q1,26 0,30 Q3,27 5,28 Q2,24 6,23 Z" fill="#c9a84c" opacity="0.85"/>
    <path d="M5,21 Q3,25 2,30 Q5,26 7,27 Q4,23 7,22 Z" fill="#c9a84c" opacity="0.6"/>
    <!-- body -->
    <ellipse cx="14" cy="22" rx="9" ry="6" fill="#111111" stroke="#c9a84c" stroke-width="0.8"/>
    <!-- wing (animated on move) -->
    <path d="M8,22 Q13,17 20,20 Q15,23 8,22 Z" fill="#c9a84c" opacity="0.7"/>
    <path d="M9,24 Q14,19 21,22 Q16,25 9,24 Z" fill="#c9a84c" opacity="0.4"/>
    <!-- head (turns to glance at the cursor while idle) -->
    <g id="bird-head" style="transform-box: view-box; transform-origin: 19px 20px;">
      <circle cx="23" cy="17" r="5" fill="#111111" stroke="#c9a84c" stroke-width="0.8"/>
      <!-- eye -->
      <circle cx="25"   cy="16"   r="1.2" fill="#c9a84c"/>
      <circle cx="25.4" cy="15.6" r="0.4" fill="#080808"/>
      <!-- beak -->
      <path d="M27,17 L32,16 L27,18 Z" fill="#c9a84c"/>
      <!-- crest -->
      <path d="M22,12 Q24,8 26,10"  stroke="#c9a84c" stroke-width="0.8" fill="none"/>
      <path d="M22,12 Q20,8 22,9"   stroke="#c9a84c" stroke-width="0.6" fill="none" opacity="0.6"/>
    </g>
    <!-- legs -->
    <line x1="12" y1="27" x2="11" y2="32" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="11" y1="32" x2="9"  y2="33" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="11" y1="32" x2="11" y2="34" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="11" y1="32" x2="13" y2="33" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="16" y1="27" x2="15" y2="32" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="15" y1="32" x2="13" y2="33" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="15" y1="32" x2="15" y2="34" stroke="#c9a84c" stroke-width="0.8"/>
    <line x1="15" y1="32" x2="17" y2="33" stroke="#c9a84c" stroke-width="0.8"/>
  </svg>
`;

document.body.appendChild(cursor);

// State
let mouseX = 0, mouseY = 0;
let curX   = 0, curY   = 0;
let wingFrame = 0;
let facingRight = true;
let headTurn = 0;
let headFlip = 1;

const HEAD_MAX_TURN = 90; // degrees, how far the head nods to glance at the cursor
const HEAD_LOOKBACK_DEADZONE = 6; // px (local, body-relative) the cursor must cross behind the beak before the head turns around to look back

// Half-extents of the cursor's "box" — the bird is left alone as long as it's
// inside this box (the real cursor can pass over/through it freely). Only
// once the box moves far enough that the bird ends up outside it does the
// bird get pulled toward the box's nearest edge.
const CURSOR_BOX_HALF_W = 25;
const CURSOR_BOX_HALF_H = 15;

// Track mouse position
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Wing flap on move
document.addEventListener('mousemove', () => {
  const svg  = document.getElementById('bird-svg');
  const wing = svg?.querySelectorAll('path')[2];
  if (!wing) return;

  wingFrame = (wingFrame + 1) % 4;
  wing.setAttribute('d', wingFrame < 2
    ? 'M8,22 Q13,15 20,19 Q15,23 8,22 Z'   // up
    : 'M8,22 Q13,17 20,20 Q15,23 8,22 Z'   // down
  );
});

// Leashed follow + direction flip
(function tick() {
  // Closest point to the bird's current position that still lies within the
  // cursor's box. Equals the bird's own position (i.e. no pull) while it's
  // inside the box, and the box's nearest edge once the bird ends up outside it.
  const targetX = Math.min(Math.max(curX, mouseX - CURSOR_BOX_HALF_W), mouseX + CURSOR_BOX_HALF_W);
  const targetY = Math.min(Math.max(curY, mouseY - CURSOR_BOX_HALF_H), mouseY + CURSOR_BOX_HALF_H);

  const dx = targetX - curX;
  const dy = targetY - curY;
  const isIdle = Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5;

  curX += dx * 0.18;
  curY += dy * 0.18;

  const svg = document.getElementById('bird-svg');
  if (svg) {
    if (dx < -0.5) facingRight = false;
    else if (dx > 0.5) facingRight = true;

    svg.style.transform    = facingRight ? 'scaleX(1)' : 'scaleX(-1)';
    cursor.style.transform = facingRight ? 'translate(-8px, -18px)' : 'translate(-28px, -18px)';
  }

  // While idle (cursor still inside the leash box), glance the head toward it —
  // nodding up/down to track the cursor's vertical offset, and turning all the
  // way around (scaleX flip) when the cursor drifts behind the beak
  // horizontally. Once the body starts actually chasing, relax the head back
  // to neutral, aligned with the body again.
  let targetHeadTurn = 0;
  let targetHeadFlip = 1;
  if (isIdle) {
    let relX = mouseX - curX;
    if (!facingRight) relX = -relX; // compensate for the svg's scaleX(-1) flip
    const relY = mouseY - curY;
    targetHeadTurn = Math.max(-1, Math.min(1, relY / CURSOR_BOX_HALF_H)) * HEAD_MAX_TURN;
    if (relX < -HEAD_LOOKBACK_DEADZONE) targetHeadFlip = -1;
  }
  headTurn += (targetHeadTurn - headTurn) * 0.15;
  headFlip += (targetHeadFlip - headFlip) * 0.15;

  const head = document.getElementById('bird-head');
  // headTurn already encodes up/down directly (from vertical offset), so it
  // isn't mirrored by headFlip — only the head's horizontal facing is.
  if (head) head.style.transform = `scaleX(${headFlip}) rotate(${headTurn}deg)`;

  cursor.style.left = `${curX}px`;
  cursor.style.top  = `${curY}px`;

  requestAnimationFrame(tick);
})();

// Click glow
document.addEventListener('mousedown', () => cursor.style.filter = 'drop-shadow(0 0 8px rgba(201, 168, 76, 0.9))');
document.addEventListener('mouseup',   () => cursor.style.filter = 'drop-shadow(0 0 4px rgba(201, 168, 76, 0.5))');
