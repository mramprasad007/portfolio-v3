document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // Intersection Observer for scroll animations
    // ------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-anim');
    animatedElements.forEach(el => observer.observe(el));

    // ------------------------------------
    // Navbar scroll effect
    // ------------------------------------
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep it solid feeling, or change according to preference
            // Actually let's make it toggle
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Initialize state
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    // ------------------------------------
    // Smooth Scrolling for anchor links
    // ------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const yOffset = -100; 
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
});
