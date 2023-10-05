// Function to change the image source on hover
function changeImageOnHover1() {
    if (window.innerWidth >= 725) {
        var image = document.getElementById("layout-conversation");
        image.src = "../../Pictures/Drift/Layout/Conversation page.png";
    }
}

// Function to revert to the default image source when not hovering
function revertImage1() {
    if (window.innerWidth >= 725) {
        var image = document.getElementById("layout-conversation");
        image.src = "../../Pictures/Drift/Layout/Conversation page.png";
    }
}

// Function to change the image source on hover
function changeImageOnHover2() {
    if (window.innerWidth >= 725) {
        var image = document.getElementById("layout-account");
        image.src = "../../Pictures/Drift/Layout/Account page.png";
    }
}

// Function to revert to the default image source when not hovering
function revertImage2() {
    if (window.innerWidth >= 725) {
        var image = document.getElementById("layout-account");
        image.src = "../../Pictures/Drift/Layout/Account page.png";
    }
}

// Function to change the image source based on screen size
function updateImageBasedOnScreenSize() {
    var image1 = document.getElementById("layout-conversation");
    var image2 = document.getElementById("layout-account");
    
    if (window.innerWidth < 500) {
        image1.src = "../../Pictures/Drift/Layout/Conversation Page Max.png";
        image2.src = "../../Pictures/Drift/Layout/Account Page Max.png";
    }
    else if (window.innerWidth < 725) {
        image1.src = "../../Pictures/Drift/Layout/Annotated Conversation Page Max.png";
        image2.src = "../../Pictures/Drift/Layout/Annotated Account Page Max.png";
    } else {
        image1.src = "../../Pictures/Drift/Layout/Conversation page.png";
        image2.src = "../../Pictures/Drift/Layout/Account Page.png";
    }
}

// Function to handle screen size changes
function handleScreenSizeChange() {
    window.addEventListener("resize", updateImageBasedOnScreenSize);
}

document.addEventListener('DOMContentLoaded', function () {
    // Call the initial function to set images based on the current screen size
    updateImageBasedOnScreenSize();

    // Call the function to handle screen size changes
    handleScreenSizeChange();
});
