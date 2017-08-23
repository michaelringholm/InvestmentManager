﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Data.Entities
{
    // Previously Security
    public class PortfolioItem
    {
        //public enum StatusEnum{Confirmed,NotConfirmed}
        public String PortfolioId { get; set; } // Foreign Key
        public String AssetSymbol { get; set; } // Foreign Key
        public Int16 Position { get; set; }
        public String PurchaseQuote { get; set; }        
        public String PurchaseDate { get; set; }
        public String Status { get; set; }

        //public String PurchaseAmount { get; set; } // Calculated (PurchaseQuote*Position)
    }
}
