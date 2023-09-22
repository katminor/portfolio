document.addEventListener('DOMContentLoaded', function () {
    const projectOptions = document.querySelectorAll('.project-option');
    const iframes = document.querySelectorAll('.preview-image');
    const descriptions = document.querySelectorAll('.description-container');
    const projectTitleContainers = document.querySelectorAll('.project-title-container');
    const projectTitles = document.querySelectorAll('.title');
    const projectTypes = document.querySelectorAll('.type');
    const decorations = document.querySelectorAll('.divider-decoration');
    const projectDescriptions = document.querySelectorAll('.project-description');
    const originalWidth = 900;
    const originalHeight = 560;

    let margin = 0;
    let projectTitleContainerWidth;
    let projectTitleWidth;
    let projectTypeWidth;
    let decorationBase;
    let decorationLeft;
    let decorationRight;
    let decorationWidth;
    let totalWidth;

    let projectTitleContainerHeight;
    let projectTitleHeight;

    function checkProjectTitle() {
        projectTitleContainers.forEach((container, index) => {
            projectTitleContainerWidth = container.offsetWidth;
            projectTitleWidth = projectTitles[index].offsetWidth;
            projectTypeWidth = projectTypes[index].offsetWidth;
            projectTitleContainerHeight = container.offsetHeight;
            projectTitleHeight = projectTitles[index].offsetHeight;

            decorations[index].style.width = projectTitleHeight / 1.33 + 'px';
            decorations[index].style.height = projectTitleHeight / 1.33 + 'px';
            decorationBase = decorations[index].offsetWidth;
            decorationLeft = parseFloat(window.getComputedStyle(decorations[index]).marginLeft);
            decorationRight = parseFloat(window.getComputedStyle(decorations[index]).marginRight);
            decorationWidth = decorationBase + decorationLeft + decorationRight;
            totalWidth = projectTitleWidth + projectTypeWidth + decorationWidth;

            if (projectTitleContainerWidth > totalWidth) {
                decorations[index].style.display = 'inline-block';
                projectTitles[index].style.display = 'inline';
                container.style.flexDirection = "row";
            } else if (projectTitleContainerWidth < totalWidth) {
                container.style.flexDirection = "column";
                container.style.alignItems = "left";
                container.style.textAlign = "left";
                decorations[index].style.display = 'none';
                projectTitles[index].style.display = 'block';
            }
        });
    }

    function checkMargin() {
        if (window.innerWidth >= 1400) {
            margin = 0;
            projectOptions.forEach(projectOption => {
                projectOption.style.flexDirection = 'row';
            });
            iframes.forEach(iframe => {
                iframe.style.transform = `scale(.8)`
            });
            descriptions.forEach(description => {
                description.style.marginTop = '0px';
                if (description.parentElement.classList.contains('right')) {
                    description.style.marginLeft = '0px';
                    description.style.marginRight = `60px`;
                } else {
                    description.style.marginLeft = '60px';
                    description.style.marginRight = `0px`;
                }
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '32px';
                projectDescription.style.marginTop = '24px';
                projectDescription.style.marginBottom = '32px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '16px';
            });
        } else if (window.innerWidth >= 1350) {
            margin = 0;
            projectOptions.forEach(projectOption => {
                projectOption.style.flexDirection = 'row';
            });
            iframes.forEach(iframe => {
                iframe.style.transform = `scale(.8)`
            });
            descriptions.forEach(description => {
                description.style.marginTop = '0px';
                if (description.parentElement.classList.contains('right')) {
                    description.style.marginLeft = '0px';
                    description.style.marginRight = `40px`;
                } else {
                    description.style.marginLeft = '40px';
                    description.style.marginRight = `0px`;
                }
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '32px';
                projectDescription.style.marginTop = '24px';
                projectDescription.style.marginBottom = '32px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '16px';
            });
        } else if (window.innerWidth >= 1000) {
            margin = 0;
            projectOptions.forEach(projectOption => {
                projectOption.style.flexDirection = 'row';
            });
            iframes.forEach(iframe => {
                iframe.style.transform = `scale(.6)`;
            });
            descriptions.forEach(description => {
                description.style.marginTop = '0px';
                if (description.parentElement.classList.contains('right')) {
                    description.style.marginLeft = '0px';
                    description.style.marginRight = `32px`;
                } else {
                    description.style.marginLeft = '32px';
                    description.style.marginRight = `0px`;
                }
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '24px';
                projectDescription.style.marginTop = '18px';
                projectDescription.style.marginBottom = '24px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '14px';
            });
        } else if (window.innerWidth >= 725) {
            margin = 0;
            projectOptions.forEach(projectOption => {
                projectOption.style.flexDirection = 'row';
            });
            iframes.forEach(iframe => {
                iframe.style.transform = `scale(.4)`;
            });
            descriptions.forEach(description => {
                description.style.marginTop = '0px';
                if (description.parentElement.classList.contains('right')) {
                    description.style.marginLeft = '0px';
                    description.style.marginRight = `32px`;
                } else {
                    description.style.marginLeft = '32px';
                    description.style.marginRight = `0px`;
                }
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '18px';
                projectDescription.style.marginTop = '12px';
                projectDescription.style.marginBottom = '18px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '12px';
            });
        } else if (window.innerWidth >= 500) {
            margin = 72;
            // No transform
            projectOptions.forEach(projectOption => {
                if (projectOption.classList.contains('right')) {
                    projectOption.style.flexDirection = 'column-reverse';
                }
                else {
                    projectOption.style.flexDirection = 'column'
                };
            });
            iframes.forEach(iframe => {
                iframe.style.transform = 'none';
            });
            descriptions.forEach(description => {
                description.style.marginLeft = '18px';
                description.style.marginRight = '18px';
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '24px';
                projectDescription.style.marginTop = '16px';
                projectDescription.style.marginBottom = '32px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '12px';
            });
        } else if (window.innerWidth <= 500) {
            margin = 36;
            // No transform
            projectOptions.forEach(projectOption => {
                if (projectOption.classList.contains('right')) {
                    projectOption.style.flexDirection = 'column-reverse';
                }
                else {
                    projectOption.style.flexDirection = 'column'
                };
            });
            iframes.forEach(iframe => {
                iframe.style.transform = 'none';
            });
            descriptions.forEach(description => {
                description.style.marginLeft = '18px';
                description.style.marginRight = '18px';
            });
            projectDescriptions.forEach(projectDescription => {
                projectDescription.style.fontSize = '20px';
                projectDescription.style.marginTop = '16px';
                projectDescription.style.marginBottom = '32px';
            });
            projectTitleContainers.forEach(projectTitleContainer => {
                projectTitleContainer.style.fontSize = '12px';
            });
        } else {
            margin = 0;
        }
    }

    function resizeIframes() {
        iframes.forEach((iframe, index) => {
            const availableWidth = window.innerWidth - margin;
            const availableHeight = window.innerHeight - margin;

            if (window.innerWidth <= 725) {
                const scaleFactorWidth = availableWidth / originalWidth;
                const scaleFactorHeight = availableHeight / originalHeight;
                const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight);

                let newHeight = originalHeight - (originalHeight * scaleFactor);
                let newWidth = originalWidth - (originalWidth * scaleFactor);

                iframe.style.transform = `scale(${scaleFactor})`;
                iframe.style.marginTop = `-${newHeight / 2}px`;
                iframe.style.marginBottom = `-${newHeight / 2}px`;
                iframe.style.marginLeft = `-${newWidth / 2}px`;
                iframe.style.marginRight = `-${newWidth / 2}px`;

                descriptions[index].style.width = `${originalWidth * scaleFactor}px`;
                descriptions[index].style.marginLeft = 0;
                descriptions[index].style.marginRight = 0;
                descriptions[index].style.marginTop = `18px`;
            } else {
                const computedStyle = window.getComputedStyle(iframe);
                const transformValue = computedStyle.getPropertyValue('transform');
                const matrix = transformValue.match(/^matrix\((.+)\)$/);
                let scaleFactor;

                if (matrix) {
                    const matrixValues = matrix[1].split(', ');
                    scaleFactor = parseFloat(matrixValues[0]);
                } else {
                    scaleFactor = 0.1;
                }

                let newHeight = originalHeight - (originalHeight * scaleFactor);
                let newWidth = originalWidth - (originalWidth * scaleFactor);

                iframe.style.marginTop = `-${newHeight / 2}px`;
                iframe.style.marginBottom = `-${newHeight / 2}px`;
                iframe.style.marginLeft = `-${(newWidth / 2) - margin}px`;
                iframe.style.marginRight = `-${newWidth / 2}px`;
            }
        });
    }

    window.addEventListener('resize', function () {
        checkMargin();
        checkProjectTitle();
        resizeIframes();
    });

    checkMargin();
    window.onload = function () {
        checkProjectTitle();
    }
    resizeIframes();

});
