document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href'); // Get the href attribute value (target section ID)

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent the default anchor behavior (jump to section)
                const targetSection = document.querySelector(targetId); // Select the target section
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth' // Scroll to the target section smoothly
                    });
                }
            } else {
                // For external links (other pages), don't prevent default behavior
                window.location.href = targetId; // Navigate to the external page
            }
        });
    });

    // Toggle menu for mobile view
    const menuToggle = document.querySelector('.menu-toggle'); // Select the menu toggle button
    const navLinks = document.querySelector('nav .nav-links'); // Select the navigation links container

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav-open'); // Toggle the 'nav-open' class to show/hide the mobile menu
    });

    // Create overlay element
    const overlay = document.createElement('div'); // Create a new div element for the overlay
    overlay.className = 'overlay'; // Assign the 'overlay' class to the new div
    document.body.appendChild(overlay); // Append the overlay to the body of the document
});
