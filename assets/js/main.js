/**
 * MYND - Integrated Back-Office Solutions
 * Main JavaScript File
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 ? true : false
    });
    
    // Initialize Global Variables
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTopButton = document.getElementById('back-to-top');
    const cookieConsent = document.getElementById('cookie-consent');
    
    // ===== Navbar Scroll Effect =====
    function handleNavbarScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial navbar state check
    handleNavbarScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        
        // Back to Top Button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // ===== Mobile Menu Toggle =====
    mobileMenuButton.addEventListener('click', function() {
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // ===== Back to Top Button =====
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Brand Tabs =====
    const brandTabs = document.querySelectorAll('.brand-tab');
    const brandContents = document.querySelectorAll('.brand-content');
    const brandTabIndicator = document.querySelector('.brand-tab-indicator');
    
    function setTabIndicator(activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement.getBoundingClientRect();
        
        brandTabIndicator.style.width = `${tabRect.width}px`;
        brandTabIndicator.style.left = `${tabRect.left - containerRect.left}px`;
    }
    
    function activateTab(tab) {
        // Remove active class from all tabs
        brandTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to current tab
        tab.classList.add('active');
        
        // Update tab indicator position
        setTabIndicator(tab);
        
        // Show corresponding content
        const targetId = tab.getAttribute('data-target');
        
        brandContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.add('active');
                setTimeout(() => {
                    content.style.opacity = 1;
                }, 10);
            } else {
                content.classList.remove('active');
                content.style.opacity = 0;
            }
        });
    }
    
    // Initialize first tab
    if (brandTabs.length > 0 && brandTabIndicator) {
        const activeTab = document.querySelector('.brand-tab.active') || brandTabs[0];
        setTimeout(() => {
            setTabIndicator(activeTab);
        }, 100);
        
        // Add click event to tabs
        brandTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                activateTab(this);
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const activeTab = document.querySelector('.brand-tab.active') || brandTabs[0];
            setTabIndicator(activeTab);
        });
    }
    
    // ===== Difference Section Toggles =====
    const differenceToggles = document.querySelectorAll('.difference-toggle');
    
    differenceToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const detailsEl = this.previousElementSibling;
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle details visibility
            if (this.classList.contains('active')) {
                detailsEl.classList.add('active');
                this.querySelector('span').textContent = 'Show less';
            } else {
                detailsEl.classList.remove('active');
                this.querySelector('span').textContent = 'Learn more';
            }
        });
    });
    
    // ===== Industries Carousel =====
    const industriesCarousel = document.querySelector('.industries-carousel');
    
    if (industriesCarousel) {
        const carouselInner = industriesCarousel.querySelector('.industries-carousel-inner');
        const slides = industriesCarousel.querySelectorAll('.industry-slide');
        const prevButton = industriesCarousel.querySelector('.industry-prev');
        const nextButton = industriesCarousel.querySelector('.industry-next');
        const dotsContainer = industriesCarousel.querySelector('.industries-dots');
        
        let currentIndex = 0;
        let slideWidth = 100;
        let slidesPerView = 1;
        
        // Determine slides per view based on screen size
        function updateSlidesPerView() {
            if (window.innerWidth >= 1024) {
                slidesPerView = 3;
            } else if (window.innerWidth >= 640) {
                slidesPerView = 2;
            } else {
                slidesPerView = 1;
            }
            
            updateCarousel();
        }
        
        // Create dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(slides.length / slidesPerView);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('industry-dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.industry-dot');
            const activeDotIndex = Math.floor(currentIndex / slidesPerView);
            
            dots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Update carousel position
        function updateCarousel() {
            const maxIndex = slides.length - slidesPerView;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            carouselInner.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
            updateDots();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index * slidesPerView;
            updateCarousel();
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = Math.max(currentIndex - slidesPerView, 0);
            updateCarousel();
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = Math.min(currentIndex + slidesPerView, slides.length - slidesPerView);
            updateCarousel();
        }
        
        // Initialize carousel
        updateSlidesPerView();
        createDots();
        
        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Update on window resize
        window.addEventListener('resize', () => {
            updateSlidesPerView();
            createDots();
        });
        
        // Auto play (optional)
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentIndex >= slides.length - slidesPerView) {
                    currentIndex = 0;
                } else {
                    currentIndex += slidesPerView;
                }
                updateCarousel();
            }, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Comment out the line below if you don't want autoplay
        startAutoplay();
        
        // Pause autoplay on hover
        industriesCarousel.addEventListener('mouseenter', stopAutoplay);
        industriesCarousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // ===== FAQ Accordion =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.querySelector('i').classList.remove('fa-minus');
                    q.querySelector('i').classList.add('fa-plus');
                    q.nextElementSibling.style.maxHeight = 0;
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                this.classList.remove('active');
                this.querySelector('i').classList.remove('fa-minus');
                this.querySelector('i').classList.add('fa-plus');
                answer.style.maxHeight = 0;
            } else {
                this.classList.add('active');
                this.querySelector('i').classList.remove('fa-plus');
                this.querySelector('i').classList.add('fa-minus');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ===== Social Media Feeds Simulation =====
    function loadSocialFeeds() {
        // Twitter/Techade Feed
        const techadeFeed = document.getElementById('techade-feed');
        if (techadeFeed) {
            techadeFeed.innerHTML = `
                <div class="social-post">
                    <p class="font-semibold mb-2">@MYNDTech</p>
                    <p class="mb-2">AI and automation continue to transform back-office operations. Our latest report shows 47% of companies are investing heavily in this area. #TechTrends #AI #Automation</p>
                    <p class="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">@MYNDTech</p>
                    <p class="mb-2">The future of work includes hybrid models that combine remote work with in-office collaboration. How is your organization adapting? #FutureOfWork #RemoteWork</p>
                    <p class="text-xs text-gray-500">1 day ago</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">@MYNDTech</p>
                    <p class="mb-2">Cloud-based BPM solutions are showing 32% faster deployment times compared to on-premise alternatives. #CloudComputing #BPM #DigitalTransformation</p>
                    <p class="text-xs text-gray-500">3 days ago</p>
                </div>
            `;
        }
        
        // LinkedIn Corporate Feed
        const myndORM = document.getElementById('mynd-orm');
        if (myndORM) {
            myndORM.innerHTML = `
                <div class="social-post">
                    <p class="font-semibold mb-2">MYND Integrated Solutions</p>
                    <p class="mb-2">We're excited to announce our new partnership with Leading QSR Chain to streamline their global back-office operations! #Partnership #QSR #BackOffice</p>
                    <p class="text-xs text-gray-500">5 hours ago</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">MYND Integrated Solutions</p>
                    <p class="mb-2">MYNDX just launched its enhanced Vendor Management module with AI-powered fraud detection capabilities. #ProductLaunch #VendorManagement #AI</p>
                    <p class="text-xs text-gray-500">2 days ago</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">MYND Integrated Solutions</p>
                    <p class="mb-2">Proud to be named a Leader in the latest Everest Group PEAK Matrix® for F&A Outsourcing Services. #Recognition #FAOutsourcing #Leadership</p>
                    <p class="text-xs text-gray-500">1 week ago</p>
                </div>
            `;
        }
        
        // LinkedIn Leaders Feed
        const leadersFeed = document.getElementById('leaders-feed');
        if (leadersFeed) {
            leadersFeed.innerHTML = `
                <div class="social-post">
                    <p class="font-semibold mb-2">Rajiv Sharma, CEO at MYND</p>
                    <p class="mb-2">"The back-office is where efficiency meets strategy. When done right, it becomes your competitive advantage." #BackOfficeExcellence #Leadership</p>
                    <p class="text-xs text-gray-500">Yesterday</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">Priya Mehta, CTO at MYND</p>
                    <p class="mb-2">"Our latest AI implementation for a healthcare client has reduced invoice processing time by 78%. This is the power of intelligent automation!" #AI #Healthcare #Innovation</p>
                    <p class="text-xs text-gray-500">3 days ago</p>
                </div>
                <div class="social-post">
                    <p class="font-semibold mb-2">David Chen, Global Operations at MYND</p>
                    <p class="mb-2">"Compliance isn't just about checking boxes—it's about building trust with your customers and partners. #ComplianceMatters #Trust #Business</p>
                    <p class="text-xs text-gray-500">1 week ago</p>
                </div>
            `;
        }
    }
    
    // Load social feeds with a delay to simulate API call
    setTimeout(loadSocialFeeds, 1500);
    
    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const industry = document.getElementById('industry').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !company || !industry) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API endpoint)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Thank you for your message! Our team will contact you shortly.', 'success');
            }, 1500);
        });
    }
    
    // ===== Newsletter Form Submission =====
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Basic validation
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API endpoint)
            setTimeout(() => {
                // Reset form
                newsletterForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
            }, 1500);
        });
    }
    
    // ===== Notification Function =====
    function showNotification(message, type = 'success') {
        // Check if a notification already exists and remove it
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon based on type
        let icon = 'fa-check-circle';
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
        } else if (type === 'warning') {
            icon = 'fa-exclamation-triangle';
        } else if (type === 'info') {
            icon = 'fa-info-circle';
        }
        
        // Set notification content
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add notification to document
        document.body.appendChild(notification);
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            max-width: 350px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            opacity: 0.8;
        `;
        
        // Close notification when close button is clicked
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(100px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Automatically hide notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(100px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ===== Cookie Consent =====
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');
    const cookieSettings = document.getElementById('cookie-settings');
    
    // Show cookie consent if not previously accepted
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Cookie accept button
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('show');
        });
    }
    
    // Cookie decline button
    if (cookieDecline) {
        cookieDecline.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('show');
        });
    }
    
    // Cookie settings button
    if (cookieSettings) {
        cookieSettings.addEventListener('click', function() {
            // Implement cookie settings modal here
            alert('Cookie settings functionality would be implemented here.');
        });
    }
    
    // ===== Parallax Effect =====
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.2;
            const scrollTop = window.pageYOffset;
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            const distance = scrollTop - elementTop;
            
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    }
    
    // Add scroll event for parallax
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', updateParallax);
        updateParallax(); // Initial update
    }
    
    // ===== Add CSS Variables for Section Background Patterns =====
    function addSectionPatterns() {
        const patternSections = document.querySelectorAll('.section-pattern');
        
        patternSections.forEach((section, index) => {
            const patternSize = 20 + (index % 4) * 10; // 20px, 30px, 40px, 50px
            const patternColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
            
            section.style.backgroundSize = `${patternSize}px ${patternSize}px`;
            section.style.backgroundImage = `radial-gradient(${patternColor} 2px, transparent 2px)`;
        });
    }
    
    addSectionPatterns();
    
    // ===== Handle Resize Events =====
    window.addEventListener('resize', function() {
        // Reinitialize AOS on resize
        AOS.refresh();
    });
    
    // ===== Preloader =====
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <i class="fas fa-brain text-4xl text-accent animated-pulse"></i>
            <h2 class="text-xl font-bold mt-4 text-white">MYND</h2>
        </div>
    `;
    
    // Style preloader
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    preloader.querySelector('.animated-pulse').style.cssText = `
        animation: preloader-pulse 1.5s infinite;
    `;
    
    // Add keyframes for preloader animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes preloader-pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add preloader to document
    document.body.prepend(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
});