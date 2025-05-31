// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Smooth Scrolling Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
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
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Counter Animation for Hero Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        const addPlus = target !== 1; // Only add "+" if target is not 1
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (addPlus ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (addPlus ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Memory Cards Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe memory cards
document.querySelectorAll('.memory-card').forEach(card => {
    observer.observe(card);
});

// Form Submission Handler
const form = document.querySelector('.feedback-form');
const submitButton = document.querySelector('.submit-button');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    try {
        // Submit to Netlify
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });
        
        if (response.ok) {
            // Success message
            showMessage('Thank you, my love! Your message has been sent with all my heart. 💕', 'success');
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        // Error message
        showMessage('Oops! Something went wrong. Please try again, sweetheart. 💔', 'error');
    } finally {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 15px;
        margin-top: 20px;
        border-radius: var(--border-radius);
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.5s ease-out;
        ${type === 'success' 
            ? 'background: rgba(72, 187, 120, 0.1); color: #2F855A; border: 1px solid rgba(72, 187, 120, 0.3);'
            : 'background: rgba(245, 101, 101, 0.1); color: #C53030; border: 1px solid rgba(245, 101, 101, 0.3);'
        }
    `;
    
    // Insert message
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => messageDiv.remove(), 500);
        }
    }, 5000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Start counter animation after a delay
    setTimeout(animateCounters, 1000);
    
    // Add initial visibility to first memory card
    const firstMemoryCard = document.querySelector('.memory-card');
    if (firstMemoryCard) {
        setTimeout(() => {
            firstMemoryCard.classList.add('visible');
        }, 500);
    }
});

// Add some romantic interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to hearts
    document.querySelectorAll('.fas.fa-heart').forEach(heart => {
        heart.addEventListener('click', (e) => {
            // Create floating heart effect
            const floatingHeart = document.createElement('i');
            floatingHeart.className = 'fas fa-heart';
            floatingHeart.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                color: var(--primary-color);
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 9999;
                animation: floatUp 2s ease-out forwards;
            `;
            
            document.body.appendChild(floatingHeart);
            
            setTimeout(() => {
                floatingHeart.remove();
            }, 2000);
        });
    });
    
    // Add floating animation
    const floatUpStyle = document.createElement('style');
    floatUpStyle.textContent = `
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(floatUpStyle);
});

// Add parallax effect to floating hearts
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating-hearts');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    setTimeout(() => {
        typeWriter(subtitle, originalText, 80);
    }, 1500);
});