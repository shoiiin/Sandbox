/*global window,document,jQuery */
// require(jquery)
//
// Plugin to clear selected form inputs
(function($) {
    $.fn.clearFormControl = function() {
        return this.each(function() {
            var control = $(this);
            if (control.is("input[type='text']"))
            {
                control.attr("value", "").trigger("change");
            }
            else if (control.is("input[type='checkbox']"))
            {
                control
                    .attr("value", "on")
                    .attr("checked", "checked")
                    .trigger("change");
            }
            else if (control.is("select"))
            {
                control.attr("value", "-1").trigger("change");
            }
        });
    };
}(jQuery));
//
// Plugin to declare a tooltip 
(function($) {
    var toolTipData = {
        tooltipCounter: 0,
        currentlyPostedToolTips: {},
        removeTooltips: function() {
            var tt;
            for (tt in toolTipData.currentlyPostedToolTips)
            {
                toolTipData.currentlyPostedToolTips[tt].remove();
                delete toolTipData.currentlyPostedToolTips[tt];
            }
        },
        recordTooltipElement: function(element) {
            var ii = "ii" + (++(toolTipData.tooltipCounter));
            toolTipData.currentlyPostedToolTips[ii] = element;
        },
        adjustLeftToScreen: function(left, width) {
            if (left > $(window).scrollLeft() + $(window).width() - width)
            {
                left = $(window).scrollLeft() + $(window).width() - width;
            }
            if (left < $(window).scrollLeft())
            {
                left = $(window).scrollLeft();
            }
            return left;
        },
        adjustTopToScreen: function(top, height) {
            if (top > $(window).scrollTop() + $(window).height() - height)
            {
                top = $(window).scrollTop() + $(window).height() - height;
            }
            if (top < $(window).scrollTop())
            {
                top = $(window).scrollTop();
            }
            return top;
        },
        create: function(tooltiptext, positionpriority, justification) {
            // positionpriority is a list of orientations
            // eg "left bottom" will result in the tooltip being posted to
            // the left of the target element if possible, 
            // and if not possible, underneath.
            // The list can contain any of the words:
            //     top, bottom, right, left, mouse
            // If mouse, the tooltip will be posted below the mouse position.
            // "mouse" is the default.
            // 
            // justification is an alignment
            // It must be one of:
            //     top, middle, bottom, left, center, right
            // The default is middle/center.
            return this.each(function() {
                var tooltipdiv = 
                    $(document.createElement("div"))
                    .text(tooltiptext)
                    .addClass("ecmtooltip");
                var existingToolTip = $(this).data("tooltipdiv");
                if (existingToolTip)
                {
                    existingToolTip.remove();
                    toolTipData.removeTooltips();
                }
                if (!positionpriority)
                {
                    positionpriority = "mouse";
                }
                $(this).data("tooltipdiv", tooltipdiv);
                $(this).data("tooltippositionpriority", positionpriority);
                $(this).hover(
                    function (e) {
                        var ttdiv = $(this).data("tooltipdiv");
                        var ttpp = $(this).data("tooltippositionpriority");
                        var triangle;
                        var triangleWidth = 7;
                        var triangleHeight = 7;
                        var triangleTop, triangleLeft;
                        if (!ttpp)
                        {
                            ttpp = "mouse";
                        }
                        else
                        {
                            ttpp += " mouse";
                        }
                        toolTipData.removeTooltips();
                        toolTipData.recordTooltipElement(ttdiv);
                        //
                        var ttpplist = ttpp.split(" ");
                        var left;
                        var top;
                        var parent = $("body");
                        var parentOffset = parent.offset();
                        var ttppindex;
                        for (ttppindex in ttpplist)
                        {
                            var position = ttpplist[ttppindex];
                            if (position === "top" 
                                || position === "bottom"
                                || position === "right"
                                || position === "left")
                            {
                                var thisOffset = $(this).offset();
                                var thisLeft = thisOffset.left;
                                var thisTop = thisOffset.top;
                                var thisWidth = $(this).width();
                                var thisHeight = $(this).height();
                                var thisOuterWidth = $(this).outerWidth();
                                var thisOuterHeight = $(this).outerHeight();
                                ttdiv
                                    .css({top: "-100000px", left: "-100000px"})
                                    .appendTo(parent);
                                var ttWidth = ttdiv.width();
                                var ttHeight = ttdiv.height();
                                var ttOuterWidth = ttdiv.outerWidth();
                                var ttOuterHeight = ttdiv.outerHeight();
                                var backgroundColor = ttdiv.css("background-color");
                                ttdiv.remove();
                                if (position === "top")
                                {
                                    top = thisTop - ttOuterHeight - 5;
                                    if (top < $(window).scrollTop())
                                    {
                                        continue;
                                    }
                                }
                                else if (position === "bottom")
                                {
                                    top = thisTop + thisOuterHeight + 5;
                                    if (top > $(window).scrollTop() + $(window).height())
                                    {
                                        continue;
                                    }
                                }
                                else if (position === "left")
                                {
                                    left = thisLeft - ttOuterWidth - 5;
                                    if (left < $(window).scrollLeft())
                                    {
                                        continue;
                                    }
                                }
                                else if (position === "right")
                                {
                                    left = thisLeft + thisOuterWidth + 5;
                                    if (left > $(window).scrollLeft() + $(window).width())
                                    {
                                        continue;
                                    }
                                }
                                var alignment;
                                if (position === "top" || position === "bottom")
                                {
                                    // Alignment
                                    if (!justification)
                                    {
                                        alignment = "middle";
                                    }
                                    else
                                    {
                                        alignment = justification;
                                    }
                                    if (alignment === "top"
                                        || alignment === "left")
                                    {
                                        left = thisLeft;
                                    }
                                    else if (alignment === "bottom"
                                             || alignment === "right")
                                    {
                                        var thisRight = 
                                            thisLeft + thisOuterWidth;
                                        left = thisRight - ttOuterWidth;
                                    }
                                    else
                                    {
                                        var thisCenter = 
                                            thisLeft + thisOuterWidth / 2;
                                        left = thisCenter - ttOuterWidth / 2;
                                    }
                                    // Force back on screen if required
                                    left = 
                                        toolTipData.adjustLeftToScreen(left, ttWidth);
                                    if (alignment === "middle" || alignment === "center")
                                    {
                                        triangle = 
                                            $(document.createElement("div"))
                                            .addClass("ecmtooltiptri");
                                        triangleLeft = 
                                            thisLeft + thisOuterWidth / 2 - triangleWidth / 2;
                                        triangleLeft = 
                                            toolTipData.adjustLeftToScreen(triangleLeft, 
                                                                           triangleWidth);
                                        if (position === "top")
                                        {
                                            triangleTop = thisTop - triangleHeight;
                                            triangle.addClass("tiptop");
                                        }
                                        else
                                        {
                                            triangleTop = thisTop + thisOuterHeight;
                                            triangle.addClass("tipbottom");
                                        }
                                        triangle.css({
                                            left: triangleLeft.toString() + "px",
                                            top: triangleTop.toString() + "px"
                                        });
                                    }
                                }
                                else if (position === "left" || position === "right")
                                {
                                    if (!justification)
                                    {
                                        alignment = "center";
                                    }
                                    else
                                    {
                                        alignment = justification;
                                    }
                                    if (alignment === "top"
                                        || alignment === "left")
                                    {
                                        top = thisTop;
                                    }
                                    else if (alignment === "bottom"
                                             || alignment === "right")
                                    {
                                        var thisBottom = 
                                            thisTop + thisOuterHeight;
                                        top = thisBottom - ttOuterHeight;
                                    }
                                    else
                                    {
                                        var thisMiddle = 
                                            thisTop + thisOuterHeight / 2;
                                        top = thisMiddle - ttOuterHeight / 2;
                                    }
                                    // Force back on screen if required
                                    top = toolTipData.adjustTopToScreen(top, ttHeight);
                                    if (alignment === "middle" || alignment === "center")
                                    {
                                        triangle = 
                                            $(document.createElement("div"))
                                            .addClass("ecmtooltiptri");
                                        triangleTop = 
                                            thisTop + thisOuterHeight / 2 - triangleHeight / 2;
                                        triangleTop = 
                                            toolTipData.adjustTopToScreen(triangleTop, 
                                                                           triangleHeight);
                                        if (position === "left")
                                        {
                                            triangleLeft = thisLeft - triangleWidth;
                                            triangle.addClass("tipleft");
                                        }
                                        else
                                        {
                                            triangleLeft = thisLeft + thisOuterWidth;
                                            triangle.addClass("tipright");
                                        }
                                        triangle.css({
                                            left: triangleLeft.toString() + "px",
                                            top: triangleTop.toString() + "px"
                                        });
                                    }
                                }
                            }
                            else // (position === "mouse")
                            {
                                var mouseLeft = e.pageX;
                                var mouseTop = e.pageY;
                                left = mouseLeft - parentOffset.left;
                                top = mouseTop - parentOffset.top + 10;
                            }
                            break;
                        }
                        if (triangle)
                        {
                            toolTipData.recordTooltipElement(triangle);
                            triangle
                                .appendTo(parent)
                                .hide();
                        }
                        ttdiv
                            .appendTo(parent)
                            .css({
                                left: left.toString() + "px",
                                top: top.toString() + "px"
                            })
                            .hide()
                            .delay(800)
                            .fadeIn(50, function () {
                                if (triangle)
                                {
                                    triangle.show();
                                }
                            })
                        ;
                    },
                    function () {
                        toolTipData.removeTooltips();
                    }
                );
            });
        }
    };
    $.fn.tooltip = function(tooltiptext, positionpriority, justification) {
        return toolTipData.create.apply(this, 
                                        [tooltiptext, positionpriority, justification]);
    };
}(jQuery));
//
// Plugin to update selected form inputs
(function($) {
    $.fn.updateFormInput = function(value) {
        return this.each(function() {
            var control = $(this);
            if (control.is("input[type='text']"))
            {
                control.attr("value", value).trigger("change");
            }
        });
    };
}(jQuery));
//
// Plugin to turn a parent div into a moreorless collapse panel.
(function($) {
    var mol = {
        shrink: function (guardian)
        {
            var extraselector = guardian.data("extraselector");
            if (extraselector)
            {
                var hidethese =
                    guardian
                    .children()
                    .not(".moreorlesstitle,.moreorlessbutton")
                    .filter(extraselector)
                    .not(".countselected");
                if (hidethese.length > 20)
                {
                    hidethese.hide();
                }
                else
                {
                    hidethese.slideUp(100);
                }
                guardian.find(".moreorlessbutton a").text("more...");
                guardian.find(".moreorlesstitle")
                    .addClass("more")
                    .tooltip("Click to expand", "top", "left");
                guardian.data("state", "shrunken");
            }
        },
        swell: function(guardian)
        {
            var showthese =
                guardian
                .children(":hidden");
            if (showthese.length > 20)
            {
                showthese.show();
            }
            else
            {
                showthese.slideDown(100);
            }
            guardian.find(".moreorlessbutton a").text("less...");
            guardian.find(".moreorlesstitle")
                .removeClass("more")
                .tooltip("Click to collapse", "top", "left");
            guardian.data("state", "swollen");
        },
        changeMoreOrLessState: function()
        {
            var guardian = $(this).data("guardiandiv");
            if (guardian.data("state") === "swollen")
            {
                guardian.data("state", "shrunken");
            }
            else
            {
                guardian.data("state", "swollen");
            }
            mol.repaintMoreOrLessState.apply(guardian);
        },
        repaintMoreOrLessState: function()
        {
            return this.each(function () {
                var guardian = $(this);
                if (guardian.data("state") === "swollen")
                {
                    mol.swell(guardian);
                }
                else
                {
                    mol.shrink(guardian);
                }
            });
        },
        firsttime: function(title, minvisiblechildren) {
            return this.each(function() {
                var parentDiv = $(this);
                parentDiv
                    .addClass("moreorlesswrapper")
                    .find(".moreorlesstitle")
                    .remove();
                parentDiv
                    .find(".moreorlessbutton")
                    .remove();
                if (parentDiv.children().length)
                {
                    var titleDiv =
                        $(document.createElement("div"))
                        .addClass("moreorlesstitle")
                        .data("guardiandiv", parentDiv)
                        .text(title)
                        .insertBefore(parentDiv.children().first());
                    if (parentDiv.children().length > minvisiblechildren + 1)
                    {
                        titleDiv
                            .addClass("active")
                            .addClass("more")
                            //.click(mol.changeMoreOrLessState)
                            .tooltip("Click to expand", "top", "left");
                        var extraselector = 
                            ":gt(" + (minvisiblechildren - 1).toString() + ")";
                        parentDiv
                            .data("extraselector", extraselector)
                            .data("state", "shrunken");
                        // 
                        parentDiv
                            .children()
                            .not(".moreorlesstitle")
                            .filter(extraselector)
                            .hide();
                        var moreorlessbutton =
                            $(document.createElement("div"))
                            .addClass("moreorlessbutton")
                            .appendTo(parentDiv)
                            .data("guardiandiv", parentDiv)
                            .click(mol.changeMoreOrLessState)
                            .append($(document.createElement("a"))
                                    .addClass("link")
                                    .text("more..."));
                    }
                    titleDiv.visibleHeader();
                }
            });
        }
    };
    $.fn.moreorless = function(titletext, minshow) {
        return mol.firsttime.apply(this, [titletext, minshow]);
    };
    $.fn.moreorlessrepaint = function() {
        return mol.repaintMoreOrLessState.apply(this);
    };
}(jQuery));
//
// Plugin to expand the jquery object to the bottom of the document.
(function($) {
    $.fn.maxHeightToBottom = function(value) {
        return this.each(function() {
            var thisOffset = $(this).offset();
            var windowHeight = $(window).height();
            var maxHeight = windowHeight - thisOffset.top - 20;
            $(this).css("max-height", maxHeight.toString() + "px");
        });
    };
}(jQuery));
//
// Plugin to declare the jquery object as a visibleHeader.
//
// For such an object, H, we insert a sibling block display placeholder object, P, 
// before it.
// headerOnscreen == (P.offset().top >= top of the window), ie H is onscreen.
// P.height = H.height when !headerOnscreen
// P.height = 0 when headerOnscreen
//
// Record the original position, originalPos, of H.
// Set the position of H to "fixed" when whenOff.
// Set the position of H to originalPos when whenOn.
(function($) {
    var visibleHeaderData = {
        visibleHeaders: [],
        scrollBound: false,
        getScrollParentIntrusion: function (header, parent) {
            var visibleTop = header.data("visibleTop");
            if (visibleTop != null)
            {
                return visibleTop;
            }
            var closestVisibleParent = parent.parent().closest(".visibleparent");
            if (closestVisibleParent.length)
            {
                visibleTop = closestVisibleParent.data("visibleBottom");
                if (visibleTop != null)
                {
                    // the closest grand ancestor of header knows what its bottom is
                    visibleHeaderData.cacheScrollParentIntrusion(header, parent, visibleTop);
                    return visibleTop;
                }
            }
            return 0;
        },
        cacheScrollParentIntrusion: function (header, parent, scrollParentIntrusion) {
            if (header.data("visibleTop") == null)
            {
                header.data("visibleTop", scrollParentIntrusion);
            }
            if (parent.data("visibleBottom") == null)
            {
                var bottom = scrollParentIntrusion + header.outerHeight();
                parent.data("visibleBottom", bottom);
            }
        },
        scrollHappened: function () {
            var staleVisibleHeaders = [];
            var i, header;
            for (i = 0; i < visibleHeaderData.visibleHeaders.length; ++i)
            {
                header = visibleHeaderData.visibleHeaders[i];
                if (!header)
                {
                    staleVisibleHeaders.push(i);
                    continue;
                }
                var placeholder = header.data("placeholder");
                if (!placeholder)
                {
                    staleVisibleHeaders.push(i);
                    continue;
                }
                if (header.is(":hidden"))
                {
                    continue;
                }
                var placeHolderOffset = placeholder.offset();
                var parent = header.parent();
                var scrollParentIntrusion = 
                    visibleHeaderData.getScrollParentIntrusion(header, parent);
                var scrollParent = $(window);
                var scrollParentOffset = scrollParent.scrollTop();
                var originalPlacement = header.data("originalPlacement");
                var headerBelowWindowTop = 
                    placeHolderOffset.top >= 
                    scrollParentOffset + scrollParentIntrusion;
                if (!parent.is(".visibleparent"))
                {
                    parent.addClass("visibleparent");
                }
                var parentBottom = parent.offset().top + parent.height();
                var headerParentAboveWindowTop =
                    parentBottom - header.outerHeight() 
                    <=
                    scrollParentOffset + scrollParentIntrusion;
                if (headerBelowWindowTop || headerParentAboveWindowTop)
                {
                    if (originalPlacement)
                    {
                        placeholder.css({
                            height: "0px"
                        });
                        header.css({
                            position: originalPlacement.position,
                            left: originalPlacement.left,
                            top: originalPlacement.top,
                            width: originalPlacement.width,
                            height: originalPlacement.height,
                            "z-index": originalPlacement["z-index"]
                        });
                        header.removeData("originalPlacement");
                    }
                }
                else
                {
                    if (!originalPlacement)
                    {
                        var originalSize = {
                            width: header.width(),
                            height: header.height()
                        };
                        header.data("originalSize", originalSize);
                        originalPlacement = {
                            position: header.css("position"),
                            top: header.css("top"),
                            left: header.css("left"),
                            width: header.css("width"),
                            height: header.css("height"),
                            "z-index": header.css("z-index")
                        };
                        header.data("originalPlacement", originalPlacement);
                        placeholder.css({
                            height: header.outerHeight().toString() + "px"
                        });
                        header.css({
                            position: "fixed",
                            left: placeHolderOffset.left.toString() + "px",
                            top: scrollParentIntrusion.toString() + "px",
                            width: originalSize.width.toString() + "px",
                            height: originalSize.height.toString() + "px",
                            "z-index": "10"
                        });
                        visibleHeaderData.cacheScrollParentIntrusion(header, parent,
                                                                     scrollParentIntrusion);
                    }
                }
            }
            for (i = staleVisibleHeaders.length; i > 0; --i)
            {
                var staleIndex = staleVisibleHeaders[i - 1];
                header = visibleHeaderData.visibleHeaders[staleIndex];
                delete visibleHeaderData.visibleHeaders[staleIndex];
            }
        },
        declare: function() {
            return this.each(function() {
                var header = $(this);
                if (header.is(".visibleheader"))
                {
                    return;
                }
                var placeHolderObject = 
                    $(document.createElement("div"))
                    .insertBefore(header);
                header.data("placeholder", placeHolderObject);
                header.addClass("visibleheader");
                visibleHeaderData.visibleHeaders.push(header);
                if (!visibleHeaderData.scrollBound)
                {
                    visibleHeaderData.scrollBound = true;
                    $(window).scroll(
                        visibleHeaderData.scrollHappened
                    );
                }
                //visibleHeaderData.scrollHappened();
            });
        },
        removeDescendants: function () {
            return this.each(function () {
                var matriarch = $(this);
                matriarch
                    .find(".visibleheader")
                    .removeData("placeholder");
            });
        }
    };
    $.fn.visibleHeader = function() {
        return visibleHeaderData.declare.apply(this);
    };
    $.fn.visibleHeadersRemove = function() {
        return visibleHeaderData.removeDescendants.apply(this);
    };
}(jQuery));
// This plugin allows the declaration of "methods" on objects to show and hide
// themselves.
(function($) {
    var showhidemyselfdata = {
        declareShow: function (fn) {
            return this.each(function () {
                $(this).data("_showmyself", fn);
            });
        },
        show: function () {
            return this.each(function () {
                var showfn = $(this).data("_showmyself");
                if (showfn)
                {
                    showfn.apply(this);
                }
            });
        },
        canShow: function () {
            var showfn = $(this).data("_showmyself");
            return showfn != null;
        },
        declareHide: function (fn) {
            return this.each(function () {
                $(this).data("_hidemyself", fn);
            });
        },
        hide: function () {
            return this.each(function () {
                var hidefn = $(this).data("_hidemyself");
                if (hidefn)
                {
                    hidefn.apply(this);
                }
            });
        },
        canHide: function () {
            var hidefn = $(this).data("_hidemyself");
            return hidefn != null;
        }
    };
    $.fn.showMyself = function(fn) {
        if (fn)
        {
            return showhidemyselfdata.declareShow.apply(this, [fn]);
        }
        else
        {
            return showhidemyselfdata.show.apply(this);
        }
    };
    $.fn.canShowMyself = function() {
        return showhidemyselfdata.canShow.apply(this);
    };
    $.fn.hideMyself = function(fn) {
        if (fn)
        {
            return showhidemyselfdata.declareHide.apply(this, [fn]);
        }
        else
        {
            return showhidemyselfdata.hide.apply(this);
        }
    };
    $.fn.canHideMyself = function() {
        return showhidemyselfdata.canHide.apply(this);
    };
}(jQuery));
