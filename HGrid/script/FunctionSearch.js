$(document).ready(function () {
    $('.advancedSearchCriteria').css('display', 'none');

    $('.advancedSearch a').toggle(
				    function () {
				        $(this).addClass('expanded');
				        event.preventDefault();
				        $('.advancedSearchCriteria').show();
				    },
				    function () {
				        $(this).removeClass('expanded');
				        event.preventDefault();
				        $('.advancedSearchCriteria').hide();
				    }
				);
});