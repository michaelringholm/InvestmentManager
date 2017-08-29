using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAppCore.Services;
using WebAppCore.Models.Asset;
using Microsoft.AspNetCore.Authorization;

namespace WebAppCore.Controllers
{
    [Authorize(Policy = "InvestAuthTokenPolicy")]
    public class AssetController : Controller
    {
        private readonly IDataService dataService;
        private readonly IPriceService priceService;
        public AssetController(IDataService dataService, IPriceService priceService)
        {
            this.dataService = dataService;
            this.priceService = priceService;
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

        [HttpPost]
        public IActionResult LatestQuote([FromBody] QuoteModel model)
        {
            var quote = priceService.GetLiveQuote(model.Isin);
            return new JsonResult(new { isin=model.Isin, quote=quote});
        }
    }
}