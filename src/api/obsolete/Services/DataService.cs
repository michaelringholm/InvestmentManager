using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DroidInvest.Data.Entities;
using DroidInvest.Extensions;

namespace DroidInvest.Services
{
    public class DataService : IDataService
    {
        private readonly IPriceService priceService;
        private readonly IJsonSerializer jsonSerializer;
        public DataService(IPriceService priceService, IJsonSerializer jsonSerializer)
        {
            this.priceService = priceService;
            this.jsonSerializer = jsonSerializer;
        }

        private void StoreDocument(String jsonString)
        {
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            AWSHttpHelper.PostJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_StoreDocNJS", content);
        }

        private Object GetDocuments(String jsonString)
        {
            var content = new StringContent(jsonString, Encoding.UTF8, "application/json");
            return AWSHttpHelper.PostJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_GetDocsNJS", content);
        }

        public void StoreCategory()
        {
            StoreDocument("{\"TableName\":\"Invest_Category\",\"Item\":{\"Name\":\"finance\",\"Title\":\"Finance\"}}");
        }

        public void StorePortfolio(Portfolio portfolio)
        {
            var jsonItem = jsonSerializer.ToJson(portfolio);
            StoreDocument("{\"TableName\":\"Invest_Portfolio\",\"Item\":" + jsonItem + "}");
        }

        public List<Portfolio> GetPortfolios(String userKey)
        {
            String json = @"{ ""TableName"":""Invest_Portfolio"", ""FilterExpr"":""UserKey = :userKey"", ""ExprAttrVals"":{ "":userKey"": """ + userKey + @"""} }";        
            var documents = GetDocuments(json);
            var portfolios = jsonSerializer.FromJson<List<Portfolio>>(documents.ToString());
            foreach (var portfolio in portfolios)
                addPortfolioMetaData(portfolio);
            return portfolios;
        }

        private CultureInfo culture = CultureInfo.GetCultureInfo("en-US");
        private void addPortfolioMetaData(Portfolio portfolio)
        {
            if (portfolio.Trades != null)
            {
                foreach (var trade in portfolio.Trades)
                    trade.MetaData = GetAsset(trade.AssetIsin);

                
                var totalPurchaseAmount = portfolio.Trades.Sum(t => ((Convert.ToDecimal(t.PurchaseQuote, culture)) * (Convert.ToDecimal(t.Quantity, culture))));
                var portfolioMarketValue = portfolio.Trades.Sum(t => ((Convert.ToDecimal(((Asset)t.MetaData).Quote, culture)) * (Convert.ToDecimal(t.Quantity, culture))));
                var summedTrades = portfolio.Trades.GroupBy(t => t.AssetIsin)
                    .Select(tr => new SummedTrade
                    {
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

                portfolio.MetaData = new PortfolioMetaData { totalPurchaseAmount = totalPurchaseAmount, portfolioMarketValue = portfolioMarketValue, summedTrades = summedTrades };
            }
        }

        public Portfolio GetPortfolio(String userKey, String portfolioId)
        {
            var portfolio = GetPortfolios(userKey).FirstOrDefault<Portfolio>(p => p.Id == portfolioId);
            return portfolio;
        }

        public Portfolio GetPortfolioByTournamentId(string userKey, string tournamentId)
        {
            var portfolio = GetPortfolios(userKey).FirstOrDefault<Portfolio>(p => p.TournamentId == tournamentId);
            if (portfolio == null)
                return null;
            ((PortfolioMetaData)portfolio.MetaData).rank = GetTournamentRank(tournamentId, portfolio.Id);
            return portfolio;
        }

        private int GetTournamentRank(String tournamentId, String portfolioId)
        {
            String json = @"{ ""TableName"":""Invest_Portfolio"", ""FilterExpr"":""TournamentId = :tournamentId"", ""ExprAttrVals"":{ "":tournamentId"": """ + tournamentId + @"""} }";
            var documents = GetDocuments(json);
            var portfolios = jsonSerializer.FromJson<List<Portfolio>>(documents.ToString());
            var sortedPortfolios = new SortedDictionary<Decimal, Portfolio>();
            foreach (var portfolio in portfolios)
            {
                addPortfolioMetaData(portfolio);
                sortedPortfolios.Add((((PortfolioMetaData)portfolio.MetaData).portfolioMarketValue + Convert.ToDecimal(portfolio.Cash, culture)), portfolio);
            }

            var rank = 0;
            foreach (var portfolio in sortedPortfolios)
                ((PortfolioMetaData)portfolio.Value.MetaData).rank = ++rank;

            return ((PortfolioMetaData)portfolios.FirstOrDefault(p=>p.Id == portfolioId).MetaData).rank;
        }

        public List<Participant> GetParticipants(string tournamentId)
        {
            String json = @"{ ""TableName"":""Invest_Portfolio"", ""FilterExpr"":""TournamentId = :tournamentId"", ""ExprAttrVals"":{ "":tournamentId"": """ + tournamentId + @"""} }";
            var documents = GetDocuments(json);
            var portfolios = jsonSerializer.FromJson<List<Portfolio>>(documents.ToString());
            var sortedPortfolios = new SortedDictionary<Decimal, Portfolio>();
            foreach (var portfolio in portfolios)
            {
                addPortfolioMetaData(portfolio);
                sortedPortfolios.Add((((PortfolioMetaData)portfolio.MetaData).portfolioMarketValue + Convert.ToDecimal(portfolio.Cash, culture)), portfolio);
            }

            var rank = 0;
            foreach (var portfolio in sortedPortfolios)
                ((PortfolioMetaData)portfolio.Value.MetaData).rank = ++rank;

            var participants = new List<Participant>();
            var leader = sortedPortfolios[sortedPortfolios.Max(p => p.Key)];
            var leaderTotalValue = ((PortfolioMetaData)leader.MetaData).portfolioMarketValue + Convert.ToDecimal(leader.Cash, culture);
            foreach (var portfolio in portfolios)
            {
                var portfolioMetaData = (PortfolioMetaData)portfolio.MetaData;
                participants.Add(new Participant
                {
                    Cash = Convert.ToDecimal(portfolio.Cash, culture),
                    MarketValue = portfolioMetaData.portfolioMarketValue,
                    PurchaseAmount = portfolioMetaData.totalPurchaseAmount,
                    Rank = portfolioMetaData.rank,
                    BehindLeader = leaderTotalValue - Convert.ToDecimal(portfolio.Cash, culture) - portfolioMetaData.portfolioMarketValue,
                    FullName = portfolio.UserKey
                });
            }

            return participants;
        }

        /* public List<PortfolioHeader> GetPortfolioHeadersOld()
        {
            var portfolioHeaders = new List<PortfolioHeader>();
            var portfoliosJson = GetPortfolios();
            //var p = Newtonsoft.Json.JsonConvert.DeserializeObject<Portfolio>(portfolios.ToString());
            portfolioHeaders.Add(new PortfolioHeader { Cash = 5000, MarketValue = 6000, Name = "Dummy Portfolio", Rank = 1 });
            return portfolioHeaders;
        }*/


        public List<AssetCategory> GetAssetCategories()
        {
            String json = @"{ ""TableName"":""Invest_AssetCategory"" }";
            var documents = GetDocuments(json);
            var assetCategories = jsonSerializer.FromJson<List<AssetCategory>>(documents.ToString());
            return assetCategories;
        }

        public List<Asset> GetAssets(String assetCategoryTitle)
        {
            String json = @"{ ""TableName"":""Invest_Asset"", ""FilterExpr"":""AssetCategoryTitle = :assetCategoryTitle"", ""ExprAttrVals"":{ "":assetCategoryTitle"": """ + assetCategoryTitle + @"""} }";
            var documents = GetDocuments(json);
            var assets = jsonSerializer.FromJson<List<Asset>>(documents.ToString());
            return assets;
        }

        private Dictionary<String, Asset> _assetDic = null;
        private Dictionary<String, Asset> getAssetCache()
        {
            if (_assetDic == null)
            {
                String json = @"{ ""TableName"":""Invest_Asset"" }";
                var documents = GetDocuments(json);
                var assets = jsonSerializer.FromJson<List<Asset>>(documents.ToString());
                _assetDic = assets.ToDictionary(d => d.Isin);
            }
            return _assetDic;
        }

        public List<Asset> GetAssets()
        {
            return getAssetCache().Values.ToList<Asset>();
        }

        public Asset GetAsset(String isin)
        {
            return getAssetCache()[isin];
        }

        public void BuyAsset(String userKey, String portfolioId, Int16 quantity, Asset asset)
        {
            if (quantity < 1)
                throw new Exception("Quantity  must be more than 1!");
            var portfolio = GetPortfolio(userKey, portfolioId);
            //var liveQuote = priceService.GetLiveQuote(asset.Isin);
            // Asset not complete, obtain from data source
            var priceUrl = GetAsset(asset.Isin).PriceUrl;
            var liveQuote = priceService.GetLiveQuoteByPriceUrl(priceUrl);
            var sellAmount = liveQuote * quantity;
            var newCashValue = (Convert.ToDecimal(portfolio.Cash, culture)) + Convert.ToDecimal(sellAmount);
            portfolio.Cash = newCashValue.ToString(culture);
            if (portfolio.Trades == null)
                portfolio.Trades = new List<Trade>();
            portfolio.Trades.Add(new Trade { AssetSymbol = asset.Symbol, AssetIsin = asset.Isin, PortfolioId = portfolioId, Quantity = quantity, PurchaseDate = DateTime.Now.ToString("ddMMyyyy:HHmmSS"), PurchaseQuote = liveQuote.ToString(CultureInfo.GetCultureInfo("en-US")) });
            StorePortfolio(portfolio);
        }

        public void SellAsset(String userKey, String portfolioId, Int16 quantity, Asset asset)
        {
            if (quantity < 1)
                throw new Exception("Quantity to sell, must be more than 1!");
            var portfolio = GetPortfolio(userKey, portfolioId);
            // Asset not complete, obtain from data source
            var priceUrl = GetAsset(asset.Isin).PriceUrl;
            var liveQuote = priceService.GetLiveQuoteByPriceUrl(priceUrl);
            var purchaseAmount = liveQuote * quantity;
            var newCashValue = (Convert.ToDecimal(portfolio.Cash, culture)) - Convert.ToDecimal(purchaseAmount);
            portfolio.Cash = newCashValue.ToString(culture);
            portfolio.Trades.Add(new Trade { AssetSymbol = asset.Symbol, AssetIsin = asset.Isin, PortfolioId = portfolioId, Quantity = (Int16)(quantity*-1), PurchaseDate = DateTime.Now.ToString("ddMMyyyy:HHmmSS"), PurchaseQuote = liveQuote.ToString(CultureInfo.GetCultureInfo("en-US")) });
            StorePortfolio(portfolio);
        }

        public List<Tournament> GetTournaments(String userKey)
        {
            //String json = @"{ ""TableName"":""Invest_Tournament"", ""FilterExpr"":""UserKey = :userKey"", ""ExprAttrVals"":{ "":userKey"": """ + userKey + @"""} }";
            String json = @"{ ""TableName"":""Invest_Tournament"" }";
            var documents = GetDocuments(json);
            var tournaments = jsonSerializer.FromJson<List<Tournament>>(documents.ToString());
            return tournaments;
        }

        public Tournament GetTournament(String tournamentId)
        {
            String json = @"{ ""TableName"":""Invest_Tournament"", ""FilterExpr"":""Id = :id"", ""ExprAttrVals"":{ "":id"": """ + tournamentId + @"""} }";
            //String json = @"{ ""TableName"":""Invest_Tournament"" }";
            var documents = GetDocuments(json);
            var tournaments = jsonSerializer.FromJson<List<Tournament>>(documents.ToString());
            return tournaments[0];
        }
    }
}
