using InMaApp.InMaJavaWS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InMaApp.Models
{
    public class PortfolioModel
    {
        public portfolio Portfolio { get; set; }
    }

    public class PortfolioListModel
    {
        public List<portfolio> Portfolios { get; set; }
    }

    public class PortfolioSubListModel
    {
        public portfolio Portfolio { get; set; }
        public int AssetID { get; set; }
        public String Symbol { get; set; }
    }

    public class AssetCategoryListModel
    {
        public List<category> Categories{ get; set; }
    }

    public class AssetCategoryModel
    {
        public int CategoryId { get; set; }
        public String Title { get; set; }
        public List<asset> Assets { get; set; }
    }

    public class NewPortfolioModel
    {
    }
}
