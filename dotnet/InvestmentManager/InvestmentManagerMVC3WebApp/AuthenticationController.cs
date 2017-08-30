using InMaApp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InMaApp
{
    public class AuthenticationController : Controller
    {
        protected PartialViewResult PartialView(bool isPopup, string viewName, object model)
        {
            if (ContextManager.Current.IsAuthenticated)
                return base.PartialView(viewName, model);
            else
            {
                if (!isPopup)
                    return (PartialViewResult)new HomeController().ShowWelcomeControl();
                else
                    throw new NotImplementedException();
            }
        }

        protected override PartialViewResult PartialView(string viewName, object model)
        {
            if (ContextManager.Current.IsAuthenticated)
                return base.PartialView(viewName, model);
            else
                return (PartialViewResult)new HomeController().ShowWelcomeControl();
        }
    }
}