/*
// JavaScript to detect Android and apply styles
if (/Android/i.test(navigator.userAgent)) {
    console.log("android")
    // JavaScript to detect Android and apply styles
    if (/Android/i.test(navigator.userAgent)) {
        // User is using an Android device
        document.addEventListener("DOMContentLoaded", function () {
            var desktopElements = document.querySelectorAll('.desktop');
            var mobileAndroidElements = document.querySelectorAll('.mobile-android');
            var previewElements = document.querySelectorAll('.preview-image');

            // Hide desktop elements
            for (var i = 0; i < desktopElements.length; i++) {
                desktopElements[i].style.display = 'none';
            }

            // Hide desktop elements
            for (var i = 0; i < previewElements.length; i++) {
                previewElements[i].style.display = 'none';
            }

            // Show mobile-android elements
            for (var j = 0; j < mobileAndroidElements.length; j++) {
                mobileAndroidElements[j].style.display = 'block';
            }
        });
    }
}
*/