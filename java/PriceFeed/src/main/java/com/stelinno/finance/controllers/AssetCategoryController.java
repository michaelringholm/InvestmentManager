package com.stelinno.finance.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stelinno.persistence.DataService;

@RestController
public class AssetCategoryController {
	
	@Autowired private DataService dataService;
	
	@RequestMapping("/update-asset-categories")
	public String updateAssetCategories() {
		int updatedAssets = dataService.updateAssetCategories();
		return String.format("{\"message\":\"%d asset categories was updated!\"}", updatedAssets);
	}		
}
