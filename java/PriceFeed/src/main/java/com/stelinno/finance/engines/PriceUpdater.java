package com.stelinno.finance.engines;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.stelinno.finance.mappers.AssetMapper;
import com.stelinno.finance.entities.Price;
import com.stelinno.persistence.Asset;
import com.stelinno.persistence.DataService;

public class PriceUpdater {
	@Autowired private PriceEngine priceEngine;
	@Autowired private DataService dataService;
	@Autowired private AssetMapper assetMapper;

	public void updatePrices() {
		String[] priceSources = {"https://borsen.dk/kurser/danske_aktier/c20_cap.html",
		"https://borsen.dk/kurser/europaeiske_aktier/cac_40.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=2&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=3&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc" };

		List<Price> prices = new ArrayList<>();
		for(String priceSource : priceSources)
			prices.addAll(priceEngine.getPrices(priceSource));
		
		Map<String, Asset> assetMap = new HashMap<>();
		for(Asset asset : dataService.getAssets())
			assetMap.put(asset.Symbol, asset);
		
		for(Price price : prices) {
			Asset asset = assetMap.get(price.Symbol);
			if(asset == null)
				asset = assetMapper.toAsset(price);
			else {
				asset.Quote = price.Price;
				asset.Change = price.Performance;
				asset.Isin = price.Isin;
			}
			dataService.storeAsset(asset);
		}
		System.out.println("Done!");
	}
	
	public static void main(String[] args) {	
		new PriceUpdater().updatePrices();
	}
}
