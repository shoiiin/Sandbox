$(document).ready(function () {
    var pageScroll;
    var popupScroll;
    var touchY;
    var currentTouchY;

    var touchDevice;

    $('html').live('touchstart', function (e) {
        touchDevice = event.touches;
    });

    //$('#PopupContainer').css('height', $('#PopupContainer').height() - (parseInt($('#PopupContainer').css('paddingTop')) + parseInt($('#PopupContainer').css('paddingBottom'))));
    $('.showPopup').live("click", function (e) {
        //$('#PopupContainer').show();


        $('#' + $(this).attr("id") + 'Div').show();


        pageScroll = $(document).scrollTop();
        if (touchDevice) {
            $('#PopupContainer').css('padding-top', pageScroll + 30);
            $('#PopupContainer').css('overflow', 'visible');
            $('#PopupContainer').css('height', $('html').height());
            $('#PopupContainer').css('width', $('html').width());
        } else {
            //$('#PopupContainer').css('top', pageScroll);
            //$('#PopupContainer').css('bottom', 0 - pageScroll);
            var htmlHeight = $('html').height();
            $('html').css('overflowY', 'hidden');
            $('html').css('margin-right', '17px');
            //$('.functionActions').css('right', '17px');
        }
    });

    $('.pu .close').live('click', function () {
        //$('#PopupContainer').hide();
        //$('#' + $(this).attr("id") + 'Div').show();

        $(this).closest('.pu').hide();

        if(!$('.pu:visible').length){
            $('html').css('overflowY', 'scroll');
            $('html').css('margin-right', '0');
            //$('.functionActions').css('right', '0');
        }
    });


    //$('#pickListClose3').click(function () {
    //$('#PopupContainer').hide();
    //$(this).closest(.pu).hide();
    //}



    /*
    $('#PopupContainer').live('touchstart', function (event) {
    touchY = event.originalEvent.touches[0].pageY || event.originalEvent.targetTouches[0].pageY;
    popupScroll = $(this).scrollTop();
    });
    
    $('#PopupContainer').live('touchmove', function (event) {
    event.preventDefault();
    $(this).scrollTop(popupScroll + (touchY - event.originalEvent.touches[0].pageY || event.originalEvent.targetTouches[0].pageY));

    });
    */



//    $('.pickListTabs a').click(
//                function () {
//                    $('.pickListContent').hide();
//                    $('#' + $(this).attr("id") + 'Content').show();
//                    $('.current').removeClass('current');
//                    $(this).addClass('current');

//                });

//    $('.tabs a').click(
//                function () {
//                    $('.pickListContent').hide();
//                    $('#' + $(this).attr("id") + 'Content').show();
//                    $('.current').removeClass('current');
//                    $(this).addClass('current');

//                });

});