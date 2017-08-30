using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Models.Account
{
    public class AuthModel
    {
        public String authProvider { get; set; }
        public String fbUserId { get; set; }
        public String investAuthToken { get; set; }
    }
}
