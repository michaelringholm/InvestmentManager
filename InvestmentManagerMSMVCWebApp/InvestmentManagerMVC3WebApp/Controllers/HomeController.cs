using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InMaApp.Models;
using System.Net;
using System.Web.Script.Serialization;
using System.Collections.Specialized;
using System.Text;
using System.IO;

namespace InMaApp.Controllers
{
    /*
     *  InvestmentManager
        App ID: 	432126790209278
        App Secret: 	a70ec9940e2ff59e18ec51a87dc69d12
     * */    

    [HandleError]
    public class HomeController : Controller
    {
        private static String fbAppID = "432126790209278";
        private static String fbAppSecret = "a70ec9940e2ff59e18ec51a87dc69d12";
        private static String googleClientId = "869095199020.apps.googleusercontent.com";
        private static String googleClientSecret = "tMaNuHx8SV1j4Ukh5DB9fDR-";
        private static String redirectURI = "http://invest.ihedge.dk/Home/Authorized";
        //private static String redirectURI = "http://localhost:50090/Home/Authorized";        
        private static String uniqueToken = "1020312390123";

        public ActionResult Index()
        {
            //new InMaApp.InMaJavaWS.login(ContextManager.Current.LoginId);

            //var data = new WebClient().DownloadString("https://graph.facebook.com/oauth/access_token?client_id=432126790209278&redirect_uri=http%3a%2f%2finvest.ihedge.dk%2fHome%2fAuthorized&client_secret=a70ec9940e2ff59e18ec51a87dc69d12&code=AQDcs9_6vhOOn_r8fgifMj95AhjWHiNztVZtJJjJdIlJhPfrbb04nmSkxXRwpsywM7NFi_ox7T7KDoNqtFyQ8Yr078MZ-k4Qu-NIeetangDA41E1GYkwOpQJRJPT61JGfy1-8_vznogbYgDcAuFFR970-WNERb55J3-G5HBKTVFI1rZlgFCRF1s4UbMJZxalQ-8nOLG9ebf8-czyess6B6uK");
            //var data = "\naccess_token=AAAGJBFvUDv4BAPr4qDnuHINAWGgydRJBPqBz7cpGY1akhindrTttoTYrS6bjQU4fCnOAyZAJPVRWL3B9OAEEla3w9vT4PZAy6QaVtQcgZDZD&expires=5177146";
            //var token = HttpUtility.ParseQueryString(data.Trim()).Get("access_token");

            return View("Index");
        }

        public ActionResult Debug(String debug)
        {
            //new InMaApp.InMaJavaWS.login(ContextManager.Current.LoginId);

            //var data = new WebClient().DownloadString("https://graph.facebook.com/oauth/access_token?client_id=432126790209278&redirect_uri=http%3a%2f%2finvest.ihedge.dk%2fHome%2fAuthorized&client_secret=a70ec9940e2ff59e18ec51a87dc69d12&code=AQDcs9_6vhOOn_r8fgifMj95AhjWHiNztVZtJJjJdIlJhPfrbb04nmSkxXRwpsywM7NFi_ox7T7KDoNqtFyQ8Yr078MZ-k4Qu-NIeetangDA41E1GYkwOpQJRJPT61JGfy1-8_vznogbYgDcAuFFR970-WNERb55J3-G5HBKTVFI1rZlgFCRF1s4UbMJZxalQ-8nOLG9ebf8-czyess6B6uK");
            //var data = "\naccess_token=AAAGJBFvUDv4BAPr4qDnuHINAWGgydRJBPqBz7cpGY1akhindrTttoTYrS6bjQU4fCnOAyZAJPVRWL3B9OAEEla3w9vT4PZAy6QaVtQcgZDZD&expires=5177146";
            //var token = HttpUtility.ParseQueryString(data.Trim()).Get("access_token");
            Session["Debug"] = debug;

            /*var reqparm = new NameValueCollection();
            reqparm.Add("code", "4/hYiHMOP57ctikJo4VLMMmMs8PPsc.or1L1m38ImgYOl05ti8ZT3YrQNBdhQI");
            reqparm.Add("client_id", "869095199020.apps.googleusercontent.com");
            reqparm.Add("client_secret", "tMaNuHx8SV1j4Ukh5DB9fDR-");
            reqparm.Add("redirect_uri", Server.UrlEncode(redirectURI));
            reqparm.Add("grant_type", "authorization_code");
            var webClient = new WebClient();
            var responsebytes = webClient.UploadValues("https://accounts.google.com/o/oauth2/token", "POST", reqparm);
            //var data = webClient.DownloadString();
            var data = (new UTF8Encoding()).GetString(responsebytes);

            var accessToken = HttpUtility.ParseQueryString(data.Trim()).Get("access_token");*/

            byte[] buffer = Encoding.ASCII.GetBytes("code=" + "4/hYiHMOP57ctikJo4VLMMmMs8PPsc.or1L1m38ImgYOl05ti8ZT3YrQNBdhQI" + "&client_id=869095199020.apps.googleusercontent.com&client_secret=tMaNuHx8SV1j4Ukh5DB9fDR-&redirect_uri=" +redirectURI + "&grant_type=authorization_code");
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://accounts.google.com/o/oauth2/token");
            req.Method = "POST";
            req.ContentType = "application/x-www-form-urlencoded";
            req.ContentLength = buffer.Length;

            Stream strm = req.GetRequestStream();
            strm.Write(buffer, 0, buffer.Length);
            strm.Close();

            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            Stream responseStream = resp.GetResponseStream();
            StreamReader responseStreamReader = new StreamReader(responseStream);
            var result = responseStreamReader.ReadToEnd();//parse token from result



            return View("Debug");
        }

        public ActionResult Login()
        {            
            return View("Login");
        }


        /*
         *
         if (window.location.hash == '#_=_') {
            window.location.hash = ''; // for older browsers, leaves a # behind
            history.pushState('', document.title, window.location.pathname); // nice and clean
            e.preventDefault(); // no page reload
        }       
         */
        public void Authorize(String loginType)
        {        
            ContextManager.Current.LoginType = loginType;
            if (loginType.ToLower() == "facebook")
            {
                if (Request["Code"] == null)
                {
                    Response.Redirect("https://www.facebook.com/dialog/oauth?client_id=" + fbAppID + "&redirect_uri=" + redirectURI + "&state=" + uniqueToken);
                }
                else
                {
                    Response.Redirect("/Home/Authorized?Code=" + Request["Code"]);
                }
            }
            else if (loginType.ToLower() == "google")
            {
                if (Request["code"] == null)
                {
                    //Response.Redirect("https://www.facebook.com/dialog/oauth?client_id=" + fbAppID + "&redirect_uri=" + redirectURI + "&state=" + uniqueToken);
                    Response.Redirect("https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=http://invest.ihedge.dk/Authorize?loginType=google&scope=https://www.googleapis.com/auth/userinfo.profile&client_id=869095199020.apps.googleusercontent.com");
                }
                else
                {
                    Response.Redirect("/Home/Authorized?Code=" + Request["code"]);
                }
                //Response.Write("Using google+ auth");
            }
            else
                Response.Write("Unsupported Authenticator [" + loginType + "]");
        }

        public void Authorized()
        {
            String debug = "Step1";
            if (ContextManager.Current.LoginType.ToLower() == "facebook")
            {
                if (ContextManager.Current.OAuthAccessToken == null)
                {
                    var fbAcessTokenURI = "https://graph.facebook.com/oauth/access_token?" + "client_id=" + fbAppID + "&redirect_uri=" + Server.UrlEncode(redirectURI)
                    + "&client_secret=" + fbAppSecret + "&code=" + Request["Code"];
                    var data = new WebClient().DownloadString(fbAcessTokenURI);
                    var accessToken = HttpUtility.ParseQueryString(data.Trim()).Get("access_token");
                    
                    if (!String.IsNullOrEmpty(accessToken))
                    {
                        ContextManager.Current.OAuthAccessToken = accessToken;

                        var fbBasicInfoURI = "https://graph.facebook.com/me?access_token=" + accessToken;
                        data = new WebClient().DownloadString(fbBasicInfoURI);
                        var fbBasicInfo = new JavaScriptSerializer().Deserialize<FBBasicInfo>(data.Trim());
                        ContextManager.Current.UserName = fbBasicInfo.name;
                        ContextManager.Current.IsAuthenticated = true;
                        ContextManager.Current.LoginId = fbBasicInfo.id;
                        new InMaApp.InMaJavaWS.login(fbBasicInfo.id.ToString(), "Facebook", fbBasicInfo.username, fbBasicInfo.name, fbBasicInfo.gender, fbBasicInfo.id);
                    }
                    else
                        ContextManager.Current.IsAuthenticated = false;
                }
            }
            else if (ContextManager.Current.LoginType.ToLower() == "google")
            {
                if (ContextManager.Current.OAuthAccessToken == null)
                {
                    byte[] buffer = Encoding.ASCII.GetBytes("code=" + Request["Code"] + "&client_id=869095199020.apps.googleusercontent.com&client_secret=tMaNuHx8SV1j4Ukh5DB9fDR-&redirect_uri=" + redirectURI + "&grant_type=authorization_code");
                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://accounts.google.com/o/oauth2/token");
                    req.Method = "POST";
                    req.ContentType = "application/x-www-form-urlencoded";
                    req.ContentLength = buffer.Length;

                    Stream strm = req.GetRequestStream();
                    strm.Write(buffer, 0, buffer.Length);
                    strm.Close();

                    HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
                    Stream responseStream = resp.GetResponseStream();
                    StreamReader responseStreamReader = new StreamReader(responseStream);
                    var data = responseStreamReader.ReadToEnd();//parse token from result
                    //var data = webClient.DownloadString();

                    var accessToken = HttpUtility.ParseQueryString(data.Trim()).Get("access_token");

                    if (!String.IsNullOrEmpty(accessToken))
                    {
                        ContextManager.Current.OAuthAccessToken = accessToken;

                        var fbBasicInfoURI = "https://graph.facebook.com/me?access_token=" + accessToken;
                        data = new WebClient().DownloadString(fbBasicInfoURI);
                        var fbBasicInfo = new JavaScriptSerializer().Deserialize<FBBasicInfo>(data.Trim());
                        ContextManager.Current.UserName = fbBasicInfo.name;
                        ContextManager.Current.IsAuthenticated = true;
                        ContextManager.Current.LoginId = fbBasicInfo.id;
                        new InMaApp.InMaJavaWS.login(fbBasicInfo.id.ToString(), "Facebook", fbBasicInfo.username, fbBasicInfo.name, fbBasicInfo.gender, fbBasicInfo.id);
                    }
                    else
                        ContextManager.Current.IsAuthenticated = false;
                    //Response.Write("You were authorized by google+");
                }
            }

            if (ContextManager.Current.IsAuthenticated)
                Response.Redirect("/Portfolio/Index/");
            else
                Response.Redirect("/Home/Debug/" + debug);            
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult ShowWelcomeControl()
        {
            return PartialView("WelcomeControl");
        }

        public ActionResult ShowLoginControl()
        {
            return PartialView("LoginControl");
        }

        public ActionResult Error()
        {
            return View("Error");
        }
    }
}
