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
        List<Asset> GetAssets();
        Asset GetAsset(String isin);
        void BuyAsset(String userKey, String portfolioId, Int16 quantity, Asset asset);
        void SellAsset(String userKey, String portfolioId, Int16 quantity, Asset asset);
        List<Tournament> GetTournaments(String userKey);
        Tournament GetTournament(string tournamentId);
        Portfolio GetPortfolioByTournamentId(string userKey, string tournamentId);
        List<Participant> GetParticipants(string tournamentId);
    }
}
