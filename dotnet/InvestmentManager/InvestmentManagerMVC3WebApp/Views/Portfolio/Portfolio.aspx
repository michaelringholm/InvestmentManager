<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<InMaApp.Models.PortfolioModel>" %>

<asp:Content ID="Content3" ContentPlaceHolderID="HeadContent" runat="server">
    <script type="text/javascript">
        $(function () {
            $("#login").val(<%=InMaApp.ContextManager.Current.LoginId%>);

            ShowPortfolioList();
            UpdatePortfolioHeader(<%=Model.Portfolio.portfolioHeader.id%>);
            CheckAuthentication();
        });
    </script>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    InvestmentManager
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div id="div1" style="width: 1000px; height: 680px; overflow: auto;">            
    </div>
</asp:Content>
