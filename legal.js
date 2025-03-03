document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".legal-content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function () {
            // Remove 'active' class from all tabs and contents
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // Add 'active' class to the clicked tab and corresponding content
            tab.classList.add("active");
            contents[index].classList.add("active");
        });
    });
});
