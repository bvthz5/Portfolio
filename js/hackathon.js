// GSAP Animations - Optimized for performance
document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Create Dynamic Space Elements
    createSpaceElements();
    
    // Batch all initial animations to reduce reflows
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    // Hero Section Animations
    tl.from('.badge', { duration: 0.6, y: -30, opacity: 0, delay: 0.2 })
      .from('.glitch', { duration: 0.6, scale: 0.9, opacity: 0 }, '-=0.4')
      .from('.subtitle', { duration: 0.6, y: 20, opacity: 0 }, '-=0.4')
      .from('.detail-item', { duration: 0.5, x: -30, opacity: 0, stagger: 0.1 }, '-=0.4');
    
    // Story Section Animation
    // Removed section-title animation to keep it always visible
    
    gsap.from('.story-card', {
        scrollTrigger: {
            trigger: '.story-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.project-showcase', {
        scrollTrigger: {
            trigger: '.project-showcase',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.95,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.tech-card', {
        scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Achievement Banner Animation
    gsap.from('.achievement-banner', {
        scrollTrigger: {
            trigger: '.achievement-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.95,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.achievement-image', {
        scrollTrigger: {
            trigger: '.achievement-image',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // Gallery Items Animation
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // LinkedIn Section Animation
    gsap.from('.linkedin-cta', {
        scrollTrigger: {
            trigger: '.linkedin-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.gratitude-section', {
        scrollTrigger: {
            trigger: '.gratitude-section',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.95,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // Section Titles - Removed animation to keep them always visible
    // const sectionTitles = document.querySelectorAll('.section-title');
    // sectionTitles.forEach(title => {
    //     gsap.from(title, {
    //         scrollTrigger: {
    //             trigger: title,
    //             start: 'top 85%',
    //             toggleActions: 'play none none none'
    //         },
    //         duration: 0.8,
    //         y: 30,
    //         opacity: 0,
    //         ease: 'power2.out'
    //     });
    // });
    
});

// Create Dynamic Space Elements (Comets, Shooting Stars, Twinkling Stars)
function createSpaceElements() {
    const cometsContainer = document.querySelector('.comets-container');
    const shootingStarsContainer = document.querySelector('.shooting-stars-container');
    
    // Create Comets (Big bright shooting objects)
    function createComet() {
        const comet = document.createElement('div');
        comet.className = 'comet';
        
        // Random starting position at top or left edges
        const startSide = Math.random() > 0.5 ? 'top' : 'left';
        if (startSide === 'top') {
            comet.style.top = Math.random() * 30 + '%';
            comet.style.left = Math.random() * 100 + '%';
        } else {
            comet.style.top = Math.random() * 100 + '%';
            comet.style.left = Math.random() * 30 + '%';
        }
        
        // Random animation duration and delay
        const duration = Math.random() * 2 + 2; // 2-4 seconds
        const delay = Math.random() * 8; // 0-8 seconds
        comet.style.animationDuration = duration + 's';
        comet.style.animationDelay = delay + 's';
        
        cometsContainer.appendChild(comet);
        
        // Remove after animation
        setTimeout(() => {
            if (comet.parentNode) {
                comet.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Create Shooting Stars (Fast streaks)
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random position in upper portion of screen
        star.style.top = Math.random() * 40 + '%';
        star.style.left = Math.random() * 50 + '%';
        
        // Random animation properties
        const duration = Math.random() * 1 + 1.5; // 1.5-2.5 seconds
        const delay = Math.random() * 5;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';
        
        shootingStarsContainer.appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Create Twinkling Stars dynamically for variety
    function createTwinklingStar() {
        const twinklingStar = document.createElement('div');
        twinklingStar.style.position = 'absolute';
        twinklingStar.style.width = Math.random() * 3 + 1 + 'px';
        twinklingStar.style.height = twinklingStar.style.width;
        twinklingStar.style.borderRadius = '50%';
        twinklingStar.style.background = 'white';
        twinklingStar.style.boxShadow = '0 0 6px rgba(255, 255, 255, 0.8)';
        twinklingStar.style.top = Math.random() * 100 + '%';
        twinklingStar.style.left = Math.random() * 100 + '%';
        twinklingStar.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        twinklingStar.style.animationDelay = Math.random() * 3 + 's';
        
        document.querySelector('.space-background').appendChild(twinklingStar);
    }
    
    // Initial creation
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createComet(), i * 3000);
    }
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createShootingStar(), i * 2000);
    }
    
    // Add 50 twinkling stars
    for (let i = 0; i < 50; i++) {
        createTwinklingStar();
    }
    
    // Continuously create comets every 8-12 seconds
    setInterval(() => {
        if (Math.random() > 0.3) {
            createComet();
        }
    }, Math.random() * 4000 + 8000);
    
    // Continuously create shooting stars every 3-6 seconds
    setInterval(() => {
        if (Math.random() > 0.2) {
            createShootingStar();
        }
    }, Math.random() * 3000 + 3000);
}

