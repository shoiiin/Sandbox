<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<h2>NewPage</h2>
<input type="button" value="Go back" onclick="LoadPage('<%=Url.Action("Index","Main")%>')" />
</asp:Content>
