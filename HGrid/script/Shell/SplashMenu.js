$(document).ready(function () {
    var previousOffset = 0,
        initialSectionOffset = 0,
        previousSectionOffset = 0,
        startOffset = 0,
        startSectionMouseOffset = 0,
        animationTime = 200,
        splashDown = false,
        flickDistance = 5,
        minimumDrag = 20;

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

    function BuildSplashMenu() {
        var sectionContainerWidth = 0;
        $('.loggedInContent section').each(function (index) {
            var newLink = document.createElement('a'),
                newlistItem = document.createElement('li');

            $(newLink).text($(this).data('pagename'));
            $(newLink).addClass($(this).data('pageclass') + "PageNavLink");
            $(newLink).data('pageclass', $(this).data('pageclass'));
            $(this).addClass($(this).data('pageclass'));
            $(this).addClass('animating');
            $(newLink).click(function () {
                ShowSection($(this).data('pageclass'))
            });
            $(newlistItem).append(newLink);

            $('.loggedInContent nav ul').append(newlistItem);
            sectionContainerWidth += $(this).outerWidth(true) + 10;
        });

        $('.sectionContainer').width(sectionContainerWidth);
        Translate($('.loggedInContent section'), 0, 0, 0);

    }

    BuildSplashMenu();

    function ShowTopBar(show, animate) {
        if (animate !== false) {
            $('#SplashContainer').not('.splash').addClass('animating');
        } else {
            $('#SplashContainer').not('.splash').removeClass('animating');

        }
        Enable3dMode(true);
        if (show) {
            Translate($('#SplashContainer').not('.splash'), 0, 0, 0);
            splashDown = true;
        } else {
            Translate($('#SplashContainer').not('.splash'), 0, (0 - $('#SplashContent').outerHeight(true)), 0);
            splashDown = false;
        }
    }

    function Translate(jQueryElement, x, y, z) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        if (!Modernizr.csstransitions) {
            jQueryElement.attr('style', '-ms-transform : translate(' + x + 'px,' + y + 'px)');
        } else if (Modernizr.touch) {
            jQueryElement.css({ '-moz-transform': 'translate(' + x + 'px,' + y + 'px)' });
            jQueryElement.css({ '-webkit-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)' });
        } else {
            jQueryElement.css({ '-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
                '-moz-transform': 'translate(' + x + 'px,' + y + 'px)',
                '-o-transform': 'translate(' + x + 'px,' + y + 'px)',
                '-ms-transform': 'translate(' + x + 'px,' + y + 'px)'
            });
        }
    }

    function StartSectionDrag(event, handle) {
        if (CanDrag(event, handle)) {
            $(handle).addClass('beforeDrag');
            startSectionMouseOffset = event.pageX;
            initialSectionOffset = $($('.loggedInContent section')[0]).offset().left - $(handle).offset().left;
            previousSectionOffset = initialSectionOffset;
            $('.animating').removeClass('animating');
        }
    }

    function PositionSection(offset) {
        Translate($('.loggedInContent section'), offset, 0, 0);
    }

    function ShowSection(section, expand) {
        var sectionIndex = Math.min(Math.max(section, 0), $('.loggedInContent section').length - 1);
        if (expand !== false) {
            ShowTopBar(true);
        }
        if (typeof section === "string") {
            $('.loggedInContent section').each(function (index) {
                if ($(this).hasClass(section)) {
                    sectionIndex = index;
                }
            });
        }

        HighlightCurrentSectionLink(sectionIndex);

        $('.loggedInContent section').addClass('animating');

        Translate($('.loggedInContent section'), 0 - ($('.loggedInContent section').outerWidth(true) * sectionIndex), 0, 0);
        $('.loggedInContent section').removeClass('current');
        $($('.loggedInContent section')[sectionIndex]).addClass('current');
    }

    function HighlightCurrentSectionLink(sectionIndex) {
        $('.loggedInContent nav li a').removeClass('current');
        $($('.loggedInContent nav li a')[sectionIndex]).addClass('current');
    }

    function StartDrag(event, handle) {
        if (CanDrag(event, handle)) {
            $(handle).addClass('dragging');
            if (!$('.loggedInContent section:visible').length) {
                ShowSection('details', false)
            }
            previousOffset = $('#SplashContainer').offset().top;
            startOffset = previousOffset;
            $('.animating').removeClass('animating');
            Enable3dMode(true);

        }
    }

    function CanDrag(event, dragElement) {
        if (!$('.dragging').length) {
            return true;
        }
        return false;
    }

    function EndDrag() {

        var currentOffset = $('#SplashContainer').offset().top;
        if (Math.max(currentOffset, previousOffset) - Math.min(currentOffset, previousOffset) > flickDistance) {

            if (currentOffset > previousOffset) {
                ShowTopBar(true);
            } else {
                ShowTopBar(false);
            }
        } else {
            if (startOffset == previousOffset) {
                ShowTopBar($('#SplashContainer').offset().top != 0);
            } else {
                ShowTopBar($('#SplashContainer').offset().top > (0 - $('#SplashContent').outerHeight(true) / 2));
            }
        }
        $('.dragging').removeClass('dragging');
    }

    function EndSectionDrag() {

        $('.loggedInContent section').addClass('animating');

        var currentSectionOffset = $('.loggedInContent section').offset().left - $('.sectionContainer').offset().left,
            sectionWidth = $('.loggedInContent section').outerWidth(true),
            section = 0;
        if (Math.max(currentSectionOffset, previousSectionOffset) - Math.min(currentSectionOffset, previousSectionOffset) > flickDistance) {
            if (currentSectionOffset > previousSectionOffset) {
                section = 0 - (Math.ceil(currentSectionOffset / sectionWidth) * sectionWidth) / sectionWidth;
                ShowSection(section, false);
            } else {
                section = 0 - (Math.floor(currentSectionOffset / sectionWidth) * sectionWidth) / sectionWidth;
                ShowSection(section, false);
            }
        } else {
            section = 0 - (Math.round(currentSectionOffset / sectionWidth) * sectionWidth) / sectionWidth;
            ShowSection(section, false);
        }

        $('.dragging').removeClass('dragging');
    }

    function DragPreferences(event) {

        previousOffset = $('#SplashContainer').offset().top;
        var newOffset = Math.min($('#SplashContent').outerHeight(true), event.pageY - $('.dragging').height() / 2);
        Translate($('#SplashContainer'), 0, newOffset - $('#SplashContent').outerHeight(true), 0);

    }

    function DragSections(event) {
        var newOffset = event.pageX - startSectionMouseOffset + initialSectionOffset,
            sectionWidth = $($('.loggedInContent section')[0]).outerWidth(true);

        previousSectionOffset = $($('.loggedInContent section')[0]).offset().left - $('.sectionContainer').offset().left;
        Translate($('.loggedInContent section'), newOffset, 0, 0);
        HighlightCurrentSectionLink(0 - (Math.round(newOffset / sectionWidth) * sectionWidth) / sectionWidth);
    }

    function InteractLocation(event) {
        var e = event.originalEvent;
        var touchDevice = !e.pageX;
        event.pageX = e.pageX || e.touches[0].pageX || e.targetTouches[0].pageX;
        event.pageY = e.pageY || e.touches[0].pageY || e.targetTouches[0].pageY;
        return touchDevice;
    }

    function LoginSuccess(data) {
        document.location = document.location.href;
    }

    function LoginError(data) {
        $('.loginLoader').hide();
        var details = document.createElement('div');
        console.log(data);
        $('.login .loginErrors').html("Your login was unsuccessful, please try again.<br /><br /> Error: " + data.statusText);
        console.log(data);
    }

    function Enable3dMode(enable) {
        var offset = $('#SplashContainer').offset().top;
        if (Modernizr.touch) {
            if (enable) {
                var translate = 'translate3d(0,' + offset + 'px,0)';
                $('#SplashContainer').css({ 'top': '', '-webkit-transform': translate, '-moz-transform': 'translate(0,' + offset + 'px)' });

            } else {
                $('#SplashContainer').css({ '-webkit-transform': '', 'top': offset });
            }
        }
    }

    //Reset positioning to non-translate to correct hit regions.
    $('#SplashContainer').bind('transitionend webkitTransitionEnd', function () {
        $('#SplashContainer').removeClass('animating');
        Enable3dMode(false);
    });


    $('.sectionContainer.handle').live('mousedown touchstart', function (event) {
        InteractLocation(event);
        StartSectionDrag(event, this);
    });

    $('.splashHandle.handle').live('mousedown touchstart', function (event) {
        InteractLocation(event);
        StartDrag(event, this);
    });

    $('.splashHandle.handle').live('click', function (event) {
        if (!Modernizr.touch) {
            ShowTopBar($('#SplashContainer').offset().top != 0);
        }
    });

    $('.favorites.splashButton').click(function (event) {
        ShowSection('favorites');
    });

    $('.startLink.splashButton').click(function (event) {
        ShowSection('start');
    });

    $('button.close').click(function (event) {
        ShowTopBar(false);
    });

    $('html').live('mouseup touchend', function (event) {

        if (splashDown && !$(event.srcElement).closest('#SplashContainer').length && !$(event.srcElement).hasClass('splashButton')) {
            ShowTopBar(false);
        }
        $('.beforeDrag').removeClass('beforeDrag');
        if ($('.splashHandle.dragging').length) {
            if (!Modernizr.touch) {
                PageTextSelectable(true);
            }
            EndDrag();
            event.preventDefault();
        }
        if ($('.sectionContainer.dragging').length) {
            if (!Modernizr.touch) {
                PageTextSelectable(true);
            }
            EndSectionDrag();
            event.preventDefault();
        }

    });

    $('html').live('mousemove touchmove', function (event) {
        if ($('.splashHandle.dragging').length) {
            event.preventDefault();
            InteractLocation(event)
            if (!Modernizr.touch) {
                PageTextSelectable(false);
            }
            DragPreferences(event);
        }
        if ($('.sectionContainer.dragging').length) {
            event.preventDefault();
            InteractLocation(event)
            if (!Modernizr.touch) {
                PageTextSelectable(false);
            }
            DragSections(event);
        }

    });

    //    $('.logon').click(function (event) {

    //        var data = {};

    //        data.UserName = $('#UserName').val();
    //        data.Password = $('#Password').val();
    //        data.RememberMe = $('#RememberMe:checked').val() != undefined;
    //        data.SelectedCustomerEnvironmentId = $('#SelectedCustomerEnvironmentId').val();

    //        $('.loginLoader').fadeIn('fast');

    //        $.ajax(
    //            {
    //                url: "/T1.C2.Web.Startup/C2P/Account/LogOn/", //Todo: Reference a relative root path and customer ID.
    //                type: 'POST',
    //                data: data,
    //                success: LoginSuccess,
    //                error: LoginError
    //            }
    //        );
    //        event.preventDefault();
    //    });

    ShowSection("start");
    ShowTopBar(false, false);

    window.T1 = window.T1 || {};
    window.T1.C2 = window.T1.C2 || {};
    window.T1.C2.Shell = window.T1.C2.Shell || {};
    window.T1.C2.Shell.SplashMenu = window.T1.C2.Shell.SplashMenu || {};
    window.T1.C2.Shell.SplashMenu.ShowSplashMenu = function () { ShowTopBar(true) };
});
