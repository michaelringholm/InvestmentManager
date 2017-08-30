using InMaApp.Controllers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InMaApp
{
    public class ContextManager
    {
        //internal enum ReturnTypeEnum { PartialView, JSON };

        private ContextManager()
        {
            var godModeObj = ConfigurationManager.AppSettings["GodMode"];
            if (godModeObj != null && ((Convert.ToBoolean(godModeObj) == true)))
            {
                LoginId = "100001477828296";
                UserName = "iHedge A/S";
                IsAuthenticated = true;                
                //LoginType = "Facebook";
            }
            else
                IsAuthenticated = false;
        }

        public static ContextManager Current
        {
            get
            {
                var currentObj = HttpContext.Current.Session["ContextManager"];
                ContextManager current = null;

                if (currentObj == null)
                {
                    current = new ContextManager();
                    HttpContext.Current.Session["ContextManager"] = current;
                }
                else
                    current = (ContextManager)currentObj;

                return current;
            }
        }

        public string OAuthAccessToken { get; set; }
        public string UserName { get; set; }
        public bool IsAuthenticated { get; set; }
        public string LoginType { get; set; }
        public string LoginId { get; set; }

        internal static T HandleAuthentication<T>(bool isPopup)
        {
            if(typeof(T) == typeof(PartialViewResult) && !isPopup)
                return (T) (Object)new HomeController().ShowWelcomeControl();
            else
                return (T) (Object)null;
        }

        
    }
}