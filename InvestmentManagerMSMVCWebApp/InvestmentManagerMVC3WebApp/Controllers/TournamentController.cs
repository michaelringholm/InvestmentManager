using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using InMaApp.Models;
using InMaApp.InMaJavaWS;

namespace InMaApp.Controllers
{
    public class TournamentController : AuthenticationController
    {
        public ActionResult ShowTournamentList()
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var tournaments = ws.getTournaments(ContextManager.Current.LoginId);

            return PartialView("TournamentListControl", new TournamentListModel { Tournaments = tournaments.ToList() });
        }


        public ActionResult ShowTournamentParticipants(int tournamentId)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();
            var tournament = ws.getTournaments(ContextManager.Current.LoginId).Where(t => t.id == tournamentId).SingleOrDefault();
            // Should use function below, but it is currently returning the wrong value for SignedUp.
            //var tournament = ws.getTournament(ContextManager.Current.LoginId, tournamentId);
            var participants = ws.getParticipants(ContextManager.Current.LoginId, tournamentId);

            double leadingTotalValue;
            if (participants == null)
            {
                participants = new List<user>().ToArray();
                leadingTotalValue = 0;
            }
            else
                leadingTotalValue = participants.Max(p => p.totalValue);            

            return PartialView("TournamentParticipantsControl", new TournamentParticipantsModel { Tournament = tournament, Participants = participants.ToList(), LeadingTotalValue = leadingTotalValue });
        }

        [HttpPost]
        public JsonResult Enter(string login, int tournamentId)
        {
            var ws = new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient();            
            var tournament = ws.getTournaments(ContextManager.Current.LoginId).Where(t => t.id == tournamentId).SingleOrDefault();
            // Should use function below, but it is currently returning the wrong value for SignedUp.
            //var tournament = ws.getTournament(ContextManager.Current.LoginId, tournamentId);
            var signedUp = tournament.signedUp;

            if(!signedUp)
                ws.enterTournament(login, tournamentId);

            return Json(new { SignedUp = signedUp }, JsonRequestBehavior.AllowGet);
        }
        
    }
}
