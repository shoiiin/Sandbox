
var $activeTile = null;     

$(document).ready(function () {

	var target = $('.tile .folder');
	target.toggle(
		function () {
			if ($activeTile != null) {
				$activeTile.click();
			}
			$(this).closest('.tile').find('.startSecondLevel').show();
			$(this).parent('.tile').addClass('tileClick');
			$(this).closest('.tile').find('span.wPDropDown').animate({ height: '0', bottom: '-3px' }, 300);
			$activeTile = $(this);
		},
		function () {
			$(this).closest('.tile').find('.startSecondLevel').hide();
			$(this).parent('.tile').removeClass('tileClick');
			$(this).closest('.tile').find('span.wPDropDown').animate({ height: '9px', bottom: '-2px' }, 300);
			$activeTile = null;
		}
	);
      

	$(document).click(function(e){
		if($activeTile == null) return;
		// Need to check whether $activeTile is within the bounds of e.Target.
		$activeTile.click();
	});
});