document.addEventListener('DOMContentLoaded', function() {
// Adjust the size of super fruit game
// Get references to the elements
const navbar = document.getElementById('navbar');
const superfruitGame = document.getElementById('super-fruit-game');

window.addEventListener('resize', function() {
    adjustSuperfruitGameSize();
})

// Function to adjust the size of superfruitGame
function adjustSuperfruitGameSize() {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    
    // Get the height of the navbar
    const navbarHeight = navbar.offsetHeight;
    
    // Calculate the new height for superfruitGame
    const newHeight = viewportHeight - navbarHeight;
    
    // Set the width of superfruitGame to match the viewport width
    const viewportWidth = window.innerWidth;
    
    // Set the new width and height for superfruitGame
    superfruitGame.style.width = viewportWidth + 'px';
    superfruitGame.style.height = newHeight + 'px';
}

// Call the adjustSuperfruitGameSize function when the window is resized
window.addEventListener('resize', adjustSuperfruitGameSize);

// Call the adjustSuperfruitGameSize function on page load
adjustSuperfruitGameSize();
});