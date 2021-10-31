using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Data.Entities
{
    public class Asset
    {
        public String Id { get; set; }
        public String Symbol { get; set; }
        public String Isin { get; set; }
        public String Title { get; set; }
        public String Quote { get; set; }
        public String MarketValue { get; set; }
        public String Change { get; set; }
        public String PreviousClose { get; set; }        
        public String Volume { get; set; }
        public String AssetCategoryTitle { get; set; }
        public String PriceUrl { get; set; }

        //public String AnualVolatility { get; set; }
        //private double avgVoltatility;
        //private string categoryTitle;
        //private double dailyVolatility;
    }
}
