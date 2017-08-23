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
            dataService.BuyAsset(assetModel.Asset);
            return new JsonResult(new {  });
        }

        [HttpPost]
        public IActionResult Sell([FromBody] AssetModel assetModel)
        {
            dataService.SellAsset(assetModel.Asset);
            return new JsonResult(new {  });
        }
    }
}