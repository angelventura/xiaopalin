/**
 * This contains the implementation of a datatable field editor
 *
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');
const Log = require('../../lib/log');
const Context = require('../../services/auth-context');

const SINGLETON=class DatatableEditor {
    constructor(id,fieldName,datatable){
        this.id=id;
        this.fieldName=fieldName;
        this.$tab=$(`#${id}-table`);
        this.datatable=datatable;
    }

    getData(data,defaultValue){
        if (data){
            const ret=data[this.fieldName];

            if (ret){
                return ret;
            } else {
                return defaultValue;
            }
        } else {
            return defaultValue;
        }
    }

    setData(data,value){
        if (data){
            return data[this.fieldName]=value;
        } else {
            return null;
        }
    }

    editFieldEventListener(event){
        var $td=$(event.currentTarget);

        var $input=$td.find("input.editable");
        if ($input.length >0){
            return ;
        } else {
            var $tr=$td.closest("tr");
            var row = this.datatable.row( $tr[0] );
            var data=row.data();
            var pattern=this.getData(data,"");
        
            $td.html('<div class="ui input focus fluid action"><input class="editable" type="text" value="'+pattern+'"><button class="button icon ui"><i class="icon"></i></button></div>');
            
            $input=$td.find('input');
            $input.focus();
            $input.select();
            
            event.stopPropagation();
        }
    }

    cleanPatternTd(rowData,$input){
        var $td=$input.closest("td");
        
        $td.html(this.getData(rowData,""));
        
        if (this.datatable!=null){
            // set the data
            var $tr=$td.closest("tr");
            var row = this.datatable.row( $tr[0] );
            row.data(rowData);
        }
    }

    inputPatternCloseEL(event){
        var $input=$(event.currentTarget);
        var value=$input.val();
        var $tr=$input.closest("tr");
        var row = this.datatable.row( $tr[0] );
        var data=row.data();
        
        this.cleanPatternTd(data,$input);
        
        event.stopPropagation();    
    }

    eventListener(event){
        const $input=$(event.currentTarget);
        const value=$input.val();
        
        if (event.type === "focusin"){
            //
            alert("Focus IN");
        } else if (event.type === "change"){
            if (!value){
                return ;
            } else {
                // var $tr=$input.closest("tr");
                // var row = datatable.row( $tr[0] );
                // var data=row.data();
                // var propertyName=data.propertyName;
                
                // testValue(propertyName,value,$input);
                alert("Change");                
            }
        } else {
            Log.info("Event not handled:"+event.type);
        }    
    }

    sendPattern(rowData,value,$input){
        Log.warn("Send data not implemented");
    }

    inputPatternChangedEL(event){
        var $input=$(event.currentTarget);
        var value=$input.val();
        var $tr=$input.closest("tr");
        var row = this.datatable.row( $tr[0] );
        var rowData=row.data();

        // The value must be updated by the sendPattern function: this.setData(rowData,value);
        // if (this.sendPattern(rowData,value,$input)){
        //     this.setData(rowData,value);
        //     this.cleanPatternTd(rowData,$input);
        // }
        this.sendPattern(rowData,value,$input);
        
        event.stopPropagation();
    }

    addEventListener(datatable){
        this.datatable=datatable;

        if (!datatable){
            Log.error("Empty datatable passed!.");
            return ;
        }
                
        datatable.on('click','td.editable',(event) => this.editFieldEventListener(event));
        datatable.on('focusout','input.editable',(event) => this.inputPatternCloseEL(event));
        
        datatable.on('keydown','input.editable',(event) => {
            if ( event.which === 27 ) {
                this.inputPatternCloseEL(event);
            } else if ( event.which === 13 ) {
                this.inputPatternChangedEL(event);
            }
        });
    }

    
};


module.exports = SINGLETON;
