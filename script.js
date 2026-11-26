"use strict";

/* =====================================================
   BIKRAMADITYA SAMAL | PORTFOLIO JAVASCRIPT
   ===================================================== */


/* ================= MOBILE NAVIGATION ================= */

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

    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen =
            navigation.classList.contains("active");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (
            !navigation.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            menuBtn.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMobileMenu();
        }
    });
}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

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


/* ================= SCROLL PROGRESS ================= */

const scrollProgress =
    document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = scrollHeight > 0
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

        const target =
            document.getElementById(targetId.substring(1));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",

            block: "start"
        });

        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", targetId);
        }

    });

});


/* ================= CURRENT YEAR ================= */

const yearElement =
    document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================= PROFILE IMAGE FALLBACK ================= */

document.querySelectorAll(".profile-image").forEach(img => {

    img.addEventListener("error", () => {

        img.style.display = "none";

        const fallback =
            img.parentElement.querySelector(".profile-fallback");

        if (fallback) {
            fallback.style.display = "flex";
        }

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".navigation a");

if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const activeId = entry.target.id;

                navLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${activeId}`;

                    link.classList.toggle("active-link", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }

                });

            });

        },
        {
            rootMargin: "-25% 0px -65% 0px"
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
