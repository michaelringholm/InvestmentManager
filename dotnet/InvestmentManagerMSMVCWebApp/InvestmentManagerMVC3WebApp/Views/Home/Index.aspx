<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<InMaApp.Models.PortfolioModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    InvestmentManager
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">    
    <%Html.RenderPartial("WelcomeControl"); %>
</asp:Content>
