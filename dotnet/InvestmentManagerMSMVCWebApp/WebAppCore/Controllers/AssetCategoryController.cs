using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.Services;
using WebAppCore.Models.AssetCategory;

namespace WebAppCore.Controllers
{
    public class AssetCategoryController : Controller
    {
        private readonly IDataService dataService;
        public AssetCategoryController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public IActionResult ShowAssets(String portfolioId, String assetCategoryTitle)
        {
            var authModel = AuthService.GetLoginInfo(HttpContext.Request.Query);
            ViewData["InvestAuthToken"] = authModel.investAuthToken;
            ViewData["AuthProviderUserId"] = authModel.fbUserId;
            ViewData["AuthProviderName"] = authModel.authProvider;
            ViewData["PortfolioId"] = portfolioId;
            ViewData["AssetCategoryTitle"] = assetCategoryTitle;

            return View("assets");
        }

        [HttpPost]
        public IActionResult GetAssets([FromBody] AssetCategoryModel assetCategoryModel)
        {
            var assets = dataService.GetAssets(assetCategoryModel.AssetCategoryTitle);
            return new JsonResult(new { assets = assets });
        }
    }
}