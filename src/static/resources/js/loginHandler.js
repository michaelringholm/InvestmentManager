$(function () {
    // http://invest.ihedge.local
    var loginHelper = new LoginHelper();

    //$.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '291424282511914',
          autoLogAppEvents: true, // OLD
          cookie     : true,
          xfbml      : true,
          version    : 'v10.0'
        });
        
        FB.Event.subscribe('auth.login', function (response) { 
            loginHelper.afterFBLogin(); 
        });
        //FB.Event.subscribe('auth.logout', function (response) { loginHelper.afterFBLogout(); });
    

        FB.getLoginStatus(function(response) {
                  
            if (FB) {
                FB.AppEvents.logPageView();
                // check if already logged in and whether an auth token has been provided by InvestmentManager auth service
                //FB.getLoginStatus(function (status) { console.log(status); })
                if (loginHelper.getAuthToken() === "")
                    var a=1;//loginHelper.afterFBLogin();
                else {
                    $("#authenticated").val("true");
                    loginHelper.checkAuthentication();
                }

                FB.Event.subscribe('auth.login', function (response) { loginHelper.afterFBLogin(); });
                FB.Event.subscribe('auth.logout', function (response) { loginHelper.afterFBLogout(); });
            };
        });
    }; 

    /*(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));       */
});

function LoginHelper() {

    var _this = this;

    this.getUserKey = function () {
        return $("#authProviderName").val() + $("#authProviderUserId").val();
    };

    this.getAuthModel = function() {
        var authModel = { authProvider: $("#authProviderName").val(), fbUserId: $("#authProviderUserId").val(), investAuthToken: $("#investAuthToken").val() };
        return authModel;
    };

    this.checkAuthentication = function () {
        if ($("#authenticated").val() === "false")
            $(".authorized").hide();
        else
            $(".authorized").show();
    };

    this.getAuthToken = function() {
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

                _this.requestAuthToken("FB", uid, accessToken); // Exchange the IdP specific token for a app specific token
            } else if (response.status === 'not_authorized') {
                console.log("FB login succeeded, but was not authorized by user!");
                // the user is logged in to Facebook, but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
                console.error("FB login failed!");
                console.error(response);
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

                //windows.location.href("/");
                home.show();
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };

    this.requestAuthToken = function (authProvider, userId, accessToken) {
        var loginModel = { authProvider: authProvider, fbUserId: userId, fbAccessToken: accessToken };

        $("#investAuthToken").val(accessToken); // HACK

        /*$.ajax({
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
        });*/
    };
}

