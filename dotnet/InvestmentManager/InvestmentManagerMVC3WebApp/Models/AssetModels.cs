using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InMaApp.Models
{
    public class AssetBuySellModel
    {
        public String Title { get; set; }
        public String Symbol { get; set; }
        public String BuySellCode { get; set; }
        public bool InstantBuySell { get; set; }

        public string CategoryTitle { get; set; }

        public double Quote { get; set; }
    }
}