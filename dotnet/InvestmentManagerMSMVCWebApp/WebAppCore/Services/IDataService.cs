using System;
using System.Collections.Generic;
using WebAppCore.Data.Entities;

namespace WebAppCore.Services
{
    public interface IDataService
    {
        List<Portfolio> GetPortfolios(String userKey);
        Portfolio GetPortfolio(String userKey, String portfolioId);
        void StoreCategory();
        List<AssetCategory> GetAssetCategories();
        List<Asset> GetAssets(String assetCategoryTitle);
        void BuyAsset(Asset asset);
        void SellAsset(Asset asset);
    }
}
