package dk.ihedge.finance.dtl;

import java.util.ArrayList;
import java.util.List;

public class Portfolio {
	private PortfolioHeader portfolioHeader;
	private List<Security> securities = new ArrayList<Security>();	
	private List<Security> securitiesSummed = new ArrayList<Security>();	

	public List<Security> getSecurities() {
		return securities;
	}
	public void setSecurities(List<Security> securities) {
		this.securities = securities;
	}
	public List<Security> getSecuritiesSummed() {
		return securitiesSummed;
	}
	public void setSecuritiesSummed(List<Security> securitiesSummed) {
		this.securitiesSummed = securitiesSummed;
	}
	public PortfolioHeader getPortfolioHeader() {
		return portfolioHeader;
	}
	public void setPortfolioHeader(PortfolioHeader portfolioHeader) {
		this.portfolioHeader = portfolioHeader;
	}
	
}
