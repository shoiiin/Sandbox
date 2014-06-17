<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<h2>EmbeddedPDF</h2>
<table>
    <tr>
        <td>
            - embed object - zoom-ed
            <br/>
            <object data="https://www.adobe.com/products/pdfjobready/pdfs/pdftraag.pdf" type="application/pdf" width="300px" height="400px">
            <p>Your web browser doesn't have a PDF plugin.</a></p>
            </object>
        </td>
        <td>
            - embed tag -  similar to object but no zoom
            <br/>
            <embed src="https://www.adobe.com/products/pdfjobready/pdfs/pdftraag.pdf" width="300px" height="400px" scale="tofit">
                <param name="SCALE" value="aspect"/>
            </embed>
        </td>
    </tr>
    <tr>
        <td>
        - iFrame - no zoom
        <br/>
        <div class='iframeContainer'>
            <iframe src="https://www.adobe.com/products/pdfjobready/pdfs/pdftraag.pdf" width="300px" height="400px" scrolling="yes" allowfullscreen></iframe>
        </div>
        </td>
        <td>
        - 3rd party
        <br/>
        <iframe src="http://mozilla.github.com/pdf.js/web/viewer.html" width="300px" height="400px" scrolling="no"></iframe>
        </td>
    </tr>
</table>

</asp:Content>
