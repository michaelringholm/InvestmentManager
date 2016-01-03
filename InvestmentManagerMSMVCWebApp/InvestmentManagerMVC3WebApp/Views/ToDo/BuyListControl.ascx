<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.ToDoListModel>" %>
<div class="bodyTopSection" style="height: 42px; line-height: 42px;">
    <div style="float: left; margin-top: 2px; margin-left: 4px;">
        <img alt="" style="width: 40px;" src="/Content/images/master-card-icon72.png" />
    </div>
    <div style="font-size: 20pt; float: left; margin-left: 22px; line-height: 40px; height: 40px; text-shadow: 2px 2px #1c1c1c; text-transform: uppercase;">
        Buy
    </div>
</div>
<div style="clear: both;">
</div>
<div style="" class="tableHeader">
    <div style="float: left; margin-left: 40px; width: 220px;">
        Title
    </div>
    <div style="float: left; margin-left: 40px; width: 80px;">
        Symbol
    </div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Position
    </div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Quote
    </div>
    <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
        Brokerage
    </div>
    <div style="float: left; margin-left: 20px; width: 104px; text-align: right;">
        To pay
    </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 0px;">
    <%foreach (var security in Model.Securities.Where(s => s.position > 0))
      { %>
    <div style="" class="asset">
        <div style="float: left; margin-left: 40px; width: 220px;">
            <%=InMaApp.DisplayHelper.ShortenText(security.title, 28)%>
        </div>
        <div style="float: left; margin-left: 40px; width: 80px;">
            <%=security.symbol%>
        </div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatDouble(security.position)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatDouble(security.quote)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 74px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(Math.Round(((security.position * security.quote)*0.01), 2))%>
        </div>
        <div style="float: left; margin-left: 20px; width: 104px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(Math.Round(((security.position * security.quote) + (security.position * security.quote * 0.01)), 2))%>
        </div>
    </div>
    <div style="clear: both;">
    </div>
    <%} %>
</div>
<%if (Model.Securities == null || Model.Securities.Count(s => s.position > 0) == 0)
  { %>
<div title="Clicking here will take you to the stock market" class="toDoEmptyBuyList emptyList" style="height: 80px; line-height: 80px;">
    <div style="float: left; margin-top: 10px; margin-left: 240px;">
        <img alt="" style="width: 60px;" src="/Content/images/stock-market-icon72.png" /></div>
    <div style="float: left; margin-left: 24px;">Add stocks to your to do list by visiting the <span style="text-decoration: underline; font-weight: bold;">stock market!</span></div>
</div>
<div style="clear: both;">
</div>
<%} %>
