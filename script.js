document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const faqQuestions = document.querySelectorAll(".faq-question");

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

