package com.stelinno.persistence.aws;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultBHttpClientConnectionFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class AWSDataService implements DataService {
	private static final Gson gson = new Gson();

	public void storeAsset(Asset asset) {
		storeDocument("{\"TableName\":\"Invest_Asset\",\"Item\":" + gson.toJson(asset) + "}");
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

	private void storeDocument(String jsonString) {
		postJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_StoreDocNJS", jsonString);
	}
	
	private String getDocuments(String jsonString) {
		return postJson("https://81kkzuo344.execute-api.eu-central-1.amazonaws.com", "prod/Invest_GetDocsNJS", jsonString);
	}	

	private String postJson(String baseUri, String apiMethod, String payload) {
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

	public static void main(String[] args) {
		Asset asset = new Asset();
		asset.Symbol = "DELME";
		//asset.MarketValue = "10000";
		asset.Id = "999";
		//new AWSDataService().StoreAsset(asset);
		new AWSDataService().getAssets();
	}
}
