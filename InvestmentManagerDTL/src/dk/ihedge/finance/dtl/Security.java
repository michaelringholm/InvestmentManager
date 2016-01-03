package dk.ihedge.finance.dtl;

public class Security extends Asset {
	public enum StatusEnum { Confirmed, NotConfirmed };
	
	private int id;
	private int position;	
	private double purchaceQuote;
	private double purchaseAmount;
	private int portfolioId;
	private StatusEnum status;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}

	public double getPurchaceQuote() {
		return purchaceQuote;
	}
	public void setPurchaceQuote(double purchaceQuote) {
		this.purchaceQuote = purchaceQuote;
	}
	public double getPurchaseAmount() {
		return purchaseAmount;
	}
	public void setPurchaseAmount(double purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}
	public int getPortfolioId() {
		return portfolioId;
	}
	public void setPortfolioId(int portfolioId) {
		this.portfolioId = portfolioId;
	}
	public StatusEnum getStatus() {
		return status;
	}
	public void setStatus(StatusEnum status) {
		this.status = status;
	}

}
