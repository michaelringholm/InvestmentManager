using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace WebAppCore.Context
{
    public class ContextManager
    {
        //internal enum ReturnTypeEnum { PartialView, JSON };
        public static ContextManager Current = new ContextManager();

        private ContextManager()
        {
            var godModeObj = true;
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

        public string OAuthAccessToken { get; set; }
        public string UserName { get; set; }
        public bool IsAuthenticated { get; set; }
        public string LoginType { get; set; }
        public string LoginId { get; set; }

        
    }
}