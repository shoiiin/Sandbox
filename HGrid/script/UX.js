


                ﻿function ajaxPages(){

    $(document).ready(function () {



    //$('.alertsPanel .collapseLeft').toggle(
    //	function() { $(this).prev('ul').hide(); $(this).addClass('expandRight'); $(this).closest('.alertsPanel').find('h3 span').hide(); },
    //	function() { $(this).prev('ul').show(); $(this).removeClass('expandRight'); $(this).closest('.alertsPanel').find('h3 span').show(); }
    //);

    $('.vanillaStyle table tr').hover(
				function () {
				    $(this).addClass('hover');
				},
				function () {
				    $(this).removeClass('hover');
				});


    


    $('html').live('mouseup touchend', function (event) {
        if (!$(event.srcElement).parents('.ddMenu').length && !$(event.srcElement).hasClass('ddMenu')) {
            $('.ddMenuContainer').hide();
            $('.ddMenu').removeClass('ddMenuShow');
        }
    });

    $('.ddMenu').live('click touch', function (event) {

        //If the anchor tags href is empty...
        if (!$(event.srcElement).attr('href')) {

            //Prevents anchor tags from firing
            event.preventDefault();

            //if the element you clicked on has a child ddmenucontainer
            if (!$(event.srcElement).parents('.ddMenuContainer').length && !$(event.srcElement).hasClass('ddMenuContainer')) {

                //hide all menus but this one
                $('.ddMenuContainer').not($(this).find('.ddMenuContainer')).hide();

                //Show/Hide the menu
                $(this).find('.ddMenuContainer').toggle();
            }

            //Remove the menu open highlight
            $('.ddMenuShow').removeClass('ddMenuShow');

            //if this has a menu open
            if ($(this).find('.ddMenuContainer:visible').length) {

                //apply the menu open highlight style
                $(this).addClass('ddMenuShow');
            } else {

                //else remove the menu open highlight style
                $(this).removeClass('ddMenuShow');
            }
        }
    });

    $('.jqModal').live('mousemove',function(){
        $('#dialog').each(function () {
        $(this).jqm();
        });
    });

    
    //$('.syncKeyOverlay div').live(
    //            "click",
	//			function () {
	//			    $(this).hide();
	//			},
	//			function () {
	//			    $(this).removeClass('');
	//			});

    $('.syncKeyOverlay div .closeSmall').live(
                "click",
				function () {
				    $(this).parent('div').hide();
				},
				function () {
				    $(this).removeClass('');
				});





      


    function AjaxPageLoader(){

        var windowLocation = document.location.pathname,

            notLegacyOrCrap = window.history.pushState&&navigator.appName!="Microsoft Internet Explorer";

            currentHash = document.location.hash,
			
			animationTime = 'fast',

            homepage = 'start.aspx',

            historyCheckInterval = 100,

            defaultAjaxElement = "#contentContainer",

            target = null; //the page element to load content into.

            

            

            

        function CheckHistory() {

            // Checks if the history buttons have been used every 10th of a second.

            // Support for legacy browsers and Internet explorer

            if (t) {

                clearTimeout(t);

            }

            

            var t = setTimeout(function () { CheckHistory() }, historyCheckInterval);

            

            if(currentHash!=window.location.hash){

                target = {Element:$(defaultAjaxElement),DefaultAjaxElement:true};

                if(window.location.hash){

                currentHash = window.location.hash;

                    $(defaultAjaxElement).hide(0,RunAjax(window.location.hash.substring(1,window.location.hash.length)));       

                }else{

                    currentHash = "";

                    $(defaultAjaxElement).hide(0,RunAjax(homepage));

                }

            }

        }

        

        //If the browser being used isnt terrible, use path rewriting to load the page.

        if(notLegacyOrCrap){

            target = {Element:$(defaultAjaxElement),DefaultAjaxElement:true};

            window.onpopstate = function(){

                $(defaultAjaxElement).hide(0,RunAjax(window.location.pathname));

            }

        }else{

        //the browser is internet exloder, use a hash tag.

            CheckHistory();

        }

            

        //For every anchor element, handle the event and load its target asynchronously or synchronously, depending on the links class.

        $('a').live('click', function(e) {

            if(!$(e.srcElement).parents(".resultItem").length){
				var linkLocation = $(this).attr('href');
	
				if($(this).attr('href')){

					var linkParents = $(this).parents('.resultItem');
					
					if(linkParents.length){
							
					}else{
					
						e.preventDefault();
					}
	
					target = {Element:$(defaultAjaxElement),DefaultAjaxElement:true};
	
					if(notLegacyOrCrap){
						window.history.pushState(linkLocation.split('.')[0], linkLocation.split('.')[0], linkLocation);
					}else{
						window.location.hash = linkLocation;
						currentHash = window.location.hash;
					}    
	
						$(target.Element).hide(0,RunAjax(linkLocation));
	
				}
			}

        });

        

        function RunAjax(pageURL){

            // Loads some content

            

            //notify the user that something is being loaded

            $('#loader').show();

            

            //Get the page

            $.ajax({

                url: pageURL,

                dataType: 'html', 

                success: BuildPage,

                error: PageLoadError

            });

        }

        

        function PageLoadError(error){

            //on error, send the user back to the previous page, and display the error.

            $('#loader').hide(animationTime);

            alert('there was a problem loading the page: ' + error.statusText);

            history.back();

        }

            

        function BuildPage(data){

            //builds the page with the newly loaded data

            

            //Empty the target container

            target.Element.empty();

            

            //create a new container in the dom so that

            //javascript can get a handle at the elements within the loaded data.

            //this also runs any scripts within the loaded content.

            var newCache = document.createElement('div'),
				scriptStartTag = "<script",
                scriptEndTag = "</script>",
				loadOnceStartTag = "<loadonce",
                loadOnceEndTag = "</loadonce>",
				scriptTags = [];
				
				data = data.replace(data.substring(data.indexOf(loadOnceStartTag),data.indexOf(loadOnceEndTag) + loadOnceEndTag.length),"");
            
			while(data.indexOf(scriptStartTag)>0){
				var scriptStartIndex = data.indexOf(scriptStartTag),
					scriptEndIndex = data.indexOf(scriptEndTag) + scriptEndTag.length,
					scriptTag = data.substring(scriptStartIndex,scriptEndIndex);
					
				scriptTags[scriptTags.length] = scriptTag;
				data = data.replace(scriptTag,"");
			}
			
			$(newCache).append(data);

            if(target.DefaultAjaxElement){

            document.title = newCache.title;

            target.Element.append($(newCache).find(target.Element.selector).html());

            $('.functionLevel').html($(newCache).find('.functionLevel').html());

            target.Element.append($(newCache).find('style'));

            }else{

            target.Element.append($(newCache));

            target.Element.append($(newCache).find('style'));

            }
			
			
            $(newCache).append(scriptTags.join());
			newCache = null;
            

            //fire any events that may be needed to run the new scripts.

            //any page that uses $(document).ready(); will not need this and works by its self.

            FirePageLoadEvents();

            $('#loader').hide(animationTime);

            target.Element.show(animationTime);

        }



        function FirePageLoadEvents() {

                var evObj = document.createEvent('HTMLEvents');

                if(document.onload){

                    document.onload();

                    document.onload = null;

                }else if(document.addEventListener){

                    evObj.initEvent( 'DOMContentLoaded', true, true);

                    document.dispatchEvent(evObj);

                    evObj.initEvent( 'Load', true, true);

                    document.dispatchEvent(evObj);

                }else if(document.onreadystatechange&&document.readyState === "complete"){

                    document.onreadystatechange();

                }

            }
			
		}
		
		//AjaxPageLoader();

    });

}



//only load this script if it has not previously been loaded.

if(!this.ajaxPagesLoaded){

ajaxPagesLoaded = true;

ajaxPages();

}