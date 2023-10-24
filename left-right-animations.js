document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to observe when the element is in the viewport
    const threshold = {
        threshold: .15, // Adjust this value to control when the transition starts
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
});

