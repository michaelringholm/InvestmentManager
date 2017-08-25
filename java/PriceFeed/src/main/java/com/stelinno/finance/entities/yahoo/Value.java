package com.stelinno.finance.entities.yahoo;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;

public class Value {
	@Attribute
	private String id;
	@Element
	private String min;
	@Element
	private String max;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMin() {
		return min;
	}
	public void setMin(String min) {
		this.min = min;
	}
	public String getMax() {
		return max;
	}
	public void setMax(String max) {
		this.max = max;
	}
}
