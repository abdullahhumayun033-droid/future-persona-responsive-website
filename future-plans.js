document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent the default link behavior for smooth scrolling
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth' // Smoothly scroll to the target section
                    });
                }
            } else {
                // For external links (other pages), don't prevent default
                window.location.href = targetId;
            }

            // Close mobile menu after clicking a link
            document.querySelector('nav .nav-links').classList.remove('nav-open');
        });
    });

    // Toggle menu for mobile view
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav .nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav-open'); // Toggle the 'nav-open' class to show/hide the mobile menu
    });

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay'; // Assign 'overlay' class to the new div element
    document.body.appendChild(overlay); // Append the overlay to the body of the document

    // Background fade on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the opacity based on scroll position
        const opacity = 1 - (scrollPosition / docHeight);

        // Apply the calculated opacity to the overlay
        overlay.style.opacity = opacity;
    });

    // Glowing effect for result cards
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Create a glowing effect on the card based on mouse position
            card.style.boxShadow = `${x / 10}px ${y / 10}px 30px rgba(102, 252, 241, 0.8)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset the shadow when the mouse leaves the card
            card.style.boxShadow = "0 0 15px rgba(102, 252, 241, 0.5)";
        });
    });

    // Fade-in effect for sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add 'fade-in' class when the section is in view
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    sections.forEach(section => {
        observer.observe(section); // Observe each section for intersection changes
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add animation classes based on visibility
    function animateElements() {
        const h2 = document.querySelector('.content-box h2');
        const video = document.querySelector('.content-box video');

        // Add animation classes if the elements are in the viewport
        if (isElementInViewport(h2)) {
            h2.classList.add('animate-left');
        }
        if (isElementInViewport(video)) {
            video.classList.add('animate-right');
        }
    }

    // Listen for scroll events to trigger the animation
    window.addEventListener('scroll', animateElements);

    // Trigger animation on page load if the elements are already in view
    animateElements();
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if the element is centered in the viewport
    function isElementCentered(el) {
        const rect = el.getBoundingClientRect();
        const elCenterY = rect.top + rect.height / 2;
        const viewportCenterY = window.innerHeight / 2;
        const threshold = 50; // Allowable distance from center to stop spinning

        // Return true if the element's center is within the threshold of the viewport's center
        return Math.abs(elCenterY - viewportCenterY) <= threshold;
    }

    // Function to toggle spinning animation based on element position
    function toggleSpin() {
        const visionMissionBox = document.querySelector('#vision-mission');

        if (!isElementCentered(visionMissionBox)) {
            visionMissionBox.classList.add('spin'); // Add 'spin' class if the element is not centered
        } else {
            visionMissionBox.classList.remove('spin'); // Remove 'spin' class if centered
            visionMissionBox.classList.add('stop-spin'); // Add 'stop-spin' class to stop spinning
        }
    }

    // Listen for scroll events to toggle the spinning
    window.addEventListener('scroll', toggleSpin);

    // Trigger spin toggle on page load
    toggleSpin();
});
