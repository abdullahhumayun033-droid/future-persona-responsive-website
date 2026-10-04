document.addEventListener('DOMContentLoaded', function() {
    // Data for the news section
    const newsData = {
        news: [
            // News item 1
            {
                id: "news1",
                title: "Home Design with AI",
                description: "The advent of Artificial Intelligence (AI) is heralding a new era in architectural design, one that is reshaping the very foundations of how we conceptualize, design, and construct our living spaces. By harnessing the power of AI, architects and designers are able to create homes that are not just aesthetically pleasing but are also highly functional, personalized, and sustainable. AI-driven design tools analyze vast amounts of data, from environmental factors to individual preferences, enabling architects to create homes that adapt to the unique needs of their inhabitants. These smart homes are equipped with systems that learn and evolve over time, ensuring that the living experience continually improves. Whether it's optimizing natural light, enhancing energy efficiency, or automating routine tasks, AI is making homes more responsive, efficient, and attuned to the well-being of their occupants. The integration of AI in home design marks a significant leap forward, offering a glimpse into a future where our living spaces are as intelligent as they are beautiful."
            },
            // News item 2
            {
                id: "news2",
                title: "The Rise of Smart Homes",
                description: "The concept of smart homes has transitioned from a futuristic dream to a present-day reality, thanks to rapid advancements in technology. These homes, powered by AI and the Internet of Things (IoT), are transforming the way we live, offering unprecedented levels of convenience, security, and efficiency. From automated lighting and climate control to advanced security systems and voice-activated assistants, smart homes are designed to cater to the modern homeowner's every need. They are not just about luxury; they are about creating environments that enhance quality of life by seamlessly integrating technology into daily routines. Imagine a home that adjusts the thermostat based on your preferences before you even step inside, or one that reminds you to water the plants when you’ve forgotten. The rise of smart homes is redefining the property market, with more buyers seeking homes that offer these advanced features. As the demand for smart homes grows, so too does the need for architects and designers to innovate, creating spaces that are not only beautiful but also intelligent and responsive."
            },
            // News item 3
            {
                id: "news3",
                title: "Sustainable Architecture",
                description: "The global shift towards sustainability is transforming the architecture industry, as more architects and developers recognize the need to build homes that are not only beautiful but also environmentally responsible. Sustainable architecture goes beyond using eco-friendly materials; it involves a holistic approach to design that considers the environmental impact of a building throughout its lifecycle. From energy-efficient designs that reduce carbon footprints to innovative materials that minimize waste, architects are leading the charge in creating homes that are both functional and sustainable. The use of renewable energy sources, such as solar panels and geothermal heating, is becoming more common, while green roofs and rainwater harvesting systems are being integrated into new designs. These sustainable homes are designed to coexist harmoniously with their surroundings, reducing their impact on the environment while providing a healthier living space for their occupants. As climate change continues to be a pressing global issue, the role of architects in promoting sustainability has never been more critical. By embracing sustainable practices, architects are not just building homes; they are building a better future."
            },
            // News item 4
            {
                id: "news4",
                title: "Market Insights",
                description: "The integration of Artificial Intelligence into home design is not only revolutionizing the way we live but also significantly influencing the real estate market. As more homes are equipped with advanced AI-driven technologies, the demand for these smart properties is on the rise, leading to a notable shift in property values. Homes that feature AI-enhanced security systems, energy-efficient designs, and personalized living environments are becoming increasingly desirable, attracting buyers who are willing to pay a premium for these advanced features. This shift is also influencing the types of properties that are being developed, with more emphasis being placed on creating smart homes that cater to the tech-savvy buyer. Additionally, AI is playing a crucial role in property management and real estate transactions, offering insights into market trends, buyer behavior, and property valuations. As a result, both buyers and sellers are more informed, making the market more competitive and dynamic. The impact of AI on property values is profound, reshaping the real estate landscape and setting new standards for what constitutes a valuable property."
            },
            // News item 5
            {
                id: "news5",
                title: "Innovation in Design",
                description: "Innovation is at the heart of modern architecture, and as technology continues to evolve, so too do the possibilities for smart living. Architects and designers are constantly pushing the boundaries of what is possible, exploring new ways to integrate technology into our homes to enhance the quality of life for residents. From AI-driven design tools that allow for the creation of highly personalized living spaces to the latest advancements in home automation, the future of smart living is brimming with potential. These innovations are not just about convenience; they are about creating homes that are more intuitive, responsive, and sustainable. Imagine a home where the walls can change color based on your mood, or where the kitchen appliances can order groceries automatically when supplies run low. These are not just concepts; they are the reality of tomorrow’s homes. As we move towards a future where smart living becomes the norm, architects and designers are leading the way, creating spaces that are as innovative as they are functional. The future of architecture is not just about building homes; it’s about building smarter, more connected lives."
            }
        ]
    };

    // Compile Handlebars templates
    const linksTemplateSource = document.getElementById('news-links-template').innerHTML;
    const contentTemplateSource = document.getElementById('news-content-template').innerHTML;

    // Compile the templates using Handlebars
    const linksTemplate = Handlebars.compile(linksTemplateSource);
    const contentTemplate = Handlebars.compile(contentTemplateSource);

    // Render the templates with data
    const linksHtml = linksTemplate(newsData);
    const contentHtml = contentTemplate(newsData);

    // Insert the generated HTML into the DOM
    document.getElementById('news-links').innerHTML = linksHtml;
    document.getElementById('news-content').innerHTML = contentHtml;

    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Check if the link is an in-page link (starts with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
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

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('nav-open');
    });

    // Create overlay element for background fade effect
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Background fade effect based on scroll position
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the opacity based on scroll position
        const opacity = 1 - (scrollPosition / docHeight);

        // Apply the calculated opacity to the overlay
        overlay.style.opacity = opacity;
    });

    // Highlight corresponding news link on scroll
    const newsLinks = document.querySelectorAll('.news-link');
    const newsItems = document.querySelectorAll('.news-item');

    const observerOptions = {
        root: document.querySelector('#news-content'),
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                newsLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === id);
                });
            }
        });
    }, observerOptions);

    newsItems.forEach(item => {
        observer.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Original gallery hover functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const fullViewItems = document.querySelectorAll('.full-view');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let slideIndex = 0;
    let slideshowPaused = false;
    const slides = document.querySelectorAll(".mySlides");
    const totalSlides = slides.length;

    function showSlides() {
        if (!slideshowPaused) {
            slides.forEach((slide) => {
                slide.style.display = "none";
            });
            slideIndex++;
            if (slideIndex > totalSlides) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = "block";
        }
        setTimeout(showSlides, 2000); // Continue to change image every 2 seconds
    }

    showSlides(); // Initialize the slideshow

    // Pause slideshow on hover
    slideshowContainer.addEventListener('mouseover', function () {
        slideshowPaused = true;
    });

    slideshowContainer.addEventListener('mouseout', function () {
        slideshowPaused = false;
    });

    // Click event to open all images in separate content cards
    slideshowContainer.addEventListener('click', function () {
        // Hide the slideshow
        slideshowContainer.style.display = 'none';
        // Show all individual images as content cards
        fullViewItems.forEach(item => {
            item.style.display = 'block';
        });
        // Pause the slideshow when all images are displayed
        slideshowPaused = true;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlides() {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Increment slideIndex
        slideIndex++;

        // If we've gone past the last slide, reset to the first slide
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        // Show the current slide
        slides[slideIndex - 1].style.display = 'block';

        // Change slide every 3 seconds
        setTimeout(showSlides, 3000);
    }

    // Start the slideshow
    showSlides();
});

document.addEventListener('DOMContentLoaded', function () {
    // Brand logos fade-in effect
    const brandItems = document.querySelectorAll('.brand-item img');

    brandItems.forEach((img, index) => {
        img.style.opacity = 0;
        img.style.transform = 'scale(0.8)';
        img.style.transition = `opacity 0.5s ease ${(index + 1) * 0.2}s, transform 0.5s ease ${(index + 1) * 0.2}s`;

        setTimeout(() => {
            img.style.opacity = 1;
            img.style.transform = 'scale(1)';
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const newsLinks = document.querySelectorAll('.news-link');
    const newsContent = document.getElementById('news-content');
    const newsItems = document.querySelectorAll('.news-item');

    // Add click event to each news link
    newsLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            newsLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');

            // Scroll to the corresponding news item
            const targetId = this.getAttribute('href').substring(1);
            const targetItem = document.getElementById(targetId);
            newsContent.scrollTo({
                top: targetItem.offsetTop - newsContent.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const brandItems = document.querySelectorAll('.brand-item');
    const brandSection = document.querySelector('.brand-section');

    function checkScroll() {
        const sectionPosition = brandSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        if (sectionPosition < screenPosition) {
            brandItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200); // Staggered delay for each item
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
});