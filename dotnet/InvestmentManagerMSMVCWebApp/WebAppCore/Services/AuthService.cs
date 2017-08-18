using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Services
{
    public class AuthService
    {
        // Create Token object with token string + generatedTime
        public static Dictionary<String,String> authTokenDic = new Dictionary<String,String>();

        public static String GetAuthToken(String authProvider, String providerSpecificUserId)
        {
            var key = BuildKey(authProvider, providerSpecificUserId);
            if (!authTokenDic.ContainsKey(key))
              authTokenDic.Add(key, new Guid(key).ToString());

            return authTokenDic.GetValueOrDefault(key);
        }

        public static bool CheckAuthToken(String authProvider, String providerSpecificUserId)
        {
            var key = BuildKey(authProvider, providerSpecificUserId);
            return authTokenDic.ContainsKey(key);
        }

        private static String BuildKey(string authProvider, string providerSpecificUserId)
        {
            return authProvider + providerSpecificUserId;
        }
    }
}
