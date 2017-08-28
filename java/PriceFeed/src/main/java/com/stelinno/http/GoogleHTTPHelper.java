package com.stelinno.http;

import java.io.IOException;
import java.net.URL;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.google.apphosting.api.ApiProxy;
import com.stelinno.http.HTTPHelper;

public class GoogleHTTPHelper implements HTTPHelper {
	private static final Logger logger = Logger.getLogger(GoogleHTTPHelper.class.getName());
	
	/***
	 * https://cloud.google.com/appengine/docs/standard/java/issue-requests
	 * @param service
	 * @param targetUrl
	 * @return
	 */
	public SimpleHTTPResponse getHtml(String targetUrl) {
		SimpleHTTPResponse simpleHTTPResponse = new SimpleHTTPResponse();
		int retryCount = 0;
		boolean doRetry = true;
		
		while(doRetry) {
			try {
				URLFetchService urlFetch = URLFetchServiceFactory.getURLFetchService();
				URL url = new URL(targetUrl);
				HTTPRequest httpRequest = new HTTPRequest(url, HTTPMethod.GET);
				httpRequest.addHeader(new HTTPHeader("X-Appengine-Inbound-Appid", ApiProxy.getCurrentEnvironment().getAppId()));
				//httpRequest.setHeader(new HTTPHeader("Content-Type", "application/json; charset=UTF-8"));
				HTTPResponse httpResp = urlFetch.fetch(httpRequest);
				String content = new String(httpResp.getContent());
				simpleHTTPResponse.statusCode = httpResp.getResponseCode();
				simpleHTTPResponse.payload = content;
				simpleHTTPResponse.reason = "";				
				logger.log(Level.INFO, String.format("The http response code from the server was %d", simpleHTTPResponse.statusCode));
				doRetry = false;
			} 
			catch(java.net.SocketTimeoutException stex){
				retryCount++;
				if(retryCount>3)
					logger.log(Level.SEVERE, stex.getMessage(), stex);
				else
					logger.log(Level.INFO, "Retrying connect to URL...");
			}
			catch (IOException ioe) {
				retryCount++;
				if(retryCount>3)
					logger.log(Level.SEVERE, ioe.getMessage(), ioe);
				else
					logger.log(Level.INFO, "Retrying connect to URL...");
			}
			finally {
				if(retryCount>3)
					doRetry = false;
			}
		}

		return simpleHTTPResponse;
	}

	public SimpleHTTPResponse postJson(String json, String targetUrl, Map<String, String> headers) {
		SimpleHTTPResponse simpleHTTPResponse = new SimpleHTTPResponse();
		
		try {
			URLFetchService urlFetch = URLFetchServiceFactory.getURLFetchService();
			URL url = new URL(targetUrl);
			HTTPRequest httpRequest = new HTTPRequest(url, HTTPMethod.POST);
			httpRequest.addHeader(new HTTPHeader("X-Appengine-Inbound-Appid", ApiProxy.getCurrentEnvironment().getAppId()));
			if(headers != null) {
				Iterator<String> headerIter = headers.keySet().iterator();
				while(headerIter.hasNext()) {
					String key = headerIter.next();
					httpRequest.addHeader(new HTTPHeader(key, headers.get(key)));
				}
			}
			httpRequest.setPayload(json.getBytes());
			httpRequest.setHeader(new HTTPHeader("Content-Type", "application/json; charset=UTF-8"));
			HTTPResponse httpResp = urlFetch.fetch(httpRequest);
			String content = new String(httpResp.getContent());
			simpleHTTPResponse.statusCode = httpResp.getResponseCode();
			simpleHTTPResponse.payload = content;
			simpleHTTPResponse.reason = "";
			
			logger.log(Level.INFO, String.format("The http response from the server was %s", content));
		} catch (Exception e) {
			logger.log(Level.SEVERE, e.getMessage(), e);
		}

		return simpleHTTPResponse;
	}
}
