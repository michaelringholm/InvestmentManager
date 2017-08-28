package com.stelinno.finance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.google.apphosting.api.ApiProxy;
import com.google.gson.Gson;
import com.stelinno.finance.engines.AssetUpdater;
import com.stelinno.finance.engines.PriceEngine;
import com.stelinno.finance.engines.PriceUpdater;
import com.stelinno.finance.engines.borsen.BorsenPriceEngine;
import com.stelinno.finance.mappers.AssetMapper;
import com.stelinno.finance.mappers.borsen.BorsenPriceMapper;
import com.stelinno.http.GoogleHTTPHelper;
import com.stelinno.http.HTTPHelper;
import com.stelinno.http.StandardHTTPHelper;
import com.stelinno.persistence.aws.AWSDataService;
import com.stelinno.persistence.DataService;

@Configuration
@ComponentScan("com.stelinno.finance.controllers")
public class AppConfig {
	private boolean onGCP = ApiProxy.getCurrentEnvironment() != null;
	@Bean String version() { return "1.0.1.20170828_091600"; }
	@Bean Integer invocationCount() { return new Integer(0); }
	@Bean PriceEngine priceEngine() { return new BorsenPriceEngine(); }
	@Bean PriceUpdater priceUpdater() { return new PriceUpdater(); }
	@Bean AssetUpdater assetUpdater() { return new AssetUpdater(); }
	@Bean DataService dataService() { return new AWSDataService(); }
	@Bean AssetMapper assetMapper() { return new AssetMapper(); }		
	@Bean Gson gson() { return new Gson(); }
	@Bean BorsenPriceMapper priceMapper() { return new BorsenPriceMapper(); }
	@Bean HTTPHelper httpHelper() { if(onGCP) return new GoogleHTTPHelper(); else return new StandardHTTPHelper(); }
}
