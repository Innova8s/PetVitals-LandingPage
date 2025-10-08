// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
// Form submission using Google Apps Script - CORRECTED LOGIC
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            try {
                // 1. Collect data from form
                const data = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    message: document.getElementById('message').value.trim(),
                    interest: document.getElementById('interest').value,
                    'pet-type': document.getElementById('pet-type-form')?.value || 'Not specified',
                    timestamp: new Date().toISOString(),
                    source: 'PetVitals Contact Form'
                };

                // 2. Validate required fields
                if (!data.name || !data.email || !data.interest) {
                    window.alert('Please fill in all required fields (Name, Email, and Interest).');
                    return;
                }

                // 3. Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;

                // 4. Prepare and send data
                const params = new URLSearchParams(data).toString();
                const scriptURL = 'https://script.google.com/macros/s/AKfycbyLv1TKeo-paZE_zwjxmB5daPScK3ibFmlGOe3IyKrZt3-wVNA3YKJBThUHGF0aBgog/exec';
                const finalURL = `${scriptURL}?${params}`;

                const response = await fetch(finalURL, {
                    method: 'GET',
                    mode: 'no-cors'
                });

                // 5. Show success message and reset form
                window.alert('Thank you for your interest! We have received your message and will contact you soon.');
                console.log('Form submitted successfully');
                form.reset();

            } catch (error) {
                console.error('Form submission error:', error);
                window.alert('There was an error submitting your request. Please try again or contact us directly.');
            } finally {
                // 6. Reset button state
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.innerHTML = originalText || 'Submit';
                submitButton.disabled = false;
            }
        });
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Testimonial carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
            if (dots[i]) {
                dots[i].classList.toggle('active', i === index);
            }
        });
        currentIndex = index;
    }

    if (prevBtn && nextBtn && dots.length && testimonials.length) {
        prevBtn.addEventListener('click', () => {
            let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(newIndex);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showTestimonial(i));
        });
    }

    // Initialize first testimonial as active
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
});

// Statistics counter animation
document.addEventListener('DOMContentLoaded', function() {
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize counters when section is in view
    const statsSection = document.querySelector('.stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateValue(stat, 0, target, 2000);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
});

// Floating cards animation
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
});

// Scroll animations for elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeElems = document.querySelectorAll('.solution-card, .step-content, .contact-item, .ai-feature-card, .ai-feature, .info-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transform = 'translateY(30px)';
        elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(elem);
    });
});

// Contact button functionality
document.addEventListener('DOMContentLoaded', function() {
    const callBtn = document.getElementById('callBtn');
    const emailBtn = document.getElementById('emailBtn');

    if (callBtn) {
        callBtn.addEventListener('click', () => {
            window.location.href = 'tel:+6566796157';
        });
    }

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            window.location.href = 'mailto:enquiry@innova8s.com?subject=PetVitals%20Enquiry';
        });
    }
});

// Add CSS for spinner animation and other dynamic styles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        @keyframes fa-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1000;
        }
        .scroll-to-top.visible {
            display: flex;
        }
        .scroll-to-top:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 30px rgba(108, 99, 255, 0.4);
        }
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 0;
                right: -100%;
                width: 280px;
                height: 100vh;
                background: white;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
            }
            .nav-menu.active {
                right: 0;
            }
        }
    `;
    document.head.appendChild(style);
    function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1'); // Change to your sheet name
  sheet.appendRow([
    e.parameter.timestamp,
    e.parameter.source,
    e.parameter.name,
    e.parameter.email,
    e.parameter.interest,
    e.parameter['pet-type'],
    e.parameter.message
  ]);
  return ContentService.createTextOutput("Success");
}
});