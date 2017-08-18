<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.AssetCategoryListModel>" %>
<div style="margin-left: 46px; margin-top: 12px;">
    <%foreach (var category in Model.Categories)
      { %>
    <%String imgSrc = InMaApp.DisplayHelper.GetImgSrc(category.title, 128);                                                                
    %>
    <div class="instrumentCategory" data-categoryid="<%=category.id%>" data-category-title="<%=category.title%>">
        <div style="margin-left: 34px; margin-top: 10px;">
            <img alt="" src="/Content/images/categories/<%=imgSrc%>" /></div>
        <div style="width: 198px; text-align: center;">
            <%=category.title %></div>
    </div>
    <%} %>
</div>
<div style="clear: both;">
</div>
