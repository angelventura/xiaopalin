/**
 * This cointain some datatable utils
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const Noty = require('../../lib/widget/noty');

const BUTTONS=[{
	extend:    'colvis'
	, text:      '<i class="block layout icon"></i> View'
	, titleAttr: 'Column Visibility'
	, columns:'.column-toggle'
	, postfixButtons: [ 'colvisRestore' ]
},{ // TODO
	extend:    'excelHtml5'
	, text:      '<i class="circular file excel excel icon"></i> Excel'
	, titleAttr: 'Export Excel'
	, exportOptions: {
		columns: ':visible'
	}
},{
	extend:    'print'
	, text:      '<i class="circular print icon"></i> Print'
	, titleAttr: 'Print page'					
	, exportOptions: {
		columns: ':visible'
	}
},{
	extend:    'pdf'
	, text:      '<i class="circular file pdf icon"></i> Pdf'
	, titleAttr: 'Pdf page'					
	, exportOptions: {
		columns: ':visible'
	}
},{
	extend:    'copy'
	, text:      '<i class="circular copy icon"></i> Copy'
	, titleAttr: 'Copy page'					
	, exportOptions: {
		columns: ':visible'
	}
}];

const DOM="<'column menu secondary sixteen ui wide'<'item tiny'B><'item right ui icon input 'f>>" +
	  "<'row'<'column'tr>>" +
	  "<'ui equal width grid menu secondary'<'left floated left aligned column'l><'column'i><'right floated right aligned column'p>>";
//	  "<'row'<'column'l><'column'i><'column'p>>";


const COLUMN_ORDER=[[ 0, "asc" ]];

    

const SINGLETON=class DatatableUtils {
	
    static parseServerData(json,uri){	
        if (!json){
            Noty.warn(" No data from service: "+uri);

            return [];
        } else {
            return json;
        }
    }
    
    static defaultButtons(){
        return BUTTONS;
    }

    static defaultDom(){
        return DOM;
    }

    static defaultColumnOrder(){
        return COLUMN_ORDER;
    }


};


module.exports = SINGLETON;
