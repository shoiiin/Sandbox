
function ApplicationEnvironment() {
    var ajaxProxy = new AJAXAdapter();
    ajaxProxy.setErrorHandler = _stdErrorHandler;
    var modalWindow = new Dialog();


    this.GetAJAXAdapter = getAJAXAdapter;
    this.GetModalWindow = getModalWindow;

    function getAJAXAdapter(){
        return ajaxProxy;
    }

    function getModalWindow() {
        return modalWindow;
    }

}

function _stdErrorHandler(e) {
    var modalWindow = ClientEnvironment.GetModalWindow();
    modalWindow.openModal(htmlData);
}

function _stdCloseWindow() {
    var modalWindow = ClientEnvironment.GetModalWindow();
    modalWindow.close();
}
