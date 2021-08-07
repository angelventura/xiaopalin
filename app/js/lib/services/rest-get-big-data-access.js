/**
 * A helper for big-data-access for REST-GET ajax calls
 */
'use strict';

console.log("Loading file:rest-get-big-data-access.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const Ajax = require('../../lib/ajax/ajax');

const BigDataAccess = require('../../lib/services/big-data-access');

const SINGLETON=class RestGetBigDataAccess extends BigDataAccess {
    constructor(url,data){
        super(url);
        
        this.url=url;
        
        this.data=data;
    }   
    
    setData(data){
        this.data=data;
    }

    dataAccess(){        
        return Ajax.get(this.url,this.data);
    }
 

};


module.exports = SINGLETON;

