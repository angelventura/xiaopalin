/**
 * Application entry point.
 */
'use strict';
<% var currentName="app"; %>
<%- include('./snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

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

<%
    const MODULES=[

        // Pages
        { name:"index",path:"./view/" },
        { name:"data",path:"./services/" },

        // Partals
        { name:"display-helpers",path:"./lib/partial/"},
        { name:"display-partials",path:"./lib/partial/"},
        { name:"closeable-partial",path:"./lib/partial/"},    


];

MODULES.forEach( (currentName,index) => {
%>Register.registerModule(INTERFACE,"<%- currentName.name -%>",require('<%- currentName.path -%>/<%- currentName.name -%>'));
<%
});

%>


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

