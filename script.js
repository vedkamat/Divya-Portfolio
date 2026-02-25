/* ===================================================
   PORTFOLIO  Divya | script.js
   =================================================== */

/* --------------------------------------------------
   WORKS DATA
   -------------------------------------------------- */
const works = [
  {
    title: "The Cost of Convenience",
    category: "Research",
    heroImg: "/35.png",
  },
  {
    title: "Ethnographic Research on Sustainable Indian Fashion",
    category: "Research",
    heroImg: "/Ethnographic Research.png",
  },
  {
    title: "Kadak Chai",
    category: "graphic_design",
    heroImg:
      "/kadak/1.png",
  },
  {
    title: "Art Studio Website design",
    category: "ui/ux",
    heroImg:
      "/art studio website/1.png",
  },
  {
    title: "Bakery Website",
    category: "ui/ux",
    heroImg:
      "/bakery/1.png",
  },
  {
    title: "BookMyshow Redesign",
    category: "ui/ux",
    heroImg:
      "/bms/28.png",
  },
  {
    title: "Graphic Design Explorations",
    category: "graphic_design",
    heroImg:
      "/gd/1.png",
  },
  {
    title: "Tactic: The Event planning app design",
    category: "ui/ux",
    heroImg:
      "/tactic/20.png",
  },
];

/* --------------------------------------------------
   STATE
   -------------------------------------------------- */
let currentWorkId = 0;

/* --------------------------------------------------
   NAV SCROLL EFFECT
   -------------------------------------------------- */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* --------------------------------------------------
   MOBILE MENU
   -------------------------------------------------- */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
}

/* --------------------------------------------------
   NAVIGATE TO WORKS (smooth scroll)
   -------------------------------------------------- */
function goToWorks(e) {
  e && e.preventDefault();
  showHome();
  setTimeout(() => {
    const el = document.getElementById("works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

function openEmailClient(e) {
  e && e.preventDefault();
  const email = "divya.kam04@gmail.com";
  const subject = encodeURIComponent("Project Inquiry");
  window.location.href = `mailto:${email}?subject=${subject}`;
}

/* --------------------------------------------------
   SHOW HOME VIEW
   -------------------------------------------------- */
function showHome() {
  document.getElementById("homeView").classList.remove("hidden");
  document.getElementById("workView").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* --------------------------------------------------
   OPEN A WORK
   -------------------------------------------------- */
function openWork(id) {
  currentWorkId = id;
  const w = works[id];
  const projectImages = {
    "Kadak Chai": [
      "/kadak/1.png",
      "/kadak/Slide 16_9 - 57.png",
      "/kadak/Slide 16_9 - 58.png",
      "/kadak/Slide 16_9 - 59.png",
      "/kadak/Slide 16_9 - 60.png",
      "/kadak/Slide 16_9 - 61.png",
    ],
    "Art Studio Website design": [
      "/art%20studio%20website/1.png",
      "/art%20studio%20website/2.png",
      "/art%20studio%20website/3.png",
    ],
    "Bakery Website": [
      "/bakery/1.png",
      "/bakery/2.png",
      "/bakery/3.png",
      "/bakery/4.png",
      "/bakery/5.png",
    ],
    "BookMyshow Redesign": [
      "/bms/28.png",
      "/bms/29.png",
      "/bms/30.png",
      "/bms/31.png",
      "/bms/32.png",
      "/bms/33.png",
      "/bms/35.png",
      "/bms/36.png",
      "/bms/37.png",
      "/bms/38.png",
    ],
      "Graphic Design Explorations": [
      "/gd/1.png",
      "/gd/2.png",
      "/gd/3.png",
    ],
      "Tactic: The Event planning app design": [
      "/tactic/20.png",
      "/tactic/21.png",
      "/tactic/22.png",
      "/tactic/23.png",
      "/tactic/24.png",
      "/tactic/25.png",
      "/tactic/26.png",
      "/tactic/27.png",
    ],
  };
  const images = projectImages[w.title.trim()];
  const imageMarkup = images
    ? images
        .map(
          (src, index) => `
    <div style="width: 100vw; overflow: hidden;">
      <img src="${src}" alt="${w.title} image ${index + 1}" style="width: 100%; display: block;" />
    </div>`,
        )
        .join("")
    : `
    <div style="width: 100vw; overflow: hidden;">
      <img src="${w.heroImg}" alt="${w.title}" style="width: 100%; display: block;" />
    </div>`;

  // Populate
  const workView = document.getElementById("workView");
  workView.innerHTML = `
    <div class="work-view__header">
      <button class="back-btn" onclick="closeWork()">Back to Works</button>
    </div>
    <h1 style="text-align: center; margin: 1rem 0;">${w.title}</h1>
    ${imageMarkup}
  `;

  // Show work view
  document.getElementById("homeView").classList.add("hidden");
  workView.classList.remove("hidden");
  workView.classList.add("page-fade");
  window.scrollTo({ top: 0, behavior: "instant" });
  setTimeout(() => workView.classList.remove("page-fade"), 600);
}

/* --------------------------------------------------
   CLOSE WORK â†’ back to home
   -------------------------------------------------- */
function closeWork() {
  document.getElementById("homeView").classList.remove("hidden");
  document.getElementById("workView").classList.add("hidden");
  setTimeout(() => {
    const el = document.getElementById("works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

/* --------------------------------------------------
   PREV / NEXT WORK
   -------------------------------------------------- */
function prevWork() {
  if (currentWorkId > 0) openWork(currentWorkId - 1);
}
function nextWork() {
  if (currentWorkId < works.length - 1) openWork(currentWorkId + 1);
}

/* --------------------------------------------------
   WORKS FILTER
   -------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll(".work-card");

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden-card", !match);
      });
    });
  });

  /* Scroll reveal */
  initReveal();
});

/* --------------------------------------------------
   SCROLL REVEAL
   -------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll(
    ".work-card, .about__img-col, .about__text-col, .stat, .section-header",
  );
  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* --------------------------------------------------
   LIGHTBOX
   -------------------------------------------------- */
// Create lightbox element once
const lb = document.createElement("div");
lb.className = "lightbox";
lb.innerHTML = `
  <button class="lightbox__close" onclick="closeLightbox()">âœ•</button>
  <img class="lightbox__img" id="lbImg" src="" alt="Gallery image" />
`;
document.body.appendChild(lb);

lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});

function openLightbox(src) {
  document.getElementById("lbImg").src = src;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* --------------------------------------------------
   CURSOR (subtle dot follower â€” desktop only)
   -------------------------------------------------- */
if (window.matchMedia("(pointer: fine)").matches) {
  const dot = document.createElement("div");
  dot.style.cssText = `
    position: fixed; width: 8px; height: 8px;
    border-radius: 50%; background: var(--accent, #b07d5a);
    pointer-events: none; z-index: 9999; opacity: 0;
    transition: opacity .3s, transform .15s, width .3s, height .3s;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(dot);

  let mx = 0,
    my = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
    dot.style.opacity = "0.7";
  });

  document
    .querySelectorAll("a, button, .work-card, .gallery-img")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        dot.style.width = "24px";
        dot.style.height = "24px";
        dot.style.opacity = "0.35";
      });
      el.addEventListener("mouseleave", () => {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.opacity = "0.7";
      });
    });
}


