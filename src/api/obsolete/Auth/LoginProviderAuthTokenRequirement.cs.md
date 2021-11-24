using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Auth
{
    public class LoginProviderAuthTokenRequirement : IAuthorizationRequirement
    {
        public String Provider { get; set; }
        public String UserId { get; set; }
        public String AuthToken { get; set; }
    }
}
