<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="loginDiv" style="margin-left: 44px; margin-top: 14px; cursor: pointer;">
    <div style="margin-bottom: 40px; color: #ffffff;">
        To start using Investment Manager you must log on using one of the methods below. For your convenience you can use your existing Facebook, Twitter or Google+ account. Choose your preferred authentication method by clicking one of the authentication providers below.
        <br /><br />
        If this is the first time you log on to Investment Manager you will be asked to allow Investment Manager to access some of the basic information in your preferred account. This is information like your full name and your friends list. We require these information only to improve your gaming experience while using Investment Manager.
        <br /><br />
        Once the log in process is complete you will automatically be redirected to the Investment Manager start screen, and you can start playing.
    </div>
    <div style="float: left;">
        <a href="/Home/Authorize?loginType=Facebook">
            <img alt="" title="Login with your Facebook account" src="/Content/images/auth/facebook-icon72.png" /></a>
    </div>
    <div style="float: left; margin-left: 60px;">
        <a href="/Home/Authorize?loginType=Twitter">
            <img alt="" title="Login with your Twitter account" src="/Content/images/auth/twitter-icon72.png" /></a>
    </div>
    <div style="float: left; margin-left: 60px;">
        <a href="/Home/Authorize?loginType=google">
            <img alt="" title="Login with your google+ account" src="/Content/images/auth/google-plus-icon72.png" />
        </a>
    </div>    
    <div style="clear: both;"></div>
    
    <!--<div>        
        <img id="altFBLogin" src="/Content/images/auth/851579_604690072906757_1648100996_n.png" />
    </div>

    <div id="fb-root"></div>
    <fb:login-button show-faces="true" width="200" max-rows="1"></fb:login-button>-->

</div>
