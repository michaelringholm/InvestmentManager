//using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DroidInvest.Models.Account;
//using DroidInvest.Services;

namespace DroidInvest.Auth
{
    public class InvestmentManagerAuthorizationHandler : AuthorizationHandler<LoginProviderAuthTokenRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, LoginProviderAuthTokenRequirement loginProviderAuthTokenRequirement)
        {
            var method = ((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)((Microsoft.AspNetCore.Http.DefaultHttpContext)((Microsoft.AspNetCore.Mvc.ActionContext)context.Resource).HttpContext).Request).Method;
            AuthModel authModel;
            if (method.ToUpper() == "GET")
            {
                var q = ((Microsoft.AspNetCore.Http.Internal.QueryCollection)((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)((Microsoft.AspNetCore.Http.DefaultHttpContext)((Microsoft.AspNetCore.Mvc.ActionContext)context.Resource).HttpContext).Request).Query);
                authModel = AuthService.GetLoginInfo(q);
            }
            else if (method.ToUpper() == "POST") {
                var headers = ((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)((Microsoft.AspNetCore.Http.DefaultHttpContext)((Microsoft.AspNetCore.Mvc.ActionContext)context.Resource).HttpContext).Request).Headers;
                authModel = AuthService.GetLoginInfo(headers);
            }
            else {
                //"Unsupported METHOD [" + method.ToUpper() + "]"
                context.Fail();
                return Task.CompletedTask;
            }

            loginProviderAuthTokenRequirement.AuthToken = authModel.investAuthToken;
            loginProviderAuthTokenRequirement.Provider = authModel.authProvider;
            loginProviderAuthTokenRequirement.UserId = authModel.fbUserId;

            if (loginProviderAuthTokenRequirement == null || loginProviderAuthTokenRequirement.AuthToken == null)
            {
                context.Fail();
                return Task.CompletedTask;
            }

            if (AuthService.CheckAuthToken(loginProviderAuthTokenRequirement))
                context.Succeed(loginProviderAuthTokenRequirement);
            else
                context.Fail();

            return Task.CompletedTask;
        }
    }
}
