using InMaApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InMaApp.Controllers
{
    public class AssetController : AuthenticationController
    {
        public ActionResult ShowBuySellDialog(String symbol, String buySellCode, bool instantBuySell, String title, String categoryTitle, String quote)
        {
            var dQuote = Convert.ToDouble(quote, System.Globalization.CultureInfo.InvariantCulture);
            return PartialView("BuySellDialog", new AssetBuySellModel { Symbol = symbol, BuySellCode = buySellCode, InstantBuySell = instantBuySell, Title = title, Quote = dQuote, CategoryTitle = categoryTitle });
        }
    }
}
