package com.stelinno.finance.mappers;

import com.stelinno.finance.entities.Price;
import com.stelinno.persistence.Asset;

public class AssetMapper {

	public Asset toAsset(Price price) {
		Asset asset = new Asset();
		asset.AssetCategoryTitle = "UNKNOWN";
		asset.Quote = price.Price;
		asset.Symbol = price.Symbol;
		asset.Title = price.Name;
		asset.Volume = price.Volume;
		asset.Change = price.Performance;
		return asset;
	}

}
