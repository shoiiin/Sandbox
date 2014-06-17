/// <reference path="~/Scripts/DevIntellisense.js"/>
 
(function (undefined) {



    /*
    * Private Members
    */

    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {},
        dateRangeControl = controls.DateRangeControl = controls.DateRangeControl || new T1_C2_Shell_Controls_DateRangeControl(),
        tileWidth = 100;


    /*
    * Private Functions
    */

    function CreateTile(label) {
        var tile = $(document.createElement('span'));

        tile.text(label);
        tile.addClass('tile');
        tile.addClass(label);

        return tile;
    }

    function CreateYearsArray(date) {
        var years = [],
            numberOfTilesToDisplay = 21;

        for (var i = 0; i < numberOfTilesToDisplay; i++) {
            console.log(date.getFullYear());
            years[i] = parseInt(date.getFullYear() + i - (numberOfTilesToDisplay / 2));
        }

        return years;
    }

    function CreateMonthsArray(date) {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    function CreateDaysArray(date) {
        return ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];
    }

    function CreateDateBar(barType, date) {
        var bar = $(document.createElement('div')),
            tileLabels = [];

        bar.addClass('rangeBar');

        if (barType == "years") {
            bar.addClass('years');
            tileLabels = CreateYearsArray(date);
        }

        for (var i = 0; i < tileLabels.length; i++) {
            var tile = CreateTile(tileLabels[i]);

            if (i == parseInt(tileLabels.length / 2)) {
                tile.addClass("selected");
            }

            bar.append(tile);
        }

        return bar;
    }

    function PositionTiles(bar) {

        var tiles = bar.find('.tile'),
            tilePositions = (bar.width() - tiles.length * tiles.width()) / 2;

        tiles.css({
            "left": tilePositions
        });



    }


    /**************************************************************************
    * Library: T1.C2.Client.Controls.DateRangeControl
    */
    function T1_C2_Shell_Controls_DateRangeControl() {
        /// <summary>
        /// Initialises a new instance of the dateRangeControl control
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

        function T1_C2_Shell_Controls_DateRangeControl_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }

        T1_C2_Shell_Controls_DateRangeControl_Public.prototype = {
            Create: function (date) {
                $('.dateRangeControl').data('t1-date', date || new Date());
                $('.dateRangeControl').html(CreateDateBar("years", $('.dateRangeControl').data('t1-date')));
                PositionTiles($('.dateRangeControl').find('.rangeBar'));
            }
        };



        /*
        * Initialisation
        */

        $(document).ready(function () {
            $('.dateRangeControl').html(CreateDateBar("year"));
        });

        // return a new instance of the public object
        myPublicApi = new T1_C2_Shell_Controls_DateRangeControl_Public();
        return myPublicApi;
    }

} ());

