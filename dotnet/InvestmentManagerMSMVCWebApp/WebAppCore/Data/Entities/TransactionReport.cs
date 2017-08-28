using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class TransactionReport
    {
        //public Security[] securitiesField;
        public List<Trade> PortfolioItems { get; set; }
        public String TotalBuy { get; set; }
        public String TotalSell { get; set; }
    }
}
