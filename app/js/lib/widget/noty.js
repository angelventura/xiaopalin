/**
 *
 * This is a handy class to simplify the access to the /app/ejs/js/widget/notifications.js module
 *
 */
'use strict';

console.log("Loading file:notifications.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var Noty = require('../../lib/widget/notifications');

var SINGLETON={};


SINGLETON.error=function(text,err){
	Noty.error({err:err,text:text});
};

SINGLETON.success=function(text,err){
	Noty.success({err:err,text:text});
};

SINGLETON.info=function(text,err){
	Noty.info({err:err,text:text});
};

SINGLETON.warning=function(text,err){
	Noty.warning({err:err,text:text});
};


module.exports = SINGLETON;
