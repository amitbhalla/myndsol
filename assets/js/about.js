/**
 * MYND - About Page JavaScript
 * Additional functionality specific to the About page
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Smooth Scrolling for Read More Button =====
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ===== Journey Timeline Animation Enhancements =====
    const journeyCards = document.querySelectorAll('.journey-card');
    
    function checkJourneyCards() {
        journeyCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.classList.add('in-view');
            }
        });
    }
    
    // Add fade-in effect when scrolling to timeline
    window.addEventListener('scroll', checkJourneyCards);
    checkJourneyCards(); // Initial check
    
    // ===== Team Member Cards Interaction =====
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const socialIcons = this.querySelectorAll('.team-social-icon');
            
            socialIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'translateY(-5px)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const socialIcons = this.querySelectorAll('.team-social-icon');
            
            socialIcons.forEach(icon => {
                icon.style.transform = 'translateY(0)';
            });
        });
    });
    
    // ===== Values Section Card Interaction =====
    const valueCards = document.querySelectorAll('.value-card, .approach-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon, .approach-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon, .approach-icon');
            if (icon) {
                icon.style.transform = 'rotate(0)';
            }
        });
    });
    
    // ===== Connect Cards Animation =====
    const connectCards = document.querySelectorAll('.connect-card');
    
    connectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
            
            const btn = this.querySelector('.connect-btn');
            if (btn) {
                btn.style.color = 'var(--accent)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
            
            const btn = this.querySelector('.connect-btn');
            if (btn) {
                btn.style.color = 'var(--primary)';
            }
        });
    });
    
    // ===== Intersection Observer for Additional Animations =====
    if ('IntersectionObserver' in window) {
        const fadeInElements = document.querySelectorAll('.core-card, .service-card, .team-card, .journey-card, .value-card, .approach-card, .connect-card');
        
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        
        fadeInElements.forEach(element => {
            element.classList.add('fade-in');
            appearOnScroll.observe(element);
        });
    }
    
    // ===== Update AOS for better performance =====
    AOS.refresh();
});

// Add CSS for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        .journey-card {
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .journey-card.in-view {
            opacity: 1;
            transform: translateX(0);
        }
        
        @media (max-width: 991px) {
            .journey-card {
                transform: translateY(20px);
            }
            
            .journey-card.in-view {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});