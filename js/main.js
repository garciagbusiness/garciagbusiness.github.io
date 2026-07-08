// Navbar: add scrolled class on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-up animation on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Animated stat counters
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target  = parseFloat(el.dataset.target);
        const suffix  = el.dataset.suffix || '';
        const decimal = el.dataset.decimal === 'true';
        const duration = 1400;
        const steps  = 60;
        const delay  = duration / steps;
        let current  = 0;
        const increment = target / steps;

        const tick = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(tick);
            }
            el.textContent = decimal
                ? current.toFixed(1)
                : Math.floor(current) + suffix;
        }, delay);
    });
}

// Trigger counters when hero stats enter view
const statsEl = document.querySelector('.hero-stats');
let statsAnimated = false;

if (statsEl) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsEl);
}
