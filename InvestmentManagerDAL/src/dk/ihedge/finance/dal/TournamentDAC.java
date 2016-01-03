package dk.ihedge.finance.dal;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import dk.ihedge.finance.dtl.Portfolio;
import dk.ihedge.finance.dtl.Security;
import dk.ihedge.finance.dtl.Tournament;
import dk.ihedge.finance.dtl.Tournament.UserRoleEnum;
import dk.ihedge.finance.dtl.User;

public class TournamentDAC {
	public static List<Tournament> GetTournaments(int userId) throws Exception
	{
		List<Tournament> tournaments = new ArrayList<Tournament>();
		Connection conn = DAC.getDBConnection();
		String sql = "select tv.[Id], tv.Title, tv.StartDate, tv.EndDate, tv.StartCash, tv.IsPublic, p.Id AS PortfolioId, CASE WHEN ISNULL(p.Id, - 1) <= 0 THEN 0 ELSE 1 END AS IsSignedUp ";
		sql += "from [TournamentsView] tv ";
		sql += "left join Portfolio p on p.TournamentId = tv.Id and p.UserId = (select [Login] from [User] u where u.Id = ?) ";
		sql += "where tv.UserId in (?, -1000) ";

		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setInt(1, userId);
		ps.setInt(2, userId);
		ResultSet rs = ps.executeQuery();
		
		while(rs.next())
		{
			Tournament tournament = new Tournament();
			tournament.setId(rs.getInt("Id"));
			tournament.setTitle(rs.getString("Title"));
			tournament.setStartDate(rs.getDate("StartDate"));
			tournament.setEndDate(rs.getDate("EndDate"));
			tournament.setStartCash(rs.getDouble("StartCash"));
			tournament.setPublic(rs.getBoolean("IsPublic"));
			tournament.setSignedUp(rs.getBoolean("IsSignedUp"));
			tournaments.add(tournament);
		}
		
		return tournaments;
	}

	public static Tournament getTournament(String login, int tournamentID) {
		Tournament portfolio = new Tournament();
		try 
		{
			Connection conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("select * from Portfolio p where p.UserId = ? and p.Id = ?");
			ps.setString(1, login);
			ps.setInt(2, tournamentID);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
			{
				System.out.println(rs.getString("Title"));				
				portfolio.setId(rs.getInt("Id"));
				portfolio.setTitle(rs.getString("Title"));								
			}
			else
				throw new Exception("Could not find specified portfolio");
			
		} catch (Exception e) {
			e.printStackTrace();
			//throw e;
		}
		
		return portfolio;				
		
		/*dk.ihedge.finance.prices.Asset asset = PriceFeeder.GetAsset("NDA-DKK.CO");				
		asset = PriceFeeder.GetAsset("DSV.CO");*/
		
	}

	public static Tournament createTournament(String login, Tournament tournament) throws Exception {		
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.Create](?,?,?,?,?,?)}");
			ps.setString(1, login);			
			ps.setString(2, tournament.getTitle());
			ps.setBoolean(3, tournament.isPublic());
			ps.setDate(4, new java.sql.Date(tournament.getStartDate().getTime()));
			ps.setDate(5, new java.sql.Date(tournament.getEndDate().getTime()));
			ps.setDouble(6, tournament.getStartCash());
			ps.execute();
						
			//tournament.setId(id);
			return tournament;
			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}

	public static void deleteTournament(String login, int tournamentID) throws Exception {
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.Delete](?,?)}");
			ps.setString(1, login);			
			ps.setInt(2, tournamentID);
			ps.execute();			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}
	
	public static void addUser(String login, String userLogin, UserRoleEnum userRole, int tournamentID) throws Exception {
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.AddUser](?,?,?,?)}");
			ps.setString(1, login);
			ps.setString(2, userLogin);
			ps.setString(3, userRole.toString());
			ps.setInt(4, tournamentID);
			ps.execute();			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}
	
	public static void removeUser(String login, String userLogin, int tournamentID) throws Exception {
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.RemoveUser](?,?,?)}");
			ps.setString(1, login);
			ps.setString(2, userLogin);
			ps.setInt(3, tournamentID);
			ps.execute();			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}
	
	public static void enter(String login, int tournamentID) throws Exception {
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.Enter](?,?)}");
			ps.setString(1, login);
			ps.setInt(2, tournamentID);
			ps.execute();			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}	
	
	public static void leave(String login, int tournamentID) throws Exception {
		Connection conn = null;
		try 
		{
			conn = DAC.getDBConnection();
			PreparedStatement ps = conn.prepareStatement("{call [Tournament.Leave](?,?)}");
			ps.setString(1, login);
			ps.setInt(2, tournamentID);
			ps.execute();			
		}
		finally
		{
			if(conn != null)
				conn.close();
		}
	}

	public static List<User> getParticipants(String login, int tournamentID) throws Exception
	{
		List<User> participants = new ArrayList<User>();
		Connection conn = DAC.getDBConnection();
		String sql = "select * ";
		sql += "from [TournamentParticipantsView] tpv ";
		sql += "where tpv.TournamentId = ?";
		
		// Should be a check for login as well to avoid phishing

		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setInt(1, tournamentID);
		ResultSet rs = ps.executeQuery();
		
		while(rs.next())
		{
			User participant = new User();
			participant.setId(rs.getInt("Id"));
			participant.setFullName(rs.getString("fullName"));
			participant.setGender(rs.getString("gender"));
			participant.setLogin(rs.getString("login"));
			participant.setRole(Tournament.UserRoleEnum.valueOf(rs.getString("role")));
			participant.setCash(rs.getDouble("cash"));
			participant.setMarketValue(rs.getDouble("marketValue"));
			participant.setPortfolioId(rs.getInt("portfolioId"));
			participant.setRank(rs.getInt("rank"));
			participant.setTotalValue(rs.getDouble("totalValue"));
			participants.add(participant);
		}
		
		return participants;
	}
}
