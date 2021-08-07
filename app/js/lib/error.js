/**
 * This handle Promisses and errors
 */

console.log("Loading file:error.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $q = require('q');

var log = require('../lib/log');

var SINGLETON={};

/**
 * http://dailyjs.com/2014/01/30/exception-error/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype
 */
function ApplicationError(message,parent,caller){
	// Call the constructor
	Error.call(this);
	
	// if (caller) {
	// 	 Error.captureStackTrace(this, caller);
	// } else {
	// 	/*jshint -W059 */
	// 	Error.captureStackTrace(this, arguments.callee);		
	// 	/*jshint +W059 */
	// }

	// test if the parent is an error or an xhr

	this.stack = (new Error()).stack;
	this.message = message;	
	this.parent = parent;
}

SINGLETON.createApplicationError=function(text,err){
	/*jshint -W059 */
	// return new ApplicationError(text,err,arguments.callee);
	return new ApplicationError(text,err);
	/*jshint +W059 */
};

/**
 * Create a reject promise.
 * See: http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 */
SINGLETON.reject=function(text,err){
	if (err) {
		/*jshint -W059 */
		// var error=new ApplicationError(text,err,arguments.callee);
		var error=new ApplicationError(text,err);
		return $q.reject(error);
		/*jshint +W059 */
	} else {
		return $q.reject(text);
	}
};

SINGLETON.log=function(msg,err) {

    if (err) {
	    // log.error(msg+", Exception: "+err.message);
	    // // log.error(err.message);
	    // log.error(err.stack);
	    
	    // if (err.parent) {
		//     SINGLETON.log("-- Parent Exception -->:",err.parent);
	    // }
        log.error(msg,err);
    } else {
	    log.error(msg);
    }
};

SINGLETON.sendError=function(msg,err) {
	// TODO THIS SEND MESSAGE TO THE SERVER
	log.error("#####################################");
	log.error(" Sending message to the server:");
	log.error(msg,err);
	log.error("#####################################");


	
};

module.exports=SINGLETON;

