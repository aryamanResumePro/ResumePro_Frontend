document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu display
        mobileMenuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("show");
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", function(e) {
            if (mobileMenu.classList.contains("show") && 
                !mobileMenu.contains(e.target) && 
                e.target !== mobileMenuButton) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            });
        });
    }

    // Tab functionality
    const tabs = document.querySelectorAll(".tab-btn");
    
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Update ARIA attributes for accessibility
            tabs.forEach(t => t.setAttribute("aria-pressed", "false"));
            this.setAttribute("aria-pressed", "true");
        });
    });

    // Handle direct linking to specific tab content via URL hash
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && (hash === 'privacy' || hash === 'terms' || hash === 'about')) {
            showContent(hash);
        }
    }
    
    // Run on page load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
});

// Show content function - making it globally available for onclick attributes
function showContent(id) {
    // Hide all content sections
    const contents = document.querySelectorAll('.legal-content');
    contents.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });
    
    // Show selected content
    const selectedContent = document.getElementById(id);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
        selectedContent.classList.add('active');
        
        // Update URL hash without scrolling
        history.replaceState(null, null, `#${id}`);
        
        // Update active tab state
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.classList.remove('active', 'text-blue-600', 'font-semibold');
            tab.classList.add('text-gray-700');
        });
        
        const activeTab = document.querySelector(`[onclick="showContent('${id}')"]`);
        if (activeTab) {
            activeTab.classList.add('active', 'text-blue-600', 'font-semibold');
            activeTab.classList.remove('text-gray-700');
        }
        
        // Smooth scroll to content on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}