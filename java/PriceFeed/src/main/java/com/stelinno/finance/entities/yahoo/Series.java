package com.stelinno.finance.entities.yahoo;

import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.ElementList;

public class Series {
	/*@Element(name="values")
	private Values values;*/
	
	@ElementList(entry="value", name="values")
	private List<Value> valueList;
	
	@Attribute(name="uri")
	private String uri;

	public List<Value> getValueList() {
		return valueList;
	}

	public void setValueList(List<Value> valueList) {
		this.valueList = valueList;
	}
}
