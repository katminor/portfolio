

document.addEventListener('DOMContentLoaded', function () {
    // Adjust the size of super fruit game
    // Get references to the elements
    const navbar = document.getElementById('navbar');
    const superfruitGame = document.getElementById('super-fruit-game');

    // Function to adjust the size of superfruitGame
    function adjustElementSize() {
        // Get the height of the viewport
        const viewportHeight = window.innerHeight;

        // Get the height of the navbar
        const navbarHeight = navbar.offsetHeight;

        // FRUIT GAME
        // Calculate the new height for superfruitGame
        const newHeight = viewportHeight - navbarHeight - (window.innerHeight / 15);

        // Set the width of superfruitGame to match the viewport width
        const viewportWidth = window.innerWidth;

        // Set the new width and height for superfruitGame
        superfruitGame.style.width = viewportWidth + 'px';
        superfruitGame.style.height = newHeight + 'px';
        superfruitGame.style.marginTop = navbarHeight + 'px';
    }

    // Call the adjustElementSize function when the window is resized
    window.addEventListener('resize', adjustElementSize);

    // Call the adjustElementSize function on page load
    adjustElementSize();

    // JavaScript to observe when the element is in the viewport
    const options = {
        threshold: 0.025, // Adjust this value to control when the transition starts
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Remove the 'active' class when not in viewport
            }
        });
    }, options);

    const projectOptionElements = document.querySelectorAll('.project-option');
    projectOptionElements.forEach((element) => {
        observer.observe(element);
    });
});

