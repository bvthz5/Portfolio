// Performance-optimized script with minimal reflows and chunked operations

document.addEventListener('DOMContentLoaded', function () {
    // Batch all DOM queries at start
    const elements = {
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        navMenu: document.getElementById('nav-menu'),
        currentYear: document.getElementById('current-year'),
        downloadCV: document.getElementById('download-cv'),
        messageForm: document.getElementById('messageForm'),
        navLinks: document.querySelectorAll('.nav-link'),
        anchorLinks: document.querySelectorAll('a[href^="#"]'),
        scrollDots: document.querySelectorAll('.scroll-dot'),
        sections: document.querySelectorAll('section')
    };

    // Immediate critical operations only
    window.scrollTo(0, 0);
    elements.currentYear.textContent = new Date().getFullYear();

    // Mobile menu
    elements.mobileMenuToggle.addEventListener('click', function () {
        elements.navMenu.classList.toggle('active');
        this.innerHTML = elements.navMenu.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu on link click
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            elements.navMenu.classList.remove('active');
            elements.mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Smooth scroll for all internal links
    elements.anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Download CV
    elements.downloadCV.addEventListener('click', function (e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'assets/BinilCV.pdf';
        link.download = 'Binil_Vincent_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Form submission via formsubmit.co (no library, no API key needed — zero config!)
    elements.messageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            _subject: 'Portfolio Contact: ' + document.getElementById('subject').value,
            _captcha: 'false',
            _template: 'table'
        };

        // formsubmit.co AJAX endpoint — no account setup needed
        fetch('https://formsubmit.co/ajax/binilvincent80@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === 'true' || data.success === true) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    submitBtn.style.background = '#00f3ff';
                    submitBtn.style.color = '#080a12';
                    elements.messageForm.reset();
                } else {
                    console.error('FormSubmit error:', data);
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error — Try Again';
                    submitBtn.style.background = '#ff003c';
                }
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            })
            .catch(err => {
                console.error('Network Error:', err);
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Network Error';
                submitBtn.style.background = '#ff003c';
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            });
    });

    // Use IntersectionObserver for scroll indicators (much more efficient than scroll events)
    setupScrollIndicators(elements);

    // Initialize Hero Dynamic Role & Specialization Orchestrator
    initHeroRoleOrchestrator();

    // Initialize Cyber Interactions (Card Spotlight, Mouse Glow, Scroll Progress)
    initCyberInteractions();

    setTimeout(() => initGSAPLazy(), 50);
    setTimeout(() => createStarsProgressive(), 100);
    setTimeout(() => createBubblesProgressive(), 200);
    setTimeout(() => initSlideshowLazy(elements), 300);
    setTimeout(() => initEducationTimelineScroll(), 150);
});

// Scroll indicators using IntersectionObserver (no layout reads on scroll!)
function setupScrollIndicators(elements) {
    const scrollDots = elements.scrollDots;
    const sections = elements.sections;
    const navLinks = elements.navLinks;

    // Use IntersectionObserver instead of scroll events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const sectionId = entry.target.getAttribute('id');

                scrollDots.forEach(dot => {
                    dot.classList.toggle('active', dot.getAttribute('data-target') === sectionId);
                });

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { threshold: [0.3, 0.5, 0.7], rootMargin: '-80px 0px -20% 0px' });

    sections.forEach(section => observer.observe(section));

    // Scroll to section when clicking dot
    scrollDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Progressive star creation with aggressive chunking
function createStarsProgressive() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    const totalStars = 80;
    const chunkSize = 10; // Smaller chunks
    let created = 0;

    function createChunk() {
        const fragment = document.createDocumentFragment();
        const end = Math.min(created + chunkSize, totalStars);

        for (let i = created; i < end; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `width:${Math.random() * 2 + 1}px;height:${Math.random() * 2 + 1}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 3}s;animation-duration:${Math.random() * 2 + 2}s`;
            fragment.appendChild(star);
        }

        container.appendChild(fragment);
        created = end;

        if (created < totalStars) {
            setTimeout(createChunk, 50); // Spread over time
        }
    }

    createChunk();
}

// Progressive bubble creation
function createBubblesProgressive() {
    const container = document.querySelector('.bubbles-container');
    if (!container) return;

    const totalBubbles = 8; // Reduced count
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 90 + 30;
        bubble.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;--drift:${(Math.random() - 0.5) * 100}px;animation-delay:${Math.random() * 5}s;animation-duration:${Math.random() * 10 + 15}s`;
        fragment.appendChild(bubble);
    }

    container.appendChild(fragment);

    // Continuous bubble creation (reduced frequency)
    setInterval(() => {
        if (!container || container.children.length > 15) return;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 90 + 30;
        const duration = Math.random() * 10 + 15;
        bubble.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;--drift:${(Math.random() - 0.5) * 100}px;animation-duration:${duration}s`;
        container.appendChild(bubble);

        setTimeout(() => bubble.remove(), duration * 1000);
    }, 5000); // Reduced from 3000 to 5000ms
}

// Lazy slideshow initialization
function initSlideshowLazy(elements) {
    const slides = document.querySelectorAll('.about-slide');
    const canvas = document.getElementById('dissolve-canvas');
    if (!canvas || !slides.length) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let currentSlide = 0;
    const slideInterval = 7000;
    const particleCount = 1000; // Heavily reduced

    // Simple canvas setup with batched layout read
    function setupCanvas() {
        const container = canvas.parentElement;
        if (container) {
            // Use RAF to batch layout reads and prevent forced reflow
            requestAnimationFrame(() => {
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                if (canvas.width !== width || canvas.height !== height) {
                    canvas.width = width;
                    canvas.height = height;
                }
            });
        }
    }

    function createParticles(slideElement) {
        if (!ctx || !slideElement || !slideElement.complete) return [];

        const particles = [];
        const step = Math.floor(Math.sqrt((canvas.width * canvas.height) / particleCount));

        for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
                particles.push({
                    x, y,
                    color: 'rgba(255,255,255,0.8)',
                    size: step,
                    velocity: { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 - 2 },
                    life: 1.0,
                    decay: Math.random() * 0.02 + 0.015
                });
            }
        }
        return particles;
    }

    function animateDissolve(particles) {
        if (!ctx || !particles.length) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeCount = 0;
        particles.forEach(p => {
            if (p.life > 0) {
                activeCount++;
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                p.x += p.velocity.x;
                p.y += p.velocity.y;
                p.life -= p.decay;
            }
        });

        if (activeCount > 0) {
            requestAnimationFrame(() => animateDissolve(particles));
        }
    }

    function changeSlide() {
        const current = slides[currentSlide];
        const next = (currentSlide + 1) % slides.length;
        const nextSlide = slides[next];

        const particles = createParticles(current);
        if (particles.length) {
            current.classList.add('dissolving');
            animateDissolve(particles);
        }

        setTimeout(() => {
            current.classList.remove('active', 'dissolving');
            nextSlide.classList.add('active');
            currentSlide = next;
        }, 100);
    }

    // Setup with single layout read
    setupCanvas();
    slides[0].classList.add('active');

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupCanvas, 300);
    }, { passive: true });

    setTimeout(() => setInterval(changeSlide, slideInterval), 1000);
}

// ==========================================================================
// Interactive Cyber Spotlight, Mouse Glow & Scroll Progress
// ==========================================================================
function initCyberInteractions() {
    // 1. Interactive Card Holographic Spotlight
    const interactiveCards = document.querySelectorAll(
        '.skill-card, .project-card, .about-pillar-card, .milestone-card, .cert-card'
    );

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--card-x', `${x}px`);
            card.style.setProperty('--card-y', `${y}px`);
        }, { passive: true });
    });

    // 2. Global Interactive Mouse Glow Spotlight
    let mouseGlow = document.getElementById('globalMouseGlow');
    if (!mouseGlow) {
        mouseGlow = document.createElement('div');
        mouseGlow.id = 'globalMouseGlow';
        mouseGlow.className = 'global-mouse-glow';
        document.body.appendChild(mouseGlow);
    }

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function renderGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        mouseGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
        requestAnimationFrame(renderGlow);
    }
    requestAnimationFrame(renderGlow);

    // 3. Dynamic Reading Scroll Progress on Navigation Header
    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
}

// Lazy GSAP initialization with high-tier animations
function initGSAPLazy() {
    if (typeof gsap === 'undefined') return;

    // Step 1: Hero cinematic entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
        .from('.hero-status-pill', { duration: 0.65, y: -20, opacity: 0, ease: "back.out(1.5)" })
        .from('.home-content h1', { duration: 0.85, y: 35, opacity: 0, filter: "blur(8px)" }, "-=0.35")
        .from('.hero-role-block', { duration: 0.8, y: 25, opacity: 0 }, "-=0.5")
        .from('.home-content p', { duration: 0.8, y: 20, opacity: 0 }, "-=0.4")
        .from('.btn-container', { duration: 0.75, y: 20, opacity: 0, ease: "power2.out" }, "-=0.3")
        .from('.profile-img', { duration: 1.1, scale: 0.9, opacity: 0, filter: "blur(12px)", ease: "power2.out" }, "-=0.8");

    // Ensure profile image is cleared of any stale inline styles
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.opacity = '1';
        profileImg.style.visibility = 'visible';
    }

    // Step 2: Defer ScrollTrigger setup
    setTimeout(() => initScrollTriggers(), 100);
}

// Comprehensive ScrollTrigger setup across all sections
function initScrollTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Synchronized Section Headers Reveal (Eyebrow -> Title -> Subtitle)
    gsap.utils.toArray('.section-header-block').forEach(header => {
        const eyebrow = header.querySelector('.section-eyebrow');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true
            }
        });

        if (eyebrow) tl.from(eyebrow, { duration: 0.5, y: -12, opacity: 0, ease: "power2.out" });
        if (title) tl.from(title, { duration: 0.65, y: 22, opacity: 0, filter: "blur(6px)", ease: "power3.out" }, "-=0.35");
        if (subtitle) tl.from(subtitle, { duration: 0.55, y: 15, opacity: 0, ease: "power2.out" }, "-=0.3");
    });

    // 2. About Section: Image Slideshow & Content Stagger
    gsap.from('.about-img-slideshow', {
        scrollTrigger: { trigger: '#about', start: 'top 88%', toggleActions: 'play none none none', once: true },
        duration: 0.85,
        x: -40,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power3.out"
    });

    gsap.from('.about-content .about-role-headline, .about-content .about-lead', {
        scrollTrigger: { trigger: '#about', start: 'top 88%', toggleActions: 'play none none none', once: true },
        duration: 0.75,
        x: 40,
        opacity: 0,
        stagger: 0.12,
        ease: "power3.out"
    });

    gsap.utils.toArray('.about-pillars-grid .about-pillar-card').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none', once: true },
            duration: 0.6,
            y: 25,
            opacity: 0,
            scale: 0.96,
            ease: "power2.out"
        });
    });

    gsap.from('.about-quick-tags .about-tag', {
        scrollTrigger: { trigger: '.about-quick-tags', start: 'top 92%', toggleActions: 'play none none none', once: true },
        duration: 0.5,
        y: 15,
        opacity: 0,
        stagger: 0.08,
        ease: "back.out(1.2)"
    });

    // 3. Work Experience Milestone Card
    gsap.utils.toArray('.work-timeline .milestone-card').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none', once: true },
            duration: 0.7,
            y: 30,
            opacity: 0,
            scale: 0.97,
            ease: "power3.out"
        });
    });

    // 4. Skills Cards: Individual Card Reveals
    gsap.utils.toArray('.skills-container .skill-card').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none', once: true },
            duration: 0.65,
            y: 28,
            opacity: 0,
            scale: 0.96,
            ease: "power3.out"
        });
    });

    // 5. Education Timeline Milestones Reveal
    gsap.utils.toArray('#education .education-milestone').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none', once: true },
            duration: 0.65,
            y: 30,
            opacity: 0,
            ease: "power3.out"
        });
    });

    // 6. Projects Cards: Individual Card Reveals
    gsap.utils.toArray('.projects-container .project-card').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none', once: true },
            duration: 0.65,
            y: 30,
            opacity: 0,
            scale: 0.96,
            ease: "power3.out"
        });
    });

    // 7. Certifications Showcase Entrance
    gsap.from('.cert-showcase-container', {
        scrollTrigger: { trigger: '#certifications', start: 'top 88%', toggleActions: 'play none none none', once: true },
        duration: 0.85,
        y: 35,
        opacity: 0,
        scale: 0.96,
        ease: "power3.out"
    });

    // 8. Contact Section: Split Entrance
    gsap.from('.contact-info .contact-item, .contact-info .social-links a', {
        scrollTrigger: { trigger: '#contact', start: 'top 88%', toggleActions: 'play none none none', once: true },
        duration: 0.6,
        x: -25,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out"
    });

    gsap.from('.contact-form', {
        scrollTrigger: { trigger: '#contact', start: 'top 88%', toggleActions: 'play none none none', once: true },
        duration: 0.75,
        x: 35,
        opacity: 0,
        ease: "power3.out"
    });

    // 9. Header Scrolled Class Toggle
    gsap.to('header', {
        scrollTrigger: {
            trigger: 'body',
            start: '100px top',
            toggleClass: { targets: 'header', className: 'scrolled' }
        }
    });

    // Refresh ScrollTrigger calculations
    ScrollTrigger.refresh();

    // Debounced refresh on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    }, { passive: true });

    // Refresh once all assets/images are loaded
    window.addEventListener('load', () => ScrollTrigger.refresh());

    // Initialize Education Timeline scroll progress
    initEducationTimelineScroll();
}

// ==========================================================================
// Education Timeline Dynamic Scroll Down Progress Controller
// Animates glowing laser beam traveling from node to node as user scrolls
// ==========================================================================
function initEducationTimelineScroll() {
    const timeline = document.querySelector('#education .education-timeline');
    const progressBar = document.getElementById('educationProgressBeam');
    if (!timeline || !progressBar) return;

    const milestones = Array.from(timeline.querySelectorAll('.education-milestone'));
    if (!milestones.length) return;

    function updateProgress() {
        const timelineRect = timeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Focal point: 65% of viewport height (natural reading eye-line)
        const focalPoint = viewportHeight * 0.65;

        // Position of the scroll head relative to timeline top
        const currentHead = focalPoint - timelineRect.top;

        // If above the timeline, reset beam
        if (currentHead <= 15) {
            progressBar.style.height = '0px';
            progressBar.classList.remove('is-active');
            milestones.forEach(m => m.classList.remove('node-active'));
            return;
        }

        progressBar.classList.add('is-active');

        // Target height clamped between 0 and full timeline height
        const targetHeight = Math.max(0, Math.min(timelineRect.height - 20, currentHead));
        progressBar.style.height = `${targetHeight}px`;

        // Check each milestone node
        milestones.forEach((milestone) => {
            const node = milestone.querySelector('.milestone-node');
            if (!node) return;

            // Center of this node relative to the top of the timeline container
            const nodeRect = node.getBoundingClientRect();
            const nodeCenterRelative = (nodeRect.top + nodeRect.height / 2) - timelineRect.top;

            // When the beam tip reaches within 14px of the node center, ignite it!
            if (targetHeight >= nodeCenterRelative - 14) {
                if (!milestone.classList.contains('node-active')) {
                    milestone.classList.add('node-active');
                    if (window.gsap) {
                        gsap.fromTo(node, 
                            { scale: 0.95 }, 
                            { scale: 1.15, duration: 0.35, yoyo: true, repeat: 1, ease: 'back.out(2)' }
                        );
                    }
                }
            } else {
                milestone.classList.remove('node-active');
            }
        });
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Initial calculation
    updateProgress();
}

/**
 * Hero Role & Specialization Orchestrator ("Written and Vanish" Synchronized Experience)
 * Phase 1: Displays "DevOps Engineer & Full-Stack Engineer" with high-level systems overview
 * Phase 2: Vanishes, then types "DevOps Engineer" and below cycles through DevOps tools (Linux, Docker, K8s, Terraform, etc.)
 * Phase 3: Vanishes, then types "Full-Stack Engineer" and below cycles through Full-Stack tools (.NET, React, Python, Node, etc.)
 * Continues indefinitely in an ultra-smooth, responsive loop.
 */
function initHeroRoleOrchestrator() {
    const titleEl = document.getElementById('roleTitleText');
    const titleCursorEl = document.getElementById('roleTitleCursor');
    const consoleTextEl = document.getElementById('consoleTypingText');
    const specSymbolEl = document.getElementById('specSymbol');
    const specCursorEl = document.getElementById('specCursor');
    const specLineEl = document.getElementById('heroSpecLine');

    if (!titleEl || !consoleTextEl) return;

    // Natural typewriter character insertion
    function typeText(element, text, speed = 50) {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';
            function tick() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(tick, speed + Math.random() * 15);
                } else {
                    resolve();
                }
            }
            tick();
        });
    }

    // Smooth vanish/backspacing
    function eraseText(element, speed = 24) {
        return new Promise(resolve => {
            function tick() {
                const current = element.textContent;
                if (current.length > 0) {
                    element.textContent = current.substring(0, current.length - 1);
                    setTimeout(tick, speed);
                } else {
                    resolve();
                }
            }
            tick();
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const sequence = [
        // 1. Initial High-Level Foundation
        {
            title: "DevOps Engineer & Full-Stack Engineer",
            titleClass: "role-combined",
            symbolClass: "",
            cursorClass: "",
            specLineClass: "",
            subSkills: [
                "Automated Cloud Infrastructure & Distributed Systems"
            ],
            skillHoldTime: 3200
        },
        // 2. Dedicated DevOps Engineer
        {
            title: "DevOps Engineer",
            titleClass: "role-devops",
            symbolClass: "",
            cursorClass: "",
            specLineClass: "",
            subSkills: [
                "Linux (Ubuntu / RHEL) & Kernel Automation",
                "Docker Containerization & Multi-Stage Builds",
                "Kubernetes (K8s) Cluster Orchestration",
                "CI/CD Pipelines (GitHub Actions & GitLab CI)",
                "Multi-Cloud (AWS • Microsoft Azure • GCP)",
                "Terraform (Infrastructure as Code - IaC)",
                "Ansible Playbooks & Configuration Automation",
                "Observability (Prometheus • Grafana • Netdata)"
            ],
            skillHoldTime: 2000
        },
        // 3. Dedicated Full-Stack Engineer
        {
            title: "Full-Stack Engineer",
            titleClass: "role-fullstack",
            symbolClass: "symbol-purple",
            cursorClass: "cursor-purple",
            specLineClass: "theme-purple",
            subSkills: [
                "ASP.NET Core & C# Distributed Backend",
                "React.js (React 19) & Modern Reactive Web",
                "Node.js & Express Real-Time Microservices",
                "Python Automation, Flask & FastAPI",
                "TypeScript & Scalable Modular Architecture",
                "Databases (MySQL • PostgreSQL • MongoDB • Redis)"
            ],
            skillHoldTime: 2000
        }
    ];

    let stateIndex = 0;

    async function runLoop() {
        // First state is already loaded in static HTML — wait for reader
        await sleep(3000);

        while (true) {
            // Vanish current specialization text
            await eraseText(consoleTextEl, 22);
            await sleep(200);

            // Vanish current main role title ("and that goes")
            await eraseText(titleEl, 28);
            await sleep(350);

            // Advance to next state
            stateIndex = (stateIndex + 1) % sequence.length;
            const nextState = sequence[stateIndex];

            // Update title gradient class
            titleEl.className = 'role-title-text ' + nextState.titleClass;

            // Update symbol and cursor theme
            if (specSymbolEl) {
                specSymbolEl.className = 'spec-symbol ' + (nextState.symbolClass || '');
            }
            if (specCursorEl) {
                specCursorEl.className = 'spec-cursor ' + (nextState.cursorClass || '');
            }
            if (titleCursorEl) {
                titleCursorEl.className = 'role-title-cursor ' + (nextState.cursorClass || '');
            }
            if (specLineEl) {
                specLineEl.className = 'hero-spec-line ' + (nextState.specLineClass || '');
            }

            // Type next main title (e.g. "DevOps Engineer" or "Full-Stack Engineer")
            await typeText(titleEl, nextState.title, 48);
            await sleep(400);

            // Type and vanish each corresponding technology below
            for (let i = 0; i < nextState.subSkills.length; i++) {
                const skill = nextState.subSkills[i];
                await typeText(consoleTextEl, skill, 40);
                await sleep(nextState.skillHoldTime);

                // Vanish to prepare for the next tech if not last
                if (i < nextState.subSkills.length - 1) {
                    await eraseText(consoleTextEl, 22);
                    await sleep(250);
                }
            }

            // Short pause at end of state before next role change
            await sleep(500);
        }
    }

    runLoop();
}
