$(function () {
    //$.support.cors = true;
    $("#errorDiv").dialog({ autoOpen: false, width: "700px", modal: true });
    $("#statusDiv").dialog({ autoOpen: false, width: "200px", modal: true, draggable: false, resizable: false });
    $("#generalDialog").dialog({ autoOpen: false, width: "500px", modal: true, draggable: false, resizable: false });    
    $("#welcomeWidget").click(function () { home.show(); });
    $("#miHome").click(function () { home.show(); });
    $("#miShowPortfolios").click(function () { ShowPortfolioList(); });
    $("#miShowTournaments").click(function () { ShowTournamentOverview(); });
    $("#miShowToDo").click(function () { ShowToDo(); });
    $("#miShowStockMarket").click(function () { stockMarket.show(); });
    $("#depotTitleHeaderSection").click(function () { UpdatePortfolioHeader(GetSelectedPortfolioId()); ShowPortfolioSecurityList(GetSelectedPortfolioId()); });
    //$("#miRemoveFromCart").click(function () { RemoveFromCart(); });
    home.show();
});

var home = new Home();
function Home() {
    var _this = this;

    this.show = function() {
        $(".widget").hide();
        $("#welcomeWidget").show();
    };
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





/******************* END Assets *******************/



/******************* General *********************/
function NavigateWithAuth(url, paramsStr) {
    if (!paramsStr)
        paramsStr = "";

    window.location.href = url + "?authToken=" + $("#investAuthToken").val() + "&authProviderName=" + $("#authProviderName").val() + "&authProviderUserId=" + $("#authProviderUserId").val() + paramsStr;
}

function SetSubTitle(subTitle) {
    $("#subTitleDiv").html(subTitle);
}

function ShowError(error) {
    console.error(error);
    $("#errorDiv").html(error);
    $("#errorDiv").dialog("open");
}

function logInfo(info) {
    console.log("INFO: "+new Date().toISOString()+":"+info);
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
    return $("#hfPortfolioId").val();
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