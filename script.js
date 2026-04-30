/**
 * GlobalTaможня - Main JavaScript File
 * Enhanced functionality for the customs clearance website
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Back to Top Button Functionality
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !phone) {
                showFormMessage('Пожалуйста, заполните обязательные поля', 'error');
                return;
            }
            
            // Validate phone format (basic validation)
            const phoneRegex = /^[\d\+\-\(\)\s]{10,20}$/;
            if (!phoneRegex.test(phone)) {
                showFormMessage('Пожалуйста, введите корректный номер телефона', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            submitForm(name, phone, message);
        });
    }
    
    function submitForm(name, phone, message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(function() {
            // Success response
            showFormMessage('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', { name, phone, message });
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        }, 1500);
    }
    
    function showFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // ========================================
    // Phone Input Mask (Simple Implementation)
    // ========================================
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                
                e.target.value = formatted;
            }
        });
    }
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
    
    // ========================================
    // Active Navigation Highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.background = '';
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.background = 'var(--primary-color)';
                        link.style.color = 'var(--white)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ========================================
    // Animation on Scroll (Simple Fade-In)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🛃 ГлобалТаможня', 'font-size: 20px; font-weight: bold; color: #1e3c72;');
    console.log('%cПрофессиональное таможенное оформление', 'font-size: 14px; color: #2a5298;');
    console.log('%cСвяжитесь с нами: +7 (495) 987-65-43', 'font-size: 12px; color: #666;');
    
});

// ========================================
// Service Worker Registration (for PWA support)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }).catch(function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}
