/**
 * Url hanlding
 */
'use strict';

console.log("Loading file:url.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

//var $q = require('q');
var log = require('../lib/log');
var Parser = require('query-string-parser');

const SINGLETON={};


let pageParam=null;

// function onPopStateEventListener(event){
// 	if (window.history.state == null){ // This means it's page load
// 		return;
// 	}

// 	log.log('PopState Fired...');
// }

// function subscribeEvents() {
// 	if (!window) {
// 		alert("No Window Broser. App can not be started!");
// 	} else {
// 		window.onpopstate = onPopStateEventListener;
// 	}
// }


function parseUrl(){
	pageParam = Parser.fromQuery(location.search);

    if (pageParam == null){
        pageParam = {};
    }
    
}

SINGLETON.getParameters=function(){
	if (pageParam == null){
		parseUrl();
	} 

    return pageParam;
};

SINGLETON.getParam=function(name,def){
	if (pageParam == null){
		parseUrl();
	} 

	if ( typeof pageParam[name] === 'undefined' ){
		return def;
	} else {
		var ret=pageParam[name];
        
		if (ret===null){
			return def;
		} else{
			return ret;
		}
	}
};

SINGLETON.getIdFromRegexp=function(uri,regexp,defaultValue) {
	var reg=new RegExp(regexp);
	var results = reg.exec(uri);
	
	if (results!= null && results.length>1 && results[1]){
		return results[1];
	} else {
		return defaultValue;
	}
};


/**
 * this return the current page site url adding the pathName
 */
SINGLETON.getCurrentSiteUrl=function(pathname) {
	// https://developer.mozilla.org/en-US/docs/Web/API/Location	
	const url=document.location;
	
	return url.protocol+"//"+url.host+pathname;
};


SINGLETON.getIdFromUrl=function(regexp,defaultValue) {
	return SINGLETON.getIdFromRegexp(window.location.href,regexp,defaultValue);
};

SINGLETON.getPathParameter=function(uri,defaultValue) {
	const index=window.location.pathname.indexOf(uri);

	if (index >= 0){
		const val=window.location.pathname.substring(index+uri.length,window.location.pathname.length);

		return decodeURIComponent(val);		
	} else {
		return defaultValue;
	}
};


let alreadyRedirected=false;

/**
 * If the current site is https://www.google.com
 * This redirect to https://www.google.comPATHNAME
 */
SINGLETON.redirect=function(pathname) {
    if (alreadyRedirected === true ){
        return;
    } else {
        alreadyRedirected=true;
        const url=SINGLETON.getCurrentSiteUrl(pathname);
        
        window.location=url;
    }
};

SINGLETON.reload=function(pathname) {
    if (!pathname){
        return ;
    }
    if (alreadyRedirected === true ){
        return;
    } else {
        alreadyRedirected=true;
        document.location.reload(true);
    }
};

module.exports=SINGLETON;
