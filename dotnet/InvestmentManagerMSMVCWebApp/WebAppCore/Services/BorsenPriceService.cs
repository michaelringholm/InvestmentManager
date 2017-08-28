using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAppCore.Data.Entities;

namespace WebAppCore.Services
{
    public class BorsenPriceService : IPriceService
    {
        public Double GetLiveQuote(String ISIN)
        {
            String url = "https://price-engine-dot-stelinno-dev.appspot.com/get-by-isin.ctl?isin=";
            WebClient client = new WebClient();
            String jsonPayload = client.DownloadString(url + ISIN);
            var price = JsonConvert.DeserializeObject<PriceEntity>(jsonPayload);
            var cultures = CultureInfo.GetCultures(CultureTypes.AllCultures);
            //var culture = new CultureInfo(cultures[0]);
            return Double.Parse(price.Price, CultureInfo.GetCultureInfo("en-US"));
        }
    }
}
