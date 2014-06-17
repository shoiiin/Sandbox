/// <reference path="~/Scripts/DevIntellisense.js"/>

(function (undefined) {

    $('.expandable').live('click', function () {
        if ($(this).is('.collapsed')) {
            $(this).next().slideDown(200);
            $(this).removeClass('collapsed');
        } else {
            $(this).next().slideUp(200);
            $(this).addClass('collapsed');
        }
    })

} ());