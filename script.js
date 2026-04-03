document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth reveal animation for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after revealing to prevent it from fading out again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with the fade-in class and observe them
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});