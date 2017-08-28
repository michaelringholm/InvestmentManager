package com.stelinno.finance.engines;

import java.util.List;

import com.stelinno.finance.entities.Price;

public interface PriceEngine {
	public List<Price> getPrices(String priceSource);
	public Price getPriceByISIN(String isin);
	public String getSymbol(String isin);
}
