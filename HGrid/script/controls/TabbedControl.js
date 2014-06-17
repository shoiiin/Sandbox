/// <reference path="~/Scripts/DevIntellisense.js"/>
 
(function (undefined) {



    /*
    * Private Members
    */

    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {},
        tabedControl = controls.TabbedControl = controls.TabbedControl || new T1_C2_Shell_Controls_TabedControl();


    /*
    * Private Functions
    */


    /**************************************************************************
    * Library: T1.C2.Client.Controls.TabbedControl
    */
    function T1_C2_Shell_Controls_TabedControl() {
        /// <summary>
        /// Initialises a new instance of the tabedControl control
        /// </summary>

        /*
        * Private Members
        */

        var myPublicApi;

        /*
        * Private Functions
        */

        function CreateLoadingOverlay(parent) {
            var overlay = $(document.createElement('div')),
                loadingMessage = $(document.createElement('div')),
                parentPosition = parent.position();

            loadingMessage.addClass('message');

            overlay.addClass('overlay');

            loadingMessage.css({
                'margin-top': parent.height() / 2
            });

            overlay.css({
                'top': parentPosition.top,
                'left': parentPosition.left,
                'width': parent.width(),
                'height': parent.height()
            });
            overlay.append(loadingMessage);
            return overlay;
        }

        function ShowTab(tabHandle) {
            var tabData = tabHandle.data('t1-tab'),
                tabControls = tabHandle.closest('.tabbedControl').children('.tabsContainer').children('.tabControl'),
                tabControlToShow = $(tabControls[tabHandle.index()]);

            tabHandle.parent().children('.selected').removeClass('selected');
            tabHandle.addClass('selected');
            tabControls.removeClass('selected');
            tabControlToShow.addClass('selected');

            if (tabData && tabData.TabUrl && !(tabData.LoadOnce && tabControlToShow.is('.loaded'))) {
                    tabControlToShow.append(CreateLoadingOverlay(tabControlToShow));
                    $.ajax({
                        url: tabData.TabUrl,
                        type: "GET",
                        success: function (data) {
                            tabControlToShow.fadeOut(200, function () {
                                tabControlToShow.html(data);
                                tabControlToShow.fadeIn(200, function () {
                                    tabControlToShow.attr('style', '');
                                    tabControlToShow.addClass('loaded');
                                });
                            });
                        }
                    });
            }
        }

        /*
        * Public API
        */

        function T1_C2_Shell_Controls_TabedControl_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }

        T1_C2_Shell_Controls_TabedControl_Public.prototype = {
            ShowTab: function (tabbedControl, tabNumber) {
                ShowTab($(tabbedControl.children('.tabHandlesContainer').children('.tabHandle')[tabNumber]));
            },
            Initialise: function (tabbedControl) {
                tabbedControl.addClass('initialised');
                if (tabbedControl.children('.tabHandlesContainer').children('.tabHandle.selected').length) {
                    tabbedControl.children('.tabHandlesContainer').children('.tabHandle').each(function () {

                        if ($(this).hasClass('selected')) {
                            ShowTab($(this));
                        }
                    });
                } else {
                    ShowTab($(tabbedControl.children('.tabHandlesContainer').children('.tabHandle')[0]));
                }
            }
        };


        /*
        * Initialisation
        */

        $('.tabbedControl .tabHandle').live('click', function () {
            ShowTab($(this));
        })

        // return a new instance of the public object
        myPublicApi = new T1_C2_Shell_Controls_TabedControl_Public();
        return myPublicApi;
    }

} ());

