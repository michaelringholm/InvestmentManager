package dk.ihedge.finance.dal;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import dk.ihedge.finance.dtl.Tournament;
import dk.ihedge.finance.dtl.User;

public class TournamentDACTest {

	@Test
	public void GetTournaments() throws Exception {
		List<Tournament> tournaments = TournamentDAC.GetTournaments(3);
		for(Tournament tournament : tournaments)
		{
			System.out.println(tournament.getTitle());
			System.out.println(tournament.isSignedUp());
		}
	}

	@Test
	public void GetParticipants() throws Exception {
		List<User> participants = TournamentDAC.getParticipants("", 3);
		for(User participant : participants)
		{
			System.out.println(participant.getFullName());
		}
	}
}
