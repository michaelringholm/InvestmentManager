using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.Services;
using WebAppCore.Models.StockMarket;
using Microsoft.AspNetCore.Authorization;

namespace WebAppCore.Controllers
{
    [Authorize(Policy = "InvestAuthTokenPolicy")]
    public class StockMarketController : Controller
    {
        private readonly IDataService dataService;
        public StockMarketController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public IActionResult ShowMarket(String portfolioId)
        {
            var authModel = AuthService.GetLoginInfo(HttpContext.Request.Query);
            ViewData["InvestAuthToken"] = authModel.investAuthToken;
            ViewData["AuthProviderUserId"] = authModel.fbUserId;
            ViewData["AuthProviderName"] = authModel.authProvider;
            ViewData["PortfolioId"] = portfolioId;

            return View("market");
        }

        [HttpPost]
        public IActionResult GetAssetCategories([FromBody] StockMarketModel stockMarketModel)
        {
            var assetCategories = dataService.GetAssetCategories();
            return new JsonResult(new { assetCategories = assetCategories });
        }
    }
}