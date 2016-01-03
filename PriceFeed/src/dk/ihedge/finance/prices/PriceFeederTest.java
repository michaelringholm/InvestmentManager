package dk.ihedge.finance.prices;

import static org.junit.Assert.*;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.junit.Test;

public class PriceFeederTest {

	@Test
	public void testGetSymbols() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetHistoricalPricesCSV() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetISINCodes() throws Exception {
		String html = FileUtils.readFileToString(new File("E:\\Subversion\\Sandbox\\InvestmentManager\\Database\\Data\\DK Large and Mid Cap.txt"));
		PriceFeeder.GetISINCodes(html);
	}
	
	@Test
	public void testGetSymbolsByISIN() throws Exception {
		PriceFeeder.GetSymbolsByISIN("DK0015205637");
	}
	
	@Test
	public void testGetYahooAsset() throws Exception {
		PriceFeeder.GetYahooAsset("DANT.CO");
	}

	@Test
	public void testAddAssets() throws Exception {
		PriceFeeder.AddAssets();
	}
	
	@Test
	public void UpdateIntradayPrices() throws Exception {
		PriceFeeder.UpdateIntradayPrices();
	}
}
