/**
 * Thisi s the parent class for a widget datatable
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const El = require('../../lib/element');

const Ajax = require('../../lib/ajax/ajax');
const Noty = require('../../lib/widget/noty');
const Obj = require('../../lib/obj');

const Utils = require('../../lib/datatable/utils');

const AbstractWidget = require('../../lib/widget/abstract-widget');

const SINGLETON=class AbstractTableWidget extends AbstractWidget {
	
    constructor(id,uri,columns,columnOrder=null){
        super(id);

        this.$datatable=null;

        this.columns=columns;

        if (columnOrder){
            this.columnOrder=columnOrder;
        } else{
            this.columnOrder=Utils.defaultColumnOrder();
        }
        
        this.uri=uri;

        this.parseServerData=Utils.parseServerData;

        this.BUTTONS=Utils.defaultButtons();
        this.DOM=Utils.defaultDom();

    }

    
    defaultButtons(){
        return this.BUTTONS;
    }

    defaultDom(){
        return this.DOM;
    }
    
    setDefaultButtons(buttons){
        return this.BUTTONS=buttons;
    }

    setDefaultDom(dom){
        return this.DOM=dom;
    }

    setData(newDataArray){
        if (this.$datatable){
            this.$datatable.clear();
            this.$datatable.rows.add(newDataArray);
            this.$datatable.draw();
        } else {
            Log.warn("No datatable while insering data");
        }
    }

    clickEventRow(selector,f){
        return this.subscriveEventRow(selector,'click',f);
    }

    subscriveEventRow(selector,eventType,f){

        if (this.$datatable === null) {
            alert("While subscrive events datatable:"+this.id+" not initialized");
        } else {        
            return this.$datatable.on(eventType,selector, (event) => {
                try {
                    const el=event.currentTarget;

                    const tr=$(el).closest("tr");
                    
                    const row = this.$datatable.row( tr );
                    const data=row.data();
                    
                    f(data,event);
                }catch(err){
                    Log.error("File:<%- currentName -%>, Error on event type:"+eventType,err);
                }
            });
        }
    }

    enableRowsChild(f,v,selector){

        if (!f){
            alert("<%- currentName -%>: No enableRowsChild f defined");
        }
        if (!selector){
            selector="tr";
        }
        
        this.$datatable.on('click',selector,(event) =>{
            try {
                // This validates that this event can open
                // the row
                if ( typeof v !== "undefined" && !v(event)) {
                    return ;
                }
                
                var tr=event.currentTarget;
                var row = this.$datatable.row( tr );
                var $tr=$(tr);
                
                
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    //$tr.removeClass('shown');
                    $tr.removeClass('selected');
                } else {
                    // Open this row
                    row.child( f(row.data()) ).show();
                    //$tr.addClass('shown');
                    $tr.addClass('selected');
                }
            }catch(err){
                Log.error("File:<%- currentName -%>, Error on click",err);
            }
        });        
    }



    defaultLoginAjaxCall(url,parseData,ajaxCallData){
        const that=this;
        that.uri=url;
        
        return function( data, callback, settings ) {
            if (! that.uri) {
                Log.info("No url return not calling the server");
                callback({data:[]});
            } else {
                that.setLoading(true);
                
                Ajax.get(that.uri,ajaxCallData).then((result)=>{
                    if (parseData){
                        callback({data:parseData(result)});
                    } else if (result){
                        callback({data:result});
                    } else {
                        callback({data:[]});
                    }
                }).catch( (err) => {
                    Noty.error("Loading from URL: "+that.uri+" Error:"+Log.obj(err)+" - ",err);
                }).finally( () => {
                    that.setLoading(false);
                });
            }
        };
    }

    setLoading(loading){

    }
    
    // This display the widget and returns a promise
    display($el){

        // gets the elements
        if ($el) {        
            // The element where the widget will be disaplayed
            this.$el=$el;
        } else {            
            // this.$el=$(`#${this.id}-table`);
            this.$el=El.assert(`#${this.id}-table`,"<%- currentName -%>",this.id);
        }

        // if (!this.$el || this.$el.length === 0){
        //     alert("No datatable element found for widget id:"+this.id);
        // } else {            
            // Display
            this.setLoading(true);
            
            try {
                this.$datatable=this.displayDatatable(this.$el);
                
                if (!this.$datatable){
                    Log.error("The method displayDatatable of:"+this.id+" should return the datatable.");
                    alert("No datatable created!");
                }
            }catch(err){
                Log.error("Datatable not initialized [check the data fields of the columns]:",err);
                return $q.reject(err);
            }finally {
                this.setLoading(false);        
            }
//        }
        
        return $q.resolve();
    }

    reload(){
        if (this.$datatable) {
            const ret=this.$datatable.ajax.reload();
            
            return $q.resolve(ret);
        } else {
            return $q.resolve();
        }
    }

    initComplete(){        
    }

    displayDatatable($el){

	    const $datatable=$el.DataTable({
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
		    // "order": [[ 0, "asc" ]],
            "order": this.columnOrder,
		    iDisplayLength: 10,
		    "lengthMenu": [[10, 25, 50, 100, 1000, -1], [10, 25, 50, 100, 1000, "All"]],
		    reponsive:true,
		    "deferRender": true,
            
		    
		    "initComplete":  () => {
                // This is a bug some times the this.$datatable has not be setted
                // this.initComplete();
		    }
            
	    });	

        this.$datatable=$datatable;
        this.initComplete();

        return $datatable;
    }

    /**
     * row values
     */
    getRowData($el,defaultValue){
        if ($el){
            const $tr=$el.closest("tr");
            
            if ($tr.length > 0) {
                const row = this.$datatable.row( $tr[0] );
                
                if (row){
                    return row.data();
                }
            }
        }
        
        return defaultValue;
    }

    getRowDataValue($el,path,defaultValue){
        const data=this.getRowData($el,null);
        
        return Obj.getValue(data,path,defaultValue);        
    }

};


module.exports = SINGLETON;
