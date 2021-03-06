﻿$(function () {
    $.support.cors = true;
    $("#errorDiv").dialog({ autoOpen: false, width: "700px", modal: true });
    $("#statusDiv").dialog({ autoOpen: false, width: "200px", modal: true, draggable: false, resizable: false });
    $("#generalDialog").dialog({ autoOpen: false, width: "500px", modal: true, draggable: false, resizable: false });    
    $("#welcomeDiv").click(function () { window.location.href = "/Home/Login"; });
    $("#miHome").click(function () { ShowWelcomePage(); });
    $("#miShowPortfolios").click(function () { ShowPortfolioList(); });
    $("#miShowTournaments").click(function () { ShowTournamentList(); });
    $("#miShowToDo").click(function () { ShowToDo(); });
    $("#miBrowseInstruments").click(function () { ShowAssetCategories(); });
    $("#depotTitleHeaderSection").click(function () { UpdatePortfolioHeader(GetSelectedPortfolioId()); ShowPortfolioSecurityList(GetSelectedPortfolioId()); });
    //$("#miRemoveFromCart").click(function () { RemoveFromCart(); });

    CheckAuthentication();
});


/******************* Home ***********************/
function CheckAuthentication() {
    if($("#authenticated").val() == "false")
        $(".authorized").hide();
    else
        $(".authorized").show();
}

function ShowWelcomePage() {
    $.ajax({
        type: "post",
        url: "/Home/ShowWelcomeControl",
        contentType: "html",
        //data: null,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            //$("#welcomeDiv").click(function () { ShowLoginPage(); });
            $("#welcomeDiv").click(function () { window.location.href = "/Home/Login"; });
            
            CheckAuthentication();
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function ShowLoginPage() {
    $.ajax({
        type: "post",
        url: "/Home/ShowLoginControl",
        contentType: "html",
        //data: null,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            $("#loginDiv").click(function () { ShowPortfolioList(); });
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}
/******************* END Home *******************/



/******************* Tournaments ********************/
function ShowTournamentList() {
    $.ajax({
        type: "post",
        url: "/Tournament/ShowTournamentList",
        contentType: "html",
        //data: null,
        cache: false,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            $(".tournament").click(function (e) { EnterTournament($(e.currentTarget).attr("data-tournament-id")); });
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function ShowTournamentParticipants(tournamentId) {
    $.ajax({
        type: "get",
        url: "/Tournament/ShowTournamentParticipants",
        contentType: "html",
        cache: false,
        data: "tournamentId=" + tournamentId,
        beforeSend: function () {
            ShowAjaxLoader("#div1");
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);            
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function EnterTournament(tournamentId) {
    $.ajax({
        type: "POST",
        url: "/Tournament/Enter",
        //contentType: 'application/json',
        dataType: 'json',
        cache: false,
        data: { login: $("#login").val(), tournamentId: tournamentId },
        traditional: true,
        success: function (result) {
            if (result.SignedUp)
                ShowTournamentParticipants(tournamentId);
            else
                ShowTournamentList();
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}
/*************** End Tournaments *******************/




/********************** Portfolios *******************/

function ShowPortfolioList() {
    $.ajax({
        type: "post",
        url: "/Portfolio/ShowPortfolioList",
        contentType: "html",
        cache: false,
        //data: null,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            $(".portfolio").click(function () 
            { 
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
}

function ShowPortfolioSecurityList(portfolioId) {    
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
}

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
/********************** END Portfolios *******************/



/****************** Category **********************/
function ShowAssetCategories() {
    $.ajax({
        type: "post",
        url: "/Portfolio/ShowInstrumentCategories",
        contentType: "html",
        //data: null,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function(){ HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            SetSubTitle("Categories");
            $(".instrumentCategory").click(function () { ShowAssetCategory($(this).attr("data-categoryid"), $(this).attr("data-category-title")); });
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function ShowAssetCategory(categoryId, title) {
    //alert(categoryId);

    $.ajax({
        type: "get",
        url: "/Portfolio/ShowAssetCategory",
        contentType: "html",
        cache: false,
        data: "categoryId=" + categoryId + "&title=" + title,
        success: function (result) {
            $("#div1").html(result);
            SetSubTitle("Categories/" + title);

            $(".asset").dblclick(function () { ShowBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
            $(".asset").on("swiperight", function () { ShowBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
            $(".asset").draggable(
            {
                cursor: "move",
                cursorAt: { top: 38, left: 40 },
                helper: function (event) { return DrawDraggableAsset(this); },
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
            /*$("#dzSellSecurity").droppable(
             {
                 over: function (event, ui) { $(this).removeClass("dropZone"); $(this).addClass("dropZoneHover"); $(this).effect("pulsate", { times: 3 }, 2000); },
                 out: function (event, ui) { $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1); },
                 drop: function (event, ui) {
                     $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1);
                     //SellSecurity(ui.draggable);
                     ShowBuySellDialog(ui.draggable, "SELL", true, ShowPortfolioSecurityList);
                 }
             });*/
            $("#miShowToDo").droppable(
            {
                over: function (event, ui) { $(this).effect("pulsate", { times: 3 }, 2000); },
                drop: function (event, ui) {
                    alert("Add to ToDo [" + $(ui.draggable).attr("data-asset-symbol") + "]");
                }
            });

        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function DrawDraggableAsset(assetDiv) {
    var imgSrc = $("#assetCategoryImg").attr("src");
    // TODO - A smaller picture should be used for load performance reasons
    return '<div data-asset-symbol="' + $(assetDiv).attr("data-asset-symbol") + '" data-asset-quote="' + $(assetDiv).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(assetDiv).attr("data-asset-symbol") + '</div></div>';
}

/****************** END Category **********************/




/****************** ToDo **********************/
function ShowToDo() {
    $.ajax({
        type: "get",
        url: "/ToDo/ShowToDo",
        contentType: "html",
        cache: false,
        data: "portfolioId=" + GetSelectedPortfolioId(),
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#div1").html(result);
            $("#btnToDoConfirm").button().click(function () { ExecuteTrades(); });
            $("#btnToDoDone").button().click(function () { ShowPortfolioList(); });
            $("#btnToDoClear").button().click(function () {  });
            $("#btnToDoConfirm").show();
            $("#btnToDoDone").hide();

            $(".toDoEmptyBuyList").click(function () { ShowAssetCategories(); });
            $(".toDoEmptySellList").click(function () { ShowPortfolioSecurityList(GetSelectedPortfolioId()); });
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function ExecuteTrades(symbol, quote, quantity, status, fnCallOnSuccess) {
    $.ajax({
        type: "POST",
        url: "/ToDo/ExecuteTrades",
        //contentType: 'application/json',
        dataType: 'json',
        data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId() },
        traditional: true,
        success: function (result) {
            UpdatePortfolioHeader(GetSelectedPortfolioId());
            
            $("#div1 #btnToDoConfirm").hide();
            $("#div1 #btnToDoDone").show();
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

/****************** END ToDo **********************/



/******************* Assets *******************/
function ShowBuySellDialog(asset, buySellCode, instantBuySell, fnCallOnSuccess) {
    var symbol = $(asset).attr("data-asset-symbol");
    var quote = $(asset).attr("data-asset-quote");
    var title = $(asset).attr("data-asset-title");
    var categoryTitle = $(asset).attr("data-asset-category-title");
    //var imgSrc = $(asset).find("#draggableAssetImgSrc").val();
    //var categoryTitle = $("#assetCategoryTitle").html();

    $.ajax({
        type: "get",
        url: "/Asset/ShowBuySellDialog",
        contentType: "html",
        data: "symbol=" + symbol + "&buySellCode=" + buySellCode + "&instantBuySell=" + instantBuySell + "&title=" + title + "&quote=" + quote + "&categoryTitle=" + categoryTitle,
        beforeSend: function () {
            ShowAjaxLoader();
        },
        complete: function () { HideAjaxLoader(); },
        success: function (result) {
            $("#generalDialog").html(result);
            $("#generalDialog").dialog({ title: "Buy/Sell" });
            $("#buySellRG").buttonset();
            $("#nowToDoRG").buttonset();
            $("#btnConfirmBuySell").button().click(function () { BuySellSecurity(symbol, quote, fnCallOnSuccess); });
            $("#btnCancelBuySell").button().click(function () { $("#generalDialog").dialog("close"); });
            $("#btnOk").button().click(function () { $("#generalDialog").dialog("close"); });
            $("#generalDialog .bottomArea .beforeConfirm").show();
            $("#generalDialog .bottomArea .afterConfirm").hide();
            $("#generalDialog").dialog("open");            
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function BuySellSecurity(symbol, quote, fnCallOnSuccess) {
    var buySellIndicatorId = $("#generalDialog #buySellRG :radio:checked").attr("id");
    var statusIndicatorId = $("#generalDialog #nowToDoRG :radio:checked").attr("id");
    var quantity = $("#generalDialog #tbQuantity").val();
    var status = "";

    if (statusIndicatorId == "btnBuySellDlgNow")
        status = "Confirmed";
    else if (statusIndicatorId == "btnBuySellDlgToDo")
        status = "NotConfirmed";

    if (buySellIndicatorId == "btnBuySellDlgBuy")
        BuySecurity(symbol, quote, quantity, status, fnCallOnSuccess);
    else if (buySellIndicatorId == "btnBuySellDlgSell")
        SellSecurity(symbol, quote, quantity, status, fnCallOnSuccess);    
}

function BuySecurity(symbol, quote, quantity, status, fnCallOnSuccess) {
    $.ajax({
        type: "POST",
        url: "/Portfolio/BuySecurity",
        //contentType: 'application/json',
        dataType: 'json',
        data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), symbol: symbol, quote: quote, quantity: quantity, status: status },
        traditional: true,
        success: function (result) {
            UpdatePortfolioHeader(GetSelectedPortfolioId());
            if (fnCallOnSuccess != null)
                fnCallOnSuccess(GetSelectedPortfolioId());

            $("#generalDialog .bottomArea .beforeConfirm").hide();
            $("#generalDialog .bottomArea .afterConfirm").show();
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function SellSecurity(symbol, quote, quantity, status, fnCallOnSuccess) {
    $.ajax({
        type: "POST",
        url: "/Portfolio/SellSecurity",
        //contentType: 'application/json',
        dataType: 'json',
        data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), symbol: symbol, quote: quote, quantity: quantity, status: status },
        traditional: true,
        success: function (result) {
            UpdatePortfolioHeader(GetSelectedPortfolioId());
            if (fnCallOnSuccess != null)
                fnCallOnSuccess(GetSelectedPortfolioId());

            $("#generalDialog .bottomArea").html('<div style="margin-top: 14px; color: green;">Success!</div>');
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

/******************* END Assets *******************/



/******************* General *********************/
function SetSubTitle(subTitle) {
    $("#subTitleDiv").html(subTitle);
}

function ShowError(error) {
    $("#errorDiv").html(error);
    $("#errorDiv").dialog("open");
}

function ShowAjaxLoader() {
    //$("#statusDiv").html('<div><img src="/Content/images/ajax-loader.gif" /></div><div style="font-size: 20pt;">Loading</div>');
    $("#statusDiv").html('<div>Loading.....</div>');
    $("#statusDiv").dialog("open");
}

function HideAjaxLoader() {
    $("#statusDiv").dialog("close");
}

function FormatMoney(money) {
    $.ajax({
        type: "POST",
        url: "/Display/FormatMoney",
        //contentType: 'application/json',
        dataType: 'json',
        data: { money: money },
        traditional: true,
        success: function (result) {
            return result.Money;
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}

function GetSelectedPortfolioId() {
    return $("#portfolioId").val();
}
/******************* END General *********************/


/************ Obsolete *********************/
function RemoveFromCart() {
    $.ajax({
        type: "post",
        url: "/Portfolio/RemoveFromCart",
        contentType: "html",
        //data: null,
        success: function (result) {
            $("#div1").html(result);
        },
        error: function (result) {
            ShowError(result.responseText);
        }
    });
}
function FormatMoney2(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return "$" + x1 + x2;
}
/************ END Obsolete *********************/