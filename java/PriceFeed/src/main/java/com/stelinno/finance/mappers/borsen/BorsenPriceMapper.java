package com.stelinno.finance.mappers.borsen;

import com.stelinno.finance.entities.Price;
import com.stelinno.finance.entities.borsen.BorsenPrice;

public class BorsenPriceMapper {

	public Price toPrice(BorsenPrice borsenPrice) {
		Price price = new Price();
		price.Ask = borsenPrice.ASK;
		price.Bid = borsenPrice.BID;
		price.High = borsenPrice.HIGH;
		price.Isin = borsenPrice.ISIN;
		price.Low = borsenPrice.LOW;
		price.Name = borsenPrice.OFFICIAL_NAME_SECURITY;
		price.Performance = borsenPrice.PERFORMANCE;
		price.PerformancePct = borsenPrice.PERFORMANCE_PCT;
		price.Price = borsenPrice.PRICE;
		price.Symbol = borsenPrice.SYMBOL.toUpperCase().trim();
		price.Volume = borsenPrice.VOLUME;
		price.YTD = borsenPrice.YDT;
		return price;
	}

}
