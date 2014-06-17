function GetHGridData(url) {
    var ajaxProxy = ClientEnvironment.GetAJAXAdapter();
    ajaxProxy.setParameters({ operation: "application" });
    ajaxProxy.call(url, GetHGridData_Callback);
}

function GetHGridData_Callback(htmlData) {
    $('#HGridContainer').html(htmlData);
}