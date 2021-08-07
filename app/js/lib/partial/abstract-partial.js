/**
 * Mother calss for the partials.
 * Partial are parts of viasual that can me in all the pages like the vertical menu.
 */
'use strict';

console.log("Loading file:abstract-partial.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
var $q = require('q');

var log = require('../../lib/log');
var Error = require('../../lib/error');

const SINGLETON=class AbstractPartial {
	
    constructor(id){
        this.id=id;
        
        this.parent=null;
    }
    
    display(){
        log.debug("Display no implemented:"+this.id);        
    }
                
    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    documentReady(){		
        this.display();            
    }

    initialize(){
        log.info("Initialize function not implemented in:"+this.id);
        return $q.resolve();
    }

    init(parent){
        this.parent=parent;

        return this.initialize();
    }
};


module.exports = SINGLETON;
