document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is not on a mobile device
    const isNotMobile = !/Mobi|Android/i.test(navigator.userAgent);

    if (isNotMobile) {
        // JavaScript to observe when the element is in the viewport
        const threshold = {
            threshold: 0.15, // Adjust this value to control when the transition starts
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active'); // Remove the 'active' class when not in viewport
                }
            });
        }, threshold);

        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        // If on mobile, you might want to keep all elements active or perform a different behavior
        // For now, let's add a class to all elements when on mobile
        const allElements = document.querySelectorAll('.animate');
        allElements.forEach((element) => {
            element.classList.add('active');
        });
    }
});
