$(function () {    
    var assetCategory = new AssetCategory();
    assetCategory.populateAssetCategory($("#hfPortfolioId").val(), $("#hfAssetCategoryTitle").val());
});

function AssetCategory() {
    var _this = this;
    var util = new Util();

    this.populateAssetCategory = function (portfolioId, assetCategoryTitle) {
        var authModel = new LoginHelper().getAuthModel();
        var model = { portfolioId: portfolioId, assetCategoryTitle: assetCategoryTitle };
        $("#assetCategoryImg").attr("src", _this.titleToImgSrc(assetCategoryTitle));
        $("#assetCategoryTitle").text(assetCategoryTitle);
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
                    $(assetWidget).attr("data-asset-symbol", asset.symbol);
                    $(assetWidget).attr("data-asset-quote", asset.quote);
                    $(assetWidget).attr("data-asset-isin", asset.isin);
                    $(assetWidget).find(".assetTitle").text(asset.title);
                    $(assetWidget).find(".assetSymbol").text(asset.symbol);
                    $(assetWidget).find(".assetChange").text(asset.change);
                    $(assetWidget).find(".assetQuote").text(asset.quote);
                    $(assetWidget).find(".assetCategoryIcon").attr("src", _this.titleToImgSrc(asset.assetCategoryTitle));
                    $(assetWidget).show();
                    assetWidget.appendTo("#assets");
                }


                $(".asset").dblclick(function () { util.showBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
                $(".asset").on("swiperight", function () { util.showBuySellDialog(this, "BUY", true, ShowPortfolioSecurityList); });
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
                            util.showBuySellDialog(ui.draggable, "BUY", true, ShowPortfolioSecurityList);
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

    

}