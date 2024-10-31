// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
    console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Function to trigger animations
function startGsapAnimations() {
    gsap.from("h1", {
        marginTop: "10%",
        duration: 2,
        stagger: 0.2,
        opacity: 0
    });
    gsap.from("li", {
        x: -20,
        duration: 1,
        stagger: 0.3,
        opacity: 0
    });

    gsap.from('.section2 .box', {
        duration: 1,
        scale: 0,
        scrollTrigger: {
            trigger: '',
            start: 'top center', // when the top of the trigger hits the top of the viewport
            end: '49% bottom',
            pin: true,
            scrub: 1
        }
    });
    gsap.to(".section3part h3", {
        transform: "translateX(-190%)",
        scrollTrigger: {
            trigger: ".section3part",
            scroller: "body",
            pin: true,
            start: "top 0%",
            end: "top -100%",
            scrub: 2
        }
    })
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');

    if (window.scrollY > 20) {
        if (window.scrollY > lastScrolly) {
            header.classList.add('hide-header'); // Add a class to hide header
            header.classList.remove('show-shadow'); // Remove the shadow class if it exists
        } else {
            header.classList.add('show-shadow'); // Add a class for shadow
            header.classList.remove('hide-header'); // Remove the hide-header class
        }
    } else {
        header.classList.remove('hide-header', 'show-shadow'); // Reset classes
    }
    lastScrolly = window.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
    const logos = document.querySelectorAll(".logo");
    let currentLogoIndex = 0;

    function showNextLogo() {
        if (currentLogoIndex < logos.length) {
            const logo = logos[currentLogoIndex];
            logo.style.opacity = 1;
            setTimeout(() => {
                logo.style.opacity = 0;
                currentLogoIndex++;
                showNextLogo();
            }, 200); // Change logo every 1 second
        } else {
            // Hide the loading screen after all logos are shown
            const loadingScreen = document.querySelector(".loading-screen");
            loadingScreen.classList.add("shrink");
            setTimeout(() => {
                loadingScreen.style.display = "none";

                // Start GSAP animations after the loading screen is hidden

            }, 1000); // Duration of the shrink animation
            startGsapAnimations();
        }
        window.scrollTo({
            top: 0,
        });
    }

    // Start the logo animation
    showNextLogo();
});

