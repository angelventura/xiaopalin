/**
 * This gets the current server Url and the header to make the request
 */

console.log("Loading file:auth-context.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');
const log = require('../../lib/log');
const Errors = require('../../lib/error');

const Storages = require('../../lib/storage');

const SINGLETON=class AuthContext {
    
    constructor(){
    }
    
    getAjaxUrl(uri){
        return "/TO_BE_DONE"+uri;
    }

    isUserLogged(){
        return false;        
    }
    
    getHeaders(){
        return {};
    }

    handleError(info,xhr){
        throw Errors.createApplicationError("Url:'"+info.url+
										    "', Data:"+log.obj(info.data)+
										    ", Status:"+xhr.status+
										    ", Response:"+xhr.responseText
										    ,xhr);
    }
};

module.exports = SINGLETON;
