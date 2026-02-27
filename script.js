document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // Intersection Observer for scroll animations
    // ------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px 80px 0px',
        threshold: 0.05
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

    // ------------------------------------
    // Mobile menu toggle
    // ------------------------------------
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Swap between hamburger and close icon
        if (navLinks.classList.contains('active')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-xmark');
        } else {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        });
    });

    // Initialize state
    if (window.scrollY > 50) navbar.classList.add('scrolled');

    // ------------------------------------
    // Contact Form — Google Forms submission
    // ------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name    = document.getElementById('cf-name').value.trim();
            const email   = document.getElementById('cf-email').value.trim();
            const subject = document.getElementById('cf-subject').value;
            const message = document.getElementById('cf-message').value.trim();

            if (!name || !email || !message) return;

            const btn       = contactForm.querySelector('.submit-btn');
            const btnText   = btn.querySelector('.btn-text');
            const btnLoad   = btn.querySelector('.btn-loading');
            const success   = document.getElementById('form-success');
            const error     = document.getElementById('form-error');

            btn.disabled  = true;
            btnText.style.display = 'none';
            btnLoad.style.display = 'inline';
            success.style.display = 'none';
            error.style.display   = 'none';

            const formData = new FormData();
            formData.append('entry.1009294381', name);
            formData.append('entry.71951438',   email);
            formData.append('entry.1017560239', subject);
            formData.append('entry.588135168',  message);

            try {
                await fetch(
                    'https://docs.google.com/forms/d/e/1FAIpQLSdmQWCV9tLxXAgc_9_Tnd4zGb5PCVe5BC39M2ihl5JQwIv3Bw/formResponse',
                    { method: 'POST', body: formData, mode: 'no-cors' }
                );
                success.style.display = 'flex';
                contactForm.reset();
            } catch {
                error.style.display = 'flex';
            } finally {
                btn.disabled = false;
                btnText.style.display = 'inline';
                btnLoad.style.display = 'none';
            }
        });
    }

    // ------------------------------------
    // Smooth Scrolling for anchor links
    // ------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

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
