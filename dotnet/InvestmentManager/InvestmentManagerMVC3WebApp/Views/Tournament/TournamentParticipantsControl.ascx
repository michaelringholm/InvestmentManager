<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.TournamentParticipantsModel>" %>
<div class="bodyTopSection">
    <div style="float: left;">
        <img alt="" src="/Content/images/Trophy-Gold-icon128.png" />
    </div>
    <div style="float: left; margin-left: 12px; height: 136px;">
        <div style="font-size: 24pt; line-height: 36px; margin-top: 6px; text-shadow: 2px 2px #1c1c1c;"><%=Model.Tournament.title %></div>

        <div style="float: left;">
            <div class="normalCaption" style="line-height: 14px; margin-top: 10px;">Start date</div>
            <div style="font-size: 12pt; line-height: 14px;"><%=InMaApp.DisplayHelper.FormatDate(Model.Tournament.startDate) %></div>
            <div class="normalCaption" style="line-height: 14px; margin-top: 8px;">End date</div>
            <div style="font-size: 12pt; line-height: 14px;"><%=InMaApp.DisplayHelper.FormatDate(Model.Tournament.endDate) %></div>
        </div>
        <div style="float: left; height: 84px; line-height: 84px; margin-left: 18px;">
            <div style="font-size: 38pt; font-weight: bold;"></div>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div style="clear: both;">
    </div>
</div>
<div style="clear: both;">
</div>
<div style="" class="tableHeader">
    <div style="float: left; margin-left: 44px; width: 170px;">
        FullName
    </div>
    <div style="float: left; margin-left: 20px; width: 40px; text-align: right;">
        Rank
    </div>
    <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
        Total value
    </div>
    <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
        Cash
    </div>
    <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
        Market value
    </div>
    <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
        Behind leader
    </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 0px;">
    <%foreach (var participant in Model.Participants)
      {%>
    <%String imgSrc = "Office-Customer-Male-Light-icon32.png";
      if(participant.gender == "Female")
          imgSrc = "Office-Customer-Female-Light-icon32.png";
    %>
    <div class="participant">
        <div style="float: left; margin-left: 4px; margin-top: 4px;">
            <img title="<%=participant.fullName %>" alt="" src="/Content/images/<%=imgSrc %>" style="width: 32px; height: 32px;" />
        </div>
        <div style="float: left; margin-left: 8px; width: 170px;">
            <%=participant.fullName%>
        </div>
        <div style="float: left; margin-left: 20px; width: 40px; text-align: right;">
            <%=participant.rank%>
        </div>
        <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(participant.totalValue)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(participant.cash)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(participant.marketValue)%>
        </div>
        <div style="float: left; margin-left: 20px; width: 124px; text-align: right;">
            <%=InMaApp.DisplayHelper.FormatMoney(participant.totalValue - Model.LeadingTotalValue)%>
        </div>
        <div style="clear: both;">
        </div>
    </div>
    <div style="clear: both;">
    </div>
    
    <%} %>
    <%if (Model.Participants == null || Model.Participants.Count == 0)
      { %>
    <div title="Clicking here will enable you to invite your friends, family and colleagues" class="securityEmptyList emptyList" style="height: 80px; line-height: 80px;">
        <div style="float: left; margin-top: 10px; margin-left: 240px;"><img alt="" style="width: 60px;" src="/Content/images/Office-Customer-Female-Light-icon72.png" /></div>
        <div style="float: left; margin-left: 24px;">Add more users by inviting them <span style="text-decoration: underline; font-weight: bold;">here!</span></div>
    </div>
    <div style="clear: both;">
    </div>
    <%} %>
</div>
