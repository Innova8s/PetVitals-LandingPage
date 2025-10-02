document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    // Scroll to top functionality
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
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if(navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Sticky header with improved scroll behavior
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Animated statistics counter
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
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
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
    showTestimonial(0);

    // Interactive Demo Functionality
    const breedOptions = {
        dog: [
            {value:"labrador",text:"Labrador Retriever"},
            {value:"german-shepherd",text:"German Shepherd"},
            {value:"golden-retriever",text:"Golden Retriever"},
            {value:"bulldog",text:"Bulldog"},
            {value:"beagle",text:"Beagle"},
            {value:"poodle",text:"Poodle"},
            {value:"rottweiler",text:"Rottweiler"},
            {value:"yorkshire-terrier",text:"Yorkshire Terrier"},
            {value:"boxer",text:"Boxer"},
            {value:"dachshund",text:"Dachshund"},
            {value:"siberian-husky",text:"Siberian Husky"},
            {value:"doberman",text:"Doberman Pinscher"},
            {value:"great-dane",text:"Great Dane"},
            {value:"shih-tzu",text:"Shih Tzu"},
            {value:"corgi",text:"Pembroke Welsh Corgi"},
            {value:"chihuahua",text:"Chihuahua"},
            {value:"pug",text:"Pug"},
            {value:"border-collie",text:"Border Collie"},
            {value:"akita",text:"Akita"},
            {value:"mastiff",text:"Mastiff"}
        ],
        cat: [
            {value:"persian",text:"Persian"},
            {value:"maine-coon",text:"Maine Coon"},
            {value:"ragdoll",text:"Ragdoll"},
            {value:"siamese",text:"Siamese"},
            {value:"bengal",text:"Bengal"},
            {value:"sphynx",text:"Sphynx"},
            {value:"british-shorthair",text:"British Shorthair"},
            {value:"scottish-fold",text:"Scottish Fold"},
            {value:"american-shorthair",text:"American Shorthair"},
            {value:"burmese",text:"Burmese"},
            {value:"russian-blue",text:"Russian Blue"},
            {value:"norwegian-forest",text:"Norwegian Forest"},
            {value:"savannah",text:"Savannah"},
            {value:"abyssinian",text:"Abyssinian"},
            {value:"oriental",text:"Oriental"},
            {value:"devon-rex",text:"Devon Rex"},
            {value:"himalayan",text:"Himalayan"},
            {value:"manx",text:"Manx"},
            {value:"tonkinese",text:"Tonkinese"},
            {value:"turkish-angora",text:"Turkish Angora"}
        ]
    };


    // Analyze button functionality
    analyzeBtn.addEventListener('click', function() {
        // Get current values
        const petType = petTypeSelect ? petTypeSelect.value : 'dog';
        const breed = breedSelect ? breedSelect.value : 'labrador';
        const age = ageSlider ? parseInt(ageSlider.value, 10) : 5;
        const symptoms = symptomsSelect ? symptomsSelect.value : 'lethargy';

        // Simulate AI analysis with realistic results based on inputs
        let probability, confidence;
        
        // Adjust probability based on symptoms
        switch(symptoms) {
            case 'vomiting':
                probability = Math.floor(Math.random() * 40) + 30; // 30-70%
                break;
            case 'coughing':
                probability = Math.floor(Math.random() * 35) + 20; // 20-55%
                break;
            case 'limping':
                probability = Math.floor(Math.random() * 25) + 10; // 10-35%
                break;
            case 'lethargy':
            default:
                probability = Math.floor(Math.random() * 20) + 5; // 5-25%
        }
        
        // Adjust confidence based on age (older pets have more predictable patterns)
        confidence = 80 + Math.min(age * 0.5, 15); // 80-95% based on age

        // Example: If age > 10 and symptom is lethargy, increase probability
        if (age > 10 && symptoms === "lethargy") {
            probability = Math.min(probability + 10, 99);
        }

        let action = "Monitor at home and consult vet if symptoms persist.";
        if (symptoms === "vomiting" || symptoms === "diarrhea") {
            action = "Provide fresh water and consult your vet if symptoms last more than 24 hours.";
        }
        if (symptoms === "limping") {
            action = "Check for injury; if limping persists, visit your vet.";
        }
        if (symptoms === "hair-loss" || symptoms === "itching") {
            action = "Check for fleas/allergies; consult vet for persistent issues.";
        }
        if (age > 10 && symptoms === "lethargy") {
            action = "Schedule a senior pet checkup soon.";
        }

        // Hide placeholder and show results
        if (resultsPlaceholder) resultsPlaceholder.classList.add('hidden');
        if (resultsContent) resultsContent.classList.remove('hidden');
        
        // Reset animations
        if (probabilityFill) probabilityFill.style.width = '0%';
        if (confidenceFill) confidenceFill.style.width = '0%';
        
        // Add loading state to analyze button
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        this.disabled = true;
        
        // Animate the results after a short delay
        setTimeout(() => {
            // Update probability
            if (conditionProbability) {
                conditionProbability.textContent = `${probability}%`;
            }
            if (probabilityFill) {
                probabilityFill.style.width = `${probability}%`;
            }
            
            // Update confidence
            if (confidenceLevel) {
                confidenceLevel.textContent = `${Math.round(confidence)}%`;
            }
            if (confidenceFill) {
                confidenceFill.style.width = `${confidence}%`;
            }
            
            // Set recommended action
            if (recommendedAction) {
                recommendedAction.textContent = action;
            }
            
            // Reset button
            this.innerHTML = originalText;
            this.disabled = false;
        }, 1500);
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10B981';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Contact button functionality
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
    
    // Chatbot functionality
    function openChat() {
        if (typeof Tawk_API !== 'undefined') {
            Tawk_API.toggle();
        } else {
            alert('Live chat is loading. Please try again in a moment.');
        }
    }

    // Update chat availability status
    function updateChatAvailability() {
        const chatBtn = document.querySelector('.live-chat-btn');
        if (chatBtn && typeof Tawk_API !== 'undefined') {
            Tawk_API.getStatus(function(status) {
                if (status === 'online') {
                    chatBtn.innerHTML = '<i class="fas fa-robot"></i> Chat Now - Online';
                    chatBtn.classList.add('online');
                    chatBtn.classList.remove('offline');
                } else {
                    chatBtn.innerHTML = '<i class="fas fa-robot"></i> Leave a Message';
                    chatBtn.classList.add('offline');
                    chatBtn.classList.remove('online');
                }
            });
        }
    }

    // Initialize chat when page loads
    setTimeout(updateChatAvailability, 3000);
    
    // Update chat status every minute
    setInterval(updateChatAvailability, 60000);
    
    // Create floating particles for hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) return;
        
        const particleCount = 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Random color from brand palette
            const colors = ['#6C63FF', '#00C9A7', '#FF6B6B'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.opacity = Math.random() * 0.6 + 0.2;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create hero-specific particles
    function createHeroParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 8 + 3;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 15 + 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Light color for hero section
            particle.style.background = 'rgba(255, 255, 255, 0.7)';
            particle.style.opacity = Math.random() * 0.4 + 0.3;
            
            heroParticles.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    createHeroParticles();
    
    // Add scroll animations
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
    
    // Add floating animation to cards in about section
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize breed options on load
    window.addEventListener('DOMContentLoaded', function() {
        if (petTypeSelect && breedSelect) {
            const breeds = breedOptions[petTypeSelect.value];
            breedSelect.innerHTML = '';
            breeds.forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.value;
                opt.textContent = b.text;
                breedSelect.appendChild(opt);
            });
        }
    });

    // Add CSS for spinner animation
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
        .live-chat-btn.online {
            background: rgba(0, 201, 167, 0.2) !important;
            color: var(--secondary) !important;
        }
        .live-chat-btn.offline {
            background: rgba(108, 99, 255, 0.1) !important;
            color: var(--primary) !important;
        }
    `;
    document.head.appendChild(style);
});