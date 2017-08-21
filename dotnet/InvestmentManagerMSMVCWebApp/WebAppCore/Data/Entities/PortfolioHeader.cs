using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class PortfolioHeader
    {
        public int Id { get; set; }
        public double Cash { get; set; }        
        public double MarketValue { get; set; }
        public int Rank { get; set; }
        public string Title { get; set; }
        public int TournamentId { get; set; }
    }
}
