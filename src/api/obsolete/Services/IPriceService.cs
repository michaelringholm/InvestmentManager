using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DroidInvest.Services
{
    public interface IPriceService
    {
        Double GetLiveQuote(String ISIN);
        Double GetLiveQuoteByPriceUrl(String priceUrl);
    }
}
