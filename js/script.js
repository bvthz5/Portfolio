document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Create animated background elements
    createStars();
    createBubbles();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Smooth scroll to section
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Download CV button
    document.getElementById('download-cv').addEventListener('click', function(e) {
        e.preventDefault();
        // Download CV from assets folder
        const link = document.createElement('a');
        link.href = 'assets/BinilCV.pdf';
        link.download = 'Binil_Vincent_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Form submission
    document.getElementById('messageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
    
    // About Image Slideshow with Particle Dissolve Effect
    const slides = document.querySelectorAll('.about-slide');
    const canvas = document.getElementById('dissolve-canvas');
    if (!canvas) {
        console.log('Canvas not found, skipping slideshow');
    }
    const ctx = canvas ? canvas.getContext('2d', { willReadFrequently: true }) : null;
    let currentSlide = 0;
    const slideInterval = 7000; // 7 seconds per image
    const particleCount = 2000; // Reduced for better performance
    
    function initCanvas() {
        if (!canvas) return;
        const container = document.querySelector('.about-img-slideshow');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    function createParticles(slideElement) {
        if (!ctx || !slideElement) return [];
        
        // Check if image is loaded
        if (!slideElement.complete || slideElement.naturalWidth === 0) {
            console.log('Image not loaded yet, using simple fade transition');
            return [];
        }
        
        try {
            // Instead of reading pixel data (which causes CORS issues on file://),
            // create particles in a grid pattern over the image area
            const particles = [];
            const step = Math.floor(Math.sqrt((canvas.width * canvas.height) / particleCount));
            
            // Create particles in a grid
            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    // Use semi-transparent white particles
                    particles.push({
                        x: x,
                        y: y,
                        color: `rgba(255, 255, 255, 0.8)`,
                        size: step,
                        velocity: {
                            x: (Math.random() - 0.5) * 8,
                            y: (Math.random() - 0.5) * 8 - 2
                        },
                        life: 1.0,
                        decay: Math.random() * 0.02 + 0.015
                    });
                }
            }
            
            console.log(`Created ${particles.length} particles`);
            return particles;
        } catch (error) {
            console.error('Particle creation error:', error.message, error);
            console.log('Could not create particles, using simple fade transition');
            return [];
        }
    }
    
    function animateDissolve(particles) {
        if (!ctx || particles.length === 0) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeParticles = 0;
        
        particles.forEach(particle => {
            if (particle.life > 0) {
                activeParticles++;
                
                // Update particle
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.velocity.y += 0.3; // Gravity
                particle.life -= particle.decay;
                
                // Draw particle
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            }
        });
        
        ctx.globalAlpha = 1.0;
        
        if (activeParticles > 0) {
            requestAnimationFrame(() => animateDissolve(particles));
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    function changeSlide() {
        const currentSlideElement = slides[currentSlide];
        const nextSlide = (currentSlide + 1) % slides.length;
        const nextSlideElement = slides[nextSlide];
        
        // Create particles from current image using the DOM element
        const particles = createParticles(currentSlideElement);
        
        // Mark current slide as dissolving
        if (particles.length > 0) {
            currentSlideElement.classList.add('dissolving');
        }
        
        // Hide current slide after a brief moment
        setTimeout(() => {
            currentSlideElement.classList.remove('active');
            currentSlideElement.classList.remove('dissolving');
            
            // Show next slide
            nextSlideElement.classList.add('active');
            currentSlide = nextSlide;
        }, 100);
        
        // Animate particles if available
        if (particles.length > 0) {
            animateDissolve(particles);
        }
    }
    
    // Initialize canvas and start slideshow
    if (canvas && slides.length > 0) {
        // Wait for images to load
        let imagesLoaded = 0;
        slides.forEach(slide => {
            if (slide.complete && slide.naturalWidth > 0) {
                imagesLoaded++;
            } else {
                slide.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === slides.length) {
                        console.log('All images loaded');
                        initCanvas();
                    }
                });
            }
        });
        
        if (imagesLoaded === slides.length) {
            console.log('Images already loaded');
            initCanvas();
        }
        
        window.addEventListener('resize', initCanvas);
        
        // Show first slide immediately
        slides[0].classList.add('active');
        
        // Start slideshow after a short delay
        setTimeout(() => {
            setInterval(changeSlide, slideInterval);
        }, 500);
    }
    
    // Scroll indicator functionality
    const scrollDots = document.querySelectorAll('.scroll-dot');
    const sections = document.querySelectorAll('section');
    
    // Throttle function to prevent excessive scroll event firing
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Update active dot on scroll
    function updateActiveDot() {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        // If at the very top, always show Home
        if (scrollPosition < 100) {
            current = 'home';
        } else {
            // Check which section is currently in view
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                // Check if scroll position is within this section
                if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                    current = sectionId;
                }
            });
            
            // Fallback to first section if none detected
            if (!current && sections.length > 0) {
                current = sections[0].getAttribute('id');
            }
        }
        
        scrollDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === current) {
                dot.classList.add('active');
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Use throttled version to prevent event conflicts
    const throttledUpdate = throttle(updateActiveDot, 100);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateActiveDot(); // Initialize on page load
    
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
    
    // Initialize GSAP animations
    
    // Create floating background elements with optimized performance
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        // Random size and position - batch DOM reads/writes
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Use transform instead of direct positioning to avoid reflow
        gsap.set(el, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            force3D: true // Hardware acceleration
        });
        
        // Animate floating with hardware acceleration
        gsap.to(el, {
            x: `+=${Math.random() * 100 - 50}`,
            y: `+=${Math.random() * 100 - 50}`,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true
        });
    });
    
    // Home section animations
    const homeTL = gsap.timeline();
    homeTL
        .from('.home-content h1', { duration: 1, y: 50, opacity: 0, ease: "power3.out" })
        .from('.home-content h2', { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.5")
        .from('.home-content p', { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.4")
        .from('.btn-container', { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.4")
        .from('.profile-img', { duration: 1.2, scale: 0, opacity: 0, rotate: 180, ease: "back.out(1.7)" }, "-=0.5");
    
    // About section animations
    gsap.from('.about-img-slideshow', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -100,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 100,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Work timeline animations - each item independent
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                id: `timeline-${i}`
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Skills section animations - each card independent
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                id: `skill-${i}`
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Education timeline horizontal scroll animation
    const educationTimeline = document.querySelector('.education-timeline');
    if (educationTimeline && window.innerWidth > 768) {
        const educationItems = gsap.utils.toArray('.education-item');
        const educationSection = document.querySelector('#education');
        
        // Calculate proper scroll distance
        const getScrollAmount = () => {
            const timelineWidth = educationTimeline.scrollWidth;
            const viewportWidth = window.innerWidth;
            return -(timelineWidth - viewportWidth);
        };
        
        // Create horizontal scroll effect with isolated trigger
        const horizontalTween = gsap.to(educationTimeline, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: educationSection,
                start: "top top",
                end: () => `+=${educationTimeline.scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                id: "educationScroll",
                fastScrollEnd: true,
                preventOverlaps: true
            }
        });
        
        // Fade in items as they scroll into view (independent of main scroll)
        educationItems.forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                y: 50,
                scale: 0.9,
                scrollTrigger: {
                    trigger: item,
                    containerAnimation: horizontalTween,
                    start: "left 80%",
                    end: "left 50%",
                    toggleActions: 'play none none reverse',
                    scrub: 0.5
                }
            });
        });
    } else if (educationTimeline && window.innerWidth <= 768) {
        // Simple fade-in for mobile without horizontal scroll
        const educationItems = gsap.utils.toArray('.education-item');
        educationItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none reverse',
                    id: `education-mobile-${i}`
                },
                duration: 0.6,
                y: 30,
                opacity: 0,
                ease: "power2.out"
            });
        });
    }
    
    // Project cards animations - each card independent
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                id: `project-${i}`
            },
            duration: 0.7,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Certification cards animations - each card independent
    gsap.utils.toArray('.cert-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
                id: `cert-${i}`
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Section title animations - each title independent
    gsap.utils.toArray('.section-title').forEach((title, i) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                end: 'top 70%',
                toggleActions: 'play none none reverse',
                id: `title-${i}`
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Header animation on scroll
    gsap.to('header', {
        scrollTrigger: {
            trigger: 'body',
            start: '100px top',
            end: 'bottom top',
            toggleClass: {targets: 'header', className: 'scrolled'}
        }
    });
    
    // Configure ScrollTrigger for optimal independent component behavior
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
    });
    
    // Initialize scroll trigger with proper refresh
    ScrollTrigger.refresh();
    
    // Debounced refresh on window resize to prevent conflicts
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});

// Create floating stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 2 + 2}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create floating bubbles
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles-container');
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size between 30px and 120px
        const size = Math.random() * 90 + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random horizontal position
        const leftPosition = Math.random() * 100;
        bubble.style.left = `${leftPosition}%`;
        
        // Random horizontal drift (-50px to 50px)
        const drift = (Math.random() - 0.5) * 100;
        bubble.style.setProperty('--drift', `${drift}px`);
        
        // Random animation delay and duration
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        bubblesContainer.appendChild(bubble);
    }
    
    // Continuously create new bubbles
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 90 + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        const leftPosition = Math.random() * 100;
        bubble.style.left = `${leftPosition}%`;
        
        const drift = (Math.random() - 0.5) * 100;
        bubble.style.setProperty('--drift', `${drift}px`);
        
        bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
        
        bubblesContainer.appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            bubble.remove();
        }, parseFloat(bubble.style.animationDuration) * 1000);
    }, 3000);
}

