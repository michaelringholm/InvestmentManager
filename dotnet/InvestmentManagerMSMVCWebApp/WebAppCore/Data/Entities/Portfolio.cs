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
                                           /*private PortfolioHeader portfolioHeaderField;
                                               private Security[] securitiesField;
                                               private Security[] securitiesSummedField;*/
    }
}
