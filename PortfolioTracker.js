// Updates project order depending on what version is sent out. 
// Version is decided by URL
// Ver1 is for Product Designer/Tech
// Ver2 is for UI Artist/Games

// Remove version. For testing.
function resetCache() {
    localStorage.setItem('version', 'none');
    console.log("Cache reset.")
}

document.addEventListener('DOMContentLoaded', function() {
    var currentURL = window.location.href;
    var verNumber = currentURL.substring(currentURL.length - 4, currentURL.length);

    function getVersion() {
        var cachedVersion = localStorage.getItem('version');
        return cachedVersion
    }

    function changeLayout(ver) {
        var cachedVersion = getVersion()
        if ((ver === 'ver1') || (cachedVersion === 'ver1')) {
            document.getElementById('all-projects').style.flexDirection = "column-reverse";
            if (cachedVersion !== 'ver1') {
                localStorage.setItem('version', ver);
            }
        }
        else if ((ver === 'ver2') || (cachedVersion === 'ver2')) {
            document.getElementById('all-projects').style.flexDirection = "column";
            if (cachedVersion !== 'ver2') {
                localStorage.setItem('version', ver);
            }
        }
        else {
            document.getElementById('all-projects').style.flexDirection = "column";
            localStorage.setItem('version', 'none');
        }
    }

    function changeOpener(ver) {
        var cachedVersion = getVersion()
        let introJobProduct = document.getElementById('intro-job-product');
        let introJobGame = document.getElementById('intro-job-game');
        let introTagline = document.getElementById('intro-tagline');
        let plus = document.getElementById('intro-plus');
        if ((ver === 'ver1') || (cachedVersion === 'ver1')) {
            introJobProduct.innerHTML = "<strong>I'm a Product Designer</strong>";
            introJobGame.innerHTML = "";
            introTagline.innerHTML = "passionate about creating fun and <br>easy to use products for everyone";
            plus.style.display = "none";
        }
        else if ((ver === 'ver2') || (cachedVersion === 'ver2')) {
            introJobProduct.innerHTML = "<strong>I'm a UI Artist</strong>";
            introJobGame.innerHTML = "";
            introTagline.innerHTML = "passionate about creating fun and <br>accessible games for everyone";
            plus.style.display = "none";
        }
        else {
        }
    }

    // Call changeLayout with the version number
    changeLayout(verNumber);
    if (document.getElementById('intro-job-product')) {
        changeOpener(verNumber);
    }
});
