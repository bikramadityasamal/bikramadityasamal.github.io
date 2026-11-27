"use strict";

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeMobileMenu() {
  if (!menuBtn || !navigation) return;

  navigation.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

function openMobileMenu() {
  if (!menuBtn || !navigation) return;

  navigation.classList.add("active");
  menuBtn.setAttribute("aria-expanded", "true");
  menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
}

if (menuBtn && navigation) {
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = navigation.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu after clicking any navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("active") &&
      !navigation.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close menu with Escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("active")
    ) {
      closeMobileMenu();
      menuBtn.focus();
    }
  });

  // Close menu when switching to desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMobileMenu();
    }
  });
}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {
  if (!navbar) return;

  navbar.classList.toggle("scrolled", window.scrollY > 35);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();


/* =========================================
   SCROLL PROGRESS INDICATOR
========================================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop =
    window.scrollY || document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
  passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


/* =========================================
   SMOOTH INTERNAL NAVIGATION
========================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });

    history.replaceState(null, "", targetId);
  });
});


/* =========================================
   AUTOMATIC CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   PROFILE IMAGE FALLBACK
========================================= */

const profileImage = document.querySelector(".profile-image");
const profileFallback = document.querySelector(".profile-fallback");

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";

    if (profileFallback) {
      profileFallback.style.display = "flex";
    }
  });
}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navigation a");

function setActiveNavLink(sectionId) {
  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href");

    if (linkTarget === `#${sectionId}`) {
      link.classList.add("active");
      link.setAttribute("aria-current", "location");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
  "Welcome to Bikramaditya Samal's Portfolio Website."
);
