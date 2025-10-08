// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingElement && cursor) {
        const text = "ソフトウェア開発者 × マーケティングディレクター × デジタルアーティスト";
        
        // Start with empty text
        typingElement.textContent = '';
        
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                // Adjust typing speed based on screen size
                const isMobile = window.innerWidth <= 768;
                const delay = isMobile ? 60 : 80;
                setTimeout(typeText, delay);
            } else {
                // Animation complete, keep cursor blinking
                cursor.style.animation = 'blink 1s infinite';
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeText, 1500);
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Flip cards mobile support
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Handle click/tap events for mobile
        card.addEventListener('click', function() {
            // Only toggle on mobile devices or when not hovering (fallback)
            if (window.innerWidth <= 768 || !this.matches(':hover')) {
                // Close other flipped cards first
                flipCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('flipped');
                    }
                });
                
                // Toggle this card
                this.classList.toggle('flipped');
            }
        });
        
        // Handle touch events for better mobile experience
        card.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent double-tap zoom
        });
        
        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            // Close other flipped cards first
            flipCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
            
            // Toggle this card
            this.classList.toggle('flipped');
        });
    });
    
// Close flipped cards when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.flip-card')) {
        flipCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }
});

// Profile image upload functionality
const profileImageContainer = document.querySelector('.profile-image-container');
const profileImage = document.getElementById('profileImage');
const imagePlaceholder = document.querySelector('.image-placeholder');

if (profileImageContainer) {
    profileImageContainer.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    profileImageContainer.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
}
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('すべてのフィールドを入力してください。');
                return;
            }
            
            // For now, just show a success message
            // In a real implementation, you would send this to a server
            alert('お問い合わせありがとうございます！24時間以内にご返信いたします。');
            this.reset();
        });
    }
});
