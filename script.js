/* ============================================================================
   PHAROS STEEL WORKS - MAIN SCRIPT
   Modular and maintainable JavaScript for website functionality
   ============================================================================ */

/* ============================================================================
   CONSTANTS & CONFIGURATION
   ============================================================================ */
const CONFIG = {
    debounceDelay: 100,
    scrollOffset: 200,
    animationThreshold: 0.1,
    animationRootMargin: '0px 0px -50px 0px'
};

const SELECTORS = {
    mobileMenuToggle: '.mobile-menu-toggle',
    nav: '.nav',
    navLinks: '.nav a',
    anchors: 'a[href^="#"]',
    sections: 'section[id]',
    animatedElements: '.service-card, .feature-card, .contact-card, .industry-card, .stat-item'
};

const CLASSES = {
    active: 'active',
    animateElement: 'animate-element',
    animateIn: 'animate-in'
};

const FORM_CONFIG = {
    maxFileSizeBytes: 10 * 1024 * 1024,
    timeoutMs: 25000
};

/* ============================================================================
   UTILITY FUNCTIONS
   ============================================================================ */
/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * Check if user prefers reduced motion
 * @returns {Boolean} True if user prefers reduced motion
 */
const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Toggle body scroll
 * @param {Boolean} enable - Enable or disable scroll
 */
const toggleBodyScroll = (enable) => {
    document.body.style.overflow = enable ? '' : 'hidden';
};

/* ============================================================================
   MOBILE NAVIGATION
   ============================================================================ */
const initMobileMenu = () => {
    const mobileMenuToggle = document.querySelector(SELECTORS.mobileMenuToggle);
    const nav = document.querySelector(SELECTORS.nav);
    const navLinks = document.querySelectorAll(SELECTORS.navLinks);

    if (!mobileMenuToggle || !nav) return;

    /**
     * Toggle mobile menu state
     */
    const toggleMenu = (forceClose = false) => {
        const isOpen = forceClose ? true : nav.classList.contains(CLASSES.active);
        
        mobileMenuToggle.classList.toggle(CLASSES.active, !isOpen);
        nav.classList.toggle(CLASSES.active, !isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', !isOpen);
        toggleBodyScroll(isOpen);
    };

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', () => toggleMenu());

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMenu(true);
        }
    });
};

/* ============================================================================
   SMOOTH SCROLLING & NAVIGATION
   ============================================================================ */
const initSmoothScrolling = () => {
    const anchors = document.querySelectorAll(SELECTORS.anchors);

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (!target) return;

            target.scrollIntoView({
                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                block: 'start'
            });

            // Set focus to target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        });
    });
};

/**
 * Update active navigation based on scroll position
 */
const updateActiveNav = debounce(function() {
    const sections = document.querySelectorAll(SELECTORS.sections);
    const navLinks = document.querySelectorAll(SELECTORS.navLinks);
    
    let current = '';
    const scrollPos = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= (sectionTop - CONFIG.scrollOffset)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove(CLASSES.active);
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add(CLASSES.active);
        }
    });
}, CONFIG.debounceDelay);

/* ============================================================================
   SCROLL ANIMATIONS
   ============================================================================ */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: CONFIG.animationThreshold,
        rootMargin: CONFIG.animationRootMargin
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(CLASSES.animateIn);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(SELECTORS.animatedElements);
    
    animatedElements.forEach(el => {
        el.classList.add(CLASSES.animateElement);
        observer.observe(el);
    });
};

/* ============================================================================
   EVENT LISTENERS
   ============================================================================ */
const initEventListeners = () => {
    // Scroll event for active navigation
    window.addEventListener('scroll', updateActiveNav, { passive: true });
};

/* ============================================================================
   CONTACT FORM
   ============================================================================ */
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    const statusElement = document.getElementById('formStatus');

    if (!form || !statusElement) return;

    const fileInput = form.querySelector('#attachment');
    const submitButton = form.querySelector('button[type="submit"]');

    const showStatus = (message, type) => {
        statusElement.textContent = message;
        statusElement.classList.remove('success', 'error');
        statusElement.classList.add(type);
        statusElement.hidden = false;
    };

    const clearStatus = () => {
        statusElement.textContent = '';
        statusElement.classList.remove('success', 'error');
        statusElement.hidden = true;
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === '1') {
        showStatus('Thanks, your form was submitted successfully. We will contact you soon.', 'success');
        urlParams.delete('submitted');
        const updatedQuery = urlParams.toString();
        const updatedUrl = `${window.location.pathname}${updatedQuery ? `?${updatedQuery}` : ''}${window.location.hash}`;
        window.history.replaceState({}, document.title, updatedUrl);
    }

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            clearStatus();
            const selectedFiles = fileInput.files ? Array.from(fileInput.files) : [];

            if (!selectedFiles.length) return;

            const totalFileSize = selectedFiles.reduce((total, file) => total + file.size, 0);

            if (totalFileSize > FORM_CONFIG.maxFileSizeBytes) {
                fileInput.value = '';
                showStatus('Selected files exceed the 10MB total limit. Please upload smaller files.', 'error');
            }
        });
    }

    form.addEventListener('submit', async (event) => {
        clearStatus();

        const selectedFiles = fileInput && fileInput.files ? Array.from(fileInput.files) : [];
        const totalFileSize = selectedFiles.reduce((total, file) => total + file.size, 0);

        if (totalFileSize > FORM_CONFIG.maxFileSizeBytes) {
            event.preventDefault();
            showStatus('Selected files exceed the 10MB total limit. Please upload smaller files.', 'error');
            return;
        }

        if (!navigator.onLine) {
            event.preventDefault();
            showStatus('You appear to be offline. Please reconnect and try again.', 'error');
            return;
        }

        const hasAttachment = selectedFiles.length > 0;
        const originalButtonText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        if (hasAttachment) {
            return;
        }

        event.preventDefault();

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), FORM_CONFIG.timeoutMs);

        try {
            const actionUrl = new URL(form.action);
            const ajaxEndpoint = `${actionUrl.origin}/ajax${actionUrl.pathname}`;

            const response = await fetch(ajaxEndpoint, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                },
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error('Form submission failed');
            }

            form.reset();
            showStatus('Thanks, your message was sent successfully. We will contact you soon.', 'success');
        } catch (error) {
            if (error.name === 'AbortError') {
                showStatus('Connection timed out. Please try again, WhatsApp us at +27 60 522 0559, or Email us directly at carlo@pharosimportandexport.com', 'error');
            } else {
                showStatus('Could not send your message right now. Please try again in a moment, WhatsApp us at +27 60 522 0559, or Email us directly at carlo@pharosimportandexport.com', 'error');
            }
        } finally {
            window.clearTimeout(timeoutId);

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
};

/* ============================================================================
   INITIALIZATION
   ============================================================================ */
const init = () => {
    initMobileMenu();
    initSmoothScrolling();
    initEventListeners();
    initContactForm();
    
    // Initialize animations after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
};

// Start the application
init();