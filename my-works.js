document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default jump to the section
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth' // Smooth scroll to the target section
                    });
                }
            } else {
                // For external links (other pages), don't prevent default behavior
                window.location.href = targetId;
            }
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
    overlay.className = 'overlay'; // Assign the 'overlay' class to the newly created div
    document.body.appendChild(overlay); // Append the overlay to the body of the document

    // Background fade on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the opacity based on the scroll position relative to the document height
        const opacity = 1 - (scrollPosition / docHeight);

        // Apply the calculated opacity to the overlay
        overlay.style.opacity = opacity;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Main image animation on load
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'translate(-50%, -60%) scale(0.5)';

        setTimeout(() => {
            mainImage.style.transition = 'all 0.5s ease-out';
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100); // Delay the animation slightly for effect
    }

    // Expand section on hover
    const section = document.querySelector('.my-work-section');
    const textContainer = document.querySelector('.text-container');
    const description = document.querySelector('.work-description');

    if (section && textContainer && description) {
        section.addEventListener('mouseenter', () => {
            // Add 'expanded' class on hover
            section.classList.add('expanded');
            textContainer.classList.add('expanded');
            description.classList.add('expanded');
        });

        section.addEventListener('mouseleave', () => {
            // Remove 'expanded' class when the mouse leaves
            section.classList.remove('expanded');
            textContainer.classList.remove('expanded');
            description.classList.remove('expanded');
        });
    }

    // Sliding effect on scroll
    window.addEventListener('scroll', function() {
        const leftBox = document.querySelector('.image-box-left');
        const rightBox = document.querySelector('.image-box-right');
        const navBar = document.querySelector('nav');

        if (leftBox && rightBox && navBar) {
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            const leftBoxBottom = leftBox.getBoundingClientRect().bottom + scrollPosition;
            const rightBoxBottom = rightBox.getBoundingClientRect().bottom + scrollPosition;
            const navBarBottom = navBar.getBoundingClientRect().bottom + scrollPosition;

            const triggerPointLeft = leftBoxBottom - (windowHeight * 0.85);
            const triggerPointRight = rightBoxBottom - (windowHeight * 0.85);

            // Trigger sliding when 85% of the image is visible (scrolled past it)
            if (scrollPosition > triggerPointLeft) {
                leftBox.parentNode.classList.add('revealed-left');
            } else if (scrollPosition < leftBoxBottom - (windowHeight * 0.85)) {
                leftBox.parentNode.classList.remove('revealed-left');
            }

            if (scrollPosition > triggerPointRight) {
                rightBox.parentNode.classList.add('revealed-right');
            } else if (scrollPosition < rightBoxBottom - (windowHeight * 0.85)) {
                rightBox.parentNode.classList.remove('revealed-right');
            }
        }
    });

    // Popup functionality for image grid
    const workItems = document.querySelectorAll('.work-item');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const closeBtn = document.querySelector('.close-btn');

    if (workItems && popup && popupText && closeBtn) {
        workItems.forEach(item => {
            item.addEventListener('click', function () {
                const details = this.getAttribute('data-detail'); // Get details from data attribute
                popupText.textContent = details; // Display details in the popup
                popup.style.display = 'flex'; // Show the popup
            });
        });

        closeBtn.addEventListener('click', function () {
            popup.style.display = 'none'; // Hide the popup when the close button is clicked
        });

        window.addEventListener('click', function (e) {
            if (e.target === popup) {
                popup.style.display = 'none'; // Hide the popup when clicking outside of it
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.work-item');

    // Define the final positions for the images in the work items
    const finalPositions = [
        { top: '10%', left: '30%' }, // Top-left position
        { top: '20%', left: '70%' }, // Top-right position
        { top: '40%', left: '85%' }, // Mid-right position
        { top: '70%', left: '75%' }, // Bottom-right position
        { top: '75%', left: '50%' }, // Bottom-center position
        { top: '60%', left: '25%' }, // Bottom-left position
        { top: '40%', left: '10%' }, // Mid-left position
        { top: '25%', left: '50%' }  // Mid-center position
    ];

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to scatter the items across the screen when they enter the viewport
    function scatterItems() {
        workItems.forEach((item, index) => {
            if (isInViewport(item)) {
                const { top, left } = finalPositions[index]; // Get the final position for this item
                item.style.top = top;
                item.style.left = left;
                item.style.transform = ''; // Reset any transformations
            }
        });
    }

    window.addEventListener('scroll', scatterItems); // Scatter items on scroll
    window.addEventListener('resize', scatterItems); // Scatter items on window resize

    // Initial setup to stack items in the center of the screen
    workItems.forEach(item => {
        item.style.top = '50%';
        item.style.left = '50%';
        item.style.transform = 'translate(-50%, -50%)'; // Center the items initially
    });

    // Initial check to scatter items when they enter the viewport
    scatterItems();
});
