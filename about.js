document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent the default link behavior
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth' // Smoothly scrolls to the target section
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
        navLinks.classList.toggle('nav-open'); // Toggles the mobile navigation menu
    });

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay'; // Adds the class 'overlay' to the new div
    document.body.appendChild(overlay); // Appends the overlay to the body

    // Background fade on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the opacity based on scroll position
        const opacity = 1 - (scrollPosition / docHeight);

        // Apply the calculated opacity to the overlay
        overlay.style.opacity = opacity;
    });

    // Scroll-based animation for bio-section
    window.addEventListener('scroll', function() {
        const bioSection = document.querySelector('.bio-section');
        const bioSectionPosition = bioSection.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;

        if (window.scrollY + windowHeight > bioSectionPosition + 100) {
            bioSection.classList.add('visible'); // Adds 'visible' class to bio-section when in view
        } else {
            bioSection.classList.remove('visible'); // Removes 'visible' class when out of view
        }
    });

    // Flip cards on click with event delegation
    const flipCardsSection = document.getElementById('flip-cards');
    flipCardsSection.addEventListener('click', function(e) {
        const card = e.target.closest('.flip-card');
        if (card) {
            card.querySelector('.flip-card-inner').classList.toggle('flipped'); // Toggles the 'flipped' class on click
        }
    });

    // Scroll-based animations for sections
    const sections = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adds 'visible' class when the section comes into view
                observer.unobserve(entry.target); // Stops observing the section after it becomes visible
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    sections.forEach(section => {
        observer.observe(section); // Observe each section with the specified classes
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.reviews-slider');
    const slides = document.querySelectorAll('.review-card');
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    let currentIndex = 0; // Tracks the current slide index

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentIndex * -300}px)`; // Adjusts the slider position based on the current index
    }

    function autoScroll() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0; // Loops back to the first slide when the end is reached
        }
        setSliderPosition(); // Updates the slider position
    }

    let autoScrollInterval = setInterval(autoScroll, 3000); // Automatically scrolls every 3 seconds

    prevButton.addEventListener('click', function() {
        currentIndex = currentIndex <= 0 ? slides.length - 1 : currentIndex - 1; // Goes to the previous slide
        setSliderPosition(); // Updates the slider position
        resetAutoScroll(); // Resets the auto-scroll timer
    });

    nextButton.addEventListener('click', function() {
        currentIndex = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1; // Goes to the next slide
        setSliderPosition(); // Updates the slider position
        resetAutoScroll(); // Resets the auto-scroll timer
    });

    function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Clears the current auto-scroll interval
        autoScrollInterval = setInterval(autoScroll, 3000); // Resets the interval for auto-scrolling
    }
});
