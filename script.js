document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const faqQuestions = document.querySelectorAll(".faq-question");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const footerNavLinks = document.querySelectorAll(".footer-nav-link");

    // Mobile menu toggle
    mobileMenuButton.addEventListener("click", function() {
        mobileMenu.classList.toggle("hidden");
        // Add accessibility attributes
        const expanded = mobileMenu.classList.contains("hidden") ? "false" : "true";
        mobileMenuButton.setAttribute("aria-expanded", expanded);
    });

    // Close mobile menu when clicking on a mobile navigation link
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            mobileMenu.classList.add("hidden");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            
            // Smooth scroll to section
            const targetSection = document.querySelector(href);
            if (targetSection) {
                // Add small delay to ensure menu closes first
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    });

    // Smooth scroll for footer navigation links
    footerNavLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            
            // Smooth scroll to section
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add scrolling effect on navbar
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // FAQ Toggle
    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            // Toggle active class for the question
            this.classList.toggle("active");
            
            // Toggle the answer visibility
            const answer = this.nextElementSibling;
            answer.classList.toggle("hidden");
            
            // If we're opening this FAQ, close all others
            if (!answer.classList.contains("hidden")) {
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.classList.remove("active");
                        q.nextElementSibling.classList.add("hidden");
                    }
                });
            }
        });
    });

    // Handle anchor links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (!this.classList.contains("mobile-nav-link") && 
                !this.classList.contains("footer-nav-link")) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href !== '#') {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
});