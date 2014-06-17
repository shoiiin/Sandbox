/// <reference path="~/Scripts/DevIntellisense.js"/>

(function (undefined) {



    /*
    * Private Members
    */

    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {};
    actionsPane = controls.ActionBar = controls.ActionBar || new T1_C2_Shell_Controls_ActionBar();


    /*
    * Private Functions
    */


    /**************************************************************************
    * Library: T1.C2.Client.Controls.ActionBar
    */
    function T1_C2_Shell_Controls_ActionBar() {
        /// <summary>
        /// Initialises a new instance of the actionsPane control
        /// </summary>

        /*
        * Private Members
        */

        var myPublicApi;

        /*
        * Private Functions
        */


        /*
        * Public API
        */

        function T1_C2_Shell_Controls_ActionBar_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }


        /*
        * Initialisation
        */

        $('.actionsPane .actionsPaneLayoutToggle').live('click', function () {
            if ($('#contentContainer').hasClass('sideBarLayout')) {
                $('#contentContainer').removeClass('sideBarLayout');
                $('.actionsPane').css('height', 'auto');
                $('.actionsPane').find('.expandable').addClass('notExpandable').removeClass('expandable').removeClass('colapsed').next().slideDown();
            } else {
                $('#contentContainer').addClass('sideBarLayout');
                $('.actionsPane').find('.notExpandable').addClass('expandable').removeClass('notExpandable');
                ResizeActionPane();
            }
            RepositionActionPane();
        })

        function ResizeActionPane() {
            var scrollTopHeightAdjust = $('#divHeader').outerHeight(true) - $(window).scrollTop();

            if (scrollTopHeightAdjust < 0) { scrollTopHeightAdjust = 0 };

            $('.sideBarLayout .actionsPane').outerHeight($(window).height() - scrollTopHeightAdjust);
        }

        function RepositionActionPane() {
            var touch = Modernizr.touch;
            $('.actionsPane').attr('style', '');
            if ($(window).scrollTop() > $('.actionsPane').parent().offset().top) {
                if (touch) {
                    $('.actionsPane').css({
                        'position': 'absolute',
                        'top': $(window).scrollTop() - $('.actionsPane').parent().offset().top
                    });
                } else {
                    $('.actionsPane').not('.sideBarLayout .actionsPane').css({
                        'position': 'fixed',
                        'top': '0px',
                        'width': $('.actionsPane').parent().width()
                    });
                    $('.sideBarLayout .actionsPane').css({
                        'position': 'fixed',
                        'top': '0px'
                    });
                }
            } else {
                if (touch) {
                    $('.actionsPane').css({ 'top': '0px' });
                } else {
                    $('.actionsPane').css({ 'position': 'absolute' });
                }
            }
            ResizeActionPane();
        }

        $('.actionsDropDown').live('click', function () {
            if (!$('.dropDown:visible').length) {
                $('.dropDown').css({ 'display': 'block' });
            } else {
                $('.dropDown').attr('style', '');
            }
        });

        $(document).ready(function () {
            ResizeActionPane();
        });

        $(window).resize(function () {
            ResizeActionPane();
        });

        $('html').live('mousedown', function (event) {
            if ($('.dropDown:visible').length && !$(event.srcElement).closest('.dropDown').length && !$(event.srcElement).closest('.actionsDropDown').length) {
                $('.dropDown').attr('style', '');
            }
        });

        $(window).scroll(function () {

            RepositionActionPane();

        })

        // return a new instance of the public object
        myPublicApi = new T1_C2_Shell_Controls_ActionBar_Public();
        return myPublicApi;
    }

} ());

