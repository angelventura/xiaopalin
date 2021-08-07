/**
 * This help to subscrive event to key bidings.
 * The functions will be stored in maps and will be called when the key event is received.
 *
 * Problem with different key modifiers in Mac and Win. It should be fixed to be more precised
 * on event like win:[alt+ctrl o] mac:[alt+cmd o] This should be automaticly transformed.
 *
 * Right now only suported "MODIFERS" [M o] where o may be alt, ctrl, cmd, etc ...
 *
 */
'use strict';
<% var currentName="KeyboardEvents"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var log = require('../lib/log');
var Error = require('../lib/error');

var SINGLETON={};

// Thins contains the function to be called when a modifier and a function is pressed.
var M_keyMap={}; // Modifier key map

// Non modifiers key map
var NM_keyMap={}; // No Modifier key map


// May be to be suppresed ...
var defaultFunction=null;

var ESC_KEYCODE=27;


/**
 * The main handle event function
 */
function handleEvent(event){
	var code=event.which;
	var f;

	// test if a modifier function has been called.
	if (event.altKey || 
		event.altKey ||
		event.ctrlKey ||
		event.metaKey ){

		f=M_keyMap[code];
		if ($.isFunction(f)){
			f(event);

			// This should be donne by the client.
			// event.preventDefault();
		} else {
			if (defaultFunction){
				defaultFunction(event);
			} else {
				console.debug("M Key code:"+code);
			}
		}						
	} else {
		//
		// This is not clear review ...
		//
		// ESC KEY Traverses elements is global
		if ( $(event.target).is("body") || code === ESC_KEYCODE) {					
			f=NM_keyMap[code];
			if ($.isFunction(f)){
				f(event);
				
				// event.preventDefault();
			} else {
				if (defaultFunction){
					defaultFunction(event);
				} else {
					console.debug("Key code:"+code);
				}
			}						
		}
	}
	
}

/**
 * KeyCode, The key code to bind.
 * modifier: true/false If the key code is binded with a modifier.
 * f: The function to execute when the binding is pressed.
 */
SINGLETON.shorcut=function(keyCode,modifier,f){

	if (!$.isFunction(f)){
		log.warn("Not a function passed ...");
		return ;
	} else if (!keyCode){
		log.warn("Not key code passed");
		return ;
	} else {
		if (modifier) {
			if ( M_keyMap[keyCode] !== undefined ) {
				console.warn("Overwriting key modifier code:"+keyCode);
			}
			M_keyMap[keyCode]=f;
		} else {
			if ( NM_keyMap[keyCode] !== undefined ) {
				console.warn("Overwriting non-modifier key code:"+keyCode);
			}
			NM_keyMap[keyCode]=f;
		}
	}
};

SINGLETON.default=function(f){
	if ($.isFunction(f)){
		defaultFunction=f;
	}
};

SINGLETON.subscriveEvents=function(){
	$(document).on('keydown',handleEvent);
};


SINGLETON.documentReady=function(){
	SINGLETON.subscriveEvents();
};

module.exports=SINGLETON;
