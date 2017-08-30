function Util() {
    var _this = this;

    this.showBuySellDialog = function (asset, buySellCode, instantBuySell, fnCallOnSuccess) {
        var symbol = $(asset).attr("data-asset-symbol");
        var isin = $(asset).attr("data-asset-isin");
        //var quote = $(asset).attr("data-asset-quote");
        var quote = _this.setLatestQuote(isin);
        var title = $(asset).attr("data-asset-title");
        var categoryTitle = $(asset).attr("data-asset-category-title");

        $("#buySellDialog .assetTitle").text(title);
        $("#buySellDialog .assetSymbol").text(symbol);
        //var imgSrc = $(asset).find("#draggableAssetImgSrc").val();
        //var categoryTitle = $("#assetCategoryTitle").html();

        //$("#tbQuote").val(quote);
        if (buySellCode == "BUY") $("#btnBuySellDlgBuy").prop("checked", true); else $("#btnBuySellDlgSell").prop("checked", true);
        if (instantBuySell == "TODO") $("#btnBuySellDlgToDo").prop("checked", true); else $("#btnBuySellDlgNow").prop("checked", true);
        $("#buySellDialog").dialog({ title: "Buy/Sell" });
        $("#buySellRG").buttonset();
        $("#nowToDoRG").buttonset();
        $("#btnConfirmBuySell").button().click(function () { _this.buySellAsset(symbol, isin, fnCallOnSuccess); });
        $("#btnCancelBuySell").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#btnOk").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#buySellDialog .bottomArea .beforeConfirm").show();
        $("#buySellDialog .bottomArea .afterConfirm").hide();

        if(!$(".selector").dialog("isOpen"))
            $("#buySellDialog").dialog("open");
    };

    this.buySellAsset = function (symbol, isin, fnCallOnSuccess) {
        var buySellIndicatorId = $("#buySellDialog #buySellRG :radio:checked").attr("id");
        var statusIndicatorId = $("#buySellDialog #nowToDoRG :radio:checked").attr("id");
        var quantity = $("#buySellDialog #tbQuantity").val();
        var quote = $("#tbQuote").val();
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
        var model = { authToken: $("#investAuthToken").val(), portfolioId: GetSelectedPortfolioId(), quantity: quantity, asset: { symbol: symbol, isin: isin, quote: quote, status: status } };

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
    };

    this.sellAsset = function (symbol, isin, quote, quantity, status, fnCallOnSuccess) {
        $.ajax({
            type: "POST",
            url: "/Asset/Sell",
            //contentType: 'application/json',
            dataType: 'json',
            data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), quantity: quantity, asset: { symbol: symbol, isin: isin, quote: quote, status: status } },
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
    };

    this.setLatestQuote = function (isin) {
        var authModel = new LoginHelper().getAuthModel();
        var model = { isin: isin };

        $.ajax({
            type: "POST",
            url: "/Asset/LatestQuote",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(model),
            beforeSend: function () { $("#tbQuote").val("UPDATING...."); },
            complete: function () {},
            success: function (result) {
                $("#tbQuote").val(result.quote);
            },
            error: function (err1, err2, err3) {
                $("#tbQuote").val("UPDATE FAILED!");
                ShowError(err1.responseText);
            }
        });
    };

    this.shortenText = function (text, maxLength) {
        if (!maxLength)
            maxLength = 20;
        if (text.length < maxLength)
            return text;
        else
            return text.substring(0, maxLength-3)+"...";
    };

    this.formatDecimal = function (decimalStr) {
        return Math.round(decimalStr * 100) / 100;
    };

    this.adjustTextColor = function (element, postfix) {
        var decimalValue = $(element).text()*1;
        if (decimalValue == 0) {
            $(element).text(decimalValue + postfix)
            $(element).css("color", "#3482B0");
        }
        else if (decimalValue > 0) {
            $(element).text("+" + decimalValue + postfix)
            $(element).css("color", "#4e9b41");
        }
        else {
            $(element).text(decimalValue + postfix)
            $(element).css("color", "#b24031");
        }
    };

    this.titleToImgSrc = function (title) {
        if (title === "Shipping")
            return "/images/categories/Truck-icon128.png";
        if (title === "Finance")
            return "/images/categories/bank-icon128.png";
        if (title === "Medical")
            return "/images/categories/first-aid-kit-icon128.png";
        if (title === "Technology")
            return "/images/categories/PCB-icon128.png";
        if (title === "Energy")
            return "/images/categories/Status-battery-charging-icon128.png";
        else
            return "/images/categories/unknown-icon128.png";
    };
}