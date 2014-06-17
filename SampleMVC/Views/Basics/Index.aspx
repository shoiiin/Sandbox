<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<h2>Main page</h2>
<hr />
Cache actions
<ul>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("ClearCache","Basics")%>')">Clear cache</li>
</ul>
<hr />
Controller actions types
<ul>
    <li class="link" onclick="LoadPage('<%=Url.Action("NewPage","Basics")%>')">Load page</li>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("AJAX_HTML","Basics")%>')">AJAX-HTML call</li>
    <li class="link" onclick="CallAJAX_JSON('<%=Url.Action("AJAX_JSON","Basics")%>')">AJAX-JSON call</li>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("WCF","Basics")%>')">WCF service call</li>
</ul>

<hr />
Controller error handling
<ul>
    <li class="link" onclick="LoadPage('<%=Url.Action("NewPage","Basics")%>','ERROR')">Load page (throws Exception)</li>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("AJAX_HTML","Basics")%>','ERROR')">AJAX-HTML call (throws SecurityException)</li>
    <li class="link" onclick="CallAJAX_JSON('<%=Url.Action("AJAX_JSON","Basics")%>','ERROR')">AJAX-JSON call (throw ApplicationException)</li>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("WCF","Basics")%>','ERROR')">WCF service call</li>
</ul>

<hr />
IIS errors - not handled by MVC (HTTP 404, etc)
<ul>
    <li class="link" onclick="LoadPage('<%=Url.Action("404","Basics")%>','ERROR')">Load page</li>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("404","Basics")%>','ERROR')">AJAX-HTML call</li>
    <li class="link" onclick="CallAJAX_JSON('<%=Url.Action("404","Basics")%>','ERROR')">AJAX-JSON call</li>
</ul>
<hr />
Patterns
<ul>
    <li class="link" onclick="CallAJAX_HTML('<%=Url.Action("DependencyInjection","Basics")%>')">Dependency injection</li>
</ul>

</asp:Content>
