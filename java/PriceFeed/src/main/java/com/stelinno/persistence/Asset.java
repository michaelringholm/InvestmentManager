package com.stelinno.persistence;

import java.util.Date;

public class Asset
{
    public enum	StatusEnum { INCOMPLETE, COMPLETE }
	public String Id;
    public String Symbol;
    public String Isin;
    public String Title;
    public String Quote;
    public String MarketValue;
    public String Change;
    public String PreviousClose;        
    public String Volume;
    public String AssetCategoryTitle;
	public StatusEnum AssetState;
	public Date LastUpdate;
	public String PriceUrl;

    //public String AnualVolatility;
    //private double avgVoltatility;
    //private string categoryTitle;
    //private double dailyVolatility;
}
