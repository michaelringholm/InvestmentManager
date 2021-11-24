using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Models.Account
{
    public class LoginModel
    {
        public String authProvider { get; set; }
        public String fbUserId { get; set; }
        public String fbAccessToken { get; set; }
    }
}
