using InMaApp.InMaJavaWS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InMaApp.Models
{
    public class TournamentModel
    {
        public tournament Tournament { get; set; }
    }

    public class TournamentListModel
    {
        public List<tournament> Tournaments { get; set; }
    }

    public class TournamentParticipantsModel
    {
        public tournament Tournament { get; set; }
        public List<user> Participants { get; set; }
        public double LeadingTotalValue { get; set; }
    }
}