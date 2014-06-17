/// <reference path="~/Scripts/DevIntellisense.js"/>

(function (undefined) {

    function InitialiseControls(nodeToInitialise) {

        InitialiseTabbedControls(nodeToInitialise);
        InitialiseTimelineBarControl(nodeToInitialise);

    }

    //initialise TabbedControls
    function InitialiseTabbedControls(element) {
        var uninitialisedTabbedControl = $(element).find('.tabbedControl').not('.initialised');
        if (uninitialisedTabbedControl.length) {
            T1.C2.Shell.Controls.TabbedControl.Initialise(uninitialisedTabbedControl);
            console.log('initialised tabbed control');
        }
    }

    //initialise InitialiseTimelineBarControl
    function InitialiseTimelineBarControl(element) {
        var uninitialisedTimelineBarControl = $(element).find('.timelineBarControl').not('.initialised');
        if (uninitialisedTimelineBarControl.length) {
            T1.C2.Shell.Controls.TimelineBarControl.Initialise(uninitialisedTimelineBarControl);
            console.log('initialised TimelineBar control');
        }
    }


    /*
    *   Events
    */

    //Initialise all controls on page load
    $(document).ready(function () {
        InitialiseControls(document);
        console.log('initialised all controls on document ready');
    });

    //Initialise any late-created controls
    $(document).bind('DOMSubtreeModified', function (event) {
        InitialiseControls(event.srcElement);
    })

} ());

