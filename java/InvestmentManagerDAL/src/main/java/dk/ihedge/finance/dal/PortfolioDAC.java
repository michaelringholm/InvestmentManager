package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import dk.ihedge.finance.dtl.Portfolio;
import dk.ihedge.finance.dtl.PortfolioHeader;
import dk.ihedge.finance.dtl.Security;

public class PortfolioDAC {
	public static List<Portfolio> GetPortfolios(String userId)
	{
		List<Portfolio> portfolios = new ArrayList<Portfolio>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio p left join PortfolioMarketValueView pmv on pmv.PortfolioId = p.Id where p.UserId = ?");
			ps.setString(1, userId);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("Title"));
				Portfolio portfolio = new Portfolio();
				
				PortfolioHeader header = new PortfolioHeader();
				int portfolioId = rs.getInt("Id");
				header.setId(portfolioId);
				header.setTitle(rs.getString("Title"));
				header.setCash(rs.getDouble("Cash"));
				header.setMarketValue(rs.getDouble("MarketValue"));
				header.setRank(rs.getInt("Rank"));
				header.setTournamentId(rs.getInt("tournamentId"));
				portfolio.setPortfolioHeader(header);
				portfolio.setSecurities(SecurityDAC.getSecurities(userId, portfolioId, Security.StatusEnum.Confirmed));
				portfolio.setSecuritiesSummed(SecurityDAC.getSecuritiesSummary(userId, portfolioId, Security.StatusEnum.Confirmed));
				
				portfolios.add(portfolio);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return portfolios;
	}
	
	public static PortfolioHeader getPortfolioHeader(String login, int portfolioID) throws Exception {
		PortfolioHeader header = new PortfolioHeader();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio p left join PortfolioMarketValueView pmv on pmv.PortfolioId = p.Id where p.UserId = ? and p.Id = ?");
			ps.setString(1, login);
			ps.setInt(2, portfolioID);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
			{
				System.out.println(rs.getString("Title"));								
				header.setId(rs.getInt("Id"));
				header.setTitle(rs.getString("Title"));
				header.setCash(rs.getDouble("Cash"));
				header.setMarketValue(rs.getDouble("MarketValue"));
				header.setRank(rs.getInt("Rank"));			
			}
			else
				throw new Exception("Could not find specified portfolio");
			
		} catch (Exception e) {
			throw e;
		}
		
		return header;				
		
	}

	public static Portfolio getPortfolio(String login, int portfolioID) {
		Portfolio portfolio = new Portfolio();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio p left join PortfolioMarketValueView pmv on pmv.PortfolioId = p.Id where p.UserId = ? and p.Id = ?");
			ps.setString(1, login);
			ps.setInt(2, portfolioID);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
			{
				System.out.println(rs.getString("Title"));				
				PortfolioHeader header = new PortfolioHeader();
				header.setId(rs.getInt("Id"));
				header.setTitle(rs.getString("Title"));
				header.setCash(rs.getDouble("Cash"));
				header.setMarketValue(rs.getDouble("MarketValue"));
				header.setRank(rs.getInt("Rank"));
				portfolio.setPortfolioHeader(header);			
				portfolio.setSecurities(SecurityDAC.getSecurities(login, portfolioID, Security.StatusEnum.Confirmed));
				portfolio.setSecuritiesSummed(SecurityDAC.getSecuritiesSummary(login, portfolioID, Security.StatusEnum.Confirmed));
			}
			else
				throw new Exception("Could not find specified portfolio");
			
		} catch (Exception e) {
			e.printStackTrace();
			//throw e;
		}
		
		return portfolio;				
		
		/*dk.ihedge.finance.prices.Asset asset = PriceFeeder.GetAsset("NDA-DKK.CO");				
		asset = PriceFeeder.GetAsset("DSV.CO");*/
		
	}

	public static Portfolio getPortfolioByTournament(String login, int tournamentID) {
		Portfolio portfolio = new Portfolio();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio p left join PortfolioMarketValueView pmv on pmv.PortfolioId = p.Id where p.UserId = ? and p.TournamentId = ?");
			ps.setString(1, login);
			ps.setInt(2, tournamentID);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
			{
				System.out.println(rs.getString("Title"));				
				PortfolioHeader header = new PortfolioHeader();
				header.setId(rs.getInt("Id"));
				header.setTitle(rs.getString("Title"));
				header.setCash(rs.getDouble("Cash"));
				header.setMarketValue(rs.getDouble("MarketValue"));
				header.setRank(rs.getInt("Rank"));
				portfolio.setPortfolioHeader(header);			
				portfolio.setSecurities(SecurityDAC.getSecurities(login, header.getId(), Security.StatusEnum.Confirmed));
				portfolio.setSecuritiesSummed(SecurityDAC.getSecuritiesSummary(login, header.getId(), Security.StatusEnum.Confirmed));
			}
			else
				throw new Exception("Could not find specified portfolio");
			
		} catch (Exception e) {
			e.printStackTrace();
			//throw e;
		}
		
		return portfolio;				
		
		/*dk.ihedge.finance.prices.Asset asset = PriceFeeder.GetAsset("NDA-DKK.CO");				
		asset = PriceFeeder.GetAsset("DSV.CO");*/
		
	}	
	
	public static Portfolio createPortfolio(String login, String portfolioTitle, double startCash) {
		Portfolio portfolio = new Portfolio();
		
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Portfolio.Create](?,?,?)}");
			ps.setString(1, login);			
			ps.setString(2, portfolioTitle);
			ps.setDouble(3, startCash);
			ps.execute();
			
			PortfolioHeader header = new PortfolioHeader();
			header.setTitle(portfolioTitle);
			portfolio.setPortfolioHeader(header);
			//portfolio.setId(id);
			return portfolio;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return portfolio;
	}

	public static void deletePortfolio(String login, int portfolioID) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Portfolio.Delete](?,?)}");
			ps.setString(1, login);			
			ps.setInt(2, portfolioID);
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
