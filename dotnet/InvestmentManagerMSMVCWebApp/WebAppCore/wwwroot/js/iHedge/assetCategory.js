$(function () {
    var assetCategory = new AssetCategory();
    assetCategory.populateAssetCategory($("#hfPortfolioId").val(), $("#hfAssetCategoryTitle").val());
});

function AssetCategory() {
    var _this = this;

    this.populateAssetCategory = function (portfolioId, assetCategoryTitle) {
        var authModel = new LoginHelper().getAuthModel();
        var model = { portfolioId: portfolioId, assetCategoryTitle: assetCategoryTitle };
        $("#assetCategoryImg").attr("src", _this.titleToImgSrc(assetCategoryTitle));
        $("#title").text(assetCategoryTitle);
        $.ajax({
            type: "POST",
            url: "/AssetCategory/GetAssets",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            data: JSON.stringify(model),
            beforeSend: function () { ShowAjaxLoader(); },            
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                //SetSubTitle("Categories/" + title);                
                var assets = result.assets;
                for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
                    var asset = assets[assetIndex];
                    var assetWidget = $("#assetTemplate").clone();
                    $(assetWidget).removeAttr("id");
                    $(assetWidget).attr("data-asset-id", asset.id);
                    $(assetWidget).attr("data-asset-title", asset.title);
                    $(assetWidget).find(".assetTitle").text(asset.title);
                    $(assetWidget).find(".assetSymbol").text(asset.symbol);
                    $(assetWidget).find(".assetChange").text(asset.change);
                    $(assetWidget).find(".assetQuote").text(asset.quote);
                    $(assetWidget).find(".assetCategoryIcon").attr("src", _this.titleToImgSrc(asset.assetCategoryTitle));
                    $(assetWidget).show();
                    assetWidget.appendTo("#assets");
                }


                $(".asset").dblclick(function () { _this.showBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
                $(".asset").on("swiperight", function () { _this.showBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
                $(".asset").draggable(
                    {
                        cursor: "move",
                        cursorAt: { top: 38, left: 40 },
                        helper: function (event) { return _this.drawDraggableAsset(this); },
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
                            _this.showBuySellDialog(ui.draggable, "BUY", true, ShowPortfolioSecurityList);
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
    };

    this.drawDraggableAsset = function (assetDiv) {
        var imgSrc = $("#assetCategoryImg").attr("src");
        // TODO - A smaller picture should be used for load performance reasons
        return '<div data-asset-symbol="' + $(assetDiv).attr("data-asset-symbol") + '" data-asset-quote="' + $(assetDiv).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(assetDiv).attr("data-asset-symbol") + '</div></div>';
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

    this.showBuySellDialog = function (asset, buySellCode, instantBuySell, fnCallOnSuccess) {
        var symbol = $(asset).attr("data-asset-symbol");
        var quote = $(asset).attr("data-asset-quote");
        var title = $(asset).attr("data-asset-title");
        var categoryTitle = $(asset).attr("data-asset-category-title");
        //var imgSrc = $(asset).find("#draggableAssetImgSrc").val();
        //var categoryTitle = $("#assetCategoryTitle").html();

        $("#buySellDialog").dialog({ title: "Buy/Sell" });
        $("#buySellRG").buttonset();
        $("#nowToDoRG").buttonset();
        $("#btnConfirmBuySell").button().click(function () { _this.buySellAsset(symbol, quote, fnCallOnSuccess); });
        $("#btnCancelBuySell").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#btnOk").button().click(function () { $("#buySellDialog").dialog("close"); });
        $("#buySellDialog .bottomArea .beforeConfirm").show();
        $("#buySellDialog .bottomArea .afterConfirm").hide();
        $("#buySellDialog").dialog("open");
    };

    this.buySellAsset = function (symbol, quote, fnCallOnSuccess) {
        var buySellIndicatorId = $("#buySellDialog #buySellRG :radio:checked").attr("id");
        var statusIndicatorId = $("#buySellDialog #nowToDoRG :radio:checked").attr("id");
        var quantity = $("#buySellDialog #tbQuantity").val();
        var status = "";

        if (statusIndicatorId === "btnBuySellDlgNow")
            status = "Confirmed";
        else if (statusIndicatorId === "btnBuySellDlgToDo")
            status = "NotConfirmed";

        if (buySellIndicatorId === "btnBuySellDlgBuy")
            _this.buyAsset(symbol, quote, quantity, status, fnCallOnSuccess);
        else if (buySellIndicatorId === "btnBuySellDlgSell")
            _this.sellAsset(symbol, quote, quantity, status, fnCallOnSuccess);
    };

    this.buyAsset = function(symbol, quote, quantity, status, fnCallOnSuccess) {
        $.ajax({
            type: "POST",
            url: "/Asset/Buy",
            //contentType: 'application/json',
            dataType: 'json',
            data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), symbol: symbol, quote: quote, quantity: quantity, status: status },
            traditional: true,
            success: function (result) {
                UpdatePortfolioHeader(GetSelectedPortfolioId());
                if (fnCallOnSuccess !== null)
                    fnCallOnSuccess(GetSelectedPortfolioId());

                $("#buySellDialog .bottomArea .beforeConfirm").hide();
                $("#buySellDialog .bottomArea .afterConfirm").show();
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    }

    this.sellAsset = function(symbol, quote, quantity, status, fnCallOnSuccess) {
        $.ajax({
            type: "POST",
            url: "/Asset/Sell",
            //contentType: 'application/json',
            dataType: 'json',
            data: { login: $("#login").val(), portfolioId: GetSelectedPortfolioId(), symbol: symbol, quote: quote, quantity: quantity, status: status },
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