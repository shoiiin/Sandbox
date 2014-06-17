$(document).ready(
	function () {
	    $(function () {
	        var tgtPin = $('.pinAction');
	        tgtPin.toggle(
				           function () {
				               $(this).addClass('pinActionToggled');
				               $('#' + $(this).attr("id") + 'Button').show('fast');
				               //$('#' + $(this).attr("id") + 'Button').parent().width(
				               //	$('#' + $(this).attr("id") + 'Button').parent().width() + 34); 
				               //$(this).attr('title', 'Pin this action');
				           },
				           function () {
				               $(this).removeClass('pinActionToggled');
				               $('#' + $(this).attr("id") + 'Button').hide('fast');
				               //$('#' + $(this).attr("id") + 'Button').parent().width(
				               //	$('#' + $(this).attr("id") + 'Button').parent().width() - 34);
				               //$(this).attr('title', 'Unpin this action');  
				           });

	    });

	    $('.expandable').click(
			function () {
			    $(this).next().toggle();
			});



	    $('.expandable').toggle(
			function () {
			    $(this).addClass('collapsed');
			},
			function () {
			    $(this).removeClass('collapsed');
			});




	    $('.collapseAll').click(
			function () {
			    $('.fieldsContainer').hide();
			    $('legend.expandable').addClass('collapsed');
			});


	    $('.expandAll').click(
			function () {
			    $('.fieldsContainer').show();
			    $('fieldset legend').removeClass('collapsed');
			});




	});

//$(document).click(function(e){
 //               if($activeTile == null) return;
                // Need to check whether $activeTile is within the bounds of e.Target.
  //              $activeTile.click();
                



//});



$(function() {
    
    $('#functionActions .buttonImg input').tipsy();
        
  });


$().ready(function () {
            var stickyPanelOptions = {
                topPadding: 0,
                afterDetachCSSClass: "stuckTopPanel",
                savePanelSpace: true
            };
            $("#functionActions").stickyPanel(stickyPanelOptions);
        });
