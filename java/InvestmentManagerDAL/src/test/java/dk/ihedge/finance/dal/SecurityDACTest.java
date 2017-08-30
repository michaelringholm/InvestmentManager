package dk.ihedge.finance.dal;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import dk.ihedge.finance.dtl.Security;
import dk.ihedge.finance.dtl.Security.StatusEnum;
import dk.ihedge.finance.dtl.Tournament;

public class SecurityDACTest {

	@Test
	public void getSecuritiesSummary() throws Exception {
		List<Security> securities = SecurityDAC.getSecuritiesSummary("FBLOGIN1", 1, StatusEnum.Confirmed);
		for(Security security : securities)
		{
			System.out.println(security.getTitle());
			System.out.println(security.getCategoryTitle());
		}
	}
	
	@Test
	public void getSecurities() throws Exception {
		List<Security> securities = SecurityDAC.getSecurities("FBLOGIN1", 1, StatusEnum.Confirmed);
		for(Security security : securities)
		{
			System.out.println(security.getTitle());
			System.out.println(security.getCategoryTitle());
		}
	}

}
