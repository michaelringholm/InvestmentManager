<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.PortfolioListModel>" %>
<script type="text/javascript">
    $("#authenticated").val("true");
    CheckAuthentication();
</script>
<div style="margin-left: 46px; margin-top: 12px;">
    <%foreach (var portfolio in Model.Portfolios)
      {
          var marketValue = portfolio.securitiesSummed.Sum(s => s.quote * s.position);
          var profitLoss = marketValue - portfolio.securitiesSummed.Sum(s => s.purchaseAmount);
          var profitLossChange = (profitLoss * 100) / marketValue;
          if (marketValue == 0)
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
    <div class="portfolio" data-portfolio-id="<%=portfolio.portfolioHeader.id%>" data-portfolio-title="<%=portfolio.portfolioHeader.title%>">
        <div style="margin-left: 8px; margin-top: 10px; float: left;">
            <img alt="<%=portfolio.portfolioHeader.title%>" src="/Content/images/Pie-Chart-icon128.png" /></div>
        <%if(portfolio.portfolioHeader.tournamentId > 0) {%>
            <div style="margin-left: -44px; margin-top: 80px; margin-right: -24px; float: left;">
            <img style="width: 64px; height: 64px;" alt="<%=portfolio.portfolioHeader.title%>" src="/Content/images/Trophy-Gold-icon72.png" /></div>
        <%} %>
        <div style="float: left; margin-top: 24px; margin-left: 6px;">
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform:uppercase;">Cash</div>
            <div style="margin-top: -6px;"><%=InMaApp.DisplayHelper.FormatMoney(portfolio.portfolioHeader.cash)%></div>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform:uppercase; margin-top: 12px;">Market value</div>
            <div style="margin-top: -6px;"><%=InMaApp.DisplayHelper.FormatMoney(portfolio.portfolioHeader.marketValue)%></div>
            <div style="color: <%=changeColor%>; font-size: 20pt; font-weight: bold;"><%=changePrefix%><%=InMaApp.DisplayHelper.FormatDouble(profitLossChange, 2)%>%</div>
        </div>
        <div style="clear: both;">
        </div>
        <div style="text-align: center; margin-top: 8px;">
            <%=portfolio.portfolioHeader.title%></div>
    </div>
    <%} %>
    <div class="newPortfolio">
        <div style="margin-left: 64px; margin-top: 10px; float: left;">
            <img alt="" src="/Content/images/Pie-Chart-icon128.png" /></div>
        <div style="margin-top: 60px; margin-left: -50px; float: left;">
            <img class="addIconLarge" alt="" src="/Content/images/Actions-list-add-icon72.png" style="" /></div>
        <div style="float: left; margin-top: 24px; margin-left: 6px;">
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform:uppercase;"></div>
            <div></div>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform:uppercase; margin-top: 12px; text-decoration: underline;"></div>
            <div></div>
        </div>
        <div style="clear: both;">
        </div>
        <div style="text-align: center; margin-top: 8px; font-size: 10pt; color: #ffffff; font-weight: bold; text-transform:uppercase; text-decoration: underline;">
            Click to add a new portfolio</div>
    </div>
</div>
<div style="clear: both;">
</div>
