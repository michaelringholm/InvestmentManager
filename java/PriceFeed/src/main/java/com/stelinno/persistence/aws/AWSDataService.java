package com.stelinno.persistence.aws;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.HashMap;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.stelinno.http.HTTPHelper;
import com.stelinno.http.SimpleHTTPResponse;
import com.stelinno.persistence.Asset;
import com.stelinno.persistence.AssetCategoryMapping;
import com.stelinno.persistence.DataService;

public class AWSDataService implements DataService {
	@Autowired private Gson gson;
	@Autowired private HTTPHelper httpHelper;

	public void storeAsset(Asset asset) {
		storeDocument("{\"TableName\":\"Invest_Asset\",\"Item\":" + gson.toJson(asset) + "}");
	}
	
	public void storeAssetAsync(Asset asset) {
		ExecutorService executor = Executors.newSingleThreadExecutor();
		executor.submit(() -> {
			storeAsset(asset);
		});
	}
	
	@Override
	public int updateAssetCategories() {
		int updatedAssets = 0;
		Map<String, AssetCategoryMapping> assetCategoryMap = new HashMap<>();
        List<AssetCategoryMapping> assetCategoryMappings = getAssetCategoryMap();
        if(assetCategoryMappings != null) {
	        for(AssetCategoryMapping assetCategoryMapping : assetCategoryMappings)
	        	assetCategoryMap.put(assetCategoryMapping.Isin, assetCategoryMapping);
	        List<Asset> assets = getAssets();
	        for(Asset asset : assets) {
	        	if(assetCategoryMap.containsKey(asset.Isin)) {
	        		asset.AssetCategoryTitle = assetCategoryMap.get(asset.Isin).AssetCategoryTitle;
	        		storeAsset(asset);
	        		updatedAssets++;
	        	}
	        }
        }
        
        return updatedAssets;
	}

	
    private List<AssetCategoryMapping> getAssetCategoryMap()
    {
        String json = "{ \"TableName\":\"Invest_AssetCategoryMap\" }";
        String jsonDocuments = getDocuments(json);
        Type listType = new TypeToken<ArrayList<AssetCategoryMapping>>(){}.getType();
        List<AssetCategoryMapping> assetCategoryMappings = new Gson().fromJson(jsonDocuments, listType);
        return assetCategoryMappings;
    }	
	
    public List<Asset> getAssets()
    {
        String json = "{ \"TableName\":\"Invest_Asset\" }";
        String jsonDocuments = getDocuments(json);
        //var assets = JsonConvert.DeserializeObject<List<Asset>>(documents.ToString());
        Type listType = new TypeToken<ArrayList<Asset>>(){}.getType();
        List<Asset> assets = new Gson().fromJson(jsonDocuments, listType);
        return assets;
    }
    
    public List<Asset> getIncompleteAssets(int limit)
    {
        String json = "{ \"TableName\":\"Invest_Asset\", \"FilterExpr\":\"AssetState = :assetState\", \"ExprAttrVals\":{ \":assetState\": \"INCOMPLETE\"} }";
        String jsonDocuments = getDocuments(json);
        Type listType = new TypeToken<ArrayList<Asset>>(){}.getType();
        List<Asset> assets = new Gson().fromJson(jsonDocuments, listType);
        if(assets != null && assets.size()>=limit)
        	return assets.subList(0, limit);
        else
        	return assets;
    }

	private void storeDocument(String jsonString) {
		postJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_StoreDocNJS", jsonString);
	}
	
	private String getDocuments(String jsonString) {
		return postJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_GetDocsNJS", jsonString);
	}	

	@Deprecated
	private String postJsonOld(String baseUri, String apiMethod, String payload) {
		try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
			HttpPost request = new HttpPost(baseUri + "/" + apiMethod);
			StringEntity params = new StringEntity(payload, "UTF-8");
			request.addHeader("Content-Type", "application/json");
			request.addHeader("x-api-key", "maZYMtpzBw6PEscbRQASw8er5uvtiBaT8trhSoy6");
			request.setEntity(params);
			HttpResponse result = httpClient.execute(request);
			String json = EntityUtils.toString(result.getEntity(), "UTF-8");
			System.out.println(json);
			return json;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}		
	}
	
	private String postJson(String baseUri, String apiMethod, String payload) {
		Map<String, String> headers = new HashMap<>();
		headers.put("x-api-key", "maZYMtpzBw6PEscbRQASw8er5uvtiBaT8trhSoy6");
		SimpleHTTPResponse simpleResponse =  httpHelper.postJson(payload, baseUri + "/" + apiMethod, headers);
		
		if(simpleResponse != null && simpleResponse.payload != null) {
			System.out.println(simpleResponse.payload);
			return simpleResponse.payload.toString();
		}
		else
			return null;
	}	

	public static void main(String[] args) {
		Asset asset = new Asset();
		asset.Symbol = "DELME";
		//asset.MarketValue = "10000";
		asset.Id = "999";
		//new AWSDataService().StoreAsset(asset);
		new AWSDataService().getAssets();
	}

}
