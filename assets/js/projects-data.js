/* ─────────────────────────────────────────────
   PORTFOLIO — Aki
   projects-data.js

   Single source of truth for every project. The homepage
   gallery, the discipline folders, and each project's own
   page (project-*.html) all read from this array.

   To add a project: add an entry here, then copy an existing
   project-*.html file, set its <title> and body[data-project]
   to match the new slug. No other file needs to change.

   `page` and `media[].src` below are written relative to the
   repo root (e.g. "projects/project-cat.html", "assets/images/x.avif").
   This file is loaded from two different depths — index.html at
   the root and project-*.html inside projects/ — so the paths are
   rewritten below to match whichever page loaded them.

   `media[].ratio` is the image's real height/width (e.g. a 1080×1462
   image is 1.354). The homepage gallery uses it to balance column
   heights instead of guessing — optional, defaults to 1 if omitted.
───────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: 'bruxelles',
    page: 'projects/project-bruxelles.html',
    title: 'Nous allons à Bruxelles',
    category: 'graphic',
    categoryLabel: 'Graphic Design · Editorial',
    tag: 'Graphic Design · Editorial · 2024',
    endYear: 2024,
    hero: {
      eyebrow: 'Project — 2024',
      title: 'Nous allons<br><em>à Bruxelles</em>',
      subtitle: 'A travel notebook in print —<br>typography and imagery for a journey to Brussels',
    },
    media: [
      { src: 'assets/images/nousallonsabruxelles-akinga2024.avif', ratio: 7.091, alt: 'Nous allons à Bruxelles — editorial spread', caption: '01', eager: true },
    ],
  },
  {
    slug: 'alfadhirhaiti',
    page: 'projects/project-alfadhirhaiti.html',
    title: 'Alfadhirhaiti',
    category: 'illustration',
    categoryLabel: 'Illustration · Editorial',
    tag: 'Illustration Book · 2025',
    endYear: 2025,
    hero: {
      eyebrow: 'Project — 2025',
      title: 'Alfadhirhaiti',
      subtitle: 'What Belongs to Odin:<br>A Collection of Beasts, Objects,<br>and Poor Life Choices',
    },
    media: [
      { src: 'assets/images/alfadhirhaiti-illustration-book-project-akinga2025.webm', ratio: 0.563, alt: 'Alfadhirhaiti — animated preview', caption: '02 — Animated Preview', gif: true, video: true, gallery: false },
      { src: 'assets/images/alfadhirhaiti-illustration-book-project-akinga2025_1.avif', ratio: 1.926, alt: 'Alfadhirhaiti — book object and spreads', caption: '01 — Book Object & Spreads', eager: true },
      { src: 'assets/images/alfadhirhaiti-illustration-book-project-akinga2025.avif', ratio: 10.160, alt: 'Alfadhirhaiti — illustration spread', caption: '03 — Illustration Spread' },
    ],
  },
  {
    slug: 'firebird',
    page: 'projects/project-appliedarts.html',
    title: 'Firebird Series',
    category: 'illustration',
    categoryLabel: 'Illustration',
    tag: 'Applied Arts · Illustration · 2023',
    endYear: 2023,
    hero: {
      eyebrow: 'Project — 2023',
      title: 'Firebird<br><em>Series</em>',
      subtitle: 'Applied Arts — a triptych of mythological birds<br>rendered in Ukrainian folk ornament',
    },
    media: [
      { src: 'assets/images/artishome2023.avif', ratio: 0.750, alt: 'Firebird Series — exhibition view, Art is Home 2023', caption: 'Exhibition View — Art is Home, 2023', wide: true, eager: true, tag: 'Exhibition · Artis Home · 2023' },
      { src: 'assets/images/appliedarts-illu-3-akinga-2023.avif', ratio: 1.398, alt: 'Firebird I — green bird with orange blossoms', caption: 'I' },
      { src: 'assets/images/appliedarts-illu-2-akinga-2023.avif', ratio: 1.354, alt: 'Firebird II — blue-orange symmetrical bird', caption: 'II' },
      { src: 'assets/images/appliedarts-illu-3-akinga2023.avif', ratio: 1.385, alt: 'Firebird III — blue bird with ornamental tail', caption: 'III' },
    ],
  },
  {
    slug: 'spiel19',
    page: 'projects/project-spiel19.html',
    title: 'Spiel 19',
    category: 'graphic',
    categoryLabel: 'Branding',
    tag: 'Corporate Identity · Branding',
    endYear: 2023,
    hero: {
      eyebrow: 'Project — 2019',
      title: 'Spiel<br><em>19</em>',
      subtitle: '',
    },
    media: [
      { src: 'assets/images/spiel19-logo1.avif', ratio: 1.174, alt: 'Spiel 19 — Logo variant 1', caption: '01', eager: true },
      { src: 'assets/images/spiel19-logo2.avif', ratio: 1.174, alt: 'Spiel 19 — Logo variant 2', caption: '02' },
      { src: 'assets/images/spiel19-logo4.avif', ratio: 0.667, alt: 'Spiel 19 — Logo variant 4', caption: '03', gallery: false },
      { src: 'assets/images/spiel19-logo5.avif', ratio: 0.667, alt: 'Spiel 19 — Logo variant 5', caption: '04', gallery: false },
      { src: 'assets/images/IMG_3709.webm', caption: '05', video: true, gallery: false },
    ],
  },
  {
    slug: 'female',
    page: 'projects/project-female.html',
    title: 'Female',
    category: 'illustration',
    categoryLabel: 'Illustration',
    tag: 'Illustration',
    endYear: null,
    hero: {
      eyebrow: 'Illustration Study',
      title: 'Female',
      subtitle: '',
    },
    media: [
      { src: 'assets/images/illu-1.avif', ratio: 1.339, alt: 'Female — illustration study I', caption: 'I', eager: true },
      { src: 'assets/images/illu-2.avif', ratio: 1.463, alt: 'Female — illustration study II', caption: 'II' },
    ],
  },
  {
    slug: 'cat',
    page: 'projects/project-cat.html',
    title: 'Cat',
    category: 'illustration',
    categoryLabel: 'Illustration',
    tag: 'Illustration',
    endYear: null,
    hero: {
      eyebrow: 'Illustration Study',
      title: 'Cat',
      subtitle: '',
    },
    media: [
      { src: 'assets/images/illu-3.avif', ratio: 1.000, alt: 'Cat — illustration study', caption: '01', eager: true },
    ],
  },
  {
    slug: 'hh',
    page: 'projects/project-hh.html',
    title: 'Hamburg Harbour',
    category: 'illustration',
    categoryLabel: 'Illustration',
    tag: 'Illustration',
    endYear: null,
    hero: {
      eyebrow: 'Illustration Study',
      title: 'Hamburg Harbour',
      subtitle: '',
    },
    media: [
      { src: 'assets/images/illu-4.avif', ratio: 1.317, alt: 'Hamburg Harbour — illustration study', caption: '01', eager: true },
    ],
  },
  {
    slug: 'mural',
    page: 'projects/project-mural.html',
    title: 'Mural',
    category: 'illustration',
    categoryLabel: 'Illustration',
    tag: 'Illustration',
    endYear: null,
    hero: {
      eyebrow: 'Illustration',
      title: 'Mural',
      subtitle: '',
    },
    media: [
      { src: 'assets/images/illu-5.avif', ratio: 0.644, alt: 'Mural — render', caption: 'Render', eager: true },
      { src: 'assets/images/illu-6.avif', ratio: 0.331, alt: 'Mural — realized wall painting', caption: 'Mural' },
      { src: 'assets/images/illu-7.avif', ratio: 0.726, alt: 'Mural — detail', caption: 'Detail' },
    ],
  },
];

// Paths above are repo-root-relative; rebase them for pages under projects/.
(function rebasePaths() {
  if (!location.pathname.replace(/\\/g, '/').includes('/projects/')) return;
  PROJECTS.forEach(p => {
    p.page = p.page.replace(/^projects\//, '');
    p.media.forEach(m => { m.src = '../' + m.src; });
  });
})();
