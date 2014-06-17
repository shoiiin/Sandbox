window.T1ECM = window.T1ECM || {};
(function ($) {
    T1ECM.hidemachine = function (states) {
        this.states = states;
        var state;
        for (state in this.states)
        {
            if (!this.states[state].value)
            {
                this.states[state].value = 0;
            }
        }
        this.triggerstatechange = function(changedState)
        {
            var classesToUnhideCandidates = {};
            var classesToHide = {};
            var v = this.states[changedState].hideclasses;
            var classToHide;
            classesToUnhideCandidates[v.on] = 1;
            classesToUnhideCandidates[v.off] = 1;
            if (this.states[changedState].value === 1)
            {
                classToHide = 
                    this.states[changedState].hideclasses.on;
                classesToHide[classToHide] = 1;
                delete classesToUnhideCandidates[classToHide];
            }
            else
            {
                classToHide = 
                    this.states[changedState].hideclasses.off;
                classesToHide[classToHide] = 1;
                delete classesToUnhideCandidates[classToHide];
            }
            var hideList = "";
            var s;
            for (s in classesToHide)
            {
                if (hideList)
                {
                    hideList += ",";
                }
                hideList += cl(s);
            }
            var unHideList = "";
            for (s in classesToUnhideCandidates)
            {
                if (unHideList)
                {
                    unHideList += ",";
                }
                unHideList += cl(s);
            }
            $(hideList).each(function () {
                if ($(this).is(":hidden"))
                {
                    return;
                }
                if ($(this).canHideMyself())
                {
                    $(this).hideMyself();
                }
                else
                {
                    $(this).fadeOut(100);
                }
            });
            $(unHideList).each(function () {
                if (!$(this).is(":hidden"))
                {
                    return;
                }
                if ($(this).canShowMyself())
                {
                    $(this).showMyself();
                }
                else
                {
                    $(this).fadeIn(300);
                }
            });
        };
    };
    T1ECM.hidemachine.prototype = {
        setState: function(s, value)
        {
            if (value)
            {
                this.states[s].value = 1;
            }
            else
            {
                this.states[s].value = 0;
            }
            this.triggerstatechange(s);
        }
    };
}) (jQuery);
