$(function () {
    var portfolioHeader = new PortfolioHeader();
    portfolioHeader.populateList();
});

function PortfolioHeader() {
    var _this = this;

    this.populateList = function () {
        var authModel = { authProvider: $("#authProviderName").val(), fbUserId: $("#authProviderUserId").val(), investAuthToken: $("#investAuthToken").val() };

        $.ajax({
            type: "POST",
            url: "/Portfolio/GetPortfolioHeaders",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            //data: JSON.stringify(authModel),
            beforeSend: function () {
                //xhr.setRequestHeader("Authorization", "Basic " + btoa(authModel.fbUserId + ":" + ""));
                ShowAjaxLoader();
            },
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                var portfolioHeaders = result.portfolioHeaders;
                for (var portfolioIndex = 0; portfolioIndex < portfolioHeaders.length; portfolioIndex++) {
                    var portfolio = portfolioHeaders[portfolioIndex];
                    var portfolioWidget = $("#portfolioTemplate").clone();
                    $(portfolioWidget).removeAttr("id");
                    $(portfolioWidget).attr("data-portfolio-id", portfolio.id);
                    $(portfolioWidget).attr("data-portfolio-title", portfolio.name);
                    $(portfolioWidget).find(".portfolioCash").text(portfolio.cash);
                    $(portfolioWidget).find(".portfolioMarketValue").text(portfolio.marketValue);
                    $(portfolioWidget).find(".portfolioTitle").text(portfolio.name);
                    $(portfolioWidget).show();
                    portfolioWidget.appendTo("#portfolios");
                }

                $(".portfolio").click(function () {
                    var portfolioId = $(this).attr("data-portfolio-id");
                    ShowPortfolioSecurityList(portfolioId);
                    UpdatePortfolioHeader(portfolioId);
                });
                $(".newPortfolio").click(function () {
                    ShowNewPortfolioDialog();
                });
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };

    this.GetPortfolioSecurityList = function (portfolioId) {
        $.ajax({
            type: "get",
            url: "/Portfolio/ShowPortfolioSecurityList",
            contentType: "html",
            cache: false,
            data: "portfolioId=" + portfolioId,
            beforeSend: function () {
                ShowAjaxLoader("#div1");
            },
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                $("#div1").html(result);
                $(".subListItem").hide();
                $(".securitySummaryItem").click(function (e) { $(".subListItem[data-asset-symbol=\"" + $(e.currentTarget).attr("data-asset-symbol") + "\"]").toggle(); });
                $(".security").on("swiperight", function () { ShowBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
                $(".security").on("swipeleft", function () { ShowBuySellDialog(this, "SELL", true, ShowPortfolioSecurityList); });
                $(".security").draggable(
                    {
                        cursor: "move",
                        cursorAt: { top: 38, left: 40 },
                        helper: function (event) { return DrawDraggableSecurity(this); },
                        zIndex: 10000,
                        containment: 'document',
                        appendTo: "body",
                        start: function (event, ui) { $(".dropZone").effect("pulsate", { times: 3 }, 2000); }
                    });
                $("#dzBuySecurity").droppable(
                    {
                        over: function (event, ui) { $(this).removeClass("dropZone"); $(this).addClass("dropZoneHover"); $(this).effect("pulsate", { times: 3 }, 2000); },
                        out: function (event, ui) { $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1); },
                        drop: function (event, ui) {
                            //BuySecurity(ui.draggable);
                            $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1);
                            ShowBuySellDialog(ui.draggable, "BUY", true, ShowPortfolioSecurityList);
                        }
                    });
                $("#dzSellSecurity").droppable(
                    {
                        over: function (event, ui) { $(this).removeClass("dropZone"); $(this).addClass("dropZoneHover"); $(this).effect("pulsate", { times: 3 }, 2000); },
                        out: function (event, ui) { $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1); },
                        drop: function (event, ui) {
                            $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1);
                            //SellSecurity(ui.draggable);
                            ShowBuySellDialog(ui.draggable, "SELL", true, ShowPortfolioSecurityList);
                        }
                    });
                $("#miShowToDo").droppable(
                    {
                        over: function (event, ui) { $(this).effect("pulsate", { times: 3 }, 2000); },
                        drop: function (event, ui) {
                            alert("Add to ToDo [" + $(ui.draggable).attr("data-asset-symbol") + "]");
                        }
                    });

                $(".securityEmptyList").click(function () { ShowAssetCategories(); });
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };

    function DrawDraggableSecurity(securityDiv) {
        var imgSrc = $(securityDiv).attr("data-asset-img-src");
        // TODO - A smaller picture should be used for load performance reasons
        return '<div data-asset-symbol="' + $(securityDiv).attr("data-asset-symbol") + '" data-asset-quote="' + $(securityDiv).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(securityDiv).attr("data-asset-symbol") + '</div></div>';
    }

    function UpdatePortfolioHeader(portfolioId) {
        $.ajax({
            type: "POST",
            url: "/Portfolio/UpdatePortfolioHeader",
            //contentType: 'application/json',
            dataType: 'json',
            cache: false,
            data: { login: $("#login").val(), portfolioId: portfolioId },
            traditional: true,
            success: function (result) {
                $("#portfolioId").val(result.PortfolioId);
                $("#portfolioTitleHeader").html(result.PortfolioTitle);
                $("#marketValueHeader").html(result.MarketValue);
                $("#cashHeader").html(result.Cash);

                if (result.Rank > 0)
                    $("#rankHeader").html(result.Rank);
                else
                    $("#rankHeader").html("(free mode)");
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    }

    function ShowNewPortfolioDialog() {
        //alert("Add new portfolio");    

        $.ajax({
            type: "get",
            url: "/Portfolio/ShowNewPortfolioDialog",
            contentType: "html",
            data: "portfolioId=" + GetSelectedPortfolioId(),
            beforeSend: function () {
                ShowAjaxLoader();
            },
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                $("#generalDialog").html(result);
                $("#generalDialog #tbPortfolioTitle").watermark("Title");
                $("#generalDialog #tbPortfolioTitle").bind("keyup", function (e) { $("#generalDialog #divPortfolioTitle").html($("#generalDialog #tbPortfolioTitle").val()); });
                //$(this).val( $(this).val().replace(/[^a-z]/g,'') ); }
                $("#generalDialog").dialog({ title: "Create portfolio" });
                $("#btnCreatePortfolioDone").button().click(function () { CreatePortfolio(); });
                $("#btnCreatePortfolioCancel").button().click(function () { $("#generalDialog").dialog("close"); });
                $("#generalDialog #btnOk").button().click(function () { $("#generalDialog").dialog("close"); });
                $("#generalDialog .bottomArea .beforeConfirm").show();
                $("#generalDialog .bottomArea .afterConfirm").hide();
                $("#generalDialog").dialog("open");
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    }

    function CreatePortfolio() {
        var title = $("#generalDialog #tbPortfolioTitle").val();
        var startCash = $("#generalDialog #tbPortfolioStartCash").val();
        $.ajax({
            type: "POST",
            url: "/Portfolio/CreatePortfolio",
            //contentType: 'application/json',
            dataType: 'json',
            data: { login: $("#login").val(), title: title, startCash: startCash },
            traditional: true,
            success: function (result) {
                $("#generalDialog .bottomArea .beforeConfirm").hide();
                $("#generalDialog .bottomArea .afterConfirm").show();
                ShowPortfolioList();
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    }

}