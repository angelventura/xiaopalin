/**
 * {{> partial_name object}}
 */
'use strict';

console.log("Loading file:display-partials.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');

const log = require('../../lib/log');
const Display = require('../../lib/display');

import JSONFormatter from 'json-formatter-js';

const SINGLETON={};



const TEMPLATES=[

   {
	   id:"stringify-icon",
       content:"<i class=\"circular small info icon link auto-popup inverted\" data-html=\"<pre>{{stringify .}}</pre>\"></i>"
   },

   {
	   id:"json-closeable",
       content:"<div class=\"ui message closeable\" data-id=\"json\"><div class=\"header closeable-button\">JSON</div><pre class=\"closeable-element\"> {{stringify .}}</pre></div>"
   },

];

SINGLETON.init=function(){
	log.info("Loading templates ...");
	var promisses=[];
	
	TEMPLATES.forEach( (el,index) => {
		log.info("Compiling partial:"+el.id);
		promisses.push(Display.registerPartial(el.id,el.content));
	});


    // This register a helper to be used in Handlebars.
    Display.registerHelper('JSONFormatter', function(json) {
	    if (json){
    	    const formatter = new JSONFormatter(json);
            const value=formatter.render();
		    return value;
	    } else {
		    return "NO JSON";
	    }
    });
    

    
	return $q.all(promisses);
};


module.exports=SINGLETON;
