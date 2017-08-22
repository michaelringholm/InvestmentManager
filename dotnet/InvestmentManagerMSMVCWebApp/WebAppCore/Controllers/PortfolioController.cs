using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebAppCore.Services;
using WebAppCore.Models.Account;
using WebAppCore.Models.Portfolio;

namespace InMaApp.Controllers
{
    [Authorize(Policy = "InvestAuthTokenPolicy")]
    public class PortfolioController : Controller
    {
        private readonly IDataService dataService;
        public PortfolioController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public IActionResult ShowHeaders()
        {
            var authModel = AuthService.GetLoginInfo(HttpContext.Request.Query);
            ViewData["InvestAuthToken"] = authModel.investAuthToken;
            ViewData["AuthProviderUserId"] = authModel.fbUserId;
            ViewData["AuthProviderName"] = authModel.authProvider;

            return View("index");
        }

        public IActionResult ShowDetails(String portfolioId)
        {
            var authModel = AuthService.GetLoginInfo(HttpContext.Request.Query);
            ViewData["InvestAuthToken"] = authModel.investAuthToken;
            ViewData["AuthProviderUserId"] = authModel.fbUserId;
            ViewData["AuthProviderName"] = authModel.authProvider;
            ViewData["PortfolioId"] = portfolioId;

            return View("details");
        }

        [HttpPost]
        public IActionResult GetPortfolioHeaders(AuthModel authModel)
        {
            var portfolioHeaders = dataService.GetPortfolioHeaders();
            return new JsonResult(new { portfolioHeaders = portfolioHeaders });
        }

        [HttpPost]
        public IActionResult GetDetails([FromBody] PortfolioDetailsModel portfolioDetailsModel)
        {
            var portfolioHeaders = dataService.GetPortfolioHeaders();
            return new JsonResult(new { portfolioHeaders = portfolioHeaders, portfolioId = portfolioDetailsModel.PortfolioId });
        }















        [HttpPost]
        public JsonResult UpdatePortfolioHeader(string login, int portfolioId)
        {
            /*var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var portfolioHeader = ws.getPortfolioHeader(login, portfolioId);*/


            //return Json(new { PortfolioId = portfolioHeader.id, PortfolioTitle = portfolioHeader.title, MarketValue = DisplayHelper.FormatMoney(portfolioHeader.marketValue), Cash = DisplayHelper.FormatMoney(portfolioHeader.cash), Rank = portfolioHeader.rank });
            return Json(new { message = "data missing" });
        }


        [HttpPost]
        public JsonResult CreatePortfolio(string login, string title, string startCash)
        {
            /*var dStartCash = Double.Parse(startCash, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.createPortfolio(login, title, dStartCash);*/

            return Json(new { Success = true });
        }
        

        [HttpPost]
        public JsonResult BuySecurity(string login, int portfolioId, String symbol, String quote, int quantity, String status)
        {
            /*var statusCode = (statusEnum)Enum.Parse(typeof(statusEnum), status);
            var dQuote = Double.Parse(quote, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.buySecurity(login, new security { position = quantity, symbol = symbol, quote = dQuote, portfolioId = portfolioId, status = statusCode, statusSpecified = true });*/

            return Json(new { Success = true });
        }

        [HttpPost]
        public JsonResult SellSecurity(string login, int portfolioId, String symbol, String quote, int quantity, String status)
        {
            /*var statusCode = (statusEnum)Enum.Parse(typeof(statusEnum), status);
            var dQuote = Double.Parse(quote, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.sellSecurity(login, new security { position = quantity, symbol = symbol, quote = dQuote, portfolioId = portfolioId, status = statusCode, statusSpecified = true });*/

            return Json(new { Success = true });
        }
    }
}
