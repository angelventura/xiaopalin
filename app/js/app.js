/**
 * Application entry point.
 */
'use strict';

console.log("Loading file:app.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');
const moment = require('moment');
const numeral = require('numeral');

const Log = require('./lib/log');
const Errors = require('./lib/error');

const Register = require('./lib/register-module');
const Display = require('./lib/display');

Log.debug("Starting app ...");

var INTERFACE={
	"init":[],
	"documentReady":[],
	"render":[] // This is for the widgets to be called after the full page render

};

Register.registerModule(INTERFACE,"index",require('./view//index'));
Register.registerModule(INTERFACE,"home",require('./view//home'));
Register.registerModule(INTERFACE,"card-list",require('./view//card-list'));
Register.registerModule(INTERFACE,"card-slider",require('./view//card-slider'));
Register.registerModule(INTERFACE,"play-sound",require('./partial//play-sound'));
Register.registerModule(INTERFACE,"xiao-partial",require('./partial//xiao-partial'));
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

