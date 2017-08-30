using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using WebAppCore.Auth;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Http;
using WebAppCore.Models.Account;

namespace WebAppCore.Services
{
    public class AuthService
    {
        // Create Token object with token string + generatedTime
        public static Dictionary<String,String> authTokenDic = new Dictionary<String,String>();
        public static Dictionary<String, String> userDic = new Dictionary<String, String>();

        public static String GetUserKeyByToken(String authToken)
        {
            // Reverse lookup
            var userKey = userDic[authToken];
            return userKey;
        }

        public static String GetAuthToken(String authProvider, String providerSpecificUserId)
        {
            var key = BuildKey(authProvider, providerSpecificUserId);
            if (!authTokenDic.ContainsKey(key))
            {
                var authToken = Guid.NewGuid().ToString();
                authTokenDic.Add(key, authToken);
                userDic.Add(authToken, key);
            }
            return authTokenDic.GetValueOrDefault(key);
        }

        internal static void InvalidateUser(AuthModel logoutModel)
        {
            var key = BuildKey(logoutModel.authProvider, logoutModel.fbUserId);
            var authToken = authTokenDic[key];
            userDic.Remove(authToken);
            authTokenDic.Remove(key);
        }

        public static bool CheckAuthToken(LoginProviderAuthTokenRequirement loginProviderAuthTokenRequirement)
        {
            var key = BuildKey(loginProviderAuthTokenRequirement.Provider, loginProviderAuthTokenRequirement.UserId);
            if (!authTokenDic.ContainsKey(key))
                return false;
            else
                return authTokenDic[key] == loginProviderAuthTokenRequirement.AuthToken;
        }

        internal static AuthModel GetLoginInfo(IHeaderDictionary headers)
        {
            var loginInfo = new AuthModel();
            loginInfo.investAuthToken = headers["X-Auth-Token"];
            loginInfo.authProvider = headers["X-Auth-Provider"];
            loginInfo.fbUserId = headers["X-Auth-UserId"];
            return loginInfo;
        }

        internal static AuthModel GetLoginInfo(IQueryCollection q)
        {
            var loginInfo = new AuthModel();
            loginInfo.investAuthToken = q["authToken"];
            loginInfo.authProvider = q["authProviderName"];
            loginInfo.fbUserId = q["authProviderUserId"];
            return loginInfo;
        }

        private static String BuildKey(string authProvider, string providerSpecificUserId)
        {
            return authProvider + providerSpecificUserId;
        }

        /*** graph.facebook.com/debug_token?input_token={token-to-inspect}&access_token={app-token-or-admin-token}
        * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#checktoken
        */
        public static bool isAuthProviderTokenValid(String fbAccessToken)
        {
            //https://developers.facebook.com/docs/facebook-login/access-tokens#apptokens
            //https://developers.facebook.com/docs/facebook-login/access-tokens/debugging-and-error-handling

            var adminAccessToken = getFBAdminAccessToken();
            var client = new WebClient();
            var url = "https://graph.facebook.com/debug_token?input_token={0}&access_token={1}";
            String jsonReply = client.DownloadString(String.Format(url, fbAccessToken, adminAccessToken));
            JToken token = JObject.Parse(jsonReply);
            Boolean isValid = token["data"].Value<Boolean>("is_valid");
            return isValid;
        }

        /** Dont forget to whitelist server in FB app **/
        private static String fbAppID = "432126790209278";
        private static String fbAppSecret = "a70ec9940e2ff59e18ec51a87dc69d12";

        private static String getFBAdminAccessToken()
        {
            // GET https://graph.facebook.com/oauth/access_token?client_id={app-id}&client_secret={app-secret}&grant_type=client_credentials
            var url = "https://graph.facebook.com/oauth/access_token?client_id={0}&client_secret={1}&grant_type=client_credentials";
            var client = new WebClient();

            String jsonReply = client.DownloadString(String.Format(url, fbAppID, fbAppSecret));
            JToken token = JObject.Parse(jsonReply);
            String adminAccessToken = token.Value<String>("access_token");
            return adminAccessToken;
        }
    }
}
