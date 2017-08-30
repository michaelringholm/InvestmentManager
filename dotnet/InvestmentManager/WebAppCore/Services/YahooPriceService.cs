using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Services
{
    public class YahooPriceService : IPriceService
    {
        public Double GetLiveQuote(String symbol)
        {
            return 22.15;
        }
    }
}
