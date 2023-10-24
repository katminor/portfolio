// Updates project order depending on what version is sent out. 
// Version is decided by URL
//Ver1 is for product design

// Remove version. For testing.
function resetCache() {
    localStorage.setItem('version', 'none');
    console.log("Cache reset.")
}

document.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.href;
    var verNumber = currentURL.substring(currentURL.length - 4, currentURL.length);

    function changeLayout(ver) {
        var cachedVersion = localStorage.getItem('version');
        if ((ver === 'ver1') || (cachedVersion === 'ver1')) {
            document.getElementById('all-projects').style.flexDirection = "column-reverse";
            if (cachedVersion !== 'ver1') {
                localStorage.setItem('version', ver);
            }
        } else {
            document.getElementById('all-projects').style.flexDirection = "column";
            localStorage.setItem('version', 'none');
        }
    }

    // Call changeLayout with the version number
    changeLayout(verNumber);
});
