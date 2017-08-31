$(function () {
    var tournament = new Tournament();
    tournament.populateTournament();
});

function Tournament() {
    var _this = this;
    var tournamentId = $("#tournament").attr("data-tournament-id");

    this.populateTournament = function () {
        var authModel = new LoginHelper().getAuthModel();
        var model = { userKey: new LoginHelper().getUserKey(), tournamentId:tournamentId };

        $.ajax({
            type: "POST",
            url: "/Tournament/GetTournament",
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
                if (!result || !result.tournament) return;
                var tournament = result.tournament;
                $("#tournamentTitle").text(tournament.title);
                $("#tournamentStartDate").text(tournament.startDate);
                $("#tournamentEndDate").text(tournament.endDate);

                var participants = result.participants;

                for (var participantIndex = 0; participantIndex < participants.length; participantIndex++) {
                    var participant = participants[participantIndex];
                    var metaData = participant.metaData;
                    var participantWidget = $("#participantTemplate").clone();
                    $(participantWidget).removeAttr("id");
                    $(participantWidget).find(".participantFullName").text(participant.fullName);
                    $(participantWidget).find(".participantRank").text(participant.rank);
                    $(participantWidget).find(".participantTotalValue").text(participant.purchaseAmount + participant.cash);
                    $(participantWidget).find(".participantCash").text(participant.cash);
                    $(participantWidget).find(".participantMarketValue").text(participant.marketValue);
                    $(participantWidget).find(".participantBehindLeader").text(participant.behindLeader);
                    $(participantWidget).css("display", "inline-block");
                    $(participantWidget).show();
                    participantWidget.appendTo("#participants");
                }

            },
            error: function (err1, err2, err3) {
                ShowError(err1.responseText);
            }
        });
    };    
}