using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppCore.Services;

namespace WebAppCore.Auth
{
    public class InvestmentManagerAuthorizationHandler : AuthorizationHandler<LoginProviderAuthTokenRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, LoginProviderAuthTokenRequirement loginProviderAuthTokenRequirement)
        {
            var q = ((Microsoft.AspNetCore.Http.Internal.QueryCollection)((Microsoft.AspNetCore.Http.Internal.DefaultHttpRequest)((Microsoft.AspNetCore.Http.DefaultHttpContext)((Microsoft.AspNetCore.Mvc.ActionContext)context.Resource).HttpContext).Request).Query);
            var loginInfo = AuthService.GetLoginInfo(q);            

            loginProviderAuthTokenRequirement.AuthToken = loginInfo.AuthToken;
            loginProviderAuthTokenRequirement.Provider = loginInfo.Provider;
            loginProviderAuthTokenRequirement.UserId = loginInfo.UserId;

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
