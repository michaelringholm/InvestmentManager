using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class PortfolioMetaData
    {
        public Decimal totalPurchaseAmount { get; set; }
        public Decimal portfolioMarketValue { get; set; }
        public List<SummedTrade> summedTrades { get; set; }
        public int rank { get; set; }
    }
}
