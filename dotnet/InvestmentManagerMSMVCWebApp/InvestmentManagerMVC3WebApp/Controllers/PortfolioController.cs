using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InMaApp.Models;
using InMaApp.InMaJavaWS;
using System.Globalization;

namespace InMaApp.Controllers
{
    public class PortfolioController : AuthenticationController
    {
        public PortfolioController()
        {
            
        }

        public ActionResult Index()
        {
            try
            {
                var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
                ws.login(ContextManager.Current.LoginId, null, null, null, null, null);
                var portfolio = ws.getPortfolios(ContextManager.Current.LoginId).First();

                return View("Portfolio", new PortfolioModel { Portfolio = portfolio });
            }
            catch(System.Exception ex)
            {
                Response.Write("Login WebService or underlying database not running!");
                Response.Write(ex.Message);
                Response.Write(ex.StackTrace);

                return View("Portfolio", new PortfolioModel());
                //throw ex;
            }
        }

        public ActionResult ShowPortfolioList()
        {
            if(!ContextManager.Current.IsAuthenticated)
                return ContextManager.HandleAuthentication<PartialViewResult>(false);            

            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var portfolios = ws.getPortfolios(ContextManager.Current.LoginId);
            foreach (var portfolio in portfolios)
            {
                if(portfolio.securitiesSummed == null)
                    portfolio.securitiesSummed = new List<security>().ToArray();
            }

            return PartialView("PortfolioListControl", new PortfolioListModel { Portfolios = portfolios.ToList() });
        }

        public ActionResult ShowPortfolioSecurityList(int portfolioId)
        {
            if (!ContextManager.Current.IsAuthenticated)
                return ContextManager.HandleAuthentication<PartialViewResult>(false);    

            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var portfolio = ws.getPortfolio(ContextManager.Current.LoginId, portfolioId);
            if (portfolio.securitiesSummed == null)
                portfolio.securitiesSummed = new List<security>().ToArray();

            return PartialView("PortfolioSecurityListControl", new PortfolioModel { Portfolio = portfolio });
        }

        [HttpPost]
        public JsonResult UpdatePortfolioHeader(string login, int portfolioId)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var portfolioHeader = ws.getPortfolioHeader(login, portfolioId);

            return Json(new { PortfolioId = portfolioHeader.id, PortfolioTitle = portfolioHeader.title, MarketValue = DisplayHelper.FormatMoney(portfolioHeader.marketValue), Cash = DisplayHelper.FormatMoney(portfolioHeader.cash), Rank = portfolioHeader.rank }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ShowInstrumentCategories()
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var categories = ws.getCategories();

            return PartialView("AssetCategoriesControl", new AssetCategoryListModel { Categories = categories.ToList() } ); //, new InstrumentCategoryModel { Portfolio = portfolio });
        }

        public ActionResult ShowAssetCategory(int categoryId, string title)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var assets = ws.getAssets(categoryId);
            if (assets == null)
                assets = new List<asset>().ToArray();

            return PartialView("AssetCategoryControl", new AssetCategoryModel { Title = title, CategoryId = categoryId, Assets = assets.ToList() });
        }

        public ActionResult ShowNewPortfolioDialog(int portfolioId)
        {
            return PartialView("NewPortfolioDialog", new NewPortfolioModel { });
        }

        [HttpPost]
        public JsonResult CreatePortfolio(string login, string title, string startCash)
        {
            var dStartCash = Double.Parse(startCash, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.createPortfolio(login, title, dStartCash);

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
        

        [HttpPost]
        public JsonResult BuySecurity(string login, int portfolioId, String symbol, String quote, int quantity, String status)
        {
            var statusCode = (statusEnum)Enum.Parse(typeof(statusEnum), status);
            var dQuote = Double.Parse(quote, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.buySecurity(login, new security { position = quantity, symbol = symbol, quote = dQuote, portfolioId = portfolioId, status = statusCode, statusSpecified = true });

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SellSecurity(string login, int portfolioId, String symbol, String quote, int quantity, String status)
        {
            var statusCode = (statusEnum)Enum.Parse(typeof(statusEnum), status);
            var dQuote = Double.Parse(quote, CultureInfo.InvariantCulture);
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            ws.sellSecurity(login, new security { position = quantity, symbol = symbol, quote = dQuote, portfolioId = portfolioId, status = statusCode, statusSpecified = true });

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}
