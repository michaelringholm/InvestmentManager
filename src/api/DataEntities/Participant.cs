using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Data.Entities
{
    public class Participant
    {
        public String FullName { get; set; }
        public int Rank { get; set; }
        public Decimal PurchaseAmount { get; set; }
        public Decimal Cash { get; set; }
        public Decimal MarketValue { get; set; }
        public Decimal BehindLeader { get; set; }
    }
}
