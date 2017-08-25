package com.stelinno.persistence.aws;

import java.util.List;

public interface DataService {
	public List<Asset> getAssets();
	public void storeAsset(Asset asset);
}
