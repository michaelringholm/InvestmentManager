package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import dk.ihedge.finance.dtl.Security;
import dk.ihedge.finance.dtl.Security.StatusEnum;
import dk.ihedge.finance.dtl.TransactionReport;

public class SecurityDAC {	
	
	public static List<Security> getSecuritiesSummary(String login, int portfolioID, Security.StatusEnum status)
	{		
		List<Security> securities = new ArrayList<Security>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select ssv.*, c.Title as CategoryTitle from SecuritiesSummaryView ssv join CategoryAsset ca on ssv.AssetId = ca.AssetId join Category c on c.Id = ca.CategoryId Where UserId = ? and [Status] = ? and PortfolioId = ?");
			ps.setString(1, login);
			ps.setString(2, status.toString());
			ps.setInt(3, portfolioID);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				Security security = new Security();
				security.setId(rs.getInt("Id"));
				security.setSymbol(rs.getString("Symbol"));
				security.setTitle(rs.getString("Title"));
				security.setQuote(rs.getDouble("Quote"));
				security.setAnualVolatility(rs.getDouble("AnnualVolatility"));
				security.setAvgVoltatility(rs.getDouble("AvgVolatility"));
				security.setDailyVolatility(rs.getDouble("DailyVolatility"));
				security.setPurchaceQuote(rs.getDouble("PurchaseQuote"));
				security.setPurchaseAmount(rs.getDouble("PurchaseAmount"));
				security.setPosition(rs.getInt("Position"));
				security.setPortfolioId(rs.getInt("portfolioId"));
				security.setCategoryTitle(rs.getString("CategoryTitle"));
				securities.add(security);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return securities;
	}
	
	public static List<Security> getSecurities(String login, int portfolioID, Security.StatusEnum status)
	{		
		List<Security> securities = new ArrayList<Security>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select s.*, a.*, c.Title as CategoryTitle from Security s inner join Asset a on a.Id = s.AssetId inner join Portfolio p on s.PortfolioId = p.Id join CategoryAsset ca on a.Id = ca.AssetId join Category c on c.Id = ca.CategoryId where UserId = ? and s.Status = ? and PortfolioId = ?");
			ps.setString(1, login);
			ps.setString(2, status.toString());
			ps.setInt(3, portfolioID);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("Symbol"));
				Security security = new Security();
				security.setId(rs.getInt("Id"));
				security.setSymbol(rs.getString("Symbol"));
				security.setTitle(rs.getString("Title"));
				security.setQuote(rs.getDouble("Quote"));
				security.setAnualVolatility(rs.getDouble("AnnualVolatility"));
				security.setAvgVoltatility(rs.getDouble("AvgVolatility"));
				security.setDailyVolatility(rs.getDouble("DailyVolatility"));
				security.setPurchaceQuote(rs.getDouble("PurchaseQuote"));
				security.setPurchaseAmount(rs.getDouble("PurchaseAmount"));
				security.setPosition(rs.getInt("Position"));
				security.setPortfolioId(rs.getInt("portfolioId"));
				security.setCategoryTitle(rs.getString("CategoryTitle"));
				securities.add(security);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return securities;
	}
	
	

	public static void buySecurity(String login, Security security) {		
		buySellSecurity(login, security);
	}

	public static void sellSecurity(String login, Security security) {
		security.setPosition(security.getPosition()*-1);
		buySellSecurity(login, security);
	}
	
	private static void buySellSecurity(String login, Security security)
	{
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Security.BuySell](?,?,?,?,?,?)}");
			ps.setString(1, login);			
			ps.setString(2, security.getSymbol());
			ps.setInt(3, security.getPosition());
			ps.setDouble(4, security.getQuote());
			ps.setInt(5, security.getPortfolioId());
			ps.setString(6, security.getStatus().toString());
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void amendUnconfirmedSecurity(String login, Security security) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Security.Amend](?,?,?,?,?)}");
			ps.setString(1, login);			
			ps.setString(2, security.getSymbol());
			ps.setInt(3, security.getPosition());
			ps.setDouble(4, security.getQuote());
			ps.setInt(5,  security.getId());
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void removeUnconfirmedSecurity(String login, int securityID) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Security.Remove](?,?)}");
			ps.setString(1, login);			
			ps.setInt(2, securityID);
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static TransactionReport confirmSecurities(String login, int portfolioID) {
		TransactionReport transactionReport = new TransactionReport();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Security.Confirm](?,?)}");
			ps.setString(1, login);			
			ps.setInt(2, portfolioID);
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return transactionReport;
	}
	
	public static TransactionReport removeUnconfirmedSecurities(String login, int portfolioID) {
		TransactionReport transactionReport = new TransactionReport();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Security.RemoveAllUnconfirmed](?,?)}");
			ps.setString(1, login);			
			ps.setInt(2, portfolioID);
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return transactionReport;
	}


}
