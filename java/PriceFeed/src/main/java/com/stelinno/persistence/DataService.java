package com.stelinno.persistence;

import java.util.List;

public interface DataService {
	public List<Asset> getAssets();
	public void storeAsset(Asset asset);
	public void updateAssetCategories();
}
