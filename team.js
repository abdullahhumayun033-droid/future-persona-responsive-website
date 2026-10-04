document.addEventListener('DOMContentLoaded', function () {
    // Animation delay for team and media cards
    // This adds a staggered animation delay for each team and media card
    const teamCards = document.querySelectorAll('.team-card');
    const mediaCards = document.querySelectorAll('.media-card');

    // Set animation delay for each team card
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Set animation delay for each media card
    mediaCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Smooth scroll for navigation links
    // Adds smooth scrolling behavior for internal page links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default jump behavior
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Smooth scroll to the target section
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                // For external links, follow the link normally
                window.location.href = targetId;
            }
        });
    });

    // Toggle menu for mobile view
    // Allows the navigation menu to open/close when clicked in mobile view
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav .nav-links');

    menuToggle.addEventListener('click', function () {
        // Toggles the 'nav-open' class to open/close the menu
        navLinks.classList.toggle('nav-open');
    });

    // Create overlay element
    // Adds an overlay div to the document for background effects
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Background fade on scroll
    // Fades the background overlay based on scroll position
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the opacity based on scroll distance
        const opacity = 1 - (scrollPosition / docHeight);

        // Apply the calculated opacity to the overlay
        overlay.style.opacity = opacity;
    });

    // Flip cards on click with event delegation
    // Handles card flipping when clicked, using event delegation
    const flipCardsSection = document.getElementById('flip-cards');
    flipCardsSection.addEventListener('click', function (e) {
        // Find the closest .flip-card element that was clicked
        const card = e.target.closest('.flip-card');
        if (card) {
            // Toggle the 'flipped' class to show/hide the card's backside
            card.querySelector('.flip-card-inner').classList.toggle('flipped');
        }
    });

    // Scroll-based animations for sections
    // Adds a class to elements when they appear in the viewport, triggering animations
    const sections = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class when the section enters the viewport
                entry.target.classList.add('visible');
                // Stop observing once the element has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe each section for scroll-based animations
    sections.forEach(section => {
        observer.observe(section);
    });
});
