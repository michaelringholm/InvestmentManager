using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    public class Portfolio
    {
        public String Id { get; set; }
        public  String UserKey{ get; set; }
        public String Cash { get; set; }
        public String Title { get; set; }
        public List<Trade> Trades { get; set; }        
        public String TournamentId { get; set; }
        [NonSerialized]
        private Object _metaData;
        public Object MetaData { get { return _metaData; } set { _metaData = value; } }

        //public Int16 Rank { get; set; }
        //public Int16 TournamentId { get; set; }

        /*private PortfolioHeader portfolioHeaderField;
            private Security[] securitiesField;
            private Security[] securitiesSummedField;*/
    }
}
