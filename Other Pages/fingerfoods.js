document.addEventListener('DOMContentLoaded', function() {
    const dinosaurs = document.querySelectorAll('.dinosaur');
    const dinosaurText = document.querySelector('.dinosaur-text');

    function setDinosaurTextHeight() {
        const dinosaurHeight = document.querySelector('.dinosaur').offsetHeight;
        dinosaurText.style.height = `${dinosaurHeight}px`;
    }

    setDinosaurTextHeight(); // Set initial height

    function checkImages() {
        const allX4 = Array.from(dinosaurs).every(dino => {
            const currentImage = dino.src;
            const currentNumber = parseInt(currentImage.split('-')[1]);
            return currentNumber === 4;
        });

        if (allX4) {
            dinosaurs.forEach(dino => {
                dino.style.display = 'none';
            });
            dinosaurText.style.display = 'flex'; // Show dinosaur-text
        }
    }

    dinosaurs.forEach((dino, index) => {
        dino.dataset.index = index;
        dino.addEventListener('click', function() {
            const currentImage = this.src;
            const currentNumber = parseInt(currentImage.split('-')[1]);

            // Calculate the next image number
            let nextNumber = (currentNumber % 4) + 1;

            // Prevent going from 1-4 back to 1-1
            if (currentNumber === 4 && nextNumber === 1) {
                nextNumber = 4;
            }

            // Update the source of the image
            this.src = currentImage.replace(`-${currentNumber}.png`, `-${nextNumber}.png`);

            if (nextNumber === 4) {
                this.classList.remove('dinosaur'); // Remove dinosaur class
            }

            checkImages();
        });
    });
});
