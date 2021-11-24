using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Models.Auth
{
    public class LoginProviderAuthTokenRequirement {
        public string Provider { get; set; }
        public string UserId { get; set; }
        public string AuthToken { get; set; }
    }
}