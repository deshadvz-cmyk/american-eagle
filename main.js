// =========================
// Contact Form Reset
// =========================
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Form submitted!");

  // مسح كل الحقول
  form.reset();
});


// =========================
// Change Shirt (with animation)
// =========================
function changeShirt(src, bg) {
  const img = document.querySelector(".mainImg");
  const container = document.querySelector(".container");

  img.src = src;

  // Animate quick scale
  img.style.transform = "scale(0.96) rotate(-1deg)";
  setTimeout(() => (img.style.transform = ""), 220);

  // Change background
  container.style.background = bg;
}


// =========================
// Mobile Navbar Toggle
// =========================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // لمنع click event من الوثيقة

  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));

  navMenu.style.display = expanded ? "" : "flex";

  // mobile styling
  navMenu.style.flexDirection = "column";
  navMenu.style.gap = "10px";
  navMenu.style.position = "absolute";
  navMenu.style.right = "18px";
  navMenu.style.top = "70px";
  navMenu.style.background = "white";
  navMenu.style.padding = "12px";
  navMenu.style.borderRadius = "12px";
  navMenu.style.boxShadow = "0 10px 30px rgba(2,6,23,0.08)";
});


// =========================
// Close navbar when clicking outside
// =========================
document.addEventListener("click", (e) => {
  const isOpen = navMenu.style.display === "flex";

  if (isOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.style.display = "";
    navToggle.setAttribute("aria-expanded", "false");
  }
});


// =========================
// Close navbar when clicking a link
// =========================
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.style.display = "";
    navToggle.setAttribute("aria-expanded", "false");
  });
});


// =========================
// Fix navbar on resize
// =========================
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.removeAttribute("style"); // يمسح كل ستايل الموبايل
    navToggle.setAttribute("aria-expanded", "false");
  }
});


// =========================
// Header shrink on scroll
// =========================
const header = document.getElementById("siteHeader");

window.addEventListener(
  "scroll",
  () => {
    const sc = window.scrollY;
    if (sc > 50) header.classList.add("shrink");
    else header.classList.remove("shrink");
  },
  { passive: true }
);


// =========================
// Reveal animations (IntersectionObserver)
// =========================
const reveals = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => io.observe(el));


// =========================
// Close navbar on ESC key
// =========================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.style.display = "";
    navToggle.setAttribute("aria-expanded", "false");
  }
});


// =========================
// Reduced motion support
// =========================
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReduced) {
  document
    .querySelectorAll(".mainImg")
    .forEach((i) => (i.style.animation = "none"));
  document
    .querySelectorAll(".reveal")
    .forEach((r) => (r.style.transition = "none"));
}
