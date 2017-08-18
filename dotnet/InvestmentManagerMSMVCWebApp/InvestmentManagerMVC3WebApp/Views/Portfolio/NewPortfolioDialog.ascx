<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.NewPortfolioModel>" %>
<div>
    <div style="float: left; width: 100px;">
        <img alt="" style="width: 72px; height: 72px;" src="/Content/images/Pie-Chart-icon72.png" />
    </div>
    <div style="float: left; width: 300px; height: 72px;">
        <div id="divPortfolioTitle" style="margin-top: 20px; font-weight: bold;">Title</div>
        <div><%=InMaApp.DisplayHelper.FormatMoney(100000)%></div>
    </div>
    <div style="clear: both;"></div>

    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Title</div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">
        <input id="tbPortfolioTitle" type="text" style="width: 120px; text-align: right;" value="" />
    </div>
    <div style="clear: both;"></div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Start cash</div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">
        <input id="tbPortfolioStartCash" type="text" style="width: 120px; text-align: right;" value="100000" />
    </div>
    <div style="clear: both;"></div>

    <div class="bottomArea">
        <div class="beforeConfirm">
            <div id="btnCreatePortfolioDone" style="margin-top: 12px; float: left; width: 84px; height: 28px;">Confirm</div>
            <div id="btnCreatePortfolioCancel" style="margin-top: 12px; float: left; margin-left: 8px; width: 84px; height: 28px;">Cancel</div>
            <div style="clear: both;"></div>
        </div>
        <div class="afterConfirm">
            <div id="btnOk" style="margin-top: 12px; float: left; width: 84px; height: 28px;">
                <div style="float: left; margin-left: 0px;">Done</div>
                <div style="float: left; margin-left: 4px; margin-top: 2px;">
                    <img style="width: 16px; height: 16px;" src="/Content/Images/Actions-dialog-ok-apply-icon32.png" alt="" />
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
</div>
