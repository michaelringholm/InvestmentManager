package com.stelinno.finance.engines.borsen;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.stelinno.finance.engines.PriceEngine;
import com.stelinno.finance.entities.Price;
import com.stelinno.finance.entities.borsen.BorsenPrice;
import com.stelinno.finance.mappers.borsen.BorsenPriceMapper;
import com.stelinno.http.HTTPHelper;

public class BorsenPriceEngine implements PriceEngine {
	@Autowired private Gson gson;
	@Autowired private BorsenPriceMapper priceMapper;
	@Autowired private HTTPHelper httpHelper;
	
	public List<Price> getPrices(String priceSource) {	
		System.out.println("Fetching prices from [" + priceSource + "]");
		Document doc = null;
		List<Price> prices = new ArrayList<>();
		try {
			//doc = Jsoup.connect(priceSource).get();
			String html = httpHelper.getHtml(priceSource).payload.toString();
			doc = Jsoup.parse(html);
			Elements stocks = doc.select(".stock-live-updates");
			for(Element stock : stocks) {
				try {
				String json = stock.attr("data-json");
				String name = stock.select(".stock-name a").first().text().trim();
				BorsenPrice borsenPrice = gson.fromJson(json, BorsenPrice.class);
				borsenPrice.PRICE = formatDecimal(borsenPrice.PRICE);
				borsenPrice.ASK = formatDecimal(borsenPrice.ASK);
				borsenPrice.BID = formatDecimal(borsenPrice.BID);
				borsenPrice.PERFORMANCE = formatDecimal(borsenPrice.PERFORMANCE);
				borsenPrice.HIGH = formatDecimal(borsenPrice.HIGH);
				borsenPrice.LOW = formatDecimal(borsenPrice.LOW);
				borsenPrice.FIRST = formatDecimal(borsenPrice.FIRST);
				borsenPrice.TOTAL_MONEY = formatDecimal(borsenPrice.TOTAL_MONEY);
				borsenPrice.YDT = formatDecimal(borsenPrice.YDT);
				borsenPrice.PERFORMANCE_PCT = formatDecimal(borsenPrice.PERFORMANCE_PCT);
				borsenPrice.OFFICIAL_NAME_SECURITY = name;
				borsenPrice.ISIN = borsenPrice.ISIN.trim();				
				//borsenPrice.SYMBOL = getSymbol(borsenPrice.ISIN);
				//if(borsenPrice.SYMBOL == null)
					//borsenPrice.SYMBOL = "MISSING_SYMBOL_" + borsenPrice.ISIN;
				prices.add(priceMapper.toPrice(borsenPrice));
				}
				catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return prices;
	}
	
	private String formatDecimal(String decimalStr) {
		if(decimalStr == null)
			return null;
		
		String decimal = decimalStr.replaceAll("\\.", "");
		decimal = decimal.replaceAll(",", "\\.");
		return decimal;
	}

	@Override
	public String getSymbol(String isin) {
		String symbolUrl = "http://www.boerse-berlin.com/index.php/Shares?isin=" + isin;
		Document doc = null;
		doc = Jsoup.parse(httpHelper.getHtml(symbolUrl).payload.toString());
		//doc = Jsoup.connect(symbolUrl).get();			
		
		if(doc == null)
			return null;
		Elements symbolElements = doc.select(".ln_symbol span");
		if(symbolElements == null)
			return null;
		Element symbolElement = symbolElements.first();
		if(symbolElement == null)
			return null;
		String symbol = symbolElement.text().trim();
		return symbol;
	}
	
	@Override
	public Price getPriceByISIN(String isin) {
		String symbolUrl = "http://www.boerse-berlin.com/index.php/Shares?isin=" + isin;
		Document doc;
		try {
			doc = Jsoup.parse(httpHelper.getHtml(symbolUrl).payload.toString());
			//doc = Jsoup.connect(symbolUrl).get();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		Elements symbolElements = doc.select(".ln_last .nc");
		if(symbolElements == null)
			return null;
		Element symbolElement = symbolElements.first();
		if(symbolElement == null)
			return null;
		String priceStr = symbolElement.text().trim();
		Price price = new Price();
		price.Isin = isin;
		price.Price = priceStr;
		return price;
	}		
	
	public static void main(String[] args) {
		// https://borsen.dk/services/frontend/getModule.php?moduleId=54570&page=1&tab=kurs&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc
		String[] priceSources = {"https://borsen.dk/kurser/danske_aktier/c20_cap.html",
		"https://borsen.dk/kurser/europaeiske_aktier/cac_40.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=2&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc",
		"https://borsen.dk/kurser/amerikanske_aktier/nasdaq_100.html?tab=kurs&page=3&sortColumn=OFFICIAL_NAME_SECURITY&direction=asc" };

		for(String priceSource : priceSources)
			new BorsenPriceEngine().getPrices(priceSource);
	}

}
