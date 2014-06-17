<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Sandbox.Models.ApplicationErrorModel>" %>
<div id="errorDetailsContainer">
    <h1>Application error.</h1>
    <div>
        <div>Exception details</div>
        <table>
            <tr>
                <td nowrap="nowrap">Message</td>
                <td><%= Model.Message%></td>
            </tr>
            <tr>
                <td nowrap="nowrap">Inner exception</td>
                <td><%=Model.InnerException%></td>
            </tr>
            <tr valign="top">
                <td nowrap="nowrap">Stack trace</td>
                <td><%=Model.StackTrace%></td>
            </tr>
        </table>
    </div>
</div>
