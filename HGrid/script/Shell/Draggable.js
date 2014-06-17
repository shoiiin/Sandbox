$(document).ready(function(){
    var previousOffset = {top:0,left:0,},
        initialOffset = {top:0,left:0,},
        clickOffset = {top:0, left:0,},
        minimumDrag = 10,
        flickDistance = 5;
    
    function CanDrag(event, dragElement) {
        if (!$('.dragging').length) {
            return true;
        }
        return false;
    }
    
    function BeforeDrag(event, handle) {
        if (CanDrag(event, handle)) {
            $(handle).closest('.draggable').addClass('beforeDrag');
            previousOffset = $('.beforeDrag').offset();
            initialOffset = $('.beforeDrag').position();
            clickOffset = {top: event.pageY, left: event.pageX};
            $('.animating').removeClass('animating');
        }
    }
    
    function StartDrag(event){
        $('.beforeDrag').each(function(){
            var draggableConstrain = DragConstraints($(this));

            var draggedX = (!draggableConstrain.x && (event.pageX - clickOffset.left > minimumDrag || clickOffset.left - event.pageX > minimumDrag)),
                draggedY = (!draggableConstrain.y && (event.pageY - clickOffset.top > minimumDrag || clickOffset.top - event.pageY > minimumDrag));

            if (draggedX || draggedY) {
                $(this).addClass('dragging').removeClass('beforeDrag');
                $('.beforeDrag').removeClass('beforeDrag');
            }
        });
    }

    function DragConstraints(jQueryElement){
         var draggableData = jQueryElement.data('draggable'),
            draggableConstrain = {x:false, y:false};
         if(draggableData){
            draggableConstrain = draggableData.Constrain;
         }

         return draggableConstrain
    }
    
    function Drag(event) {

        var draggableConstrain = DragConstraints($('.dragging'));
            newOffset = {top: event.pageY - clickOffset.top,
                        left: event.pageX - clickOffset.left};

            if(draggableConstrain.x){
                newOffset.left = 0;
            } else if(draggableConstrain.y){
                newOffset.top = 0;
            }

        previousOffset = $('.dragging').offset();

        $('.dragging').css({ '-webkit-transform': 'translate3d('+ (newOffset.left+initialOffset.left) +'px,' + (newOffset.top+initialOffset.top) + 'px,0)',
                                '-moz-transform': 'translate('+ (newOffset.left+initialOffset.left) +'px,' + (newOffset.top+initialOffset.top) + 'px)'
                                 });
    }
    
    function EndDrag() {
    
            var dragging = $('.dragging')
            dragging.addClass('animating');
    
            var currentOffset = dragging.offset(),
                draggingSize = {width: dragging.outerWidth(true), height: dragging.outerHeight(true)};
    
            //If Draggable has been flicked.
            if (Math.max(currentOffset.left, previousOffset.left) - Math.min(currentOffset.left, previousOffset.left) > flickDistance ||
                Math.max(currentOffset.top, previousOffset.top) - Math.min(currentOffset.top, previousOffset.top) > flickDistance) {
                TranslateElement(dragging, AddMomentum(currentOffset, previousOffset));
            }else{
                TranslateElement(dragging, dragging.position());
            }
    
            dragging.removeClass('dragging');
        }
    
    function GetOffset(currentOffset, previousOffset){
        return newOffset = {
            top: currentOffset.top - previousOffset.top,
            left: currentOffset.left - previousOffset.left
        };
    }
    
    function TranslateElement(jQueryElement, newOffset){
        var parent = jQueryElement.parent(),
            parentOffset = parent.offset();

        if(newOffset.top + jQueryElement.outerHeight(true) < parent.height()){
            newOffset.top = parent.height() - jQueryElement.outerHeight(true);
        }else if(newOffset.top > 0){
            newOffset.top = 0;
        }

        if(newOffset.left + jQueryElement.outerWidth(true) < parent.width()){
            newOffset.left = parent.width() - jQueryElement.outerWidth(true);
        }else if(newOffset.left > 0){
            newOffset.left = 0;
        }
        jQueryElement.css({ '-webkit-transform': 'translate3d('+ newOffset.left +'px,' + newOffset.top + 'px,0)', '-moz-transform': 'translate('+ newOffset.left +'px,' + newOffset.top + 'px)' });
    }
    
    function AddMomentum(currentOffset, previousOffset){
        
        var newOffset = {
            top: currentOffset.top - previousOffset.top,
            left: currentOffset.left - previousOffset.left
        };
    
        newOffset.left = newOffset.left + newOffset.left;
        newOffset.top = newOffset.top + newOffset.top;
    
        return newOffset;
    }
    
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
    
    //Pre-Start Drag Event
    $('.draggable').live('mousedown touchstart', function (event) {
        if($(event.srcElement).closest('.handle').length){
            InteractLocation(event);
            BeforeDrag(event, $(event.srcElement).closest('.handle')[0]);
        }
    });
    
    //Start Drag Event
    $('.beforeDrag').live('mouseup touchmove', function (event) {
        InteractLocation(event);
        if (!Modernizr.touch && $('.dragging').length == 0) {
                PageTextSelectable(false);
            }
        StartDrag(event);
    });
    
    //Dragging Event
    $('html').live('mousemove touchmove', function (event) {
        if ($('.dragging').length == 1 && $('.dragging').closest('.draggable').length) {
            event.preventDefault();
            InteractLocation(event);
            if (!Modernizr.touch) {
                PageTextSelectable(false);
            }
            Drag(event);
        }
    });
    
    //End Drag Event
    $('html').live('mouseup touchend', function (event) {
        $('.beforeDrag').removeClass('beforeDrag');
        if (!Modernizr.touch) {
                PageTextSelectable(true);
            }
        if ($('.dragging').length) {
            EndDrag();
            event.preventDefault();
        }
    });
});