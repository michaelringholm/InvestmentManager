<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.AssetCategoryModel>" %>
<%String imgSrc = InMaApp.DisplayHelper.GetImgSrc(Model.Title);%>
<div class="bodyTopSection">
    <div style="float: left;">
        <img id="assetCategoryImg" alt="" src="/Content/images/categories/<%=imgSrc%>" /></div>
    <div id="assetCategoryTitle" style="font-size: 26pt; float: left; margin-left: 20px; line-height: 136px;
        height: 136px; text-shadow: 2px 2px #1c1c1c;">
        <%=Model.Title %>
    </div>
    <div id="dzBuySecurity" class="dropZone" style="height: 116px;">
        <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase;
            margin-top: -6px; text-align: center; float: left; width: 180px; font-style: italic;">Drop here to buy</div>
        <div style="clear: both;"></div>
    </div>
</div>
<div style="clear: both;">
</div>
<div style="" class="tableHeader">
    <div style="float: left; margin-left: 44px; width: 220px;">
        Title</div>
    <div style="float: left; margin-left: 40px; width: 140px;">
        Symbol</div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Quote</div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Change</div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Change %</div>    
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 4px;">
    <%foreach (var asset in Model.Assets)
      {
          String quote = InMaApp.DisplayHelper.FormatDouble(asset.quote);
          String assetTitle = asset.title;
          if (assetTitle != null && assetTitle.Length > 28)
              assetTitle = assetTitle.Substring(0, 25) + "...";

          String changePrefix = "";
          String changeColor = "";

          if (asset.change == 0)
          {
              changePrefix = "";
              changeColor = "#3482B0";
          }
          else if (asset.change > 0)
          {
              changePrefix = "+";
              changeColor = "#4e9b41";
          }
          else
          {
              changePrefix = "";
              changeColor = "#b24031";
          }
              
    %>
    <div style="" class="asset" data-asset-symbol="<%=asset.symbol%>" data-asset-quote="<%=quote%>" data-asset-title="<%=asset.title%>" data-asset-img-src="/Content/images/categories/<%=imgSrc%>" data-asset-category-title="<%=Model.Title %>">
        <div style="float: left; margin-left: 4px; margin-top: 4px;">
            <img title="<%=Model.Title %>" alt="" src="/Content/images/categories/<%=imgSrc %>" style="width: 32px; height: 32px;" />
        </div>
        <div style="float: left; margin-left: 8px; width: 220px;">
            <%=assetTitle%></div>
        <div style="float: left; margin-left: 40px; width: 140px;">
            <%=asset.symbol%></div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
            <%=quote%></div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right; font-weight: bold; color: <%=changeColor%>;">
            <%=changePrefix%><%=InMaApp.DisplayHelper.FormatDouble(asset.change, 2)%></div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right; font-weight: bold; color: <%=changeColor%>;">
            <%=changePrefix%><%=InMaApp.DisplayHelper.FormatDouble((asset.change * 100) / asset.quote, 2)%>%</div>
        <input id="draggableAssetImgSrc" type="hidden" value="/Content/images/categories/<%=imgSrc%>" />
    </div>
    <div style="clear: both;">
    </div>
    <%} %>
</div>
