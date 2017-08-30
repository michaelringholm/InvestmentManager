using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppCore.Services
{
    public class CommandService
    {
        public event EventHandler Login;
        public event EventHandler Logout;

        public event EventHandler GetCategories;

        public event EventHandler GetAssets;
        public event EventHandler AddAssetToFavoties;
        public event EventHandler RemoveAssetFromFavoties;

        public event EventHandler AmendUnconfirmedSecurity;
        public event EventHandler BuySecurity;
        public event EventHandler SellSecurity;
        public event EventHandler GetUnconfirmedSecurities;
        public event EventHandler ConfirmSecurities;
        public event EventHandler RemoveUnconfirmedSecurities;
        public event EventHandler RemoveUnconfirmedSecurity;

        public event EventHandler CreatePortfolio;        
        public event EventHandler DeletePortfolio;
        public event EventHandler GetPortfolio;
        public event EventHandler GetPortfolioByTournament;
        public event EventHandler GetPortfolioHeader;
        public event EventHandler GetPortfolios;

        public event EventHandler CreateTournament;
        public event EventHandler DeleteTournament;
        public event EventHandler GetTournament;
        public event EventHandler GetTournaments;
        public event EventHandler EnterTournament;
        public event EventHandler LeaveTournament;
        public event EventHandler GetParticipants;
        public event EventHandler AddUserToTournament;
        public event EventHandler RemoveUserFromTournament;                
    }
}
