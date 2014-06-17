/// <reference path="~/Scripts/DevIntellisense.js"/>
 
(function (undefined) {
 
 
 
    /*
    * Private Members
    */
 
    var t1 = window.T1 = window.T1 || {},
        c2 = t1.C2 = t1.C2 || {},
        shell = c2.Shell = c2.Shell || {},
        controls = shell.Controls = shell.Controls || {};
    gridControl = controls.GridControl = controls.GridControl || new T1_C2_Shell_Controls_GridControl();
 
 
    /*
    * Private Functions
    */
 
 
    /**************************************************************************
    * Library: T1.C2.Client.Controls.GridControl
    */
    function T1_C2_Shell_Controls_GridControl() {
        /// <summary>
        /// Initialises a new instance of the gridControl control
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
 
        function T1_C2_Shell_Controls_GridControl_Public() {
            /// <summary>
            /// Constructor for the librarys public API
            /// </summary>
        }
 
        T1_C2_Shell_Controls_GridControl_Public.prototype = {
 
        };
 
 
        /*
        * Initialisation
        */
     
        $('.gridControl .addTemplateRow').live('click',function(){
        
            var tableBody = $(this).closest('.gridControl').children('table').children('tbody');
            var tableTemplate = tableBody.children('.template');
            var newRow = tableTemplate.clone().removeClass('template');
            
            tableTemplate.before(newRow);
        
        });
     
        // return a new instance of the public object
        myPublicApi = new T1_C2_Shell_Controls_GridControl_Public();
        return myPublicApi;
    }
 
} ());

