document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.getElementById('hamburger');
    var exit = document.getElementById('exit');
    var fullNav = document.querySelector('.full-nav');
    var body = document.querySelector('body');
    fullNav.style.opacity = '0';
    fullNav.style.display = 'none';

    // Function to toggle hamburger and exit visibility
    function toggleNavVisibility() {
        if (window.innerWidth > 1000) {
            hamburger.style.display = 'none';
            exit.style.display = 'none';
        } else {
            hamburger.style.display = 'inline-block';
        }
    }

    // Initial call to set visibility on page load
    toggleNavVisibility();

    hamburger.addEventListener('click', function() {
        if (window.innerWidth <= 1000) {
            if (parseFloat(getComputedStyle(fullNav).opacity) === 0) {
                fullNav.style.display = 'flex';
                setTimeout(function() {
                    fullNav.style.opacity = '1';
                }, 0);
                body.style.overflow = 'hidden';
                hamburger.style.opacity = '0'; // Set hamburger opacity to 0
                hamburger.style.display = 'none'; // Hide hamburger
                exit.style.display = 'inline-block'; // Show exit
                exit.style.opacity = '1'; // Set exit opacity to 1
            } else {
                fullNav.style.opacity = '0';
                setTimeout(function() {
                    fullNav.style.display = 'none';
                }, 250);
                body.style.overflow = 'auto';
                hamburger.style.opacity = '1'; // Set hamburger opacity back to 1
                hamburger.style.display = 'inline-block'; // Show hamburger
                exit.style.display = 'none'; // Hide exit
                exit.style.opacity = '0'; // Set exit opacity back to 0
            }
        }
    });

    window.addEventListener('resize', function() {
        toggleNavVisibility();

        if (window.innerWidth > 1000) {
            fullNav.style.display = 'none';
            fullNav.style.opacity = '0';
            body.style.overflow = 'auto';
            exit.style.display = 'none'; // Hide exit
            exit.style.opacity = '0'; // Set exit opacity back to 0
        }
        else if (window.innerWidth <= 1000) {
            if (parseFloat(getComputedStyle(fullNav).opacity) === 0) {
                hamburger.style.opacity = '1'; // Set hamburger opacity back to 1
                hamburger.style.display = 'inline-block'; // Show hamburger
            }
            if (parseFloat(getComputedStyle(fullNav).opacity) === 1) {
                hamburger.style.opacity = '0'; // Set hamburger opacity back to 1
                hamburger.style.display = 'none'; // Show hamburger
            }
        }
    });

    var closeButton = document.getElementById('exit');
    closeButton.addEventListener('click', function() {
        fullNav.style.opacity = '0';
        setTimeout(function() {
            fullNav.style.display = 'none';
        }, 250);
        body.style.overflow = 'auto';
        hamburger.style.opacity = '1'; // Set hamburger opacity back to 1
        hamburger.style.display = 'inline-block'; // Show hamburger
        exit.style.display = 'none'; // Hide exit
        exit.style.opacity = '0'; // Set exit opacity back to 0
    });
});
