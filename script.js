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

// Form submission using Google Apps Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate required fields
            if (!name || !email) {
                alert('Please fill in all required fields (Name and Email).');
                return;
            }
            
            // Prepare data for Google Apps Script
            const formData = {
                timestamp: new Date().toISOString(),
                source: 'PetVitals',
                name: name,
                email: email,
                message: message || 'No additional message'
            };
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Google Apps Script Web App URL (replace with your deployed URL)
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyLv1TKeo-paZE_zwjxmB5daPScK3ibFmlGOe3IyKrZt3-wVNA3YKJBThUHGF0aBgog/exec';
            
            // Send data to Google Apps Script
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                // Since we're using no-cors, we can't read the response
                // But we can assume success if no error is thrown
                console.log('Form submitted successfully');
                
                // Show success message
                alert('Thank you for your interest! We have received your demo request and will contact you soon. Please check your email for a confirmation message.');
                
                // Reset form
                form.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your request. Please try again or contact us directly.');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});