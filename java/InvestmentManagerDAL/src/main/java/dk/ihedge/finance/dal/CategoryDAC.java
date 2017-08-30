package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import dk.ihedge.finance.dtl.Category;

public class CategoryDAC {

	public static List<Category> GetCategories()
	{
		List<Category> categories = new ArrayList<Category>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Category");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("title"));
				Category cat = new Category();
				cat.setId(rs.getInt("Id"));
				cat.setTitle(rs.getString("Title"));
				categories.add(cat);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return categories;
	}
}
