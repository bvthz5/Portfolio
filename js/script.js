document.addEventListener('DOMContentLoaded', function() {
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
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const slideInterval = 4000; // 4 seconds per image
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
    
    // Update active dot on scroll
    function updateActiveDot() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
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
    
    window.addEventListener('scroll', updateActiveDot);
    
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
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: "power3.out"
    });
    
    // Work timeline animations
    gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        });
    });
    
    // Skills cards animations
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
    
    // Education timeline animations
    gsap.utils.toArray('.education-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
    
    // Project cards animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: i * 0.1,
            ease: "back.out(1.2)"
        });
    });
    
    // Certification cards animations
    gsap.utils.toArray('.cert-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            delay: i * 0.2,
            ease: "power3.out"
        });
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: "power3.out"
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: 50,
        opacity: 0,
        ease: "power3.out"
    });
    
    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out"
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
    
    // Initialize scroll trigger
    ScrollTrigger.refresh();
});
