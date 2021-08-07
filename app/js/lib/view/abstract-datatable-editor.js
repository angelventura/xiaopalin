// /**
//  * This is in charge of the table headers.
//  */
// 'use strict';
// 
// console.log("Loading file:abstract-datatable-editor.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

// var $ = require('jquery');
// const $q = require('q');

// const log = require('../../lib/log');

// const SINGLETON= class AbstractDatatableEditor {


// 	saveValue(datatable,row,data,value,$input){
// 		alert("Save Data not implemented:'"+value+"'");
// 		// if (!value){
// 		// 	cleanPatternTd(null,rowData,$input);
// 		// } else {
// 		//
// 		// 	var data={"propertyName":rowData.propertyName,
// 		// 			  "pattern":value};
// 		//
// 		// 	return $q.all([
// 		//
// 		//
// 		// 		Ajax.get(Context.getUrl("/admin/validations/set-pattern"),data).then(function (serverData) {
// 		// 			cleanPatternTd(datatable,serverData,$input);
// 		// 		}).catch(function(err){
// 		// 			cleanPatternTd(null,rowData,$input);
// 		// 			return Error.reject("Setting the pattern value:"+value,err);
// 		// 		})		    
// 		// 	]);			
// 		//
// 		// }        
// 	}

// 	getValueToEdit(row,data){
// 		return data.value;
// 	}

// 	buildEditor(row,data,$td){
//         alert("TOTO");
// 		$td.html('<div class="ui input focus fluid action"><input class="editable" type="text" value="'+data.value+'"><button class="button icon ui"><i class="icon"></i></button></div>');
		
// 		const $input=$td.find('input');
//         debugger; 
// 		$input.focus();
//         $input.select();

// 	}
	
// 	editableEL(datatable,event){
// 		debugger;
// 		var $td=$(event.currentTarget);
		
// 		var $input=$td.find("input.editable");
// 		if ($input.length >0){
// 			return ;
// 		} else {
// 			var $tr=$td.closest("tr");
// 			var row = datatable.row( $tr[0] );
// 			var data=row.data();

// 			this.buildEditor(row,data,$td);
			
// 			event.stopPropagation();
// 		}
// 	}

// 	validateInputEL(datatable,event){
// 		var $input=$(event.currentTarget);
// 		var value=$input.val();
// 		var $tr=$input.closest("tr");
// 		var row = datatable.row( $tr[0] );
// 		var data=row.data();
		
// 		this.saveValue(datatable,row,data,value,$input);
		
// 		event.stopPropagation();
// 	}

// 	revertValue($input,row,data){
// 		var $td=$input.closest("td");
// 		const value=this.getValueToEdit(row,data);
// 		$td.html(value);
		
// 	}

// 	revertValueEL(datatable,event){
// 		var $input=$(event.currentTarget);
// 		// var value=$input.val();
// 		var $tr=$input.closest("tr");
// 		var row = datatable.row( $tr[0] );
// 		var data=row.data();
		
// 		// var $td=$input.closest("td");
// 		// const value=this.getValueToEdit(row,data);		
// 		// $td.html(value);

// 		this.revertValue($input,row,data);
		
// 		event.stopPropagation();    
// 	}

// 	keyboardEvent(datatable,event){
// 		if ( event.which === 27 ) {
// 			this.revertValueEL(datatable,event);
// 		} else if ( event.which === 13 ) {
// 			this.validateInputEL(datatable,event);
// 		}
		
// 	}

// 	addFieldEditorEventListener(datatable){
// 		datatable.on('click','td.editable',(event) => this.editableEL(datatable,event));
// 		datatable.on('focusout','input.editable',(event) => this.revertValueEL(datatable,event));
		
// 		datatable.on('keydown','input.editable',(event) => this.keyboardEvent(datatable,event));
// 	}
	

// };


// module.exports = SINGLETON;


