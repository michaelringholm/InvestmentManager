package dk.ihedge.finance.dal;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import dk.ihedge.finance.dtl.Category;
import dk.ihedge.finance.dtl.Portfolio;

public class UserDAC {

	public static void login(String login) throws Exception {		
		
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [User.Login](?)}");
			ps.setString(1, login);			
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("Login failed");
		}
	}
	
	public static int getUserId(String login) throws Exception {		
		
		try 
		{
			Connection conn = DAC.getDBConnection();
			CallableStatement cs = conn.prepareCall("{call [User.GetId](?,?)}");						
			cs.setString(1, login);
			cs.registerOutParameter(2, java.sql.Types.INTEGER);
			cs.execute();
			
			int userId = cs.getInt(2);
			return userId;
			
		} catch (Exception e) {
			throw new Exception("Unable to retrieve user id");
		}
	}	
}
