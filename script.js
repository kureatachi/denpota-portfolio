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

// Optimized flip cards - CSS-only hover with mobile fallback
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Only add mobile touch support, let CSS handle hover
    flipCards.forEach(card => {
        // Handle mobile tap events only
        card.addEventListener('click', function(e) {
            // Only on mobile devices
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close other flipped cards first
                flipCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('flipped');
                    }
                });
                
                // Toggle the current card
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Close flipped cards when clicking outside (mobile only)
    if (window.innerWidth <= 768) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.flip-card')) {
                flipCards.forEach(card => {
                    card.classList.remove('flipped');
                });
            }
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

// Modal functionality
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found:', modalId);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('すべてのフィールドを入力してください。');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                from_name: name,
                from_email: email,
                message: message,
                to_name: "Denpota Furugaki",
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('お問い合わせありがとうございます！24時間以内にご返信いたします。');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert('送信に失敗しました。もう一度お試しください。');
            })
            .finally(function() {
                // Restore button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});

// Carousel functionality
let currentSlideIndex = {};

function moveCarousel(modalId, direction) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.dot');
    
    if (!currentSlideIndex[modalId]) {
        currentSlideIndex[modalId] = 0;
    }
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex[modalId]].classList.remove('active');
    dots[currentSlideIndex[modalId]].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex[modalId] += direction;
    
    // Wrap around
    if (currentSlideIndex[modalId] >= slides.length) {
        currentSlideIndex[modalId] = 0;
    } else if (currentSlideIndex[modalId] < 0) {
        currentSlideIndex[modalId] = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlideIndex[modalId]].classList.add('active');
    dots[currentSlideIndex[modalId]].classList.add('active');
}

function currentSlide(modalId, index) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.dot');
    
    if (!currentSlideIndex[modalId]) {
        currentSlideIndex[modalId] = 0;
    }
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex[modalId]].classList.remove('active');
    dots[currentSlideIndex[modalId]].classList.remove('active');
    
    // Set new index
    currentSlideIndex[modalId] = index;
    
    // Add active class to new slide and dot
    slides[currentSlideIndex[modalId]].classList.add('active');
    dots[currentSlideIndex[modalId]].classList.add('active');
}

// Reset carousel when modal closes
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset carousel to first slide
        if (currentSlideIndex[modalId] !== undefined) {
            const slides = modal.querySelectorAll('.carousel-slide');
            const dots = modal.querySelectorAll('.dot');
            
            slides[currentSlideIndex[modalId]].classList.remove('active');
            dots[currentSlideIndex[modalId]].classList.remove('active');
            
            currentSlideIndex[modalId] = 0;
            
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }
    }
}

// Art Carousel functionality (for About page)
let currentArtSlide = 0;

// Initialize art carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.art-carousel-slide');
    const dots = document.querySelectorAll('.art-dot');
    
    console.log('Art carousel initialized - slides found:', slides.length, 'dots found:', dots.length);
    
    if (slides.length > 0) {
        console.log('First slide is active:', slides[0].classList.contains('active'));
        // Log all slides and their active status
        slides.forEach((slide, index) => {
            console.log(`Slide ${index}:`, slide.classList.contains('active') ? 'ACTIVE' : 'inactive');
        });
    }
});

function moveArtCarousel(direction) {
    const slides = document.querySelectorAll('.art-carousel-slide');
    const dots = document.querySelectorAll('.art-dot');
    
    if (slides.length === 0) {
        console.log('No art carousel slides found');
        return;
    }
    
    console.log('Moving art carousel:', direction, 'current slide:', currentArtSlide);
    
    // Remove active class from current
    slides[currentArtSlide].classList.remove('active');
    dots[currentArtSlide].classList.remove('active');
    
    // Calculate new index
    currentArtSlide += direction;
    
    // Wrap around
    if (currentArtSlide >= slides.length) {
        currentArtSlide = 0;
    } else if (currentArtSlide < 0) {
        currentArtSlide = slides.length - 1;
    }
    
    // Add active class to new
    slides[currentArtSlide].classList.add('active');
    dots[currentArtSlide].classList.add('active');
    
    console.log('New slide:', currentArtSlide);
}

function goToArtSlide(index) {
    const slides = document.querySelectorAll('.art-carousel-slide');
    const dots = document.querySelectorAll('.art-dot');
    
    if (slides.length === 0) {
        console.log('No art carousel slides found');
        return;
    }
    
    console.log('Going to art slide:', index);
    
    // Remove active class from current
    slides[currentArtSlide].classList.remove('active');
    dots[currentArtSlide].classList.remove('active');
    
    // Set new index
    currentArtSlide = index;
    
    // Add active class to new
    slides[currentArtSlide].classList.add('active');
    dots[currentArtSlide].classList.add('active');
}
