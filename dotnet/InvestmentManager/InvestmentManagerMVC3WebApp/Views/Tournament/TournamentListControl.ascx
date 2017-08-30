<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<InMaApp.Models.TournamentListModel>" %>
<div style="margin-left: 46px; margin-top: 12px;">
    <%foreach (var tournament in Model.Tournaments)
      { %>
    <div class="tournament" data-tournament-id="<%=tournament.id%>" data-tournament-title="<%=tournament.title%>">
        <div style="margin-left: 8px; margin-top: 10px; float: left;">
            <img alt="<%=tournament.title%>" src="/Content/images/Trophy-Gold-icon128.png" />
        </div>
        <div style="float: left; margin-top: 24px; margin-left: 6px;">
            <%if (tournament.signedUp)
              {%>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase;">
                Rank
            </div>
            <div>
                <%=new InMaApp.InMaJavaWS.InvestmentManagerInterfaceClient().getPortfolioByTournament(InMaApp.ContextManager.Current.LoginId, tournament.id).portfolioHeader.rank%>
            </div>
            <%}
              else
              { %>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase;">
                Starts
            </div>
            <div>
                <%=InMaApp.DisplayHelper.FormatDate(tournament.startDate)%>
            </div>
            <%} %>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; margin-top: 12px;">
                Ends
            </div>
            <div>
                <%=InMaApp.DisplayHelper.FormatDate(tournament.endDate)%>
            </div>
        </div>
        <div style="clear: both;">
        </div>
        <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; margin-top: -6px; text-align: center; float: left; width: 278px;">
            <%if (tournament.signedUp)
              {%>
            <span>(Currently participating)</span> <%}
              else
              {%>
            <span style="text-decoration: underline;">(Click tournament to join)</span>
            <%} %>
        </div>
        <div style="clear: both;">
        </div>
        <div style="text-align: center; margin-top: 0px;">
            <%=tournament.title%>
        </div>
    </div>
    <%} %>
    <div class="newTournament">
        <div style="margin-left: 84px; margin-top: 10px; float: left;">
            <img alt="" src="/Content/images/Trophy-Gold-icon128.png" />
        </div>
        <div style="margin-top: 60px; margin-left: -80px; float: left;">
            <img class="addIconLarge" alt="" src="/Content/images/Actions-list-add-icon72.png" style="" />
        </div>
        <div style="margin-top: 6px; margin-left: -10px; float: right;">
            <img alt="" title="This feature is not yet unlocked" src="/Content/images/Lock-icon48.png" style="" />
        </div>
        <div style="float: left; margin-top: 24px; margin-left: 6px;">
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase;">
            </div>
            <div>
            </div>
            <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; margin-top: 12px;">
            </div>
            <div>
            </div>
        </div>
        <div style="clear: both;">
        </div>
        <div style="font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; margin-top: -6px; text-align: center; float: left; text-decoration: underline; width: 278px;">
        </div>
        <div style="clear: both;">
        </div>
        <div style="text-align: center; margin-top: 8px; font-size: 10pt; color: #ffffff; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
            Click to create a new tournament
        </div>
    </div>
    <div style="clear: both;">
    </div>
</div>
