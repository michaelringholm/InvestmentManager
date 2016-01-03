package dk.ihedge.finance;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import dk.ihedge.finance.dtl.Asset;
import dk.ihedge.finance.dtl.Category;
import dk.ihedge.finance.dtl.Portfolio;
import dk.ihedge.finance.dtl.PortfolioHeader;
import dk.ihedge.finance.dtl.Security;
import dk.ihedge.finance.dtl.Tournament;
import dk.ihedge.finance.dtl.TransactionReport;
import dk.ihedge.finance.dtl.Tournament.UserRoleEnum;
import dk.ihedge.finance.dtl.User;

@WebService(name = "InvestmentManagerInterface", targetNamespace = "http://finance.ihedge.dk/")
public interface InvestmentManagerInterface {

	@WebMethod(operationName = "helloWorld", action = "urn:HelloWorld")
	public void helloWorld();
	
	@WebMethod(operationName = "login", action = "urn:Login")
	public void login(String login) throws Exception;
	
	/************************ Tournament ***********************/
	@WebMethod(operationName = "getTournaments", action = "urn:GetTournaments")
	public List<Tournament> getTournaments(@WebParam(name = "login") String login) throws Exception;
	
	@WebMethod(operationName = "getTournament", action = "urn:GetTournament")
	public Tournament getTournament(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentId);
	
	@WebMethod(operationName = "createTournament", action = "urn:CreateTournament")
	public void createTournament(@WebParam(name = "login")String login, @WebParam(name = "tournament")Tournament tournament) throws Exception;
	
	@WebMethod(operationName = "deleteTournament", action = "urn:DeleteTournament")
	public void deleteTournament(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentID) throws Exception;
	
	@WebMethod(operationName = "addUserToTournament", action = "urn:AddUserToTournament")
	public void addUserToTournament(@WebParam(name = "login") String login, @WebParam(name = "userLogin") String userLogin, @WebParam(name = "userRole") UserRoleEnum userRole, @WebParam(name = "tournamentID") int tournamentID) throws Exception;

	@WebMethod(operationName = "removeUserFromTournament", action = "urn:RemoveUserFromTournament")
	public void removeUserFromTournament(@WebParam(name = "login") String login, @WebParam(name = "userLogin") String userLogin, @WebParam(name = "tournamentID") int tournamentID) throws Exception;

	@WebMethod(operationName = "enterTournament", action = "urn:EnterTournament")
	public void enterTournament(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentID) throws Exception;

	@WebMethod(operationName = "leaveTournament", action = "urn:LeaveTournament")
	public void leaveTournament(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentID) throws Exception;

	@WebMethod(operationName = "getParticipants", action = "urn:GetParticipants")
	public List<User> getParticipants(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentID) throws Exception;
	/************************ END Tournament *******************/
	
	@WebMethod(operationName = "getPortfolios", action = "urn:GetPortfolios")
	public List<Portfolio> getPortfolios(@WebParam(name = "login") String userId);
	
	@WebMethod(operationName = "getPortfolioHeader", action = "urn:GetPortfolioHeader")
	public PortfolioHeader getPortfolioHeader(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioID) throws Exception;
	
	@WebMethod(operationName = "getPortfolio", action = "urn:GetPortfolio")
	public Portfolio getPortfolio(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioID);
	
	@WebMethod(operationName = "getPortfolioByTournament", action = "urn:GetPortfolioByTournament")
	public Portfolio getPortfolioByTournament(@WebParam(name = "login") String login, @WebParam(name = "tournamentID") int tournamentID);
	
	@WebMethod(operationName = "createPortfolio", action = "urn:CreatePortfolio")
	public Portfolio createPortfolio(@WebParam(name = "login") String login, @WebParam(name = "portfolioTitle") String portfolioTitle, @WebParam(name = "startCash") double startCash);
	
	@WebMethod(operationName = "deletePortfolio", action = "urn:DeletePortfolio")
	public void deletePortfolio(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioID);

	@WebMethod(operationName = "getUnconfirmedSecurities", action = "urn:GetUnconfirmedSecurities")
	public List<Security> getUnconfirmedSecurities(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioID);
		
	@WebMethod(operationName = "buySecurity", action = "urn:BuySecurity")
	public void buySecurity(@WebParam(name = "login") String login, @WebParam(name = "security") Security security);
	
	@WebMethod(operationName = "sellSecurity", action = "urn:SellSecurity")
	public void sellSecurity(@WebParam(name = "login") String login, @WebParam(name = "security") Security security);
	
	@WebMethod(operationName = "amendUnconfirmedSecurity", action = "urn:AmendUnconfirmedSecurity")
	public void amendUnconfirmedSecurity(String login, Security security);
	
	@WebMethod(operationName = "removeUnconfirmedSecurity", action = "urn:RemoveUnconfirmedSecurity")
	public void removeUnconfirmedSecurity(@WebParam(name = "login") String login, @WebParam(name = "securityID") int securityID);

	@WebMethod(operationName = "removeUnconfirmedSecurities", action = "urn:RemoveUnconfirmedSecurities")
	public TransactionReport removeUnconfirmedSecurities(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioId);
		
	@WebMethod(operationName = "confirmSecurities", action = "urn:ConfirmSecurities")
	public TransactionReport confirmSecurities(@WebParam(name = "login") String login, @WebParam(name = "portfolioID") int portfolioID);
	
	@WebMethod(operationName = "getCategories", action = "urn:GetCategories")
	public List<Category> getCategories();
	
	@WebMethod(operationName = "getAssets", action = "urn:GetAssets")
	public List<Asset> getAssets(@WebParam(name = "categoryId") int categoryId);
	
	@WebMethod(operationName = "addAssetToFavoties", action = "urn:AddAssetToFavoties")
	public void addAssetToFavoties(@WebParam(name = "login") String login, @WebParam(name = "assetID") int assetID);
	
	@WebMethod(operationName = "removeAssetFromFavoties", action = "urn:RemoveAssetFromFavoties")
	public void removeAssetFromFavoties(@WebParam(name = "login") String login, @WebParam(name = "assetID") int assetID);
}