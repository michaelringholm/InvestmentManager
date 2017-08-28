package com.stelinno.finance.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stelinno.finance.engines.AssetUpdater;
import com.stelinno.persistence.DataService;

@RestController
public class AssetController {
	
	@Autowired private AssetUpdater assetUpdater;
	
	@RequestMapping("/update-symbols")
	public String updateSymbols() {
		int updateCount = assetUpdater.updateSymbols(10);
		return String.format("{\"message\":\"Symbols for %d assets was updated!\"}", updateCount);
	}		
}
