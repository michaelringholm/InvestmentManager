package com.stelinno.finance.entities.yahoo;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;

@Root(strict=false)
public class ReferenceMeta {
	
	@Element(name="type")
	private String type;
	
	@Element(name="min")
	private String min;
	
	@Element(name="max")
	private String max;
	
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	
}
