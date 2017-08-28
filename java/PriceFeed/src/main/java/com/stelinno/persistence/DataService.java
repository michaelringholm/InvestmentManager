package com.stelinno.persistence;

import java.util.List;

public interface DataService {
	public List<Asset> getAssets();
	public List<Asset> getIncompleteAssets(int count);
	public void storeAsset(Asset asset);
	public void storeAssetAsync(Asset asset);
	public int updateAssetCategories();
}
