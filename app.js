document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
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
    
    // Sticky header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
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
    // Interactive Demo Functionality - Fixed Version
    document.addEventListener('DOMContentLoaded', function() {
        // Get all elements
        const ageSlider = document.getElementById('age');
        const ageValue = document.getElementById('age-value');
        const analyzeBtn = document.getElementById('analyze-btn');
        const resultsPlaceholder = document.getElementById('results-placeholder');
        const resultsContent = document.getElementById('results-content');
        const conditionProbability = document.getElementById('condition-probability');
        const probabilityFill = document.getElementById('probability-fill');
        const recommendedAction = document.getElementById('recommended-action');
        const confidenceLevel = document.getElementById('confidence-level');
        const confidenceFill = document.getElementById('confidence-fill');
        const petTypeSelect = document.getElementById('pet-type');
        const breedSelect = document.getElementById('breed');
        const symptomsSelect = document.getElementById('symptoms');

        // Check if elements exist
        if (!ageSlider || !analyzeBtn) {
            console.error('Required elements not found');
            return;
        }

        // Age slider update
        ageSlider.addEventListener('input', function() {
            if (ageValue) {
                ageValue.textContent = `${this.value} years`;
            }
        });

        // Analyze button functionality
        analyzeBtn.addEventListener('click', function() {
            // Get current values
            const petType = petTypeSelect ? petTypeSelect.value : 'dog';
            const breed = breedSelect ? breedSelect.value : 'labrador';
            const age = ageSlider ? ageSlider.value : 5;
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

            // Hide placeholder and show results
            if (resultsPlaceholder) resultsPlaceholder.classList.add('hidden');
            if (resultsContent) resultsContent.classList.remove('hidden');
            
            // Reset animations
            if (probabilityFill) probabilityFill.style.width = '0%';
            if (confidenceFill) confidenceFill.style.width = '0%';
            
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
                
                // Set recommended action based on probability
                let action = '';
                if (probability < 20) {
                    action = 'Monitor symptoms, no immediate action needed. Continue regular observation.';
                } else if (probability < 40) {
                    action = 'Schedule a veterinary consultation within the next week for evaluation.';
                } else {
                    action = 'Seek veterinary attention as soon as possible for proper diagnosis and treatment.';
                }
                
                if (recommendedAction) {
                    recommendedAction.textContent = action;
                }
                
            }, 100);
        });

        // Add loading state to analyze button
        analyzeBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
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
    `;
    document.head.appendChild(style);
    // Initialize on load
    handleScrollAnimation();
        // Form submission
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
        
        // Animate stat numbers in the About section
        //document.addEventListener('DOMContentLoaded', () => {
           // const statNumbers = document.querySelectorAll('.stat-number');

            //statNumbers.forEach(stat => {
              //  const target = parseInt(stat.getAttribute('data-count'), 10);
                //let count = 0;
                //const increment = Math.max(1, Math.floor(target / 100));
                
               // function updateCounter() {
                 //   count += increment;
                   // if (count > target) count = target;
                    //stat.textContent = count.toLocaleString();
                    //if (count < target) {
                   //     requestAnimationFrame(updateCounter);
                   // }
               // }
                //updateCounter();
           // });
        //});
        
        // Animated counting for stats
        function animateCount(el, target, duration = 2000) {
            let start = 0;
            let startTime = null;
            function updateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                el.textContent = Math.floor(progress * (target - start) + start);
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(updateCount);
        }

        function runStatsAnimation() {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'), 10);
                animateCount(stat, target);
            });
        }

        // Run animation when stats section is in view
        let statsAnimated = false;
        function onScrollStats() {
            const statsSection = document.querySelector('.stats');
            if (!statsSection) return;
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && !statsAnimated) {
                runStatsAnimation();
                statsAnimated = true;
            }
        }
        window.addEventListener('scroll', onScrollStats);
        window.addEventListener('DOMContentLoaded', onScrollStats);
        
    });
    function handleScrollAnimation() {
        // Add your scroll animation logic here
    }
    document.addEventListener('DOMContentLoaded', () => {
        // AI Health Assessment Demo logic
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', function () {
                // Get values
                const petType = document.getElementById('pet-type').value;
                const breed = document.getElementById('breed').value;
                const age = document.getElementById('age').value;
                const symptoms = document.getElementById('symptoms').value;

                // Fake AI logic for demo
                let probability = Math.floor(Math.random() * 60) + 30; // 30-90%
                let confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
                let action = "Consult your veterinarian for further analysis.";

                if (symptoms === "lethargy" && age > 10) {
                    probability = 85;
                    confidence = 95;
                    action = "Schedule a senior pet checkup soon.";
                } else if (symptoms === "vomiting") {
                    probability = 70;
                    confidence = 90;
                    action = "Monitor hydration and consult a vet if persists.";
                }

                // Show results
                document.getElementById('results-placeholder').classList.add('hidden');
                document.getElementById('results-content').classList.remove('hidden');
                document.getElementById('condition-probability').textContent = probability + "%";
                document.getElementById('probability-fill').style.width = probability + "%";
                document.getElementById('recommended-action').textContent = action;
                document.getElementById('confidence-level').textContent = confidence + "%";
                document.getElementById('confidence-fill').style.width = confidence + "%";
            });

            // Update age value display
            const ageInput = document.getElementById('age');
            const ageValue = document.getElementById('age-value');
            if (ageInput && ageValue) {
                ageInput.addEventListener('input', function () {
                    ageValue.textContent = ageInput.value + " years";
                });
            }
        }
    document.addEventListener('DOMContentLoaded', () => {
  const callBtn  = document.getElementById('callBtn');
  const emailBtn = document.getElementById('emailBtn');

  if (callBtn) {
    callBtn.addEventListener('click', () => {
      // Opens dialer on mobile or associated desktop app
      window.location.href = 'tel:+6566796157';
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      // Opens default mail client with a subject line
      window.location.href = 'mailto:enquiry@innova8s.com?subject=PetVitals%20Enquiry';
    });
  }
});
    
    
    });