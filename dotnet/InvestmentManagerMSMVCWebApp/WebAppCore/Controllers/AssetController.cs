using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.Services;
using WebAppCore.Models.Asset;

namespace WebAppCore.Controllers
{
    public class AssetController : Controller
    {
        private readonly IDataService dataService;
        public AssetController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpPost]
        public IActionResult Buy([FromBody] AssetModel assetModel)
        {
            var userKey = AuthService.GetUserKeyByToken(assetModel.AuthToken);
            dataService.BuyAsset(userKey, assetModel.PortfolioId, assetModel.Quantity, assetModel.Asset);
            return new JsonResult(new { authToken = assetModel.AuthToken, portfolioId = assetModel.PortfolioId, symbol= assetModel.Asset.Symbol, userKey=userKey });
        }

        [HttpPost]
        public IActionResult Sell([FromBody] AssetModel assetModel)
        {
            var userKey = AuthService.GetUserKeyByToken(assetModel.AuthToken);
            dataService.SellAsset(userKey, assetModel.PortfolioId, assetModel.Quantity, assetModel.Asset);
            return new JsonResult(new {  });
        }
    }
}