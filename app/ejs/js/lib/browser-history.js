/**
 * Subcrsive to this class to listen on URL modifications and modify the current page url
 * On url changes if the URI is still the same the listenerFunction will be called.
 *
 * Doc: https://developer.mozilla.org/en-US/docs/Web/API/History_API
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}) -%>

//var $q = require('q');
const Log = require('../lib/log');

const Parser = require('query-string-parser');

const SINGLETON={};

// from: http://mon0249awl.ces-cdr.eu.int:3000/function-tab.html?asdasdasd" -> /function-tab.html
let listenerFunction=null;
let uri=null;
let pageParam=null;

function updateUrlValues(){
    // href=window.location.href;

    uri=window.location.pathname;
    pageParam = Parser.fromQuery(location.search);
}


function onPopStateEventListener(event){
	// if (window.history.state == null){ // This means it's page load
	// 	return;
	// }
    // Log.info("POP:"+document.location.pathname+" - "+ JSON.stringify(event.state));
	// Log.error("POP:"+window.location.pathname+ " - "+JSON.stringify(event.state));

    const oldUri=uri;
    updateUrlValues();

    if (oldUri === uri) {
        event.preventDefault();
        event.stopPropagation();

	    // alert("Calling listener function!");
        listenerFunction();
    } 

	// const uri=window.location.pathname+((window.location.hash)?window.location.hash:'');

	// Is the openUrl who shoul do the prevent default
	// TODO This is temporal
	// if (!window.location.hash) {
	// 	if (openUrl(uri,false)){
	// 	    event.preventDefault();
    //     }
	// }

}

SINGLETON.subscribeEvents=function(f) {
    if (uri !=null){
        Log.info("Already subscrived");
        return ;
    } else {
	    if (!window) {
		    alert("No Window Browser. App can not be started!");
	    } else {
            listenerFunction=f;
            updateUrlValues();
		    window.onpopstate = onPopStateEventListener;
	    }
    }
};

SINGLETON.pushParameter=function(name,value){
    if (pageParam == null){
        pageParam={};
    }

    pageParam[name]=value;

    const url=uri+'?'+$.param(pageParam);

    SINGLETON._pushUrl(url,null,null);
};

SINGLETON.removeParameter=function(name){
    if (pageParam == null){
        pageParam={};
    }

    delete pageParam[name];

    const query=$.param(pageParam);
    
    const url=(query)?uri+'?'+query:uri;

    SINGLETON._pushUrl(url,null,null);
};

SINGLETON.getParameter=function(name,defaultValue){

	if (pageParam == null){
        pageParam = Parser.fromQuery(location.search);
        pageParam= (!pageParam)?{}:pageParam;
    }
    
	if ( typeof pageParam[name] === 'undefined' ){
		return defaultValue;
	} else {
		const ret=pageParam[name];
        
		if (ret===null){
			return defaultValue;
		} else{
			return ret;
		}
    }
};

SINGLETON._pushUrl=function(uri,title,message){
    // Url.notifyUrlChanged();
    
    window.history.pushState("object or string", title, uri);

    setTimeout(listenerFunction,0);    
};


module.exports=SINGLETON;
