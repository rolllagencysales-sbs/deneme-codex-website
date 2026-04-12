const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const loader = document.querySelector(".page-loader");
    const progressBar = document.querySelector(".scroll-progress span");
    const cursor = document.querySelector(".cursor-ring");
    const magneticItems = document.querySelectorAll(".magnetic");
    const tiltCards = document.querySelectorAll(".tilt-card");
    const revealItems = document.querySelectorAll(".reveal-item");
    const counters = document.querySelectorAll(".counter");
    const heroTitle = document.querySelector(".split-target");
    const particleCanvas = document.getElementById("particleCanvas");

    splitHeadline(heroTitle);
    initLoader();
    initScrollProgress();
    initCursor();
    initMagnetic();
    initTilt();
    initReveal();
    initCounters();
    initCanvas();
    initFaq();

    function splitHeadline(target) {
        if (!target) return;

        const words = target.textContent.trim().split(/\s+/);
        target.classList.add("is-animated");
        target.innerHTML = words
            .map((word, index) => `<span class="word" style="--word-index:${index};">${word}</span>`)
            .join(" ");
    }

    function initLoader() {
        const hideLoader = () => {
            body.classList.add("is-loaded");
            if (loader) loader.classList.add("is-hidden");
        };

        if (prefersReducedMotion) {
            hideLoader();
            return;
        }

        window.setTimeout(hideLoader, 950);
    }

    function initScrollProgress() {
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const ratio = scrollableHeight > 0 ? (scrolled / scrollableHeight) * 100 : 0;
            progressBar.style.width = `${ratio}%`;
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
    }

    function initCursor() {
        if (!cursor || window.innerWidth <= 680 || prefersReducedMotion) {
            if (cursor) cursor.style.display = "none";
            body.style.cursor = "auto";
            return;
        }

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;

        window.addEventListener("mousemove", (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
        });

        document.querySelectorAll("a, button, .tilt-card, summary").forEach((item) => {
            item.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
        });

        const render = () => {
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;
            cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            requestAnimationFrame(render);
        };

        render();
    }

    function initMagnetic() {
        if (prefersReducedMotion) return;

        magneticItems.forEach((item) => {
            item.addEventListener("mousemove", (event) => {
                const rect = item.getBoundingClientRect();
                const offsetX = event.clientX - rect.left - rect.width / 2;
                const offsetY = event.clientY - rect.top - rect.height / 2;
                item.style.transform = `translate(${offsetX * 0.10}px, ${offsetY * 0.15}px)`;
            });

            item.addEventListener("mouseleave", () => {
                item.style.transform = "";
            });
        });
    }

    function initTilt() {
        if (prefersReducedMotion || window.innerWidth <= 920) return;

        tiltCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 10;
                const rotateX = (0.5 - y) * 10;

                card.style.setProperty("--rx", `${rotateX}deg`);
                card.style.setProperty("--ry", `${rotateY}deg`);
                card.style.setProperty("--ty", "-6px");
            });

            card.addEventListener("mouseleave", () => {
                card.style.removeProperty("--rx");
                card.style.removeProperty("--ry");
                card.style.removeProperty("--ty");
            });
        });
    }

    function initReveal() {
        if (prefersReducedMotion) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,
            rootMargin: "0px 0px -8% 0px"
        });

        revealItems.forEach((item) => observer.observe(item));
    }

    function initCounters() {
        const animateCounter = (target) => {
            const endValue = Number(target.dataset.counter || 0);
            const suffix = target.dataset.suffix || "";
            const duration = 1800;
            const startTime = performance.now();

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                target.textContent = `${Math.round(endValue * eased)}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.45
        });

        counters.forEach((counter) => counterObserver.observe(counter));
    }

    function initCanvas() {
        if (!particleCanvas || prefersReducedMotion) return;

        const context = particleCanvas.getContext("2d");
        if (!context) return;

        const particles = [];
        const count = window.innerWidth < 900 ? 32 : 56;
        let animationFrameId = 0;

        const resizeCanvas = () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles.length = 0;

            for (let index = 0; index < count; index += 1) {
                particles.push({
                    x: Math.random() * particleCanvas.width,
                    y: Math.random() * particleCanvas.height,
                    vx: (Math.random() - 0.5) * 0.28,
                    vy: (Math.random() - 0.5) * 0.28,
                    radius: Math.random() * 1.6 + 0.9
                });
            }
        };

        const draw = () => {
            context.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > particleCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > particleCanvas.height) particle.vy *= -1;

                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = "rgba(247, 158, 2, 0.78)";
                context.fill();

                for (let next = index + 1; next < particles.length; next += 1) {
                    const point = particles[next];
                    const dx = particle.x - point.x;
                    const dy = particle.y - point.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < 118) {
                        context.beginPath();
                        context.moveTo(particle.x, particle.y);
                        context.lineTo(point.x, point.y);
                        context.strokeStyle = `rgba(229, 229, 229, ${0.1 - distance / 1400})`;
                        context.lineWidth = 1;
                        context.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resizeCanvas();
        createParticles();
        draw();

        window.addEventListener("resize", () => {
            cancelAnimationFrame(animationFrameId);
            resizeCanvas();
            createParticles();
            draw();
        });
    }

    function initFaq() {
        document.querySelectorAll(".faq-item").forEach((item) => {
            item.addEventListener("toggle", () => {
                if (!item.open) return;

                document.querySelectorAll(".faq-item").forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            });
        });
    }
});
