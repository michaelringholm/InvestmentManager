using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InMaApp.Controllers
{
    public class DisplayController : Controller
    {
        [HttpPost]
        public JsonResult FormatMoney(double money)
        {            
            return Json(new { Money = DisplayHelper.FormatMoney(money) }, JsonRequestBehavior.AllowGet);
        }
    }
}
