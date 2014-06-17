
function Dialog() {
	var $dialog = $('<div></div>')
		.html('')
		.dialog({
			autoOpen: false,
			title: 'Dialog',
            modal:true,
            dialogClass: 'popupWindow',
            width:'auto'
		});

    this.openModal = openModal;
    this.close = close;

    function openModal(htmlData) {
        $dialog.html(htmlData);
        $dialog.dialog('open');
    }

    function close() {
        $dialog.dialog('close');
    }
}

