document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const faqQuestions = document.querySelectorAll(".faq-question");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default behavior
        console.log("Button clicked"); // Debugging: Check if this logs in the console

        // Toggle the mobile menu visibility
        mobileMenu.classList.toggle("hidden");
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
            this.nextElementSibling.classList.toggle("hidden");
        });
    });
});

