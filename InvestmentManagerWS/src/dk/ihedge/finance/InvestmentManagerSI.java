package dk.ihedge.finance;

import java.util.List;

import javax.jws.WebService;

import dk.ihedge.finance.dal.AssetDAC;
import dk.ihedge.finance.dal.CategoryDAC;
import dk.ihedge.finance.dal.PortfolioDAC;
import dk.ihedge.finance.dal.SecurityDAC;
import dk.ihedge.finance.dal.TournamentDAC;
import dk.ihedge.finance.dal.UserDAC;
import dk.ihedge.finance.dtl.Asset;
import dk.ihedge.finance.dtl.Category;
import dk.ihedge.finance.dtl.Portfolio;
import dk.ihedge.finance.dtl.PortfolioHeader;
import dk.ihedge.finance.dtl.Security;
import dk.ihedge.finance.dtl.Tournament;
import dk.ihedge.finance.dtl.Tournament.UserRoleEnum;
import dk.ihedge.finance.dtl.TransactionReport;
import dk.ihedge.finance.dtl.User;

@WebService(targetNamespace = "http://finance.ihedge.dk/", endpointInterface = "dk.ihedge.finance.InvestmentManagerInterface", portName = "InvestmentManagerSIPort", serviceName = "InvestmentManagerSIService")
public class InvestmentManagerSI implements InvestmentManagerInterface {
	public void helloWorld()
	{
		
	}
	
	public void login(String login) throws Exception
	{
		UserDAC.login(login);
	}	
	
	
	
	/**************** Portfolio *****************/
	public List<Portfolio> getPortfolios(String login)
	{
		return PortfolioDAC.GetPortfolios(login);
	}
	
	public PortfolioHeader getPortfolioHeader(String login, int portfolioID) throws Exception
	{
		return PortfolioDAC.getPortfolioHeader(login, portfolioID);
	}
	
	public Portfolio getPortfolio(String login, int portfolioID)
	{
		return PortfolioDAC.getPortfolio(login, portfolioID);
	}
	
	public Portfolio getPortfolioByTournament(String login, int tournamentID)
	{
		return PortfolioDAC.getPortfolioByTournament(login, tournamentID);
	}	
	
	public Portfolio createPortfolio(String login, String portfolioTitle, double startCash)
	{
		return PortfolioDAC.createPortfolio(login, portfolioTitle, startCash);
	}
	
	public void deletePortfolio(String login, int portfolioID)
	{
		PortfolioDAC.deletePortfolio(login, portfolioID);
	}	
	/**************** END Portfolio *****************/
	
	
	
	public List<Security> getUnconfirmedSecurities(String login, int portfolioID)
	{
		return SecurityDAC.getSecurities(login, portfolioID, Security.StatusEnum.NotConfirmed);
	}
		
	public void buySecurity(String login, Security security)
	{
		SecurityDAC.buySecurity(login, security);
	}
	
	public void sellSecurity(String login, Security security)
	{
		SecurityDAC.sellSecurity(login, security);
	}
	
	public void amendUnconfirmedSecurity(String login, Security security)
	{
		SecurityDAC.amendUnconfirmedSecurity(login, security);
	}
	
	public void removeUnconfirmedSecurity(String login, int securityID)
	{
		SecurityDAC.removeUnconfirmedSecurity(login, securityID);
	}
	
	public TransactionReport removeUnconfirmedSecurities(String login, int portfolioID)
	{
		return SecurityDAC.removeUnconfirmedSecurities(login, portfolioID);
	}
	
	public TransactionReport confirmSecurities(String login, int portfolioID)
	{
		return SecurityDAC.confirmSecurities(login, portfolioID);
	}
	
	
	
	/************* Tournament *****************/
	public List<Tournament> getTournaments(String login) throws Exception
	{
		int userId = UserDAC.getUserId(login);
		return TournamentDAC.GetTournaments(userId);
	}

	public Tournament getTournament(String login, int tournamentID)
	{
		return TournamentDAC.getTournament(login, tournamentID);
	}
	
	public void createTournament(String login, Tournament tournament) throws Exception
	{
		TournamentDAC.createTournament(login, tournament);
	}
	
	public void deleteTournament(String login, int tournamentID) throws Exception
	{
		TournamentDAC.deleteTournament(login, tournamentID);
	}
	
	public void addUserToTournament(String login, String userLogin, UserRoleEnum userRole, int tournamentID) throws Exception
	{
		TournamentDAC.addUser(login, userLogin, userRole, tournamentID);
	}
	
	public void removeUserFromTournament(String login, String userLogin, int tournamentID) throws Exception
	{
		TournamentDAC.removeUser(login, userLogin, tournamentID);
	}
	
	public void enterTournament(String login, int tournamentID) throws Exception
	{
		TournamentDAC.enter(login, tournamentID);
	}
	
	public void leaveTournament(String login, int tournamentID) throws Exception
	{
		TournamentDAC.leave(login, tournamentID);
	}
	
	public List<User> getParticipants(String login,  int tournamentID) throws Exception
	{
		return TournamentDAC.getParticipants(login, tournamentID);
	}
	/************* End Tournament *****************/
	
	
	
	
	/************* Asset *****************/
	public List<Asset> getAssets(int categoryId)
	{
		return AssetDAC.GetAssets(categoryId);
	}
	
	public List<Category> getCategories()
	{
		return CategoryDAC.GetCategories();
	}
	
	public void addAssetToFavoties(String login, int assetID)
	{
		AssetDAC.addToFavorites(login, assetID);
	}
	
	public void removeAssetFromFavoties(String login, int assetID)
	{
		AssetDAC.removeFromFavorites(login, assetID);
	}
	/************* End Asset *****************/
}
