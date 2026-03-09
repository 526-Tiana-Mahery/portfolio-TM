/**
 * Portfolio - Script principal
 * Design premium : menu, navbar, formulaire, animations, section active
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initActiveSection();
    initContactForm();
    initScrollReveal();
    initSmoothScroll();
    initParallaxOrbs();
});

/**
 * Menu mobile - Toggle hamburger avec animation
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuToggle.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

/**
 * Navbar - Effet glass au scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/**
 * Section active dans la navigation
 */
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach(section => observer.observe(section));
}

/**
 * Formulaire de contact
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;

        console.log('Message envoyé:', { name, email, message });

        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Message envoyé ! ✓</span>';
        btn.disabled = true;
        btn.classList.add('!bg-emerald-600', '!shadow-emerald-500/30');

        form.reset();

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.classList.remove('!bg-emerald-600', '!shadow-emerald-500/30');
        }, 3000);
    });
}

/**
 * Animation reveal au scroll
 */
function initScrollReveal() {
    const revealSelectors = [
        '#about .grid > *',
        '#skills .skill-card',
        '#projects .project-card',
        '#cv .glass-card',
        '#contact form',
        '#contact .glass-card',
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    revealElements.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/**
 * Smooth scroll pour les ancres
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Parallax subtil sur les orbes du hero
 */
function initParallaxOrbs() {
    const orb1 = document.querySelector('.hero-orb-1');
    const orb2 = document.querySelector('.hero-orb-2');

    if (!orb1 || !orb2) return;

    let ticking = false;
    let latestY = 0;

    const update = () => {
        ticking = false;
        // Utilise la propriété CSS `translate` pour ne pas écraser les transforms/animations existantes
        orb1.style.translate = `0px ${latestY * 0.08}px`;
        orb2.style.translate = `0px ${latestY * 0.12}px`;
    };

    window.addEventListener(
        'scroll',
        () => {
            latestY = window.scrollY;
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        },
        { passive: true }
    );
}
