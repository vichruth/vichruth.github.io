// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Initial Hero Load Animations ---
    const heroTl = gsap.timeline();
    
    heroTl.from(".title-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
    .from(".subtitle-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".desc-anim", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6");


    // --- 2. Scroll-Triggered Reveals ---
    
    // Standard Fade Up (Headings and Text blocks)
    gsap.utils.toArray('.gs-reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Triggers when top of element hits 85% down viewport
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Staggered Grid Reveal (Experience Specs)
    gsap.from(".spec-card", {
        scrollTrigger: {
            trigger: ".gs-stagger",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Delays each card slightly after the previous one
        ease: "back.out(1.7)"
    });

    // Left & Right Slide Reveals (Split Sections)
    gsap.utils.toArray('.right-reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: { trigger: elem, start: "top 80%" },
            x: 60, opacity: 0, duration: 1.2, ease: "power3.out"
        });
    });

    gsap.utils.toArray('.left-reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: { trigger: elem, start: "top 80%" },
            x: -60, opacity: 0, duration: 1.2, ease: "power3.out"
        });
    });

    // Scale Up Reveal (Kaggle Section)
    gsap.from(".scale-reveal", {
        scrollTrigger: { trigger: ".scale-reveal", start: "top 85%" },
        scale: 0.9, opacity: 0, duration: 1.5, ease: "expo.out"
    });


    // --- 3. High-Performance GSAP Parallax ---
    // Smooth scrubbing effect tied exactly to scroll position
    
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, {
            yPercent: 20, // Moves the background 20% down as you scroll past
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom", 
                end: "bottom top",
                scrub: true // Ties animation progress directly to scrollbar
            }
        });
    });

    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });


    // --- 4. Dynamic Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
});