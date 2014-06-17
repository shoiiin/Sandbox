$(document).delegate('.viewSelector button', 'click', function (event) {
    var theBtn = $(this);
    var request = {};
    if (theBtn.is('.generalBtn')) {
        request = {
            Action : "General"
        };
    } else {
        request = {
            Action : "PDF"
        };
    }
    getView(request);
});

function getView(request) {
    var url = "HTMLCSS/" + request.Action;
    var ajaxProxy = ClientEnvironment.GetAJAXAdapter();
    ajaxProxy.call(url, getView_callback);
}

function getView_callback(htmlData) {
    var target = $('.view');
    target.html(htmlData);
}
