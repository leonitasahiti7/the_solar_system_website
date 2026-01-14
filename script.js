document.addEventListener('DOMContentLoaded', function() {
    console.log('Solar System Explorer initialized');
    initializeInteractivity();
    initializeAnimations();
    initializeFormValidation();
    initializeModals();
});

/* ========== INTERACTIVE FEATURES ========== */
function initializeInteractivity() {
    // Navbar active state on link click
    const navLinks = document.querySelectorAll('[data-testid^="nav-"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Subscribe button
    const subscribeBtn = document.querySelector('[data-testid="button-subscribe"]');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const emailInput = document.querySelector('[data-testid="input-email-footer"]');
            if (emailInput && emailInput.value) {
                showAlert('Subscription confirmed!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Toggle handlers for interactive elements
    setupToggleButtons();
}

/* ========== ANIMATIONS ========== */
function initializeAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInDown 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and titles
    document.querySelectorAll('[data-testid*="card"], [data-testid*="title"]').forEach(el => {
        observer.observe(el);
    });
}

/* ========== FORM VALIDATION ========== */
function initializeFormValidation() {
    // Bootstrap form validation
    const forms = document.querySelectorAll('[data-testid="form-contact"], [data-testid="form-email"]');
    
    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.classList.add('was-validated');
            }, false);
        }
    });

    // HTML5 form validation for contact form
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            if (email && !isValidEmail(email.value)) {
                e.preventDefault();
                showAlert('Please enter a valid email address', 'warning');
                return;
            }
            
            if (message && message.value.trim().length < 10) {
                e.preventDefault();
                showAlert('Message must be at least 10 characters long', 'warning');
                return;
            }
        });
    }
}

/* ========== MODAL INITIALIZATION ========== */
function initializeModals() {
    // Planet gallery modals
    const planetCards = document.querySelectorAll('[data-testid*="card-planet"]');
    plantCards.forEach(card => {
        card.addEventListener('click', function() {
            const planetName = this.dataset.planet;
            showPlanetModal(planetName);
        });
    });
}

/* ========== TOGGLE FUNCTIONALITY ========== */
function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('[data-toggle="toggle"]');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.dataset.target);
            if (target) {
                target.classList.toggle('d-none');
                target.classList.toggle('d-block');
            }
        });
    });
}

/* ========== MODAL FUNCTIONS ========== */
function showPlanetModal(planetName) {
    const planetData = getPlanetData(planetName);
    const modal = new bootstrap.Modal(document.querySelector('[data-testid="modal-planet"]'));
    
    document.querySelector('[data-testid="modal-title"]').textContent = planetData.name;
    document.querySelector('[data-testid="modal-image"]').src = planetData.image;
    document.querySelector('[data-testid="modal-description"]').textContent = planetData.description;
    
    modal.show();
}

/* ========== UTILITY FUNCTIONS ========== */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type = 'info') {
    // Create and show alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('main') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function getPlanetData(name) {
    const planets = {
        'sun': { name: 'The Sun', image: '../IMG/sun.jpg', description: 'The star at the center of our Solar System.' },
        'mercury': { name: 'Mercury', image: '../IMG/mercury.jpg', description: 'The smallest planet and closest to the Sun.' },
        'venus': { name: 'Venus', image: '../IMG/venus.jpg', description: 'The hottest planet in the Solar System.' },
        'earth': { name: 'Earth', image: '../IMG/earth.jpg', description: 'Our home planet, the third from the Sun.' },
        'mars': { name: 'Mars', image: '../IMG/mars.jpg', description: 'The fourth planet known as the Red Planet.' },
        'jupiter': { name: 'Jupiter', image: '../IMG/jupiter.jpg', description: 'The largest planet in the Solar System.' },
        'saturn': { name: 'Saturn', image: '../IMG/saturn.jpg', description: 'The sixth planet, known for its rings.' },
        'uranus': { name: 'Uranus', image: '../IMG/uranus.jpg', description: 'The seventh planet from the Sun.' },
        'neptune': { name: 'Neptune', image: '../IMG/neptune.jpg', description: 'The eighth and farthest planet.' }
    };
    
    return planets[name.toLowerCase()] || { name: 'Unknown', image: '', description: '' };
}

/* ========== CAROUSEL AUTOPLAY ========== */
function initializeCarousels() {
    const carousels = document.querySelectorAll('[data-testid^="carousel"]');
    carousels.forEach(carousel => {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    });
}

// Call carousel init
document.addEventListener('DOMContentLoaded', initializeCarousels);

/* ========== SMOOTH SCROLLING ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========== DYNAMIC CONTENT LOADER ========== */
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML = html;
            initializeInteractivity();
            initializeAnimations();
        })
        .catch(error => console.error('Error loading content:', error));
}

console.log('All interactive features initialized successfully!');