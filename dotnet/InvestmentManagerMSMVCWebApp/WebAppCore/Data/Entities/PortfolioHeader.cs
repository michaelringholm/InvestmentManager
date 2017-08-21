using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class PortfolioHeader
    {
        public String Id { get; set; }
        public Double Cash { get; set; }        
        public Double MarketValue { get; set; }
        public Int16 Rank { get; set; }
        public String Name { get; set; }
        public Int16 TournamentId { get; set; }
    }
}
