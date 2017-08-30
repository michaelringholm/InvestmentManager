package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import dk.ihedge.finance.dtl.Security;

public class ShoppingCartDAC {

	public static List<Security> getItems(String userId) {
		List<Security> items = new ArrayList<Security>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio where UserId = ?");
			ps.setString(1, userId);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				Security security = new Security();
				security.setId(rs.getInt("Id"));
				items.add(security);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return items;
	}

	public static void updateItem(String userId, Security security) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [ShoppingCart.StoreShoppingCartItem](?,?,?,?)}");
			ps.setString(1, userId);			
			ps.setString(2, security.getSymbol());
			ps.setInt(3, security.getPosition());
			ps.setDouble(4, security.getQuote());
			ps.execute();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	
	
	public static void main(String[] args)
	{
		Security sec = new Security();
		sec.setSymbol("DSV.CO");
		sec.setPosition(25);
		sec.setQuote(10.25);
		
		updateItem("FBLOGIN1", sec);
		
	}

	public static void confirm(String userId, int portfolioId) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [ShoppingCart.Confirm](?,?)}");
			ps.setString(1, userId);			
			ps.setInt(2, portfolioId);
			ps.execute();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}				
	}

}
