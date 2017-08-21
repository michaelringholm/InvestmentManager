using System;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.Services;
using WebAppCore.Models.Account;

namespace WebAppCore.Controllers
{
    //[Authorize]
    public class AccountController : Controller
    {
        /*private static String googleClientId = "869095199020.apps.googleusercontent.com";
        private static String googleClientSecret = "tMaNuHx8SV1j4Ukh5DB9fDR-";
        private static String redirectURI = "http://invest.ihedge.dk/Home/Authorized";
        private static String uniqueToken = "1020312390123";*/

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Logout([FromBody] AuthModel logoutModel)
        {
            AuthService.InvalidateUser(logoutModel);
            return new JsonResult(new { message = "User was logged out!" });
        }


        //https://andrewlock.net/model-binding-json-posts-in-asp-net-core/
        [HttpPost]
        public IActionResult RequestAuthToken([FromBody] LoginModel loginModel)
        {
            if(String.IsNullOrEmpty(loginModel.authProvider) || String.IsNullOrEmpty(loginModel.fbUserId) || String.IsNullOrEmpty(loginModel.fbAccessToken))
                return new JsonResult(new { authToken = "", errorMessage = "Some values were not provided!" });
            else if (AuthService.isAuthProviderTokenValid(loginModel.fbAccessToken))
                return new JsonResult(new { authToken = AuthService.GetAuthToken(loginModel.authProvider, loginModel.fbUserId) });
            else
                return new JsonResult(new { authToken = "", errorMessage = "Validation of Facebook token failed!" });
        }

    }
}
