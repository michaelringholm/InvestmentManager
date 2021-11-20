var UtilFactory = (function () {
    var instance;
    var _this = this;    

    function Util() {
        var _this = this;
        var fnBuySellSuccessCallback = null;

        this.construct = function () {
            console.log("Util construct called!");
            $("#btnConfirmBuySell").button().click(function () { _this.buySellAsset(); });
            $("#btnCancelBuySell").button().click(function () { $("#buySellDialog").dialog("close"); });
            $("#btnOk").button().click(function () { $("#buySellDialog").dialog("close"); });
            $("#buySellControlGroup").controlgroup();
            $("#nowToDoControlGroup").controlgroup();
            $("#buySellDialog .bottomArea .beforeConfirm").show();
            $("#buySellDialog .bottomArea .afterConfirm").hide();
            $("#buySellDialog").dialog({
                title: "Buy/Sell", width: 330, height: 360, autoOpen: false, open: function (event, ui)
                {
                    $("#buySellDialog .bottomArea .beforeConfirm").show();
                    $("#buySellDialog .bottomArea .afterConfirm").hide();
                    $("#tbQuantity").focus();
                }
            });            
        };

        this.showBuySellDialog = function (asset, buySellCode, instantBuySell, fnCallOnSuccess) {
            _this.fnBuySellSuccessCallback = fnCallOnSuccess;
            var symbol = $(asset).attr("data-asset-symbol");
            var isin = $(asset).attr("data-asset-isin");
            _this.setLatestQuote(isin);
            var title = $(asset).attr("data-asset-title");
            var categoryTitle = $(asset).attr("data-asset-category-title");

            $("#buySellDialog").attr("data-asset-isin", isin);
            $("#buySellDialog").attr("data-asset-symbol", symbol);
            $("#buySellDialog .assetTitle").text(title);
            $("#buySellDialog .assetSymbol").text(symbol);
            $("#buySellDialog .assetIcon").attr("src", _this.titleToImgSrc(categoryTitle));
            if (buySellCode == "BUY") $("#btnBuySellDlgBuy").prop("checked", true); else $("#btnBuySellDlgSell").prop("checked", true);
            if (instantBuySell) $("#btnBuySellDlgToDo").prop("checked", true); else $("#btnBuySellDlgNow").prop("checked", true);
            $("#buySellControlGroup").controlgroup("refresh");
            $("#nowToDoControlGroup").controlgroup("refresh");            

            if (!$("#buySellDialog").dialog("isOpen"))
                $("#buySellDialog").dialog("open");
        };

        this.buySellAsset = function () {
            var symbol = $("#buySellDialog").attr("data-asset-symbol");
            var isin = $("#buySellDialog").attr("data-asset-isin");
            var buySellIndicatorId = $("#buySellDialog #buySellControlGroup :radio:checked").attr("id");
            var statusIndicatorId = $("#buySellDialog #nowToDoControlGroup :radio:checked").attr("id");
            var quantity = $("#buySellDialog #tbQuantity").val();
            var quote = $("#tbQuote").val();
            var status = "";

            if (statusIndicatorId === "btnBuySellDlgNow")
                status = "Confirmed";
            else if (statusIndicatorId === "btnBuySellDlgToDo")
                status = "NotConfirmed";

            if (buySellIndicatorId === "btnBuySellDlgBuy")
                _this.buyAsset(symbol, isin, quote, quantity, status, _this.fnBuySellSuccessCallback);
            else if (buySellIndicatorId === "btnBuySellDlgSell")
                _this.sellAsset(symbol, isin, quote, quantity, status, _this.fnBuySellSuccessCallback);
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
                    $("#buySellDialog .bottomArea .beforeConfirm").hide();
                    $("#buySellDialog .bottomArea .afterConfirm").show();
                    _this.fnBuySellSuccessCallback();
                },
                error: function (err1, err2, err3) {
                    ShowError(err1.responseText);
                }
            });
        };

        this.sellAsset = function (symbol, isin, quote, quantity, status, fnCallOnSuccess) {
            var authModel = new LoginHelper().getAuthModel();
            var model = { authToken: $("#investAuthToken").val(), portfolioId: GetSelectedPortfolioId(), quantity: quantity, asset: { symbol: symbol, isin: isin, quote: quote, status: status } };

            $.ajax({
                type: "POST",
                url: "/Asset/Sell",
                headers: {
                    'X-Auth-Provider': authModel.authProvider,
                    'X-Auth-UserId': authModel.fbUserId,
                    'X-Auth-Token': authModel.investAuthToken
                },
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(model),
                success: function (result) {
                    $("#buySellDialog .bottomArea .beforeConfirm").hide();
                    $("#buySellDialog .bottomArea .afterConfirm").show();
                    _this.fnBuySellSuccessCallback();
                },
                error: function (err1,err2,err3) {
                    ShowError(err1.responseText);
                }
            });
        };

        this.drawDraggableAsset = function (element) {
            var imgSrc = _this.titleToImgSrc($(element).attr("data-asset-category-title"));
            // TODO - A smaller picture should be used for load performance reasons
            return '<div data-asset-symbol="' + $(element).attr("data-asset-symbol") + '" data-asset-quote="' + $(element).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(element).attr("data-asset-symbol") + '</div></div>';
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
                beforeSend: function () { $("#buySellDialog .bottomArea").hide(); $("#tbQuote").val("UPDATING...."); },
                complete: function () { },
                success: function (result) {
                    $("#buySellDialog .bottomArea").show();
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
                return text.substring(0, maxLength - 3) + "...";
        };

        this.formatDecimal = function (decimalStr) {
            return Math.round(decimalStr * 100) / 100;
        };

        this.adjustTextColor = function (element, postfix) {
            var decimalValue = $(element).text() * 1;
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
                return "/resources/images/categories/Truck-icon128.png";
            if (title === "Finance")
                return "/resources/images/categories/bank-icon128.png";
            if (title === "Medical")
                return "/resources/images/categories/first-aid-kit-icon128.png";
            if (title === "Technology")
                return "/resources/images/categories/PCB-icon128.png";
            if (title === "Energy")
                return "/resources/images/categories/Status-battery-charging-icon128.png";
            else
                return "/resources/images/categories/unknown-icon128.png";
        };

        _this.construct();
    };

    return {
        getInstance: function () {
            console.log("UtilFactory.getInstance() called!");
            if (!instance) {                
                instance = new Util();
            }
            return instance;
        }
    };    
})();