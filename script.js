
/* =====================================================
   BIKRAMADITYA SAMAL — PORTFOLIO JAVASCRIPT
   Professional Interactive Experience
   ===================================================== */

"use strict";


/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            }, 700);

        }, 500);

    }

});


/* ================= MOBILE NAVIGATION ================= */

const menuBtn = document.getElementById("menuBtn");

const navigation = document.getElementById("navigation");


if (menuBtn && navigation) {

    menuBtn.addEventListener("click", () => {

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

            navigation.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedMenuButton =
            menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            navigation.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

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
    ".about-card, .expertise-card, .education-item, .contact-card"
);


if ("IntersectionObserver" in window) {

    const cardObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const cards = entry.target.parentElement
                        ? Array.from(
                            entry.target.parentElement.children
                        )
                        : [];

                    const index = cards.indexOf(entry.target);

                    entry.target.style.transitionDelay =
                        `${Math.max(index, 0) * 90}ms`;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    animatedCards.forEach(card => {

        card.classList.add("reveal");

        cardObserver.observe(card);

    });

}


/* ================= BACKGROUND PARTICLES ================= */

const canvas = document.getElementById("particles");

if (canvas) {

    const ctx = canvas.getContext("2d");

    if (ctx) {

        let particles = [];

        let animationFrame;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        function resizeCanvas() {

            const pixelRatio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            canvas.width = window.innerWidth * pixelRatio;

            canvas.height = window.innerHeight * pixelRatio;

            canvas.style.width = "100%";

            canvas.style.height = "100%";

            canvas.style.position = "fixed";

            canvas.style.inset = "0";

            canvas.style.pointerEvents = "none";

            canvas.style.zIndex = "0";

            ctx.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );

            createParticles();

        }


        function createParticles() {

            particles = [];

            const particleCount = Math.min(
                Math.floor(
                    (window.innerWidth * window.innerHeight) / 18000
                ),
                65
            );

            for (let i = 0; i < particleCount; i++) {

                particles.push({

                    x: Math.random() * window.innerWidth,

                    y: Math.random() * window.innerHeight,

                    size: Math.random() * 1.8 + 0.5,

                    speedX: (Math.random() - 0.5) * 0.35,

                    speedY: (Math.random() - 0.5) * 0.35,

                    opacity: Math.random() * 0.35 + 0.12

                });

            }

        }


        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );


            particles.forEach(particle => {

                particle.x += particle.speedX;

                particle.y += particle.speedY;


                if (particle.x < 0 ||
                    particle.x > window.innerWidth) {

                    particle.speedX *= -1;

                }

                if (particle.y < 0 ||
                    particle.y > window.innerHeight) {

                    particle.speedY *= -1;

                }


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(130, 190, 255, ${particle.opacity})`;

                ctx.fill();

            });


            // Draw subtle connections between nearby particles

            for (let i = 0; i < particles.length; i++) {

                for (let j = i + 1; j < particles.length; j++) {

                    const dx = particles[i].x - particles[j].x;

                    const dy = particles[i].y - particles[j].y;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < 115) {

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.strokeStyle =
                            `rgba(130, 190, 255, ${
                                0.07 * (1 - distance / 115)
                            })`;

                        ctx.lineWidth = 0.6;

                        ctx.stroke();

                    }

                }

            }


            if (!reducedMotion) {

                animationFrame =
                    requestAnimationFrame(drawParticles);

            }

        }


        resizeCanvas();

        drawParticles();


        let resizeTimer;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                resizeCanvas();

                if (reducedMotion) {

                    drawParticles();

                }

            }, 150);

        });


        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {

                cancelAnimationFrame(animationFrame);

            } else if (!reducedMotion) {

                drawParticles();

            }

        });

    }

}


/* ================= NAVBAR SCROLL EFFECT ================= */

const navbar = document.querySelector(".navbar");


function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 35) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
);

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

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach(element => {

    element.textContent = new Date().getFullYear();

});


/* ================= IMAGE FALLBACK ================= */

const profileImages = document.querySelectorAll(
    ".photo-card img"
);

profileImages.forEach(img => {

    img.addEventListener("error", () => {

        img.style.display = "none";

        const fallback = img.parentElement.querySelector(
            ".photo-fallback"
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

console.log(
    "Welcome to my professional portfolio."
);