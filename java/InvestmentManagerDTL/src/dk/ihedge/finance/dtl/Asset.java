package dk.ihedge.finance.dtl;

public class Asset {
	private int id;
	private String symbol;
	private double quote;
	private double marketValue;
	private double anualVolatility;
	private double avgVoltatility;
	private double dailyVolatility;
	private double previousClose;
	private double change;
	private double volume;
	private String title;
	private String categoryTitle;
	
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public double getQuote() {
		return quote;
	}
	public void setQuote(double quote) {
		this.quote = quote;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public double getAnualVolatility() {
		return anualVolatility;
	}
	public void setAnualVolatility(double anualVolatility) {
		this.anualVolatility = anualVolatility;
	}
	public double getAvgVoltatility() {
		return avgVoltatility;
	}
	public void setAvgVoltatility(double avgVoltatility) {
		this.avgVoltatility = avgVoltatility;
	}
	public double getDailyVolatility() {
		return dailyVolatility;
	}
	public void setDailyVolatility(double dailyVolatility) {
		this.dailyVolatility = dailyVolatility;
	}
	public double getMarketValue() {
		return marketValue;
	}
	public void setMarketValue(double marketValue) {
		this.marketValue = marketValue;
	}
	public double getPreviousClose()
	{
		return previousClose;
	}
	public void setPreviousClose(double previousClose) {
		this.previousClose = previousClose;
	}
	public void setChange(double change) {
		this.change = change;
	}
	public double getChange()
	{
		return change;
	}
	public double getVolume() {
		return volume;
	}
	public void setVolume(double volume) {
		this.volume = volume;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTitle() {
		return this.title;
	}
	public String getCategoryTitle() {
		return categoryTitle;
	}
	public void setCategoryTitle(String categoryTitle) {
		this.categoryTitle = categoryTitle;
	}
}
