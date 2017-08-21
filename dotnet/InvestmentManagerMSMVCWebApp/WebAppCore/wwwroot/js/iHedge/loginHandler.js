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

        if (FB) {
            // check if already logged in and whether an auth token has been provided by InvestmentManager auth service
            //FB.getLoginStatus(function (status) { console.log(status); })
            if (loginHelper.getAuthToken() === "")
                loginHelper.afterFBLogin();
            else
                $("#authenticated").val("true");
        }

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

    this.getAuthToken = function () {
        if ($("#investAuthToken").length > 0)
            return $("#investAuthToken").val();
        else
            return "";
    };

    this.afterFBLogin = function () {
        console.log("After FB login!");

        FB.getLoginStatus(function (response, err) {
            if (response.status === 'connected') {
                console.log("FB login succeeded!");
                // the user is logged in and has authenticated your app, and response.authResponse supplies the user's ID, a valid access token, a signed
                // request, and the time the access token and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                $("#authProviderUserId").val(uid);
                $("#authProviderName").val("FB");

                _this.requestAuthToken("FB", uid, accessToken);
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

        var authModel = { authProvider: $("#authProviderName").val(), fbUserId: $("#authProviderUserId").val(), investAuthToken: $("#investAuthToken").val() };

        $.ajax({
            type: "POST",
            url: "/Account/Logout",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            data: JSON.stringify(authModel),
            traditional: true,
            success: function (result) {
                $("#investAuthToken").val("");
                $("#authProviderUserId").val(uid);
                $("#authProviderName").val("");
                $("#authenticated").val("false");
                $(".authorized").hide();

                windows.location.href("/");
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };

    this.requestAuthToken = function (authProvider, userId, accessToken) {
        var loginModel = { authProvider: authProvider, fbUserId: userId, fbAccessToken: accessToken };

        $.ajax({
            type: "POST",
            url: "/Account/RequestAuthToken",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            data: JSON.stringify(loginModel),
            traditional: true,
            success: function (result) {
                if (result.authToken && result.authToken.length > 0) {
                    console.log("got auth token [" + result.authToken + "] from server!");
                    $("#investAuthToken").val(result.authToken);
                    $("#authenticated").val("true");
                    $(".authorized").show();
                }
                else
                    ShowError(result.errorMessage);

                $("#investAuthToken").val(result.authToken);
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };
}

