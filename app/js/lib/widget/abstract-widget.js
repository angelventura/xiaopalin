/**
 * Parent class For Widgets.
 * The widget must be managed by the parent view or page.
 * Are not global, for globlal use partials
 */
'use strict';

console.log("Loading file:abstract-widget.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Assert = require('../../lib/assert');

const Log = require('../../lib/log');

const SINGLETON=class AbstractWidget {
	
    constructor(id){
        // the name of the widget
        this.id=Assert.notEmpty(id,"widget Id");

        this.initialized=false;

        // This is the parent of the widget.
        // This may be anoter widget or a view
        this.parent=null;
    }

    // This display the widget and returns a promise
    display($el){
        // The element where the widget will be disaplayed
        this.$el=$el;

        return $q.resolve();
    }

    // This van be called before the doscument ready
    // To initialize the widget.
    // Returns a promisse
    init(parent){
        this.parent=parent;
        this.initialized=true;
        return $q.resolve();
    }

    /**
     * Event delegation subscription
     */    
    clickEvent(selector,f){
        return this.subscriveEvent(selector,'click',f);
    }

    subscriveEvent(selector,eventType,f){
        $(document).on(eventType,selector, (event) => {
            f(event);
        });        
    }


};


module.exports = SINGLETON;
