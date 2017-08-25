package com.stelinno.finance.engines.yahoo;

import java.util.List;


public class PriceFeedService extends Thread {
	private static boolean stop = false;
	private String job;
	public static void main(String args[]) throws Exception
	{
		if(args.length == 0)
		{
			System.out.println("Missing argument [job name]");
			System.exit(-1);
		}
		String job = args[0];
		
		Thread t = new PriceFeedService("InvestmentManager Price Feeder", job);
		t.start();
	}
	
	public static synchronized void setStop(boolean stop)
	{
		PriceFeedService.stop = stop;
	}
	
	public static synchronized boolean getStop()
	{
		return PriceFeedService.stop;
	}
	
	public PriceFeedService(String threadName, String job)
	{		
		super(threadName);
		this.job = job;		
	}
	
	public void run()
	{
		Runtime.getRuntime().addShutdownHook(new Thread() 
		{
		    public void run() { PriceFeedService.setStop(true); System.out.println("Shutdown hook called");  }
		});
		
		if(job.equalsIgnoreCase("historical")) {
			//PriceFeeder.UpdateHistoricalPrices();
		}
		else if(job.equalsIgnoreCase("intraday"))
		{					
			while(PriceFeedService.getStop() == false)
			{
				System.out.println("Updating prices....");
				try {
					//PriceFeeder.UpdateIntradayPrices();
					Thread.sleep(10000);
				} catch (Exception e) {					
					e.printStackTrace();
				}				
			}
		}
		else
			System.out.println("Unknown job [" + job + "]");
	}	

}
