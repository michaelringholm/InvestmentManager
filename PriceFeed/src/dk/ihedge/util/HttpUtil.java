package dk.ihedge.util;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;

public class HttpUtil {
	public static String DownloadAsString(String url) throws Exception
	{
		HttpClient client = new DefaultHttpClient();
		HttpGet response = new HttpGet(url);
		ResponseHandler<String> handler = new BasicResponseHandler();
		String source = client.execute(response, handler);
		
		return source;
	}
}
