using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebAppCore.Services;
using WebAppCore.Models.Account;
using WebAppCore.Models.Portfolio;
using System.Linq;
using System.Globalization;
using System.Collections.Generic;
using WebAppCore.Data.Entities;

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
        public IActionResult GetPortfolios([FromBody] PortfolioModel model)
        {
            var portfolios = dataService.GetPortfolios(model.UserKey);            
            return new JsonResult(new { portfolios = portfolios });
        }        

        [HttpPost]
        public IActionResult GetDetails([FromBody] PortfolioDetailsModel portfolioDetailsModel)
        {
            var portfolio = dataService.GetPortfolio(portfolioDetailsModel.UserKey, portfolioDetailsModel.PortfolioId);
            var assets = new List<Asset>();
            foreach (var trade in portfolio.Trades) 
                trade.MetaData = dataService.GetAsset(trade.AssetIsin);

            var culture = CultureInfo.GetCultureInfo("en-US");
            var totalPurchaseAmount = portfolio.Trades.Sum(t => ( (Convert.ToDecimal(t.PurchaseQuote, culture)) * (Convert.ToDecimal(t.Quantity, culture)) ) );
            var portfolioMarketValue = portfolio.Trades.Sum(t => ((Convert.ToDecimal(((Asset)t.MetaData).Quote, culture)) * (Convert.ToDecimal(t.Quantity, culture))));
            var summedTrades = portfolio.Trades.GroupBy(t => t.AssetIsin)
                .Select(tr => new SummedTrade {
                    PurchaseQuote = tr.Average(t3 => Convert.ToDecimal(t3.PurchaseQuote, culture)).ToString(culture),
                    AssetIsin = tr.First().AssetIsin,
                    AssetSymbol = tr.First().AssetSymbol,
                    MetaData = tr.First().MetaData,
                    PortfolioId = tr.First().PortfolioId,
                    PurchaseDate = tr.Last().PurchaseDate,
                    Quantity = Convert.ToInt16(tr.Sum(t4 => t4.Quantity)),
                    Status = tr.First().Status,
                    PurchaseAmount = tr.Sum(t5 => Convert.ToDecimal(t5.PurchaseQuote, culture) * t5.Quantity).ToString(culture)
                }).ToList();

            portfolio.MetaData = new { totalPurchaseAmount=totalPurchaseAmount, portfolioMarketValue=portfolioMarketValue, summedTrades=summedTrades };
            return new JsonResult(new { portfolio = portfolio });
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
