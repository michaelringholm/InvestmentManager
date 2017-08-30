package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author mrs
 */
public class DAC
{
	public static void main(String[] args) 
	{
		/*try 
		{
			Connection conn = getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Category");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("title"));
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		CategoryDAC.GetCategories();
		AssetDAC.GetAssets(1);
		PortfolioDAC.GetPortfolios("FBLOGIN1");
	}

    static synchronized Connection getDBConnection() throws Exception
    {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver").newInstance();
        return DriverManager.getConnection(
        "jdbc:sqlserver://188.121.60.77\\sqlexpress2008r2;databaseName=InvestmentManager"
        , "ihedge"
        , "iBrain4ever"
        );
        /*return DriverManager.getConnection(
                "jdbc:sqlserver://192.168.1.100\\sqlexpress2008;databaseName=InvestmentManager"
                , "sa"
                , "iBrain4ever"
                );*/
    }


}
