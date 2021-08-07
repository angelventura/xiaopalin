/**
 * This mantains an cache id on the session to 
 * force non caching urls on modification.
 */
'use strict';

console.log("Loading file:cache-url.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */
	
// const $q = require('q');

const Logs = require('../../lib/log');
const Storages = require('../../lib/storage');

const SINGLETON={};

const PROP_NAME="curl";

SINGLETON._value=function(url){
    try {
        const sessionValue=Storages.session.get(PROP_NAME+url,0);
        
        const ret=parseInt(sessionValue);
        
        if (isNaN(ret)){
            return 0;
        } else {
            return ret;
        }
    }catch(err){
        Logs.error("",err);
        return 0;
    }
};

SINGLETON.refresh=function(url){
    const sessionValue=SINGLETON._value(url);

    const value=sessionValue+1;
    Storages.session.set(PROP_NAME+url,value);

    return value;
};

SINGLETON.getUrl=function(url){
    const ret=SINGLETON._value(url);

    return url+"?id="+ret;
};


module.exports = SINGLETON;

