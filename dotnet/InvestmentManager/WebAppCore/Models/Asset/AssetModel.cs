﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppCore.Data.Entities;

namespace WebAppCore.Models.Asset
{
    public class AssetModel
    {
        public String AuthToken { get; set; }
        public String PortfolioId { get; set; }
        public Int16 Quantity { get; set; }
        public Data.Entities.Asset Asset { get; set; }
    }
}
