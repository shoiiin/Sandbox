/// <reference path="~/Scripts/DevIntellisense.js"/>


/*******************************************************
*           Stuff to think about:
*
*   -Might neet to remove old bars as the user scrolls arround, currently shows every bar that has been viewed.
*
*
*/

(function (undefined) {

    /*
    * Private Members
    */

    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {},
        timelineBarControl = controls.TimelineBarControl = controls.TimelineBarControl || new T1_C2_Shell_Controls_TimelineBarControl();

    var oneDayInMilliseconds = 86400000;


    /*
    * Private Functions
    */


    function InteractLocation(event) {
        var e = event.originalEvent;
        var touchDevice = !e.pageX;
        event.pageX = e.pageX || e.touches[0].pageX || e.targetTouches[0].pageX;
        event.pageY = e.pageY || e.touches[0].pageY || e.targetTouches[0].pageY;
        return touchDevice;
    }

    function PageTextSelectable(selectable) {
        if (selectable) {
            $('html').css({
                "-moz-user-select": "auto",
                "-khtml-user-select": "auto",
                "-moz-user-select": "auto",
                "-o-user-select": "auto",
                "user-select": "auto"
            });
        } else {
            $('html').css({
                "-moz-user-select": "-moz-none",
                "-khtml-user-select": "none",
                "-moz-user-select": "none",
                "-o-user-select": "none",
                "user-select": "none"
            });
        }
    }


    /**************************************************************************
    * Library: T1.C2.Client.Controls.TimelineBarControl
    */
    function T1_C2_Shell_Controls_TimelineBarControl() {
        /// <summary>
        /// Initialises a new instance of the timelineBarControl control
        /// </summary>

        /*
        * Private Members
        */

        var myPublicApi;

        var today = new Date();

        today.setMilliseconds(0);
        today.setSeconds(0);
        today.setMinutes(0);
        today.setHours(0);


        var tempChartData = {
            Rows: [
                { Name: "C2Project", Caption: "Bob Down (Manager)", Id: "C2P" }
                ,
                { Name: "C2UX", Caption: "Ben Dover (Manager)", Id: "C2UX" },
                { Name: "C2HR", Caption: "Jax Heit (Manager)", Id: "C2HR" }
            ],
            Start: today,
            End: new Date(today.getTime() + 86400000 * 7),
            Scale: 'days'
        }

        /*
        * Private Functions
        */

        function MillisecondsBetween(date1, date2) {
            return (date2.getTime() - date1.getTime());
        }

        function PositionDataBar(bar, timelineData) {
            var controlRangeMilliseconds = MillisecondsBetween(timelineData.Start, timelineData.End),
                barData = bar.data('t1-timelinebarcontrolbar'),
                barLengthMilliseconds = MillisecondsBetween(barData.Start, barData.End),
                barMillisecondsFromRangeStart = MillisecondsBetween(timelineData.Start, barData.Start);

            bar.css({
                "width": 100 / controlRangeMilliseconds * barLengthMilliseconds + "%",
                "left": 100 / controlRangeMilliseconds * barMillisecondsFromRangeStart + "%"
            });
        }

        function CreateDataBar(row, data, timelineData) {

            var barData = { Start: data.Start, End: data.End },
                dataBar = $(document.createElement('div')).addClass('bar').data('t1-timelinebarcontrolbar', barData).text(barData.Start.getSeconds());

            row.append(dataBar);

            PositionDataBar(dataBar, timelineData);

            CreateNextDataBarForRow(row)
        }

        function CreateNextDataBarForRow(row) {
            var timelineBarControl = row.closest('.timelineBarControl'),
                timelineData = timelineBarControl.data('t1-timelinebarcontrol'),
                rowData = row.closest('li').data("t1-timelinebarcontrolrow");

            if (rowData.Latest.getTime() < timelineData.End.getTime() || rowData.Earliest.getTime() > timelineData.Start.getTime()) {

                /*
                $.ajax({
                type: "GET",
                url: "timesheetsByTaskData.aspx?id=" + rowData.Id + "&start=" + latestDataPoint,
                success: function (data) {
                CreateDataBar(row, data, timelineData);
                }
                });
                */


                /*** Temporary stuff untill there is servergenerated data ***/





                if (rowData.Latest.getTime() < timelineData.End.getTime()) {

                    var barStart = RoundTo(new Date(rowData.Latest.getTime() + oneDayInMilliseconds), 'days'),
                        barEnd = RoundTo(new Date(rowData.Latest.getTime() + oneDayInMilliseconds * 2), 'days');

                    var data = { Start: barStart, End: barEnd };

                } else if (rowData.Earliest.getTime() > timelineData.Start.getTime()) {

                    var barStart = RoundTo(new Date(rowData.Earliest.getTime() - oneDayInMilliseconds * 3), 'days'),
                        barEnd = RoundTo(new Date(rowData.Earliest.getTime() - oneDayInMilliseconds * 2), 'days');

                    var data = { Start: barStart, End: barEnd };

                }

                rowData.Latest = new Date(Math.max(rowData.Latest.getTime(), barEnd.getTime()));
                rowData.Earliest = new Date(Math.min(rowData.Earliest.getTime(), barStart.getTime()));
                row.closest('li').data('t1-timelinebarcontrolrow', rowData);

                if (Math.floor(Math.random() * 110) > 99) {

                    CreateDataBar(row, data, timelineData);
                }
            }

        }

        function CreateDataBarsForRows(timelineBarControl) {

            timelineBarControl.find('.chartRowSection').each(function () {
                CreateNextDataBarForRow($(this));
            });
        }

        function CreateTimelineRow(timelineRowData) {

            var chartKeyDetails = $(document.createElement('span')).text(timelineRowData.Caption),
                chartKeyTitle = $(document.createElement('p')).text(timelineRowData.Name).append(chartKeyDetails),
                keySection = $(document.createElement('section')).addClass('key').append(chartKeyTitle),
                chartRowSection = $(document.createElement('section')).addClass('chartRowSection').append(newTimelineRow),
                newTimelineRow = $(document.createElement('li')).append(keySection).append(chartRowSection);

            newTimelineRow.data("t1-timelinebarcontrolrow",
                { Earliest: new Date(),
                    Latest: new Date()
                });


            return newTimelineRow;
        }

        function CreateKeyTick(timelineBarControl, scaleBar, data) {
            var timelineData = timelineBarControl.data('t1-timelinebarcontrol'),
                tickData = { Start: data.Start, End: data.End },
                tickText = $(document.createElement('p')).text(tickData.Start.toDateString()),
                dataBar = $(document.createElement('div')).addClass('bar').addClass('animate').data('t1-timelinebarcontrolbar', tickData).append(tickText);

            scaleBar.append(dataBar);

            PositionDataBar(dataBar, timelineData);

            UpdateTimelineScale(timelineBarControl)
        }

        function RoundTo(dateObject, scale) {
            var newDate = new Date(dateObject.getTime());
            newDate.setSeconds(0);
            newDate.setMinutes(0);
            newDate.setHours(0);
            if (scale == "weeks") {
                newDate.setDate(newDate.getDate() - newDate.getDay());
            }
            if (scale == "months") {
                newDate.setDate(1);
            }
            return newDate;
        }

        function GetScaleRange(startDate, scale, backwards) {
            startDate = RoundTo(startDate, scale);
            var endDate = startDate;
            if (scale = "days") {
                if (backwards) {
                    endDate.setTime(endDate.getTime() - oneDayInMilliseconds);
                } else {
                    endDate.setTime(endDate.getTime() + oneDayInMilliseconds);
                }
                return {
                    Start: startDate,
                    End: endDate
                }
            } else if (scale = "weeks") {
                var tempDate = new Date(endDate.getTime());
                tempDate = RoundTo(tempDate, 'months');
                tempDate.setMonth((tempDate.getMonth() + 1) % 12);
                tempDate.setTime(-1);
                if (backwards) {
                    endDate.setDate(endDate.getDate() - 7 % tempDate.getDate());
                } else {
                    endDate.setDate(endDate.getDate() + 7 % tempDate.getDate());
                }
            } else if (scale = "months") {
                endDate = RoundTo(endDate, 'months');
                if (backwards) {
                    endDate.setMonth((endDate.getMonth() - 1) % 12);
                } else {
                    endDate.setMonth((endDate.getMonth() + 1) % 12);
                }
            }
            return {
                Start: startDate,
                End: endDate
            }
        }

        function UpdateTimelineScaleData(timelineBarControl, scaleBar, rowData, tickData) {
            rowData.Latest = new Date(Math.max(rowData.Latest.getTime(), tickData.End.getTime()));
            rowData.Earliest = new Date(Math.min(rowData.Earliest.getTime(), tickData.Start.getTime()));
            scaleBar.data('t1-timelinebarcontrolrow', rowData);
        }

        function UpdateTimelineScale(timelineBarControl) {
            var timelineData = timelineBarControl.data('t1-timelinebarcontrol'),
                scaleBar = timelineBarControl.find('.scale'),
                rowData = scaleBar.data("t1-timelinebarcontrolrow"),
                chartRange = MillisecondsBetween(timelineData.Start, timelineData.End);

            if (chartRange <= oneDayInMilliseconds * 30 && rowData.Scale != "days") {
                scaleBar.find('.bar').remove();
                rowData.TickSize = oneDayInMilliseconds;
                rowData.Earliest = new Date(timelineData.Start.getTime() + rowData.TickSize);
                rowData.Latest = timelineData.Start;
                rowData.Scale = "days";
                scaleBar.data("t1-timelinebarcontrolrow", rowData);
            } else if (chartRange > oneDayInMilliseconds * 30 && chartRange < oneDayInMilliseconds * 90 && rowData.Scale != "weeks") {
                scaleBar.find('.bar').remove();
                rowData.TickSize = oneDayInMilliseconds * 7;
                rowData.Earliest = new Date(timelineData.Start.getTime() + rowData.TickSize);
                rowData.Latest = timelineData.Start;
                rowData.Scale = "weeks";
                scaleBar.data("t1-timelinebarcontrolrow", rowData);
            } else if (chartRange >= oneDayInMilliseconds * 90) {
                if (rowData.Scale != "months") {
                    scaleBar.find('.bar').remove();
                    rowData.Earliest = timelineData.Start;
                    rowData.Latest = timelineData.Start;
                    rowData.Scale = "months";
                    scaleBar.data("t1-timelinebarcontrolrow", rowData);
                }
            }

            if (rowData.Latest.getTime() < timelineData.End.getTime()) {

                var data = GetScaleRange(rowData.Latest, rowData.Scale, true);

                UpdateTimelineScaleData(timelineBarControl, scaleBar, rowData, data);

                CreateKeyTick(timelineBarControl, scaleBar, data);

            } else if (rowData.Earliest.getTime() >= timelineData.Start.getTime()) {

                var data = GetScaleRange(rowData.Latest, rowData.Scale);

                UpdateTimelineScaleData(timelineBarControl, scaleBar, rowData, data);

                CreateKeyTick(timelineBarControl, scaleBar, data);

            }
        }

        function CreateScaleBar(timelineBarControl) {
            var timelineData = timelineBarControl.data("t1-timelinebarcontrol"),
                scaleBar = $(document.createElement('ul')).addClass('scaleBar'),
                scaleRow = $(document.createElement('li')),
                scaleKey = $(document.createElement('section')).addClass('scaleKey'),
                scaleSection = $(document.createElement('section')).addClass('scale').data("t1-timelinebarcontrolrow", { Latest: timelineData.Start, Earliest: timelineData.Start });

            scaleBar.append(scaleRow.append(scaleKey).append(scaleSection));
            timelineBarControl.prepend(scaleBar);
            UpdateTimelineScale(timelineBarControl);
        }

        function CreateNavigation(timelineBarControl) {
            var timelineData = timelineBarControl.data("t1-timelinebarcontrol"),
                navArrow = $(document.createElement('div')).addClass('arrow'),
                previousTimeNav = $(document.createElement('div')).addClass('timelineNav'),
                nextTimeNav = previousTimeNav.clone().addClass('next').append(navArrow);

            previousTimeNav.addClass('prev').append(navArrow.clone());

            timelineBarControl.append(previousTimeNav).append(nextTimeNav);

            previousTimeNav.click(function () {
                var range = MillisecondsBetween(timelineData.Start, timelineData.End);
                timelineData.Start = new Date(timelineData.Start.getTime() - range);
                timelineData.End = new Date(timelineData.End.getTime() - range);
                $(this).closest('.timelineBarControl').data("t1-timelinebarcontrol", timelineData);
                CreateDataBarsForRows(timelineBarControl);
                UpdateTimelineScale(timelineBarControl);
                timelineBarControl.find('.bar').each(function () {
                    PositionDataBar($(this), timelineBarControl.data("t1-timelinebarcontrol"));
                });
            });

            nextTimeNav.click(function () {
                var range = MillisecondsBetween(timelineData.Start, timelineData.End);
                timelineData.Start = new Date(timelineData.Start.getTime() + range);
                timelineData.End = new Date(timelineData.End.getTime() + range);
                $(this).closest('.timelineBarControl').data("t1-timelinebarcontrol", timelineData);
                CreateDataBarsForRows(timelineBarControl);
                UpdateTimelineScale(timelineBarControl);
                timelineBarControl.find('.bar').each(function () {
                    PositionDataBar($(this), timelineBarControl.data("t1-timelinebarcontrol"));
                });
            });


        }

        function CreateTimelineBarControl(timelineBarControl) {

            var timelineData = timelineBarControl.data("t1-timelinebarcontrol");
            $('.dataRegion').remove();
            timelineBarControl.append($(document.createElement('ul')).addClass('dataRegion'));

            CreateScaleBar(timelineBarControl);
            CreateNavigation(timelineBarControl);

            for (var i = 0; i < timelineData.Rows.length; i++) {
                timelineBarControl.children('.dataRegion').append(CreateTimelineRow(timelineData.Rows[i]));
            }
        }

        function RemoveRedundantScaleBars() {
            $('.timelineBarControl').find('.scale').find('.bar').each(function () {
                var timelineData = $(this).closest('.scale').data("t1-timelinebarcontrolrow");

                if ($(this).offset().left + $(this).outerWidth(true) < $(this).parent().offset().left) {
                    timelineData.Earliest = new Date(Math.max(timelineData.Earliest.getTime(), $(this).data("t1-timelinebarcontrolbar").End.getTime()));
                    var parentRow = $(this).closest('.scale');
                    parentRow.data("t1-timelinebarcontrolrow", timelineData)
                    $(this).remove();
                } else if ($(this).position().left > $(this).parent().outerWidth(true)) {
                    timelineData.Latest = new Date(Math.min(timelineData.Latest.getTime(), $(this).data("t1-timelinebarcontrolbar").Start.getTime()));
                    var parentRow = $(this).closest('.scale');
                    parentRow.data("t1-timelinebarcontrolrow", timelineData)
                    $(this).remove();
                }
            });
        }

        function RemoveRedundantDataBars() {
            $('.timelineBarControl').find('.dataRegion').find('.bar').each(function () {
                var timelineData = $(this).closest('li').data("t1-timelinebarcontrolrow");

                if ($(this).offset().left + $(this).outerWidth(true) < $(this).parent().offset().left) {
                    timelineData.Earliest = new Date(Math.max(timelineData.Earliest.getTime(), $(this).data("t1-timelinebarcontrolbar").End.getTime()));
                    var parentRow = $(this).closest('li');
                    parentRow.data("t1-timelinebarcontrolrow", timelineData)
                    $(this).remove();
                } else if ($(this).position().left > $(this).parent().outerWidth(true)) {
                    timelineData.Latest = new Date(Math.min(timelineData.Latest.getTime(), $(this).data("t1-timelinebarcontrolbar").Start.getTime()));
                    var parentRow = $(this).closest('li');
                    parentRow.data("t1-timelinebarcontrolrow", timelineData)
                    $(this).remove();
                }
            });
        }

        /*
        * Public API
        */

        function T1_C2_Shell_Controls_TimelineBarControl_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }

        T1_C2_Shell_Controls_TimelineBarControl_Public.prototype = {
            Initialise: function (timelineBarControl) {

                $('.timelineBarControl').data("t1-timelinebarcontrol", tempChartData); // TEMPORARY DATA!!!   TEMPORARY DATA!!!   TEMPORARY DATA!!!   TEMPORARY DATA!!!   

                timelineBarControl.each(function () {
                    CreateTimelineBarControl($(this));
                    $(this).addClass('initialised');
                });

            }
        };


        /*
        * Initialisation
        */

        $(document).ready(function () {
            T1.C2.Shell.Controls.TimelineBarControl.Initialise($('.timelineBarControl'));
        });

        $('.chartRowSection').live('mousedown touchstart', function (event) {
            InteractLocation(event);
            $(this).addClass('preSlide');
        });

        $('.chartRowSection').live('mousewheel', function (event, delta) {
            var timelineBarControl = $(this).closest('.timelineBarControl'),
                thisData = timelineBarControl.data("t1-timelinebarcontrol"),
                thisRange = thisData.End.getTime() - thisData.Start.getTime();

            thisData.Start = new Date(thisData.Start.getTime() + (delta * oneDayInMilliseconds));
            thisData.End = new Date(thisData.End.getTime() - (delta * oneDayInMilliseconds));

            timelineBarControl.data("t1-timelinebarcontrol", thisData);

            CreateDataBarsForRows(timelineBarControl);
            UpdateTimelineScale(timelineBarControl);
            RemoveRedundantScaleBars();
            RemoveRedundantDataBars();
            timelineBarControl.find('.bar').each(function () {
                PositionDataBar($(this), timelineBarControl.data("t1-timelinebarcontrol"));
            });

        });

        var prevEvent,
            prevTime;

        $('.chartRowSection.preSlide').live('mousemove touchmove', function (event) {
            InteractLocation(event);
            if (!Modernizr.touch) {
                PageTextSelectable(false);
            }
            if ($('.chartRowSection.sliding').length == 0) {
                prevEvent = event;
                prevTime = $(this).closest('.timelineBarControl').data("t1-timelinebarcontrol").Start.getTime()
                $(this).removeClass('preSlide').addClass('sliding');
            }
        });

        $('html').live('mousemove touchmove', function (event) {
            InteractLocation(event);
            if ($('.chartRowSection.sliding').length) {
                var timelineBarControl = $('.chartRowSection.sliding').closest('.timelineBarControl'),
                    movement = event.pageX - prevEvent.pageX,
                    timelineBarControlRange = MillisecondsBetween(timelineBarControl.data("t1-timelinebarcontrol").Start, timelineBarControl.data("t1-timelinebarcontrol").End),
                    timeMovement = timelineBarControlRange / timelineBarControl.find('.chartRowSection').width() * movement;

                timelineBarControl.data("t1-timelinebarcontrol").Start = new Date(prevTime - timeMovement);
                timelineBarControl.data("t1-timelinebarcontrol").End = new Date(prevTime + timelineBarControlRange - timeMovement);

                timelineBarControl.find('.bar').addClass('noAnimation').removeClass('animate');

                CreateDataBarsForRows($(event.srcElement).closest('.timelineBarControl'));
                UpdateTimelineScale($(event.srcElement).closest('.timelineBarControl'));

                $(this).find('.bar').each(function () {
                    PositionDataBar($(this), timelineBarControl.data("t1-timelinebarcontrol"));
                });
                event.preventDefault();
            }

        });

        $('html').live('mouseup touchend', function (event) {
            if (!Modernizr.touch) {
                PageTextSelectable(true);
            }

            RemoveRedundantScaleBars();
            RemoveRedundantDataBars();

            $('.noAnimation').addClass('animate').removeClass('noAnimation');
            $('.sliding').removeClass('sliding');
            $('.preSlide').removeClass('preSlide');
        });

        // return a new instance of the public object
        myPublicApi = new T1_C2_Shell_Controls_TimelineBarControl_Public();
        return myPublicApi;
    }

} ());

