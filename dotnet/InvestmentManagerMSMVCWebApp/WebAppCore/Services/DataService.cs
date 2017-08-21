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

        public void StoreCategory()
        {
            StoreDocument("{\"TableName\":\"Invest_Category\",\"Item\":{\"Name\":\"finance\",\"Title\":\"Finance\"}}");
        }

        public List<PortfolioHeader> GetPortfolioHeaders()
        {
            var portfolioHeaders = new List<PortfolioHeader>();
            portfolioHeaders.Add(new PortfolioHeader { Cash = 5000, MarketValue = 6000, Title = "Dummy Portfolio", Rank = 1 });
            return portfolioHeaders;
        }
    }
}
