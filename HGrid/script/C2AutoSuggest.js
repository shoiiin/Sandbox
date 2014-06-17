function autoSuggest() {
    $(document).ready(function () {

        function AddAutoSuggest(element, data) {
            element.jsonSuggest(data, {
                maxResults: 10,
                select: function (e) {
					var thing = $(this);
					thing.val("");
                }
            });
        }

        $('.bindAutoSuggestEvents').live('focus',function (event) {
            AddAutoSuggest($(this), testData[$(this).attr('autoSuggestKey')]);
			$(this).removeClass('bindAutoSuggestEvents');
        });
    });

}

//only load this script if it has not previously been loaded.
if (!this.autoSuggestLoaded) {
    autoSuggestLoaded = true;
    autoSuggest();
}