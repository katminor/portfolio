document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements
    const navbar = document.getElementById('navbar');
    const headerImage = document.getElementById('header-image');

    // Adjust sizes of elemenets to fit the navbar
    function adjustElementSize() {
        // Get the height of the navbar
        const navbarHeight = navbar.offsetHeight;

        // Calculate the new margin-top for the header image
        headerImage.style.marginTop = (navbarHeight - 2) + 'px';
    }

    // Call the adjustElementSize function when the window is resized
    window.addEventListener('resize', adjustElementSize);

    // Call the adjustElementSize function on page load
    adjustElementSize();
});