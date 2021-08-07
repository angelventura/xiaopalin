/**
 * {{> partial_name object}}
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');

const log = require('../../lib/log');
const Display = require('../../lib/display');

import JSONFormatter from 'json-formatter-js';

const SINGLETON={};

<%
const TEMPLATES=[
    "stringify-icon",
    "json-closeable"
];%>

const TEMPLATES=[
<%

    // Usage {{>currentName}}
    
TEMPLATES.forEach( (currentName,index) => {%>
   {
	   id:"<%- currentName -%>",
       content:"<%- render.partial("./js/lib/partial/templates/"+currentName+".ejs") -%>"
   },
<%
});
%>
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
