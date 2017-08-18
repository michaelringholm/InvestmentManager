<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.ToDoListModel>" %>
<div class="bodyTopSection" style="height: 42px; line-height: 42px;">
    <div style="float: left; margin-top: 4px;">
        <img alt="" src="/Content/images/Sigma72.png" style="width: 32px;" />
    </div>
    <div style="font-size: 20pt; float: left; margin-left: 30px; line-height: 40px; height: 40px; text-transform: uppercase;">
        <div style="float: left; text-shadow: 2px 2px #1c1c1c;">
            Total
        </div>
        <div style="float: left; margin-left: 114px; text-align: right;">
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; line-height: 18px; margin-top: 2px;">
                Brokerage
            </div>
            <div style="font-size: 12pt; line-height: 22px; text-align: right;">
                <%=InMaApp.DisplayHelper.FormatDouble(0.01) %>
            </div>
        </div>
        <div style="float: left; margin-left: 60px; text-align: right;">
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; line-height: 14px; height: 14px; margin-top: 2px;">
                Sum
            </div>
            <div style="font-size: 12pt; line-height: 26px; height: 26px; text-align: right;">
                <%=InMaApp.DisplayHelper.FormatMoney(Model.Securities.Sum(s => s.position * s.quote)) /*Brokerage missing*/ %>
            </div>
        </div>
        <div style="clear: both;">
        </div>
    </div>
    <div style="clear: both;">
    </div>
</div>
<div style="clear: both;">
</div>
