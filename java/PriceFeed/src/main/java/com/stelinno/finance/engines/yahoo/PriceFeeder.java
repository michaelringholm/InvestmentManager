package com.stelinno.finance.engines.yahoo;

import java.util.List;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import com.stelinno.finance.entities.yahoo.Value;
import com.stelinno.finance.entities.yahoo.YahooFinance;

public class PriceFeeder {

	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		System.out.println("Started");
		//https://query1.finance.yahoo.com/v7/finance/download/AMD?period1=1500879228&period2=1503557628&interval=1d&events=history&crumb=glNbiRiTdMW
		String url = "http://chartapi.finance.yahoo.com/instrument/1.0/NDA-DKK.CO/chartdata;type=quote;range=1d/xml/";
		//http://finance.yahoo.com/d/quotes.csv?s=AAPL+GOOG+MSFT
		//http://www.jarloo.com/yahoo_finance/
		//https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json
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
		finally {
			//client.
		}
	}

}
