package com.stelinno.finance.mappers;

import java.util.Date;

import com.stelinno.finance.entities.Price;
import com.stelinno.persistence.Asset;

public class AssetMapper {

	public Asset toAsset(Price price) {
		Asset asset = new Asset();
		asset.AssetCategoryTitle = "UNKNOWN";
		asset.Quote = price.Price;
		asset.Isin = price.Isin;
		asset.Title = price.Name;
		asset.Volume = price.Volume;
		asset.Change = price.Performance;
		asset.LastUpdate = new Date();
		asset.AssetState = Asset.StatusEnum.INCOMPLETE;
		asset.PriceUrl = price.PriceUrl;
		return asset;
	}

}
