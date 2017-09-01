package com.stelinno.finance.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stelinno.finance.engines.PriceEngine;
import com.stelinno.finance.engines.PriceUpdater;
import com.stelinno.finance.entities.Price;

@RestController
public class PriceEngineController {
	
	@Autowired private PriceEngine priceEngine;
	@Autowired private PriceUpdater priceUpdater;
	@Autowired private String version;
	
	@RequestMapping("/get-by-isin")
	public Price getPriceByIsin(String isin) {
		return priceEngine.getPriceByISIN(isin);
	}
	
	@RequestMapping("/get-by-link")
	public Price getPriceByLink(String link) {
		return priceEngine.getPriceByLink(link);
	}	
	
	@RequestMapping("/get-by-source")
	public List<Price> getPricesBySource(String priceSource) {
		return priceEngine.getPrices(priceSource);
	}
	
	@RequestMapping("/update-all")
	public String updateAllPrices() {
		priceUpdater.updatePrices();
		return "{\"message\":\"done\"}";
	}	
	
	@RequestMapping("/version")
	public String version() {
		return version;
	}		
}
