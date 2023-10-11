document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.island-image');

    images.forEach(function(image) {
        image.addEventListener('click', function() {
            const imageUrl = image.getAttribute('data-href');
            if (imageUrl) {
                window.location.href = imageUrl;
            }
        });
    });
});