package com.stelinno.finance.engines;

import org.springframework.beans.factory.annotation.Autowired;

import com.stelinno.persistence.Asset;
import com.stelinno.persistence.Asset.StatusEnum;
import com.stelinno.persistence.DataService;

public class AssetUpdater {
	@Autowired private PriceEngine priceEngine;
	@Autowired private DataService dataService;

	public int updateSymbols(int count) {
		int updateCount = 0;
		for(Asset asset : dataService.getIncompleteAssets(count)) {
			updateSymbol(asset);
			updateCount++;
		}
		
		return updateCount;
	}

	private void updateSymbol(Asset asset) {
		asset.Symbol = priceEngine.getSymbol(asset.Isin);
		asset.AssetState = StatusEnum.COMPLETE;
		dataService.storeAsset(asset);		
	}
}
