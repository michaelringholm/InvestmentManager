package com.stelinno.finance.engines;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import com.stelinno.finance.mappers.AssetMapper;
import com.stelinno.finance.entities.Price;
import com.stelinno.persistence.Asset;
import com.stelinno.persistence.DataService;

public class PriceUpdater {
	@Autowired private PriceEngine priceEngine;
	@Autowired private DataService dataService;
	@Autowired private AssetMapper assetMapper;
	@Autowired private Integer invocationCount;
	private final Logger logger = Logger.getLogger(this.getClass().getName());

	public void updatePrices() {
		String[] priceSources = {"https://borsen.dk/kurser/danske_aktier/c20_cap.html",
		"https://borsen.dk/kurser/europaeiske_aktier/cac_40.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=2&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=3&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc" };
		//String[] priceSources = {"https://borsen.dk/kurser/danske_aktier/c20_cap.html"};

		invocationCount++;
		logger.info(String.format("Invocation counter is %d", invocationCount));
		List<Price> prices = new ArrayList<>();
		for(String priceSource : priceSources) {
			logger.info(String.format("Getting prices from %s", priceSource));
			prices.addAll(priceEngine.getPrices(priceSource));
		}
		
		Map<String, Asset> assetMap = new HashMap<>();
		for(Asset asset : dataService.getAssets())
			assetMap.put(asset.Isin, asset);
		
		for(Price price : prices) {
			Asset asset = assetMap.get(price.Isin);
			if(asset == null)
				asset = assetMapper.toAsset(price);
			else {
				asset.Quote = price.Price;
				asset.Change = price.Performance;
				asset.Volume = price.Volume;
				asset.PriceUrl = price.PriceUrl;
				asset.LastUpdate = new Date();
			}
			//dataService.storeAssetAsync(asset);
			dataService.storeAsset(asset);
		}
		System.out.println("Done!");
	}
	
	public void updatePricesAsync() {
		ExecutorService executor = Executors.newSingleThreadExecutor();
		executor.submit(() -> {
			updatePrices();
		});
	}
	
	public static void main(String[] args) {	
		new PriceUpdater().updatePrices();
	}
}
