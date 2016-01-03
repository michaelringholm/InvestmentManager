package dk.ihedge.finance.prices;

import java.io.File;
import java.util.List;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import dk.ihedge.finance.prices.yahoo.Value;
import dk.ihedge.finance.prices.yahoo.YahooFinance;

public class PriceFeeder {

	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		System.out.println("Started");
		String url = "http://chartapi.finance.yahoo.com/instrument/1.0/NDA-DKK.CO/chartdata;type=quote;range=1d/xml/";
		HttpClient client = new DefaultHttpClient();
		HttpGet response = new HttpGet(url);
		ResponseHandler<String> handler = new BasicResponseHandler();
		
		try 
		{
			String yahooXmlSource = client.execute(response, handler);
			
			Serializer serializer = new Persister();
			System.out.println("Deserializing.......");
			boolean strictParsing = false;
			YahooFinance yahooFinance = serializer.read(YahooFinance.class, yahooXmlSource, strictParsing);
			
			System.out.println("Type = " + yahooFinance.getReferenceMeta().getType());
			System.out.println("Min = " + yahooFinance.getReferenceMeta().getMin());
			System.out.println("Max = " + yahooFinance.getReferenceMeta().getMax());
			List<Value> valueList = yahooFinance.getSeries().getValueList();
			
			for(Value val : valueList)
			{
				System.out.println("----------------------------");
				System.out.println("ID = " + val.getId());
				System.out.println("Min = " + val.getMin());
				System.out.println("Max = " + val.getMax());
				System.out.println("----------------------------");
			}
			
			
			System.out.println("Done");
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}

}
