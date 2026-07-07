/* ─────────────────────────────────────────────
   PORTFOLIO — Aki
   image-protect.js

   Basic deterrent against casual right-click-save
   and drag-out copying. Not a real security measure —
   anyone using devtools or a screenshot can still get
   the image; this just removes the one-click paths.
───────────────────────────────────────────── */
document.addEventListener('contextmenu', e => {
  if (e.target.closest('img, video')) e.preventDefault();
});
document.addEventListener('dragstart', e => {
  if (e.target.closest('img, video')) e.preventDefault();
});
