using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DroidInvest.Data.Entities;

namespace DroidInvest.Services
{
    public class BorsenPriceService : IPriceService
    {
        private CultureInfo culture = CultureInfo.GetCultureInfo("en-US");
        public Double GetLiveQuote(String ISIN)
        {
            String url = "https://price-engine-dot-stelinno-dev.appspot.com/get-by-isin.ctl?isin=";
            WebClient client = new WebClient();
            String jsonPayload = client.DownloadString(url + ISIN);
            var price = JsonConvert.DeserializeObject<PriceEntity>(jsonPayload);
            return Double.Parse(price.Price, culture);
        }

        public Double GetLiveQuoteByPriceUrl(String priceUrl)
        {
            String url = "https://price-engine-dot-stelinno-dev.appspot.com/get-by-link.ctl?link=";
            WebClient client = new WebClient();
            String jsonPayload = client.DownloadString(url + priceUrl);
            var price = JsonConvert.DeserializeObject<PriceEntity>(jsonPayload);
            return Double.Parse(price.Price, culture);
        }
    }
}
