<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.PortfolioSubListModel>" %>
<%foreach (var security in Model.Portfolio.securities.Where(s => s.symbol == Model.Symbol))
{%>
    <%String imgSrc = InMaApp.DisplayHelper.GetImgSrc(security.categoryTitle);%>
    <div class="security subListItem" data-asset-symbol="<%=security.symbol%>" data-asset-quote="<%=InMaApp.DisplayHelper.FormatDouble(security.quote)%>" data-asset-title="<%=security.title%>" data-asset-quantity="<%=security.position%>" data-asset-img-src="/Content/images/categories/<%=imgSrc%>" data-asset-category-title="<%=security.categoryTitle %>">
        <div style="float: left; margin-left: 4px; margin-top: 4px;">
            <div style="width: 32px;">&nbsp;</div>
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
<%} %>