document.addEventListener('DOMContentLoaded', function() {
    let yearContainers = document.querySelectorAll('.year-container h4');
    let yearSections = document.querySelectorAll('.year-section');
    let navbar = document.querySelector('#navbar');
    let footer = document.querySelector('#footer');
    let footerHeight = footer.offsetHeight;
    let yearMeasurement = document.querySelector('.year-measurement');
    let firstResumeElement = document.querySelector('.first-resume');
    
    function calculateTotalPadding() {
        let navbarHeight = navbar.offsetHeight;
        let yearMeasurementHeight = yearMeasurement.offsetHeight;
        return navbarHeight + yearMeasurementHeight;
    }
    
    function adjustYears() {
        let totalPadding = calculateTotalPadding();
        yearSections.forEach((section, index) => {
            let rect = section.getBoundingClientRect();
            let sectionHeight = rect.height;
            let sectionTop = rect.top - totalPadding; 
            
            if ((sectionTop <= 0) && (sectionTop >= -sectionHeight)) {
                let scrollPercentage = (sectionTop + sectionHeight) / sectionHeight;
                yearContainers[index].classList.add('resume-active');
                let yearWidth = (yearContainers[index].offsetWidth) * 1.2;
                let screenWidth = window.innerWidth;
                if (index===0) {
                    let leftPosition = ((1 - scrollPercentage) * (screenWidth + yearWidth) + 16);
                    yearContainers[index].style.left = leftPosition + 'px';
                }
                else {
                    let leftPosition = ((1 - scrollPercentage) * (screenWidth + yearWidth)) - yearWidth;
                    yearContainers[index].style.left = leftPosition + 'px';
                }
                yearContainers[index].style.opacity = 1;
            } else {
                yearContainers[index].classList.remove('resume-active');
                yearContainers[index].style.opacity = 0;
            }
        });
    }

    function handleResize() {
        let totalPadding = calculateTotalPadding();
        let footerHeight = footer.offsetHeight;
        firstResumeElement.style.paddingTop = totalPadding + 'px';
        adjustYears();
    }

    window.addEventListener('scroll', adjustYears);
    window.addEventListener('resize', handleResize);

    // Initial adjustment
    handleResize();

    // Job Selectors
    const jobContainers = document.querySelectorAll('.job-container');
    
    jobContainers.forEach((container, index) => {
        if (index % 2 !== 0) {
            container.classList.add('even');
            const jobElement = container.querySelector('.job');
            if (jobElement) {
                jobElement.classList.add('right');
            }
        }
    });
});
