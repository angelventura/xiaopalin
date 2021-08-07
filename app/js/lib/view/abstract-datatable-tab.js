/**
 * This is the mother class for one datatable pages
 */
'use strict';

console.log("Loading file:abstract-datatable-tab.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Obj = require('../../lib/obj');
const Url = require('../../lib/url');

const moment = require('moment');
const numeral = require('numeral');

const Log = require('../../lib/log');

const Ajax = require('../../lib/ajax/ajax');
const Noty = require('../../lib/widget/noty');

const Utils = require('../../lib/datatable/utils');

const BUTTONS=Utils.defaultButtons();

// const BUTTONS2=[{
// 	extend:    'colvis'
// 	, text:      '<i class="block layout icon"></i> View'
// 	, titleAttr: 'Column Visibility'
// 	, columns:'.column-toggle'
// 	, postfixButtons: [ 'colvisRestore' ]
// },{ // TODO
// 	extend:    'excelHtml5'
// 	, text:      '<i class="circular file excel excel icon"></i> Excel'
// 	, titleAttr: 'Export Excel'
// 	, exportOptions: {
// 		columns: ':visible'
// 	}
// },{
// 	extend:    'print'
// 	, text:      '<i class="circular print icon"></i> Print'
// 	, titleAttr: 'Print page'					
// 	, exportOptions: {
// 		columns: ':visible'
// 	}
// },{
// 	extend:    'pdf'
// 	, text:      '<i class="circular file pdf icon"></i> Pdf'
// 	, titleAttr: 'Pdf page'					
// 	, exportOptions: {
// 		columns: ':visible'
// 	}
// },{
// 	extend:    'copy'
// 	, text:      '<i class="circular copy icon"></i> Copy'
// 	, titleAttr: 'Copy page'					
// 	, exportOptions: {
// 		columns: ':visible'
// 	}
// }];

const DOM=Utils.defaultDom();

// const DOM2="<'column menu secondary sixteen ui wide'<'item'B><'item right ui icon input 'f>>" +
// 	  "<'row'<'column'tr>>" +
// 	  "<'row'<'column'l><'column'i><'column'p>>";

const SINGLETON= class AbstractDatatableTab {
    constructor(id){
        this.id=id;
        
        this.$el=null;
        this.$refreshButton=null;
        // this.$cleanButton=null;

        this.$datatable=null;

        // This allows the uri to be modified
        this.uri=null;
    }

    setLoading(status){
        if (!this.$refreshButton){
            return ;
        } else {        
            if (status){
                this.$refreshButton.addClass("loading");
            } else {
                this.$refreshButton.removeClass("loading");
            }
        }
    }

    defaultButtons(){
        return BUTTONS;
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

                if ( typeof url === 'string' ) {
                
                    Ajax.get(that.uri,ajaxCallData).then((result)=>{
                        if (parseData){
                            callback({data:parseData.bind(that)(result)});
                        } else if (result){
                            callback({data:result});
                        } else {
                            callback({data:[]});
                        }
                    }).catch( (err) => {
                        Noty.error(" Loading from URL: "+that.uri+" Error:"+Log.obj(err)+" - " + err);
                    }).finally( () => {
                        that.setLoading(false);
                    });

                
                } else if ( typeof url === 'function' ) {
                    $q( that.uri.call() ).then((result)=>{

                        if (parseData){
                            callback({data:parseData.bind(that)(result)});
                        } else if (result){
                            callback({data:result});
                        } else {
                            callback({data:[]});
                        }
                    }).catch( (err) => {
                        Noty.error(" Loading from URL: "+that.uri+" Error:"+Log.obj(err)+" - " + err);
                    }).finally( () => {
                        that.setLoading(false);
                    });
                }

            }
        };
        
    }

    defaultDom(){
        return DOM;
    }


	// https://datatables.net/manual/data/orthogonal-data
    static date(data, type, full, meta){
		if(type === 'display'){
			if (data){
				return (moment(data).isValid()) ? moment(data).format("DD/MM/YY HH:mm:ss") : "N/A";
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static fromNow(data, type, full, meta){
		if(type === 'display'){
			if (data){
				return (moment(data).isValid()) ? moment(data).fromNow() : "N/A";
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static hits(data, type, full, meta){
		if(type === 'display'){
			if ($.isNumeric( data )){
				return numeral(data).format();
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

	static number(data, type, full, meta){
		if(type === 'display'){
			if ($.isNumeric( data )){
				return numeral(data).format();
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

	static bytes(data, type, full, meta){
		if(type === 'display'){
			if ($.isNumeric( data )){
				return numeral(data).format('0.0 b');
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static minTime(data, type, full, meta){
		if(type === 'display'){
			if ($.isNumeric( data )){
				if (data>54776000){
					return "N/A";
				} else {
					return moment.duration(data).humanize()+" ["+data+"]";
				}
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static maxTime(data, type, full, meta){
		if(type === 'display'){
			if ($.isNumeric( data )){
				if (data === 0){
					return "N/A";
				} else {
					return moment.duration(data).humanize()+" ["+data+"]";
				}
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static duration(data, type, full, meta){
		if(type === 'display'){
			if (data){
				return moment.duration(data).humanize()+" ["+data+"]";
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static fullDate(data, type, full, meta){
		if(type === 'display'){
			if (data && moment(data).isValid()){
				return moment(data).fromNow() +' <small>['+moment(data).format("DD/MM/YY HH:mm:ss")+']</small>';
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static dateRelative(data, type, full, meta){
		if(type === 'display'){
			if (data && moment(data).isValid()){                
                return moment(data).format('YYYY-MM-DD') +' <small>['+moment(data).fromNow()+']</small>';
			} else {
				return "N/A";
			}
		} else {
			return data;
		}
    }

    static trunc(size){
        return function(data, type, full, meta){
		    if(type === 'display'){
                if (typeof data === 'string'){
                    return (data.length > size) ? data.substr(0, size-1) + '&hellip;' : data;
                } else {
                    return data;
                }
                return data;
		    } else {
			    return data;
		    }
        };
    }

    
    // This shoud retunns the databable 
    displayDatatable($table){
        Log.debug("displayDatatable not implemented, this sohukld return the datatable. Table:"+$table);        
        return null;
    }

    enableRowsClickRedirect(f,v,selector){
        if (!f){
            alert("abstract-datatable-tab: No row url function defined");
        }
        if (!selector){
            selector="tr";
        }        

        this.$datatable.on('click',selector,(event) =>{
            // This validates that this event can open
            // the row
            if ( typeof v !== "undefined" ){
                if (!v(event)) {
                    return ;
                }
            } else {
                // do not redirect on hit on A and BUTTON
                if (event &&
                    event.target &&
                    ( event.target.tagName === 'A' ||
                      event.target.tagName === 'BUTTON' ||
                      event.target.tagName === 'TH' 
                    ) ) {
                    return ;
                } 
            }

            var tr=event.currentTarget;
            var row = this.$datatable.row( tr );

            try {
                const url=f(row.data());
                
                if (url){
                    Url.redirect(url);
                }
            }catch(err){
                Log.error("File:abstract-datatable-tab, Error on Getting url for row :"+row,err);
            }
        });        

    }

    enableRowsChild(f,v,selector){

        if (!f){
            alert("abstract-datatable-tab: No enableRowsChild f defined");
        }
        if (!selector){
            selector="tr";
        }
        
        this.$datatable.on('click',selector,(event) =>{

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
        });        
    }


    display($el){
        this.setLoading(true);

        try {
            try {
                this.$datatable=this.displayDatatable($el);

                if (!this.$datatable){
                    Log.error("The method displayDatatable of:"+this.id+" should return the datatable.");
                }
            }catch(err){
                Log.error("Datatable not initialized:",err);
                
                alert("Datatable not initialized due to one error, see console logs");
            }
        }finally {
            this.setLoading(false);        
        }
    }

    reload(){
        // the setLoading must be done into the ajax call
        // this.setLoading(true);        
        try {
            const ret=this.$datatable.ajax.reload();
            
            // Log.debug(""+ret);
            //this.display();

            return ret;
        }finally {
            // this.setLoading(false);        
        }        

    }


    /**
     *
     */
    buttonEventAndReload(id,f){
        const selector=`#${this.id}-${id}`;
    
        $(document).on('click',selector, (event) => {
            this.setLoading(true);
            
            $q(f(event)).then ( ()=>{
                this.reload();
                return $q.resolve();
            }).finally ( ()=>{
                this.setLoading(false);            
            });            
        });        
    }

    cleanInner(){
        Log.warn("Clean function not implemented:"+this.id);

        return null;
    }

    initEvents(){
        if (this.$refreshButton){
            // call back
            this.$refreshButton.on('click', (event) => {
                this.reload();
            });
        }

        // if (this.$cleanButton){
        //     // call back
        //     this.$cleanButton.on('click', (event) => {
        //         this.clean();
        //     });
        // }

        this.buttonEventAndReload("clean-button",
                                  (event) =>{
                                      return this.cleanInner();
                                  });

    }
        
    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    documentReady(){
        if (this.el ===null){
            // The init function says that not be initialized
            return $q.resolve();
        } else {
            
            this.$el=$(`#${this.id}-table`);
            
            if (this.$el.length > 0) {
                this.$refreshButton=$(`#${this.id}-refresh-button`);                    

                // this.$cleanButton=$(`#${this.id}-clean-button`);                    

                // set the menu
                $("#menu-item-"+this.id).addClass("active");

                // display the table
                this.display(this.$el);            

                // call back
                this.initEvents();
            } else {
                $("#menu-item-"+this.id).removeClass("active");
            }

            return $q.resolve();            
        }
    }
    
    initialize(){
        Log.info("Initialize function not implemented in:"+this.id);
        return $q.resolve();
    }

    init(parent){
        this.parent=parent;
        
        this.el=document.getElementById(this.id);

        if (this.el!=null){
            // return this.initialize();
            return $q(this.initialize())
                .catch( (err) => {
                    Log.error("Error on init, fileabstract-datatable-tab.",err);
                    return $q.reject(err);
                });

        } else {
            return $q.resolve();
        }
    }
    
    /**
     * Event delegation subscription
     */    
    clickEvent(selector,f){
        return this.subscriveEvent(selector,'click',f);
    }

    subscriveEvent(selector,eventType,f){
        $(document).on(eventType,selector, (event) => {
            f(event);
        });        
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
