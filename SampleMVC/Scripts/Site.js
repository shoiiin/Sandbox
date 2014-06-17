function LoadPage(url, operation) {
    window.location = url + '?operation=' + operation;
}

function CallAJAX_HTML(url, operation) {
    var ajaxProxy = ClientEnvironment.GetAJAXAdapter();
    ajaxProxy.setParameters({ operation: operation });
    ajaxProxy.call(url, CallAJAX_HTML_Callback);
}

function CallAJAX_HTML_Callback(htmlData) {
    var modalWindow = ClientEnvironment.GetModalWindow();
    modalWindow.openModal(htmlData);
}

function CallAJAX_JSON(url, operation) {
    var ajaxProxy = ClientEnvironment.GetAJAXAdapter();
    ajaxProxy.setAJAXReturnFormat('json');
    ajaxProxy.setParameters({ operation: operation });
    ajaxProxy.call(url, CallAJAX_JSON_Callback);
}

function CallAJAX_JSON_Callback(jsonData) {
    for (var p in jsonData) {
        alert(p + '=' + jsonData[p]);
        CallAJAX_JSON_Callback(jsonData[p])
    }
}