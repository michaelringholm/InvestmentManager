using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InMaApp.Models;

namespace InMaApp.Controllers
{
    public class ToDoController : AuthenticationController
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult ShowToDo(int portfolioId)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var securities = ws.getUnconfirmedSecurities(ContextManager.Current.LoginId, portfolioId);
            if (securities == null)
                securities = new List<InMaApp.InMaJavaWS.security>().ToArray();

            return PartialView("ToDoListControl", new ToDoListModel { Securities = securities.ToList() });
        }

        [HttpPost]
        public JsonResult ExecuteTrades(String login, int portfolioId)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var portfolioHeader = ws.confirmSecurities(login, portfolioId);

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}
