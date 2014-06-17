window.ManagerTransactionView = function () {
    $('.attentionItemList').addClass('transaction').removeClass('zombie');
    $('.attentionItemList li').attr('style','');
    $('.attentionItemList span').attr('style', '');
    $('.attentionItemList h1').attr('style', '');
    $('.attentionItemList li').each(function (index) {
        var thisData = $(this).data("t1-c2-manager-attention-item"),
            thisImportance = parseInt(155 * ((parseFloat(thisData.Importance) + parseFloat(thisData.Urgency)) / 2) / 100) + 100;
        $(this).find('.details .icon16').css({
            //"color": "rgb(" + thisImportance + ",100,100)" 
            "background-color": "rgb(" + thisImportance + ",100,100)"           
        });
        $(this).css({
            //"top":$(this).outerHeight(true) * index
        });
    });
}

window.Zombienize = function () {
    $('.attentionItemList').addClass('zombie').removeClass('transaction');
    var thisData = $(this).data("t1-c2-manager-attention-item");

    $('.attentionItemList.zombie li').find('.icon').click(function () {
        $(this).closest('li').find('.details').toggle();
    });

    $('html').live('click', function (event) {
        if ($('.attentionItemList.zombie').length) {
            $('li .details').hide();
            if ($(event.srcElement).closest('li .icon').length) {
                $(event.srcElement).closest('li .icon').siblings('.details').show('fast');
            }
        }
    });

    sizeStuff();

    function sizeStuff() {
        $('.attentionItemList li').each(function (index) {
            var thisData = $(this).data("t1-c2-manager-attention-item"),
                thisImportance = thisData.Importance / 100,
                thisUrgency = thisData.Urgency / 100,
                padding = ($(this).parent().width() / 8),
                topReset = 0;// ($(this).outerHeight(true) - (($(this).outerHeight(true) - $(this).outerHeight()) / 2)) * index;

            $('.attentionItemList').css({
                "height": $('.attentionItemList li').parent().width()
            });
            $(this).css({
                "top": $(this).parent().height() - padding * 1.5 - (($(this).parent().height() - padding) * thisImportance) - topReset + padding,
                "left": $(this).parent().width() - padding * 1.5 - (($(this).parent().width() - padding) * thisUrgency) + padding,
                "z-index": parseInt(((thisUrgency + thisImportance)) * 100)
            });
        $(this).find('h1').css({
            "font-size": ((parseInt(thisData.Importance) + parseInt(thisData.Urgency)) / 2) / 200 + 0.6 + "em"
        });

    });

}

$(window).resize(function (event) {
    if ($('.attentionItemList.zombie').length) {
        sizeStuff();
    }
});
}