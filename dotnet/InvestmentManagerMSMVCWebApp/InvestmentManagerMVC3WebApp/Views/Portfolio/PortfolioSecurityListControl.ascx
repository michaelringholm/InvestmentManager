<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.PortfolioModel>" %>
<div class="bodyTopSection">
    <div style="float: left;">
        <img alt="" src="/Content/images/Pie-Chart-icon128.png" />
    </div>
    <div style="float: left; margin-left: 12px; height: 136px;">
        <div style="font-size: 24pt; line-height: 36px; margin-top: 6px; text-shadow: 2px 2px #1c1c1c;"><%=Model.Portfolio.portfolioHeader.title %></div>
        <% var marketValue = Model.Portfolio.securitiesSummed.Sum(s => s.quote * s.position);
           var profitLoss = marketValue - Model.Portfolio.securitiesSummed.Sum(s => s.purchaseAmount);
           var profitLossChange = (profitLoss*100)/marketValue;
           if(marketValue == 0)
               profitLossChange = 0;
           
           String changePrefix = "";
           String changeColor = "";

           if (profitLoss == 0)
           {
               changePrefix = "";
               changeColor = "#3482B0";
           }
           else if (profitLoss > 0)
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

        <div style="float: left;">
            <div class="normalCaption" style="line-height: 14px; margin-top: 10px;">Profit/Loss</div>
            <div style="font-size: 12pt; line-height: 14px; color: <%=changeColor%>"><%=InMaApp.DisplayHelper.FormatMoney(profitLoss) %></div>
            <div class="normalCaption" style="line-height: 14px; margin-top: 8px;">Market value</div>
            <div style="font-size: 12pt; line-height: 14px;"><%=InMaApp.DisplayHelper.FormatMoney(marketValue) %></div>
        </div>
        <div style="float: left; height: 84px; line-height: 84px; margin-left: 18px;">
            <div style="color: <%=changeColor%>; font-size: 38pt; font-weight: bold;"><%=changePrefix%><%=InMaApp.DisplayHelper.FormatDouble(profitLossChange, 2)%>%</div>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div id="dzSellSecurity" class="dropZone" style="height: 116px;">
        <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase; margin-top: -6px; text-align: center; float: left; width: 180px; font-style: italic;">
            Drop here to sell
        </div>
        <div style="clear: both;"></div>
    </div>
    <div id="dzBuySecurity" class="dropZone" style="height: 116px;">
        <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase; margin-top: -6px; text-align: center; float: left; width: 180px; font-style: italic;">
            Drop here to buy
        </div>
        <div style="clear: both;"></div>
    </div>
</div>
<div style="clear: both;">
</div>
<div style="" class="tableHeader">
    <div style="float: left; margin-left: 44px; width: 170px;">
        Title
    </div>
    <div style="float: left; margin-left: 20px; width: 80px;">
        Symbol
    </div>
    <div style="float: left; margin-left: 20px; width: 44px; text-align: right;">
        Qnt.
    </div>
    <div style="float: left; margin-left: 20px; width: 104px; text-align: right;">
        Quote
    </div>
    <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
        Purch. Amount
    </div>
    <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
        Market Val.
    </div>
    <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
        Profit/Loss
    </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 0px;">
    <%foreach (var security in Model.Portfolio.securitiesSummed)
      {%>
    <%String imgSrc = InMaApp.DisplayHelper.GetImgSrc(security.categoryTitle);%>
    <div class="security securitySummaryItem" style="font-weight: bold;" data-asset-symbol="<%=security.symbol%>" data-asset-quote="<%=InMaApp.DisplayHelper.FormatDouble(security.quote)%>" data-asset-title="<%=security.title%>" data-asset-quantity="<%=security.position%>" data-asset-img-src="/Content/images/categories/<%=imgSrc%>" data-asset-category-title="<%=security.categoryTitle %>">
        <div style="float: left; margin-left: 4px; margin-top: 4px;">
            <img title="<%=security.categoryTitle %>" alt="" src="/Content/images/categories/<%=imgSrc %>" style="width: 32px; height: 32px;" />
        </div>
        <div style="float: left; margin-left: 8px; width: 170px;">
            <%=InMaApp.DisplayHelper.ShortenText(security.title, 20)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 80px;">
            <%=security.symbol%>
        </div>
        <div style="float: left; margin-left: 20px; width: 44px; text-align: right;">
            <%=security.position%>
        </div>
        <div style="float: left; margin-left: 20px; width: 104px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatDouble(security.quote)%> (<%=InMaApp.DisplayHelper.FormatDouble(Math.Round(security.quote-security.purchaceQuote,2))%>)
        </div>
        <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(security.purchaseAmount)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(security.position * security.quote)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 110px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney((security.position * security.quote)-security.purchaseAmount)%>
        </div>
    </div>
    <div style="clear: both;">
    </div>
    <%Html.RenderPartial("PortfolioSecuritySubListControl", new InMaApp.Models.PortfolioSubListModel { Portfolio = Model.Portfolio, AssetID = security.id, Symbol = security.symbol });  %>
    <%} %>
    <%if(Model.Portfolio.securitiesSummed == null || Model.Portfolio.securitiesSummed.Length == 0) { %>
    <div title="Clicking here will take you to the stock market" class="securityEmptyList emptyList" style="height: 80px; line-height: 80px;">
        <div style="float: left; margin-top: 10px; margin-left: 240px;"><img alt="" style="width: 60px;" src="/Content/images/stock-market-icon72.png" /></div>
        <div style="float: left; margin-left: 24px;">Add stocks to your portfolio by visiting the <span style="text-decoration: underline; font-weight: bold;">stock market!</span></div>
    </div>
    <div style="clear: both;">
    </div>
    <%} %>
</div>
