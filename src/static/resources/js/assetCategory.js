$(function () {    
    
    //assetCategory.populateAssetCategory($("#hfPortfolioId").val(), $("#hfAssetCategoryTitle").val());
});

var assetCategoryController = new AssetCategoryController();

function AssetCategoryController() {
    var _this = this;
    var util = UtilFactory.getInstance();
    var GetAssetCategoryURL = " https://uv4gwr7k75.execute-api.eu-north-1.amazonaws.com/get-asset-category-fn";

    this.showAssetCategory = function (assetCategoryId, assetCategoryTitle) {
        $(".widget").hide();
        $("#assetCategoryWidget").show();
        var authModel = new LoginHelper().getAuthModel();
        //var model = { portfolioId: portfolioId, assetCategoryTitle: assetCategoryTitle, assetCategoryId: assetCategoryId};
        var model = { accessToken:"123", assetCategoryTitle: assetCategoryTitle, assetCategoryID: assetCategoryId};
        $("#assetCategoryImg").attr("src", util.titleToImgSrc(assetCategoryTitle));
        $("#assetCategoryTitle").text(assetCategoryTitle);
        $.ajax({
            type: "POST",
            url: GetAssetCategoryURL,
            /*headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },*/
            origin: "http://localhost",
            crossDomain: true,
            xhrFields: {
                'withCredentials': false // tell the client to send the cookies if any for the requested domain
                },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            data: JSON.stringify(model),
            beforeSend: function () { ShowAjaxLoader(); },            
            complete: function () { HideAjaxLoader(); },
            success: function (response) {
                //SetSubTitle("Categories/" + title);                
                try {
                    var assets = response.data.assetCategory;
                    for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
                        var asset = assets[assetIndex];
                        var assetWidget = $("#assetTemplate").clone();
                        $(assetWidget).removeAttr("id");
                        $(assetWidget).attr("data-asset-id", asset.id);
                        $(assetWidget).attr("data-asset-title", asset.title);
                        $(assetWidget).attr("data-asset-symbol", asset.symbol);
                        $(assetWidget).attr("data-asset-quote", asset.quote);
                        $(assetWidget).attr("data-asset-isin", asset.isin);
                        $(assetWidget).attr("data-asset-category-title", asset.assetCategoryTitle);
                        $(assetWidget).find(".assetTitle").text(util.shortenText(asset.title, 29));
                        $(assetWidget).find(".assetSymbol").text(asset.symbol);
                        $(assetWidget).find(".assetChange").text(asset.change);
                        $(assetWidget).find(".assetChangePct").text(util.formatDecimal(asset.change * 100 / asset.quote));
                        util.adjustTextColor($(assetWidget).find(".assetChange"), "");
                        util.adjustTextColor($(assetWidget).find(".assetChangePct"), "%");
                        $(assetWidget).find(".assetQuote").text(asset.quote);
                        $(assetWidget).find(".assetCategoryIcon").attr("src", util.titleToImgSrc(asset.assetCategoryTitle));
                        $(assetWidget).show();
                        assetWidget.appendTo("#assets");
                    }


                    $(".asset").dblclick(function () { util.showBuySellDialog(this, "BUY", true, portfolioHeaderController.ShowPortfolioSecurityList); });
                    $(".asset").on("swiperight", function () { util.showBuySellDialog(this, "BUY", true, portfolioHeaderController.ShowPortfolioSecurityList); });
                    $(".asset").draggable(
                        {
                            cursor: "move",
                            cursorAt: { top: 38, left: 40 },
                            helper: function (event) { return UtilFactory.getInstance().drawDraggableAsset(this); },
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
                                if(!loginHelper.isLoggedIn()) { loginHelper.showLoginScreen(); return; }
                                util.showBuySellDialog(ui.draggable, "BUY", true, portfolioHeaderController.ShowPortfolioSecurityList);
                            }
                        });
                    /*$("#dzSellSecurity").droppable(
                    {
                        over: function (event, ui) { $(this).removeClass("dropZone"); $(this).addClass("dropZoneHover"); $(this).effect("pulsate", { times: 3 }, 2000); },
                        out: function (event, ui) { $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1); },
                        drop: function (event, ui) {
                            $(this).removeClass("dropZoneHover"); $(this).addClass("dropZone"); $(this).stop(true, true); $(this).effect("pulsate", { times: 1 }, 1);
                            //SellSecurity(ui.draggable);
                            util.ShowBuySellDialog(ui.draggable, "SELL", true, ShowPortfolioSecurityList);
                        }
                    });*/
                    $("#miShowToDo").droppable(
                        {
                            over: function (event, ui) { $(this).effect("pulsate", { times: 3 }, 2000); },
                            drop: function (event, ui) {
                                alert("Add to ToDo [" + $(ui.draggable).attr("data-asset-symbol") + "]");
                            }
                        });
                }
                catch(ex) { 
                    ShowError(ex);
                }
            },
            error: function (result) {
                ShowError(result.responseText);
            }
        });
    };

    this.drawDraggableAsset = function (assetDiv) {
        var imgSrc = util.titleToImgSrc($(assetDiv).attr("data-asset-category-title"));
        // TODO - A smaller picture should be used for load performance reasons
        return '<div data-asset-symbol="' + $(assetDiv).attr("data-asset-symbol") + '" data-asset-quote="' + $(assetDiv).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(assetDiv).attr("data-asset-symbol") + '</div></div>';
    };

}