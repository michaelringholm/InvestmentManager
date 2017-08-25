package com.stelinno.finance.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.stelinno.finance.engines.PriceEngine;
import com.stelinno.finance.engines.PriceUpdater;
import com.stelinno.finance.engines.borsen.BorsenPriceEngine;
import com.stelinno.finance.mappers.AssetMapper;
import com.stelinno.persistence.aws.AWSDataService;
import com.stelinno.persistence.aws.DataService;

@Configuration
@ComponentScan("com.stelinno.finance.controllers")
public class AppConfig {
	@Bean PriceEngine priceEngine() { return new BorsenPriceEngine(); }
	@Bean PriceUpdater priceUpdater() { return new PriceUpdater(); }
	@Bean DataService dataService() { return new AWSDataService(); }
	@Bean AssetMapper assetMapper() { return new AssetMapper(); }	
	@Bean String version() { return "1.0.0.20170825_141600"; }
}
