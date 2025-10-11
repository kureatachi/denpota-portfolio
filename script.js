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
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
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

// Art Carousel - Simple & Reliable
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.art-carousel');
    if (!carousel) return; // Exit if no carousel on page
    
    const slides = carousel.querySelectorAll('.art-slide');
    const prevBtn = carousel.querySelector('.art-prev');
    const nextBtn = carousel.querySelector('.art-next');
    const indicators = carousel.querySelectorAll('.art-indicator');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('show'));
        
        // Remove active from all indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('show');
        
        // Activate current indicator
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });
});

// Case Studies Carousel - Center Focus with Auto-Rotation
let currentCaseStudySlide = 1; // Start with middle slide
let caseStudyAutoRotate;

function updateCaseStudyPositions() {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const caseStudyDots = document.querySelectorAll('.case-study-dot');
    const totalSlides = caseStudySlides.length;
    
    if (totalSlides === 0) return;
    
    caseStudySlides.forEach((slide, index) => {
        // Remove all position classes
        slide.classList.remove('center', 'left', 'right', 'hidden');
        
        // Calculate position relative to current slide
        let position = index - currentCaseStudySlide;
        
        // Handle wrap-around
        if (position < -Math.floor(totalSlides / 2)) {
            position += totalSlides;
        } else if (position > Math.floor(totalSlides / 2)) {
            position -= totalSlides;
        }
        
        // Apply position classes
        if (position === 0) {
            slide.classList.add('center');
        } else if (position === -1) {
            slide.classList.add('left');
        } else if (position === 1) {
            slide.classList.add('right');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    // Update dots
    caseStudyDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCaseStudySlide);
    });
}

function moveCaseStudyCarousel(direction) {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const totalSlides = caseStudySlides.length;
    
    if (totalSlides === 0) return;
    
    // Calculate new slide index
    currentCaseStudySlide += direction;
    
    if (currentCaseStudySlide >= totalSlides) {
        currentCaseStudySlide = 0;
    } else if (currentCaseStudySlide < 0) {
        currentCaseStudySlide = totalSlides - 1;
    }
    
    updateCaseStudyPositions();
    resetCaseStudyAutoRotate();
}

function goToCaseStudySlide(index) {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const totalSlides = caseStudySlides.length;
    
    if (index < 0 || index >= totalSlides) return;
    
    currentCaseStudySlide = index;
    updateCaseStudyPositions();
    resetCaseStudyAutoRotate();
}

// Auto-rotate functionality
function startCaseStudyAutoRotate() {
    caseStudyAutoRotate = setInterval(() => {
        moveCaseStudyCarousel(1);
    }, 5000); // Rotate every 5 seconds
}

function resetCaseStudyAutoRotate() {
    clearInterval(caseStudyAutoRotate);
    startCaseStudyAutoRotate();
}

// Swipe gesture support
function initCaseStudySwipe() {
    const track = document.querySelector('.case-studies-carousel-track');
    if (!track) return;
    
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped left - go to next
                moveCaseStudyCarousel(1);
            } else {
                // Swiped right - go to previous
                moveCaseStudyCarousel(-1);
            }
        }
        
        isDragging = false;
    });
    
    // Mouse drag support for desktop
    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
    });
    
    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                moveCaseStudyCarousel(1);
            } else {
                moveCaseStudyCarousel(-1);
            }
        }
        
        isDragging = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
}

// Initialize case studies carousel
document.addEventListener('DOMContentLoaded', function() {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    
    if (caseStudySlides.length > 0) {
        updateCaseStudyPositions();
        startCaseStudyAutoRotate();
        initCaseStudySwipe();
        
        // Click on side slides to navigate
        caseStudySlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index !== currentCaseStudySlide) {
                    goToCaseStudySlide(index);
                }
            });
        });
    }
});

// Tab functionality for modals (Freshh and InterviewX)
function showTab(tabName) {
    // Get the modal context (which modal is currently open)
    const activeModal = document.querySelector('.modal[style*="display: block"]') || 
                       document.querySelector('.modal[style*="display:block"]');
    
    if (!activeModal) return;
    
    // Hide all tab contents within this modal
    const tabContents = activeModal.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons within this modal
    const tabButtons = activeModal.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = activeModal.querySelector(`#${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = activeModal.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

