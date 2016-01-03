package dk.ihedge.finance.dal;

import static org.junit.Assert.*;

import org.junit.Test;

public class UserDACTest {

	@Test
	public void getUserId() throws Exception {
		int userId = UserDAC.getUserId("FBLOGIN1");
		System.out.println("UserId = " + userId);
	}

	
	@Test
	public void login() throws Exception {
		UserDAC.login("100001477828296");
	}
}
