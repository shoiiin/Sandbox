<%@ Page Inherits="System.Web.Mvc.ViewPage<Sandbox.Models.ApplicationErrorModel>" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Title="" %>

<asp:Content ID="Content" runat="server" ContentPlaceHolderID="MainContent">
    <%Html.RenderAction("ErrorDetails", "Base", Model);%>
</asp:Content>
