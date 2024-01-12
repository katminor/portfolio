// Updates project order depending on what version is sent out. 
// Version is decided by URL
// Ver1 is for Product Designer/Tech
// Ver2 is for UI Artist/Games

// Remove version. For testing.
function clearCache() {
    localStorage.setItem('version', '');
    console.log("Cache reset.")
}

// Remove version. For testing. There are two of them because no matter what I always get the wrong one.
function resetCache() {
    clearCache();
}

document.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.href;
    let cachedVersion = getVersion();

    function getVersion() {
        let cachedVersion = localStorage.getItem('version');
        if ((!cachedVersion) || (cachedVersion === '')) {
            let verNumber = currentURL.substring(currentURL.length - 4, currentURL.length);
            if ((verNumber === 'ver1') || (verNumber === 'ver2')) {
                localStorage.setItem('version', verNumber);
            }
            else {
                localStorage.setItem('version', '');
            }
        }
        cachedVersion = localStorage.getItem('version');
        return cachedVersion;
    }

    function changeLayout(ver) {
        if (cachedVersion === 'ver1') {
            document.getElementById('all-projects').style.flexDirection = "column-reverse";
        }
        else if (cachedVersion === 'ver2') {
            document.getElementById('all-projects').style.flexDirection = "column";
        }
        else {
            document.getElementById('all-projects').style.flexDirection = "column";
        }
    }

    function changeOpener(ver) {
        let introJobProduct = document.getElementById('intro-job-product');
        let introJobGame = document.getElementById('intro-job-game');
        let introTagline = document.getElementById('intro-tagline');
        let plus = document.getElementById('intro-plus');
        if ((ver === 'ver1') || (cachedVersion === 'ver1')) {
            introJobProduct.innerHTML = "<strong>I'm a Product Designer,</strong>";
            introJobGame.innerHTML = "";
            introTagline.innerHTML = "and a passionate data-focused problem-solver.";
            plus.style.display = "none";
        }
        else if ((ver === 'ver2') || (cachedVersion === 'ver2')) {
            introJobProduct.innerHTML = "<strong>I'm a UI Artist,</strong>";
            introJobGame.innerHTML = "";
            introTagline.innerHTML = "passionate about sparking joy.";
            plus.style.display = "none";
        }
        else {
        }
    }

    // Call changeLayout with the version number
    let currentVer = cachedVersion;
    changeLayout(currentVer);
    if (document.getElementById('intro-job-product')) {
        changeOpener(currentVer);
    }
});
