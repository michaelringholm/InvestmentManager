<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.AssetBuySellModel>" %>
<%String imgSrc = InMaApp.DisplayHelper.GetImgSrc(Model.CategoryTitle);%>
<div>
    <div style="float: left; width: 100px;">
        <img alt="" style="width: 72px; height: 72px;" src="/Content/images/categories/<%=imgSrc%>" />
    </div>
    <div style="float: left; width: 300px; height: 72px;">
        <div style="margin-top: 20px; font-weight: bold;"><%=Model.Title%></div>
        <div><%=Model.Symbol%></div>
    </div>
    <div style="clear: both;"></div>

    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Buy/Sell</div>
    <div id="buySellRG" style="height: 30px; float: left;">
        <%if (Model.BuySellCode == "SELL")
          { %>
        <input type="radio" id="btnBuySellDlgBuy" name="buySellRG" /><label style="width: 60px;" for="btnBuySellDlgBuy">Buy</label>
        <input type="radio" id="btnBuySellDlgSell" name="buySellRG" checked="checked" /><label style="width: 60px;" for="btnBuySellDlgSell">Sell</label>
        <%}
          else
          { %>
        <input type="radio" id="btnBuySellDlgBuy" name="buySellRG" checked="checked" /><label style="width: 60px;" for="btnBuySellDlgBuy">Buy</label>
        <input type="radio" id="btnBuySellDlgSell" name="buySellRG" /><label style="width: 60px;" for="btnBuySellDlgSell">Sell</label>
        <%} %>
    </div>
    <div style="clear: both;"></div>

    <div style="margin-top: 10px;">
        <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Now/ToDo</div>
        <div id="nowToDoRG" style="height: 40px; float: left;">
            <%if (Model.InstantBuySell == false)
              { %>
            <input type="radio" id="btnBuySellDlgNow" name="nowToDoRG" /><label style="width: 60px;" for="btnBuySellDlgNow">Now</label>
            <input type="radio" id="btnBuySellDlgToDo" name="nowToDoRG" checked="checked" /><label style="width: 60px;" for="btnBuySellDlgToDo">ToDo</label>
            <%}
              else
              { %>
            <input type="radio" id="btnBuySellDlgNow" name="nowToDoRG" checked="checked" /><label style="width: 60px;" for="btnBuySellDlgNow">Now</label>
            <input type="radio" id="btnBuySellDlgToDo" name="nowToDoRG" /><label style="width: 60px;" for="btnBuySellDlgToDo">ToDo</label>
            <%} %>
        </div>
    </div>
    <div style="clear: both;"></div>

    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Quantity</div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">
        <input id="tbQuantity" type="text" style="width: 60px; text-align: right;" value="10" />
    </div>
    <div style="clear: both;"></div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">Quote</div>
    <div style="float: left; width: 100px; height: 30px; line-height: 30px;">
        <input type="text" style="width: 60px; text-align: right;" readonly="readonly" value="<%=InMaApp.DisplayHelper.FormatDouble(Model.Quote)%>" />
    </div>
    <div style="clear: both;"></div>

    <div class="bottomArea">
        <div class="beforeConfirm">
            <div id="btnConfirmBuySell" style="margin-top: 12px; float: left; width: 84px; height: 28px;">Confirm</div>
            <div id="btnCancelBuySell" style="margin-top: 12px; float: left; margin-left: 8px; width: 84px; height: 28px;">Cancel</div>

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
