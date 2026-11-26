"use strict";

/* =====================================================
   BIKRAMADITYA SAMAL | PORTFOLIO JAVASCRIPT
   ===================================================== */


/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.remove();
        }, 700);
    }
});


/* ================= MOBILE NAVIGATION ================= */

const menuBtn = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeMobileMenu() {
    if (!menuBtn || !navigation) return;

    navigation.classList.remove("active");

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

if (menuBtn && navigation) {

    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = navigation.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });


    // Close menu after clicking a navigation link

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !navigation.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });


    // Close menu with Escape key

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
            menuBtn.focus();
        }

    });


    // Close menu when switching to desktop layout

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMobileMenu();
        }

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

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

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ================= STAGGERED CARD ANIMATION ================= */

const animatedCards = document.querySelectorAll(
    ".feature-card, .expertise-card, .education-item, .contact-item"
);

if ("IntersectionObserver" in window) {

    const cardObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    animatedCards.forEach((card, index) => {

        card.classList.add("reveal");

        card.style.transitionDelay = `${(index % 4) * 100}ms`;

        cardObserver.observe(card);

    });

}


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 35
    );

}

window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
);

handleNavbarScroll();


/* ================= SCROLL PROGRESS BAR ================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


/* ================= SMOOTH INTERNAL LINKS ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",

                block: "start"
            });

        }

    });

});


/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ================= PROFILE IMAGE FALLBACK ================= */

const profileImages = document.querySelectorAll(
    ".profile-image"
);

profileImages.forEach(img => {

    img.addEventListener("error", () => {

        img.style.display = "none";

        const fallback =
            img.parentElement.querySelector(
                ".profile-fallback"
            );

        if (fallback) {
            fallback.style.display = "flex";
        }

    });

});


/* ================= ACTIVE NAVIGATION LINK ================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".navigation a"
);

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const activeId = entry.target.id;

                    navLinks.forEach(link => {

                        const linkTarget =
                            link.getAttribute("href");

                        if (linkTarget === `#${activeId}`) {

                            link.classList.add("active-link");

                            link.setAttribute(
                                "aria-current",
                                "location"
                            );

                        } else {

                            link.classList.remove("active-link");

                            link.removeAttribute("aria-current");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%c Bikramaditya Samal | Portfolio ",
    "background: #152136; color: #83caff; padding: 10px; font-size: 14px; font-weight: bold;"
);

console.log(
    "Welcome to my professional portfolio."
);
