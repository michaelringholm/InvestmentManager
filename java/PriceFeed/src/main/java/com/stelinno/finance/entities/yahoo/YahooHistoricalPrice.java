package com.stelinno.finance.entities.yahoo;

import java.sql.Date;

public class YahooHistoricalPrice {
	public Date Date;	
	public Double Open;
	public Double High;	
	public Double Low;	
	public Double Close;	
	public int Volume;	
	public Double AdjClose;
	
	public String Symbol;
	
	/*public void setValue(String dataVal, int count) {
		switch(count)
		{
			case 0 : Date = dataVal; break;
			case 1 : Open = dataVal; break;
			case 2 : High = dataVal; break;
			case 3 : Low = dataVal; break;
			case 4 : Close = dataVal; break;
			case 5 : Volume = dataVal; break;
			case 6 : AdjClose = dataVal; break;
		}
	}*/
}
