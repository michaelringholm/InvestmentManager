using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WebAppCore.Data.Entities;
using WebAppCore.Extensions;

namespace WebAppCore.Services
{
    public class DataService : IDataService
    {
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

        public List<Portfolio> GetPortfolios()
        {
            //String json = Newtonsoft.Json.JsonConvert.SerializeObject(new { TableName = "Invest_Portfolio", FilterExpr = "UserKey = :userKey", ExprAttrVals = new { ":userKey" = "FB672079753"} } );
            String json = @"{ ""TableName"":""Invest_Portfolio"", ""FilterExpr"":""UserKey = :userKey"", ""ExprAttrVals"":{ "":userKey"": ""FB672079753""} }";        
            var documents = GetDocuments(json);
            var portfolios = JsonConvert.DeserializeObject<List<Portfolio>>(documents.ToString());
            return portfolios;
        }

        public List<PortfolioHeader> GetPortfolioHeaders()
        {          
            String json = @"{ ""TableName"":""Invest_Portfolio"", ""FilterExpr"":""UserKey = :userKey"", ""ExprAttrVals"":{ "":userKey"": ""FB672079753""} }";
            var documents = GetDocuments(json);
            var portfolios = JsonConvert.DeserializeObject<List<PortfolioHeader>>(documents.ToString());
            return portfolios;
        }

        public List<PortfolioHeader> GetPortfolioHeadersOld()
        {
            var portfolioHeaders = new List<PortfolioHeader>();
            var portfoliosJson = GetPortfolios();
            //var p = Newtonsoft.Json.JsonConvert.DeserializeObject<Portfolio>(portfolios.ToString());
            portfolioHeaders.Add(new PortfolioHeader { Cash = 5000, MarketValue = 6000, Name = "Dummy Portfolio", Rank = 1 });
            return portfolioHeaders;
        }
    }
}
