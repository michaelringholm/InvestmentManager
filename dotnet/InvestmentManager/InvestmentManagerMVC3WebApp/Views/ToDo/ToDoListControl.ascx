<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.ToDoListModel>" %>
<div style="margin-left: 0px; margin-top: 12px;">
    <div style="overflow: auto; height: 548px;">
        <%Html.RenderPartial("BuyListControl", Model); %>
        <%Html.RenderPartial("SellListControl", Model); %>
    </div>
    <%Html.RenderPartial("SumListControl", Model); %>
    <div id="btnToDoConfirm" style="margin-left: 14px; margin-top: 6px; width: 84px; height: 28px; text-align: center; font-size: 10pt; margin-bottom: 4px;">
        Confirm
    </div>
    <div id="btnToDoDone" style="margin-left: 14px; margin-top: 6px; width: 84px; height: 28px; text-align: center; font-size: 10pt; margin-bottom: 4px;">
        <div style="float: left; margin-left: 0px;">Done</div>
        <div style="float: left; margin-left: 4px; margin-top: 2px;">
            <img style="width: 16px; height: 16px;" src="/Content/Images/Actions-dialog-ok-apply-icon32.png" alt="" />
        </div>
        <div style="clear: both;"></div>
    </div>
    <div id="btnToDoClear" style="margin-left: 8px; margin-top: 6px; width: 84px; height: 28px; text-align: center; font-size: 10pt; margin-bottom: 4px;">
        Clear all
    </div>
</div>
