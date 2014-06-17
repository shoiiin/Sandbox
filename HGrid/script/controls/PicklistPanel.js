$('.picklistPanel .picklist').live('blur',function(){
	GetPicklistPanelContent($(this), $(this).data('t1-picklist').DataUrl);
});

function GetPicklistPanelContent(picklist, url){
	$.ajax({
		url:url,
		type: 'post',
		success: function(data){
			AddPicklistPanelContent(picklist, data)
		}
	});
}

function AddPicklistPanelContent(picklist, content){
	picklist.parent('.picklistPanel').children('.panel').remove();
	picklist.parent('.picklistPanel').append(content);
}