<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<System.Web.Mvc.HandleErrorInfo>" %>

<asp:Content ID="errorTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Error
</asp:Content>

<asp:Content ID="errorContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style="color: #ffffff; margin-left: 18px; margin-top: 18px;">
    <span style="font-size: 16pt;">
        Sorry, an error occurred while processing your request.
    </span>
        <div style="margin-top: 20px;">Stack Trace</div>
        <div style="font-size: 9pt;">
            <%  Exception ex = (Exception)Session["LastException"];
                if(ex != null) { %>
                <%=ex.Message %>
                <%=ex.StackTrace %>
            <%} else { %>
            <%="No stack trace available." %>
            <%} %>
        </div>
    </div>
</asp:Content>
