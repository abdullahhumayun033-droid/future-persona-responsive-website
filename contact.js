document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for in-page navigation links (those with hashes)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default behavior (jumping directly to the section)
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
        });
    });

    // Toggle menu for mobile view
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav .nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('nav-open'); // Toggle the 'nav-open' class to show/hide the mobile menu
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('nav-open'); // Remove 'nav-open' class to close the menu
        });
    });
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

// Contact form and scroll animations
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Perform basic validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields."); // Alert if any field is empty
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address."); // Alert if the email is not valid
            return;
        }

        // Display success message (In reality, you would send the form data to the server here)
        alert("Thank you for your message! We'll get back to you soon.");
        contactForm.reset(); // Reset the form fields after submission
    });

    function validateEmail(email) {
        // Regular expression for validating an email address format
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase()); // Test the email against the regex
    }

    // Add scroll animations
    const elements = document.querySelectorAll('.info-item, .faq-item, button[type="submit"]');

    window.addEventListener('scroll', function () {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                element.classList.add('visible'); // Add 'visible' class when the element is near the viewport
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const elementsToAnimate = document.querySelectorAll('.fade-in');

    function animateOnScroll() {
        elementsToAnimate.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add('visible'); // Add 'visible' class to elements when they are in view
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load in case elements are already in view
});
