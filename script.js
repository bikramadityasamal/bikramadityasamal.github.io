"use strict";

/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        setTimeout(() => loader.remove(), 700);
    }
});

/* ================= MOBILE NAVIGATION ================= */

const menuBtn = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuBtn && navigation) {

    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = navigation.classList.toggle("active");

        menuBtn.setAttribute("aria-expanded", String(isOpen));

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close after clicking a navigation link
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close when clicking outside
    document.addEventListener("click", event => {
        if (
            !navigation.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            navigation.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Close with Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            navigation.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
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
        { threshold: 0.12 }
    );

    animatedCards.forEach(card => {
        card.classList.add("reveal");
        cardObserver.observe(card);
    });
}

/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 35);
}

window.addEventListener("scroll", handleNavbarScroll, {
    passive: true
});

handleNavbarScroll();

/* ================= SMOOTH INTERNAL LINKS ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* ================= CURRENT YEAR ================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* ================= PROFILE IMAGE FALLBACK ================= */

const profileImages = document.querySelectorAll(
    ".profile-image"
);

profileImages.forEach(img => {
    img.addEventListener("error", () => {
        img.style.display = "none";

        const fallback = img.parentElement.querySelector(
            ".profile-fallback"
        );

        if (fallback) {
            fallback.style.display = "flex";
        }
    });
});

/* ================= CONSOLE MESSAGE ================= */

console.log(
    "%c Bikramaditya Samal | Portfolio ",
    "background: #152136; color: #83caff; padding: 10px; font-size: 14px; font-weight: bold;"
);

console.log("Welcome to my professional portfolio.");
