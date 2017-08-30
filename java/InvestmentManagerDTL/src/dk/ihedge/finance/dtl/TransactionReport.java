package dk.ihedge.finance.dtl;

import java.util.List;

public class TransactionReport 
{
	private List<Security> securities;
	private double totalBuy;
	private double totalSell;
	
	public List<Security> getSecurities() {
		return securities;
	}
	public void setSecurities(List<Security> securities) {
		this.securities = securities;
	}
	public double getTotalBuy() {
		return totalBuy;
	}
	public void setTotalBuy(double totalBuy) {
		this.totalBuy = totalBuy;
	}
	public double getTotalSell() {
		return totalSell;
	}
	public void setTotalSell(double totalSell) {
		this.totalSell = totalSell;
	}
}
