$(function () {
    var tournamentOverview = new TournamentOverview();
    tournamentOverview.populateTournaments();
});

function TournamentOverview() {
    var _this = this;

    this.populateTournaments = function () {
        var authModel = new LoginHelper().getAuthModel();
        var model = { userKey: new LoginHelper().getUserKey() };

        $.ajax({
            type: "POST",
            url: "/Tournament/GetTournaments",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            data: JSON.stringify(model),
            beforeSend: function () { ShowAjaxLoader();},
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                var tournaments = result.tournaments;
                for (var tournamentIndex = 0; tournamentIndex < tournaments.length; tournamentIndex++) {
                    var tournament = tournaments[tournamentIndex];
                    var metaData = tournament.metaData;
                    var tournamentWidget = $("#tournamentTemplate").clone();
                    $(tournamentWidget).removeAttr("id");
                    $(tournamentWidget).attr("data-tournament-id", tournament.id);
                    $(tournamentWidget).attr("data-tournament-title", tournament.title);
                    $(tournamentWidget).find(".tournamentTitle").text(tournament.title);
                    $(tournamentWidget).find(".tournamentStartDate").text(tournament.startDate);
                    $(tournamentWidget).find(".tournamentEndDate").text(tournament.endDate);
                    if (metaData.singedUp) {
                        $(tournamentWidget).find(".startDateElement").hide();
                        $(tournamentWidget).find(".notParticipating").hide();
                    }
                    else {
                        $(tournamentWidget).find(".rankElement").hide();
                        $(tournamentWidget).find(".participating").hide();
                    }

                    $(tournamentWidget).css("display", "inline-block");
                    $(tournamentWidget).show();
                    tournamentWidget.appendTo("#tournaments");
                }

                $(".tournament").click(function (e) { EnterTournament($(e.currentTarget).attr("data-tournament-id")); });
            },
            error: function (err1, err2, err3) {
                ShowError(err1.responseText);
            }
        });
    };    
}