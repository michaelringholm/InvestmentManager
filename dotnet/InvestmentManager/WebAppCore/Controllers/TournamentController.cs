﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebAppCore.Models.Tournament;
using WebAppCore.Services;
using WebAppCore.Data.Entities;

namespace WebAppCore.Controllers
{
    [Authorize(Policy = "InvestAuthTokenPolicy")]
    public class TournamentController : Controller
    {
        private readonly IDataService dataService;
        public TournamentController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public IActionResult ShowTournamentOverview()
        {
            var authModel = AuthService.GetLoginInfo(HttpContext.Request.Query);
            ViewData["InvestAuthToken"] = authModel.investAuthToken;
            ViewData["AuthProviderUserId"] = authModel.fbUserId;
            ViewData["AuthProviderName"] = authModel.authProvider;

            return View("TournamentOverview");
        }

        [HttpPost]
        public IActionResult GetTournaments([FromBody] TournamentOverviewModel model)
        {
            var tournaments = dataService.GetTournaments(model.UserKey);
            foreach (var tournament in tournaments)
                addMetaData(tournament, model.UserKey);
            return new JsonResult(new { tournaments = tournaments });
        }

        private void addMetaData(Tournament tournament, String userKey)
        {
            if (tournament.Participants == null)
                tournament.MetaData = new { singedUp = false };
            else
                tournament.MetaData = new { singedUp = (tournament.Participants.FirstOrDefault(p => p == userKey) != null) };
        }
    }
}