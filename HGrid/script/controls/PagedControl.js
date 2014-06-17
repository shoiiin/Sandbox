/// <reference path="~/Scripts/DevIntellisense.js"/>
 
(function (undefined) {
 
 
 
    /*
    * Private Members
    */
 
    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {};
    pagedControl = controls.PagedControl = controls.PagedControl || new T1_C2_Shell_Controls_PagedControl();
 
 
    /*
    * Private Functions
    */
 
 
    /**************************************************************************
    * Library: T1.C2.Client.Controls.PagedControl
    */
    function T1_C2_Shell_Controls_PagedControl() {
        /// <summary>
        /// Initialises a new instance of the pagedControl control
        /// </summary>
 
        /*
        * Private Members
        */
 
        var myPublicApi;
		
         /*
        * Private Functions
        */
		
		function CreateLoadingOverlay(){
			var overlay = $(document.createElement('div'));
				loadingMessage = $(document.createElement('div'));
				
			loadingMessage.addClass('message');
			
			overlay.addClass('overlay');
			overlay.append(loadingMessage);
			return overlay;
		}

		function ShowPage(pageControl, index){	
			var pageUrl = pageControl.data('t1-pagedControl').PageUrl;
			var pageControls = pageControl.children('.pagesContainer').children('.pageControl');
			var pageControlToShow = $(pageControls[index]);
			
			pageControls.removeClass('selected');
			pageControlToShow.addClass('selected');
			
			if(pageData.PageUrl){
				pageControlToShow.append(CreateLoadingOverlay());
				$.ajax({
					url: pageData.PageUrl + index,
					type: "POST",
					success: function(data){
						pageControlToShow.html(data);
					}
				});		
			}
		}
 
        /*
        * Public API
        */
 
        function T1_C2_Shell_Controls_PagedControl_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }
 
        T1_C2_Shell_Controls_PagedControl_Public.prototype = {
 
		};
 
 
		/*
		* Initialisation
		*/
	 
		$('.pagedControl .previous').live('click',function () {
			ShowPage($(this).closest('.pagedControl'), $(this).closest('.pagedControl').children('.pagesContainer .selected').index()++);
		})
		
		$('.pagedControl .next').live('click',function () {
			ShowPage($(this).closest('.pagedControl'), $(this).closest('.pagedControl').children('.pagesContainer .selected').index()--);
		})
		
		$(document).ready(function(){
		
			$('.pagedControl .pageHandle').each(function(){
				if($(this).hasClass('selected')){
					ShowPage($(this));
				}
			});
		
		});
	 
		// return a new instance of the public object
		myPublicApi = new T1_C2_Shell_Controls_PagedControl_Public();
		return myPublicApi;
	}
 
} ());

