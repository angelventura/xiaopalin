/**
 * This do some actions on objects
 */
'use strict';

console.log("Loading file:obj.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');
const Log = require('../lib/log');

const moment = require('moment');

const SINGLETON={};

SINGLETON.EMPTY_ARRAY=[];


SINGLETON.join=function(array,separator){
    if (array == null){
        return "";
    } else {
        return array.join(separator);
    }
};

SINGLETON.getDateValue=function(obj,path,format,defaultValue){
    const value=SINGLETON.getValue(obj,path,null);

    if (value === null){
        return defaultValue;
    } else {
        return moment(value).format(format);
    }
};

SINGLETON.id=function(obj,defaultValue){
    return SINGLETON.getValue(obj,"id",defaultValue);
};

SINGLETON.hasId=function(obj,id){
    const currentId=SINGLETON.getValue(obj,"id",null);

    return (currentId === id);
};

SINGLETON.array=function(obj,path){
    return SINGLETON.get(obj,path,SINGLETON.EMPTY_ARRAY);
};

SINGLETON.getValue=function(obj,path,defaultValue){
    return SINGLETON.get(obj,path,defaultValue);
};

SINGLETON.get=function(obj,path,defaultValue){
    if (typeof obj === 'undefined' || obj == null ) {
        return defaultValue;
    } else if (typeof path !== 'string' || !path ){
        return defaultValue;
    } else {
        const paths = path.split('.');
        let current = obj;
        let i=0;
        
        for (i = 0; i < paths.length; ++i) {
            const value=current[paths[i]];
            
            if (value === undefined || value === null) {
                return defaultValue;
            } else {
                current = value;
            }
        }
        
        return current;
    }
};

SINGLETON.log=function(obj){
    return SINGLETON.stringyfy(obj);
};


SINGLETON.stringify=function(obj){
    if (typeof obj === 'undefined'){
        return 'undefined';
    } else if (obj === null){
        return null;
    } else {
        try {
            return JSON.stringify(obj,null,4);
        }catch(err){
            return "Error:"+err;
        }
    }
};

SINGLETON.callPromiseFunction=function(module,functionName,args,moduleName){
    try {
        const functionMethod=module[functionName];
        
        if (!functionMethod){
            // Not all the methods are mandatories
            return $q.resolve();            
        } else {
            const promise=functionMethod.call(module,args);
            
            if (!promise){
                // function that retunrs nothing
                return $q.resolve();            
            } else {
                // just add a trace to avoiding been blind when something wrong happends
                // The promise object can be something other that a promise like null.
                return $q(promise).catch((err)=>{
                    Log.error("While calling module: "+moduleName+", function:"+functionName,err);
                    return $q.reject(err);
                });
            }
        }
    }catch(err){
        Log.error("While calling module: "+moduleName+", function:"+functionName,err);
        return $q.reject(err);
    }
};


module.exports=SINGLETON;


