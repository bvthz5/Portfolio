// Performance-optimized script with minimal reflows and chunked operations

document.addEventListener('DOMContentLoaded', function() {
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
    elements.mobileMenuToggle.addEventListener('click', function() {
        elements.navMenu.classList.toggle('active');
        this.innerHTML = elements.navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu on link click
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        anchor.addEventListener('click', function(e) {
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
    elements.downloadCV.addEventListener('click', function(e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'assets/BinilCV.pdf';
        link.download = 'Binil_Vincent_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Form submission
    elements.messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
    
    // Use IntersectionObserver for scroll indicators (much more efficient than scroll events)
    setupScrollIndicators(elements);
    
    // Defer all heavy operations with progressive enhancement
    setTimeout(() => createStarsProgressive(), 100);
    setTimeout(() => createBubblesProgressive(), 200);
    setTimeout(() => initSlideshowLazy(elements), 300);
    setTimeout(() => initGSAPLazy(), 400);
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
        dot.addEventListener('click', function() {
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
            star.style.cssText = `width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${Math.random()*2+2}s`;
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
        bubble.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;--drift:${(Math.random()-0.5)*100}px;animation-delay:${Math.random()*5}s;animation-duration:${Math.random()*10+15}s`;
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
        bubble.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;--drift:${(Math.random()-0.5)*100}px;animation-duration:${duration}s`;
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

// Lazy GSAP initialization - split into chunks
function initGSAPLazy() {
    if (typeof gsap === 'undefined') return;
    
    // Skip floating elements to reduce load
    
    // Step 1: Home animations only
    gsap.timeline({ defaults: { ease: "power2.out" } })
        .from('.home-content h1', { duration: 0.6, y: 20, opacity: 0 })
        .from('.home-content h2', { duration: 0.5, y: 15, opacity: 0 }, "-=0.3")
        .from('.home-content p', { duration: 0.5, y: 15, opacity: 0 }, "-=0.2")
        .from('.btn-container', { duration: 0.5, y: 15, opacity: 0 }, "-=0.2")
        .from('.profile-img', { duration: 0.6, scale: 0.9, opacity: 0 }, "-=0.3");
    
    // Step 2: Defer ScrollTrigger setup
    setTimeout(() => initScrollTriggers(), 100);
}

// Separate function for ScrollTrigger setup
function initScrollTriggers() {
    if (typeof gsap === 'undefined') return;
    
    const scrollConfig = {
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        once: false
    };
    
    // About section
    gsap.from('.about-img-slideshow', {
        scrollTrigger: { trigger: '#about', ...scrollConfig },
        duration: 0.6,
        x: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.about-content', {
        scrollTrigger: { trigger: '#about', ...scrollConfig },
        duration: 0.6,
        x: 50,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Defer card animations - split into separate batches to prevent long tasks
    setTimeout(() => {
        // Batch 1: Timeline and skills
        ['.timeline-item', '.skill-card'].forEach(selector => {
            gsap.utils.toArray(selector).forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, ...scrollConfig },
                    duration: 0.5,
                    y: 20,
                    opacity: 0,
                    ease: "power2.out"
                });
            });
        });
    }, 50);
    
    setTimeout(() => {
        // Batch 2: Projects and certs
        ['.project-card', '.cert-card', '.section-title'].forEach(selector => {
            gsap.utils.toArray(selector).forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, ...scrollConfig },
                    duration: 0.5,
                    y: 20,
                    opacity: 0,
                    ease: "power2.out"
                });
            });
        });
    }, 100);
    
    // Defer complex animations - split into smaller chunks
    setTimeout(() => {
        // Contact section first
        gsap.from('.contact-info', {
            scrollTrigger: { trigger: '#contact', ...scrollConfig },
            duration: 0.6,
            x: -30,
            opacity: 0,
            ease: "power2.out"
        });
        
        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '#contact', ...scrollConfig },
            duration: 0.6,
            x: 30,
            opacity: 0,
            ease: "power2.out"
        });
    }, 150);
    
    // Education horizontal scroll in separate batch
    setTimeout(() => {
        if (window.innerWidth > 768) {
            const timeline = document.querySelector('.education-timeline');
            const section = document.querySelector('#education');
            
            if (timeline && section) {
                const getScrollAmount = () => -(timeline.scrollWidth - window.innerWidth);
                
                const horizontalTween = gsap.to(timeline, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${timeline.scrollWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
                
                gsap.utils.toArray('.education-item').forEach(item => {
                    gsap.from(item, {
                        opacity: 0,
                        y: 30,
                        scrollTrigger: {
                            trigger: item,
                            containerAnimation: horizontalTween,
                            start: "left 80%",
                            toggleActions: 'play none none reverse'
                        }
                    });
                });
            }
        }
    }, 200);
    
    // Header scroll animation
    gsap.to('header', {
        scrollTrigger: {
            trigger: 'body',
            start: '100px top',
            toggleClass: { targets: 'header', className: 'scrolled' }
        }
    });
    
    // Configure ScrollTrigger
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 250,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
    });
    
    // Defer refresh
    setTimeout(() => ScrollTrigger.refresh(), 100);
    
    // Debounced refresh on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
    }, { passive: true });
}

