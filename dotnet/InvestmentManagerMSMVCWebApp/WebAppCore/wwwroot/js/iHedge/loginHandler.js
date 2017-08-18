$(function () {
    // http://invest.ihedge.local
    var loginHelper = new LoginHelper();

    window.fbAsyncInit = function () {
        FB.init({
            appId: '432126790209278',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.10'
        });
        FB.AppEvents.logPageView();

        FB.Event.subscribe('auth.login', function (response) { loginHelper.afterFBLogin(); });
        FB.Event.subscribe('auth.logout', function (response) { loginHelper.afterFBLogout(); });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.10";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

function LoginHelper() {

    var _this = this;

    this.afterFBLogin = function () {
        console.log("After FB login!");

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log("FB login succeeded!");
                // the user is logged in and has authenticated your app, and response.authResponse supplies the user's ID, a valid access token, a signed
                // request, and the time the access token and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                console.log("FB login succeeded, but was not authorized by user!");
                // the user is logged in to Facebook, but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
                console.log("FB login failed!");
            }
        });
    };

    this.afterFBLogout = function () {
        console.log("After FB logout!");
    };

    this.requestAuthToken = function (loginProvider, userId) {

    };
}

