<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="welcomeDiv" style="margin-left: 44px; margin-top: 44px; cursor: pointer; color: #ffffff;">        
    <div style="float: left; width: 500px; margin-top: 12px; text-align: justify;">
        Welcome to InvestmentManager. Learn how to invest in stocks and compete with your
                friends to see who is the best investor.                
        <br /><br />To start using Investment Manager you must log on using one of the methods below. For your convenience you can use your existing Facebook, Twitter or Google+ account. Choose your preferred authentication method by clicking one of the authentication providers below.        
    </div>
    <div style="float: left; margin-left: 40px; margin-top: 0px;">
        <img alt="" src="/Content/images/welcome-image-small.png" />
    </div>
    <div style="clear: both;">
    </div>    
</div>
<div id="loginDiv" style="margin-left: 44px; margin-top: 4px; cursor: pointer; color: #ffffff;">
    <div style="margin-bottom: 20px;">
        
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
    <div style="width: 500px; text-align: justify;">
        Once the log in process is complete you will automatically be redirected to the Investment Manager start screen, and you can start playing.
    </div>
    <div style="font-size: 9pt; margin-top: 28px; width: 500px; text-align: justify;">
    If this is the first time you are logging on to InvestmentManager you will be asked to allow InvestmentManager to access some of the basic information in your preferred account. This is information like your full name and your friends list. We require these information only to improve your gaming experience while using InvestmentManager. Have fun!
    </div>
</div>
    <!--<div>        
        <img id="altFBLogin" src="/Content/images/auth/851579_604690072906757_1648100996_n.png" />
    </div>

    <div id="fb-root"></div>
    <fb:login-button show-faces="true" width="200" max-rows="1"></fb:login-button>-->
