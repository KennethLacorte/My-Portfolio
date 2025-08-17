// Function to show certificate image in modal
function showCertificateImage(certificateName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="certificate-modal-content">
            <div class="certificate-modal-header">
                <h3>${certificateName}</h3>
                <button class="certificate-modal-close">&times;</button>
            </div>
            <div class="certificate-modal-body">
                <img src="Certificates/${certificateName}.jpg" alt="${certificateName}" onerror="this.src='Certificates/${certificateName}.png'; this.onerror=null;">
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    // Close on button click
    modal.querySelector('.certificate-modal-close').addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Function to open certificate PDF files (keeping for backup)
function openCertificate(pdfPath) {
    // Open the PDF in a new tab
    window.open(pdfPath, '_blank');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize EmailJS with the correct public key
    emailjs.init("y0v7q3t4IHyrar8hO");
    console.log('EmailJS initialized with public key: y0v7q3t4IHyrar8hO');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));
    
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
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll reveal
    const elementsToObserve = document.querySelectorAll('.project-card, .certificate-card, .timeline-item, .skill-category');
    elementsToObserve.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm && submitBtn) {
        console.log('Contact form found, setting up event listener...');
        
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted, processing...');
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            console.log('Form data:', { name, email, subject, message });
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            // Prepare auto-reply template parameters (to sender)
            const autoReplyParams = {
                name: name,                    // {{name}} in your auto-reply template
                title: subject,                // {{title}} in your auto-reply template
                email: email,                  // Additional info
                message: message,              // Additional info
                date: new Date().toLocaleDateString() // Additional info
            };
            
            // Prepare notification template parameters (to you)
            const notificationParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'John Kenneth Lacorte',
                date: new Date().toLocaleDateString()
            };
            
            console.log('Sending auto-reply with params:', autoReplyParams);
            console.log('Sending notification with params:', notificationParams);
            
            // Send both emails: auto-reply to sender and notification to you
            const autoReplyPromise = emailjs.send('jk_lacorte', 'template_rsf8awb', autoReplyParams);
            const notificationPromise = emailjs.send('jk_lacorte', 'template_xtx41fw', notificationParams);
            
            // Handle both email sends
            Promise.all([autoReplyPromise, notificationPromise])
                .then(function(responses) {
                    console.log('SUCCESS! Both emails sent:', responses);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.error('FAILED...', error);
                    console.error('Error details:', {
                        status: error.status,
                        text: error.text,
                        message: error.message
                    });
                    let errorMessage = 'Failed to send message. Please try again later.';
                    
                    // Provide more specific error messages
                    if (error.status === 400) {
                        errorMessage = 'Invalid form data. Please check your inputs. Error: ' + (error.text || error.message);
                    } else if (error.status === 401) {
                        errorMessage = 'Authentication failed. Please contact support.';
                    } else if (error.status === 429) {
                        errorMessage = 'Too many requests. Please try again in a few minutes.';
                    }
                    
                    showNotification(errorMessage, 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                });
        });
    } else {
        console.error('Contact form or submit button not found!');
    }
    
    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        console.log('Starting typing animation for:', originalText);
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000); // Increased delay to ensure page is fully loaded
    } else {
        console.log('Hero title not found');
    }
    
    // Skills animation on scroll
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('fade-in-up');
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Certificate card hover effects
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    console.log('TypeWriter started with text:', text);
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete, add class to hide cursor
            element.classList.add('typing-complete');
            console.log('Typing animation completed');
        }
    }
    
    type();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading class to body
document.body.classList.add('loading');

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
    this.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
});

// Add CSS for loading animation
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .loaded {
        opacity: 1;
    }
    
    .skill-tag {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: #3b82f6;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

document.head.appendChild(loadingStyles);


// SnapNotes Modal Functions
function openSnapNotesModal() {
    const modal = document.getElementById('SnapNotesModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus on modal for accessibility
        modal.focus();
        
        // Add event listener for escape key
        document.addEventListener('keydown', handleSnapNotesEscapeKey);
    }
}

function closeSnapNotesModal() {
    const modal = document.getElementById('SnapNotesModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Remove event listener
        document.removeEventListener('keydown', handleSnapNotesEscapeKey);
    }
}

function handleSnapNotesEscapeKey(e) {
    if (e.key === 'Escape') {
        closeSnapNotesModal();
    }
}

// Michelle's Burger Ordering System Modal Functions
function openBurgerModal() {
    const modal = document.getElementById('burgerModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.focus();
        document.addEventListener('keydown', handleBurgerEscapeKey);
    }
}

function closeBurgerModal() {
    const modal = document.getElementById('burgerModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleBurgerEscapeKey);
    }
}

function handleBurgerEscapeKey(e) {
    if (e.key === 'Escape') {
        closeBurgerModal();
    }
}

// AXYZ Backyard Gym Modal Functions
function openGymModal() {
    const modal = document.getElementById('gymModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.focus();
        document.addEventListener('keydown', handleGymEscapeKey);
    }
}

function closeGymModal() {
    const modal = document.getElementById('gymModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleGymEscapeKey);
    }
}

function handleGymEscapeKey(e) {
    if (e.key === 'Escape') {
        closeGymModal();
    }
}

// Green Genius Modal Functions
function openGreenGeniusModal() {
    const modal = document.getElementById('greenGeniusModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.focus();
        document.addEventListener('keydown', handleGreenGeniusEscapeKey);
    }
}

function closeGreenGeniusModal() {
    const modal = document.getElementById('greenGeniusModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleGreenGeniusEscapeKey);
    }
}

function handleGreenGeniusEscapeKey(e) {
    if (e.key === 'Escape') {
        closeGreenGeniusModal();
    }
}

// Green Genius Application Modal Functions
function openGreenGeniusAppModal() {
    const modal = document.getElementById('greenGeniusAppModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        modal.focus();
        document.addEventListener('keydown', handleGreenGeniusAppEscapeKey);
    }
}

function closeGreenGeniusAppModal() {
    const modal = document.getElementById('greenGeniusAppModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleGreenGeniusAppEscapeKey);
    }
}

function handleGreenGeniusAppEscapeKey(e) {
    if (e.key === 'Escape') {
        closeGreenGeniusAppModal();
    }
}

// Close modals when clicking outside of them
document.addEventListener('DOMContentLoaded', function() {
    // SnapNotes Modal
    const snapNotesModal = document.getElementById('SnapNotesModal');
    if (snapNotesModal) {
        snapNotesModal.addEventListener('click', function(e) {
            if (e.target === snapNotesModal) {
                closeSnapNotesModal();
            }
        });
    }
    
    // Burger Modal
    const burgerModal = document.getElementById('burgerModal');
    if (burgerModal) {
        burgerModal.addEventListener('click', function(e) {
            if (e.target === burgerModal) {
                closeBurgerModal();
            }
        });
    }
    
    // Gym Modal
    const gymModal = document.getElementById('gymModal');
    if (gymModal) {
        gymModal.addEventListener('click', function(e) {
            if (e.target === gymModal) {
                closeGymModal();
            }
        });
    }
    
    // Green Genius Modal
    const greenGeniusModal = document.getElementById('greenGeniusModal');
    if (greenGeniusModal) {
        greenGeniusModal.addEventListener('click', function(e) {
            if (e.target === greenGeniusModal) {
                closeGreenGeniusModal();
            }
        });
    }
    
    // Green Genius App Modal
    const greenGeniusAppModal = document.getElementById('greenGeniusAppModal');
    if (greenGeniusAppModal) {
        greenGeniusAppModal.addEventListener('click', function(e) {
            if (e.target === greenGeniusAppModal) {
                closeGreenGeniusAppModal();
            }
        });
    }
});
