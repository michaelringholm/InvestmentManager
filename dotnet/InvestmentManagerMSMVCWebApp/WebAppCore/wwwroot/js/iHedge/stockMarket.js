$(function () {
    var stockMarket = new StockMarket();
    stockMarket.populateAssetCategories();
});

function StockMarket() {
    var _this = this;

    this.populateAssetCategories = function () {
        var authModel = new LoginHelper().getAuthModel();

        $.ajax({
            type: "POST",
            url: "/StockMarket/GetAssetCategories", //"/Portfolio/ShowInstrumentCategories",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            //data: JSON.stringify(authModel),
            beforeSend: function () { ShowAjaxLoader();},
            complete: function () { HideAjaxLoader(); },
            success: function (result) {
                //$("#div1").html(result);
                //SetSubTitle("Categories");
                var assetCategories = result.assetCategories;
                for (var assetCategoryIndex = 0; assetCategoryIndex < assetCategories.length; assetCategoryIndex++) {
                    var assetCategory = assetCategories[assetCategoryIndex];
                    var assetCategoryWidget = $("#assetCategoryTemplate").clone();
                    $(assetCategoryWidget).removeAttr("id");
                    $(assetCategoryWidget).attr("data-asset-category-id", assetCategory.id);
                    $(assetCategoryWidget).attr("data-asset-category-title", assetCategory.title);
                    $(assetCategoryWidget).find(".assetCategoryTitle").text(assetCategory.title);
                    $(assetCategoryWidget).find(".assetCategoryIcon").attr("src", _this.titleToImgSrc(assetCategory.title));
                    $(assetCategoryWidget).show();
                    assetCategoryWidget.appendTo("#assetCategories");
                }

                $(".assetCategory").click(function () { ShowAssetCategory($("portfolioId").val(), $(this).attr("data-asset-category-title")); });
            },
            error: function (err1, err2, err3) {
                ShowError(err1.responseText);
            }
        });
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

    this.populateAssetCategory = function (categoryId, title) {
        var model = { categoryId: categoryId, title: title };

        $.ajax({
            type: "POST",
            url: "/StockMarket/GetAssetCategory",
            headers: {
                'X-Auth-Provider': authModel.authProvider,
                'X-Auth-UserId': authModel.fbUserId,
                'X-Auth-Token': authModel.investAuthToken
            },
            contentType: "application/json",
            dataType: "json",
            cache: false,
            data: JSON.stringify(model),
            beforeSend: function () {
                ShowAjaxLoader();
            },            
            success: function (result) {
                //$("#div1").html(result);
                //SetSubTitle("Categories/" + title);

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
    };

    this.drawDraggableAsset = function (assetDiv) {
        var imgSrc = $("#assetCategoryImg").attr("src");
        // TODO - A smaller picture should be used for load performance reasons
        return '<div data-asset-symbol="' + $(assetDiv).attr("data-asset-symbol") + '" data-asset-quote="' + $(assetDiv).attr("data-asset-quote") + '" class="draggableAsset" style=""><img src="' + imgSrc + '" style="width: 32px; height: 32px; margin-left: 10px;" /><div class="caption" style="margin-left: 10px; margin-top: 4px;">Symbol</div><div style="margin-left: 10px; margin-top: 0px;">' + $(assetDiv).attr("data-asset-symbol") + '</div></div>';
    };

}