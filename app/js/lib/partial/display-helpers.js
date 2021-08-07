/**
 * Some display helpers. To use it write {{relativeTimeDetail TIME }} in the handlebars template.
 */
'use strict';

console.log("Loading file:display-helpers.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');

const moment = require('moment');
const numeral = require('numeral');

const log = require('../../lib/log');
const Display = require('../../lib/display');
const Url = require('../../lib/url');

const Ajax = require('../../lib/ajax/ajax');


// // This register a helper to be used in Handlebars.
// Display.registerHelper('stringify', function(data) {
//     return JSON.stringify(data,null,4);
// });

const SINGLETON={};

SINGLETON.init=function(){
    /**
     * Shos one url parameter
     */
    Display.registerHelper('ajax-url', function(parameterName) {
        return Ajax.getAjaxUrl(parameterName);
    });

    /**
     * Shos one url parameter
     */
    Display.registerHelper('param', function(parameterName) {
	    if (parameterName){
		    return Url.getParam(parameterName,"");
	    } else {
		    return "";
	    }
    });

    /**
     * Herlper registration to be used in handle bars
     **/
    // This drows a number readed from bytes
    Display.registerHelper('fromBytes', function(number) {
	    if (number){
		    return numeral(number).format('0.0 b');
	    } else {
		    return "N/A";
	    }
    });

    Display.registerHelper('bytes', function(number) {
	    if (number){
		    return numeral(number).format('0.0 b');
	    } else {
		    return "N/A";
	    }
    });

    Display.registerHelper('number', function(data) {
	    if ($.isNumeric( data )){
		    return numeral(data).format();
        } else {
            return "N/A";
        }	
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('duration-nanos', function(data) {
	    if ($.isNumeric( data )){
		    return moment.duration(data/1000).humanize()+" ["+data+"]";
        } else {
            return "N/A";
        }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('duration', function(data) {
	    if ($.isNumeric( data )){
            // The duration takes the number of millisecons
		    return moment.duration(data).humanize()+" ["+data+"]";
        } else {
            return "N/A";
        }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('duration-sec', function(data) {
	    if ($.isNumeric( data )){
		    return moment.duration(data*1000).humanize()+" ["+data+"]";
        } else {
            return "N/A";
        }
    });


    // This register a helper to be used in Handlebars.
    Display.registerHelper('relativeTime', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime).fromNow();
	    } else {
		    return "never";
	    }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('relativeTimeDetail', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime).fromNow()+" ["+moment(dateTime).format('HH:mm:ss')+"]";
	    } else {
		    return "never";
	    }
    });

    //     // This register a helper to be used in Handlebars.
    // Display.registerHelper('dateTimeRelative', function(dateTime) {
	//     if (dateTime){
	// 	    return moment(dateTime).format('YYYY-MM-DD HH:mm')+" ["+moment(dateTime).fromNow()+"]";
	//     } else {
	// 	    return "never";
	//     }
    // });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('dateTime', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime).format('YYYY-MM-DD HH:mm');
	    } else {
		    return "never";
	    }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('unixTimeStamp', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime*1000).format('YYYY-MM-DD HH:mm:ss');
	    } else {
		    return "never";
	    }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('dateOnly', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime).format('YYYY-MM-DD');
	    } else {
		    return "never";
	    }
    });

    // This register a helper to be used in Handlebars.
    Display.registerHelper('dateRelative', function(dateTime) {
	    if (dateTime){
		    return moment(dateTime).format('YYYY-MM-DD')+" ["+moment(dateTime).fromNow()+"]";
	    } else {
		    return "never";
	    }
    });

};



/**
 * Datatables
 */
if ($.fn.dataTable) {

    $.fn.dataTable.moment = function ( format, locale ) {
	    var types = $.fn.dataTable.ext.type;

	    // Add type detection
	    types.detect.unshift( function ( d ) {
		    if ( d ) {
			    // Strip HTML tags and newline characters if possible
			    if ( d.replace ) {
				    d = d.replace(/(<.*?>)|(\r?\n|\r)/g, '');
			    }

			    // Strip out surrounding white space
			    d = $.trim( d );
		    }

		    // Null and empty values are acceptable
		    if ( d === '' || d === null ) {
			    return 'moment-'+format;
		    }

		    return moment( d, format, locale, true ).isValid() ?
			    'moment-'+format :
			    null;
	    } );

	    // Add sorting method - use an integer for the sorting
	    types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
		    if ( d ) {
			    // Strip HTML tags and newline characters if possible
			    if ( d.replace ) {
				    d = d.replace(/(<.*?>)|(\r?\n|\r)/g, '');
			    }

			    // Strip out surrounding white space
			    d = $.trim( d );
		    }
		    
		    return d === '' || d === null ?
			    -Infinity :
			    parseInt( moment( d, format, locale, true ).format( 'x' ), 10 );
	    };
    };

}


module.exports = SINGLETON;
