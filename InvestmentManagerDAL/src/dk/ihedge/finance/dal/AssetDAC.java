package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import dk.ihedge.finance.dtl.Asset;
import dk.ihedge.finance.dtl.Portfolio;
import dk.ihedge.finance.dtl.YahooHistoricalPrice;

public class AssetDAC {
	public static List<Asset> GetAssets(int categoryId)
	{
		List<Asset> assets = new ArrayList<Asset>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select a.*, c.Title as CategoryTitle from Asset a join CategoryAsset ca on a.id = ca.AssetId join Category c on c.Id = ca.CategoryId where ca.CategoryId = ?");
			ps.setInt(1, categoryId);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("Symbol"));
				Asset asset = new Asset();
				asset.setId(rs.getInt("Id"));
				asset.setSymbol(rs.getString("Symbol"));
				asset.setTitle(rs.getString("Title"));
				asset.setQuote(rs.getDouble("Quote"));
				asset.setAnualVolatility(rs.getDouble("AnnualVolatility"));
				asset.setAvgVoltatility(rs.getDouble("AvgVolatility"));
				asset.setDailyVolatility(rs.getDouble("DailyVolatility"));
				asset.setChange(rs.getDouble("Change"));
				asset.setVolume(rs.getDouble("Volume"));
				asset.setCategoryTitle(rs.getString("CategoryTitle"));
				assets.add(asset);		
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return assets;
	}
	
	public static List<Asset> GetAssets()
	{
		List<Asset> assets = new ArrayList<Asset>();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select a.* from Asset a");
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				System.out.println(rs.getString("Symbol"));
				Asset asset = new Asset();
				asset.setId(rs.getInt("Id"));
				asset.setSymbol(rs.getString("Symbol"));
				asset.setTitle(rs.getString("Title"));
				asset.setQuote(rs.getDouble("Quote"));
				asset.setAnualVolatility(rs.getDouble("AnnualVolatility"));
				asset.setAvgVoltatility(rs.getDouble("AvgVolatility"));
				asset.setDailyVolatility(rs.getDouble("DailyVolatility"));
				asset.setChange(rs.getDouble("Change"));
				asset.setVolume(rs.getDouble("Volume"));
				assets.add(asset);		
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return assets;
	}	
	
	
	public static void StoreHistorical(YahooHistoricalPrice histAsset)
	{
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Asset.StoreHistorical](?,?,?,?,?,?,?,?)}");
			ps.setString(1, histAsset.Symbol);			
			ps.setDouble(2, histAsset.AdjClose);
			ps.setDouble(3, histAsset.Close);
			ps.setDouble(4, histAsset.High);
			ps.setDouble(5, histAsset.Low);
			ps.setDouble(6, histAsset.Open);
			ps.setDouble(7, histAsset.Volume);
			ps.setDate(8, histAsset.Date);
			ps.execute();

			//histAsset.setId(id);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void addToFavorites(String login, int assetID) {
		// TODO Auto-generated method stub
		
	}

	public static void removeFromFavorites(String login, int assetID) {
		// TODO Auto-generated method stub
		
	}

	public static void updateQuotes(Asset asset) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Asset.UpdateQuotes](?,?,?,?,?)}");
			ps.setString(1, asset.getSymbol());			
			ps.setDouble(2, asset.getQuote());
			ps.setDouble(3, asset.getPreviousClose());
			ps.setDouble(4, asset.getChange());
			ps.setDouble(5, asset.getVolume());
			/*ps.setDouble(3, histAsset.Close);
			ps.setDouble(4, histAsset.High);
			ps.setDouble(5, histAsset.Low);
			ps.setDouble(6, histAsset.Open);
			ps.setDouble(7, histAsset.Volume);
			ps.setDate(8, histAsset.Date);*/
			ps.execute();

			//histAsset.setId(id);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void AddAsset(Asset asset) {
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Asset.Add](?,?,?)}");
			ps.setString(1, asset.getSymbol());
			ps.setString(2, asset.getTitle());
			ps.setDouble(3, asset.getQuote());
			ps.execute();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
