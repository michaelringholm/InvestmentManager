package dk.ihedge.finance.prices.yahoo;

import org.simpleframework.xml.Element;
import org.simpleframework.xml.Root;


@Root(strict=false)
public class YahooFinance {

	/*@ElementList(inline=true)
	private List<String> metaValues;
	@Element(name="left")*/
	
	@Element(name="reference-meta")
	private ReferenceMeta referenceMeta;

	@Element(name="series")
	private Series series;
	
	public ReferenceMeta getReferenceMeta() {
		return referenceMeta;
	}
	public void setReferenceMeta(ReferenceMeta referenceMeta) {
		this.referenceMeta = referenceMeta;
	}

	public Series getSeries() {
		return series;
	}

	public void setSeries(Series series) {
		this.series = series;
	}  
	
}
