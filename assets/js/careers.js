/**
 * MYND - Careers Page JavaScript
 * Additional functionality specific to the Careers page
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Job Categories Filter =====
    const jobCategoryTabs = document.querySelectorAll('.job-category-tab');
    const jobCards = document.querySelectorAll('.job-card');
    const noJobsMessage = document.getElementById('no-jobs-message');
    
    function filterJobs(category) {
        let visibleCount = 0;
        
        jobCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show "no jobs" message if no jobs match the filter
        if (noJobsMessage) {
            if (visibleCount === 0) {
                noJobsMessage.classList.remove('hidden');
            } else {
                noJobsMessage.classList.add('hidden');
            }
        }
    }
    
    jobCategoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            jobCategoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            
            // Filter jobs based on selected category
            const category = this.getAttribute('data-category');
            filterJobs(category);
        });
    });
    
    // ===== Intersection Observer for Animations =====
    if ('IntersectionObserver' in window) {
        const fadeInElements = document.querySelectorAll('.career-card, .learning-card, .event-card, .hiring-step, .job-card, .testimonial-card, .dna-card');
        
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
            element.classList.add('careers-fade-in');
            appearOnScroll.observe(element);
        });
    }
    
    // ===== Smooth Scrolling for CTA buttons =====
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if the link is "#" (empty link)
            if (this.getAttribute('href') === '#') return;
            
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
    });
    
    // ===== Update AOS for better performance =====
    AOS.refresh();
});

// Add CSS for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .careers-fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .careers-fade-in.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 991px) {
            .careers-fade-in {
                transform: translateY(10px);
            }
            
            .careers-fade-in.appear {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});