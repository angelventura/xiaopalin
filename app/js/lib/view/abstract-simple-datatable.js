/**
 * This is a mothe rclass for all the datatables tabs that only shows a list of elements
 */
'use strict';

console.log("Loading file:abstract-simple-datatable.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

// var $ = require('jquery');
const Noty = require('../../lib/widget/noty');

const AbstractDatatable = require('../../lib/view/abstract-datatable-tab');

const SINGLETON=class AbstractView extends AbstractDatatable {
	
    constructor(id,uri,columns){
        super(id);
        this.uri=uri;
        this.columns=columns;
    }

    parseServerData(json){	
        if (!json){
            Noty.warn(" No data from service: "+this.uri);

            return [];
        } else {
            return json;
        }
    }
    
    initComplete($datatable,args){        
    }
    
    displayDatatable($el){
	    var $datatable=$el.DataTable({
		    language: {
			    "processing": "Hang on. Waiting for response...",
			    "loadingRecords":   "Loading...  .."
		    },
		    stateSave: true,
		    buttons: this.defaultButtons(),

		    "columns": this.columns,
            "ajax": this.defaultLoginAjaxCall(this.uri,
                                              this.parseServerData),
        
		    dom:this.defaultDom(),
            
		    colReorder: true,
		    "order": [[ 0, "asc" ]],
		    iDisplayLength: 50,
		    "lengthMenu": [[10, 25, 50, 100, 1000, -1], [10, 25, 50, 100, 1000, "All"]],
		    reponsive:true,
		    "deferRender": true,
            
		    
		    "initComplete":  ($datatable,args) => {
                // This is a bug some times the this.$datatable has not be setted
                // this.initComplete();
		    }            
	    });	

        this.$datatable=$datatable;
        this.initComplete();
        
        return $datatable;
    }
};


module.exports = SINGLETON;
