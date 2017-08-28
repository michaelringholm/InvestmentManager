function Util() {
    var _this = this;

    this.showBuySellDialog = function (asset, buySellCode, instantBuySell, fnCallOnSuccess) {
        var symbol = $(asset).attr("data-asset-symbol");
        var isin = $(asset).attr("data-asset-isin");
        var quote = $(asset).attr("data-asset-quote");
        var title = $(asset).attr("data-asset-title");
        var categoryTitle = $(asset).attr("data-asset-category-title");

        $("#buySellDialog .assetTitle").text(title);
        $("#buySellDialog .assetSymbol").text(symbol);
        //var imgSrc = $(asset).find("#draggableAssetImgSrc").val();
        //var categoryTitle = $("#assetCategoryTitle").html();

        $("#tbQuote").val(quote);
        if (buySellCode == "BUY") $("#btnBuySellDlgBuy").prop("checked", true); else $("#btnBuySellDlgSell").prop("checked", true);
        if (instantBuySell == "TODO") $("#btnBuySellDlgToDo").prop("checked", true); else $("#btnBuySellDlgNow").prop("checked", true);
        $("#buySellDialog").dialog({ title: "Buy/Sell" });
        $("#buySellRG").buttonset();
        $("#nowToDoRG").buttonset();
        $("#btnConfirmBuySell").button().click(function () { _this.buySellAsset(symbol, isin, quote, fnCallOnSuccess); });
        $("#btnCancelBuySell").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#btnOk").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#buySellDialog .bottomArea .beforeConfirm").show();
        $("#buySellDialog .bottomArea .afterConfirm").hide();

        if(!$(".selector").dialog("isOpen"))
            $("#buySellDialog").dialog("open");
    };

    this.buySellAsset = function (symbol, isin, quote, fnCallOnSuccess) {
        var buySellIndicatorId = $("#buySellDialog #buySellRG :radio:checked").attr("id");
        var statusIndicatorId = $("#buySellDialog #nowToDoRG :radio:checked").attr("id");
        var quantity = $("#buySellDialog #tbQuantity").val();
        var status = "";

        if (statusIndicatorId === "btnBuySellDlgNow")
            status = "Confirmed";
        else if (statusIndicatorId === "btnBuySellDlgToDo")
            status = "NotConfirmed";

        if (buySellIndicatorId === "btnBuySellDlgBuy")
            _this.buyAsset(symbol, isin, quote, quantity, status, fnCallOnSuccess);
        else if (buySellIndicatorId === "btnBuySellDlgSell")
            _this.sellAsset(symbol, isin, quote, quantity, status, fnCallOnSuccess);
    };

    this.buyAsset = function (symbol, isin, quote, quantity, status, fnCallOnSuccess) {
        var authModel = new LoginHelper().getAuthModel();
        var model = { authToken: $("#investAuthToken").val(), portfolioId: GetSelectedPortfolioId(), quantity: quantity, asset: { symbol: symbol, isin:isin, quote: quote, status: status } };

        $.ajax({
            type: "POST",
            url: "/Asset/Buy",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(model),
            //traditional: true,
            success: function (result) {
                //UpdatePortfolioHeader(GetSelectedPortfolioId());
                //if (fnCallOnSuccess !== null)
                    //fnCallOnSuccess(GetSelectedPortfolioId());

                $("#buySellDialog .bottomArea .beforeConfirm").hide();
                $("#buySellDialog .bottomArea .afterConfirm").show();
            },
            error: function (err1, err2, err3) {
                ShowError(err1.responseText);
            }
        });
    }

    this.sellAsset = function (symbol, isin, quote, quantity, status, fnCallOnSuccess) {
        $.ajax({
            type: "POST",
            url: "/Asset/Sell",
            //contentType: 'application/json',
            dataType: 'json',
            data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), quantity: quantity, asset: { symbol: symbol, isin: isin, quote: quote, status: status } },
            traditional: true,
            success: function (result) {
                UpdatePortfolioHeader(GetSelectedPortfolioId());
                if (fnCallOnSuccess !== null)
                    fnCallOnSuccess(GetSelectedPortfolioId());

                $("#buySellDialog .bottomArea").html('<div style="margin-top: 14px; color: green;">Success!</div>');
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    }
}