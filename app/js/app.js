/**
 * Application entry point.
 */
'use strict';

console.log("Loading file:app.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');
const moment = require('moment');
const numeral = require('numeral');

const log = require('./lib/log');
const Errors = require('./lib/error');

const Register = require('./lib/register-module');
const Display = require('./lib/display');

log.debug("Starting app ...");

var INTERFACE={
	"init":[],
	"documentReady":[],
	"render":[] // This is for the widgets to be called after the full page render

};

Register.registerModule(INTERFACE,"index",require('./view//index'));
Register.registerModule(INTERFACE,"data",require('./services//data'));
Register.registerModule(INTERFACE,"display-helpers",require('./lib/partial//display-helpers'));
Register.registerModule(INTERFACE,"display-partials",require('./lib/partial//display-partials'));
Register.registerModule(INTERFACE,"closeable-partial",require('./lib/partial//closeable-partial'));



var initPromise=Register.call(INTERFACE,"init");

$q(initPromise).then(function(){
	
	// The docuemnt ready event
	$(document).ready(function(){
		
		// documentReady functions
		$q(Register.call(INTERFACE,"documentReady")).then(function(){

			// the the render functions.
			return Register.call(INTERFACE,"render");

		}).catch(function(err){
			Errors.log("Document ready error",err);	
		});
					
	});

}).catch(function(err){
	Errors.log("Application initialization error",err);	
});

