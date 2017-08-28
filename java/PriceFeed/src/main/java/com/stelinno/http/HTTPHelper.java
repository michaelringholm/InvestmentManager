package com.stelinno.http;

import java.util.Map;

public interface HTTPHelper {
	public abstract SimpleHTTPResponse getHtml(String targetUrl);
	public abstract SimpleHTTPResponse postJson(String json, String targetUrl, Map<String, String> headers);
}
