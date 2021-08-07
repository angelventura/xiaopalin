/**
 * An abstract view is a view of the full page
 * We look for one element with the page id to verify that we can show this view.
 * Normaly the html because this is the only element loaded at initiaization time.
 */
'use strict';

console.log("Loading file:abstract-view.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
// const Errors = require('../../lib/error');

const SINGLETON=class AbstractView {
	
    constructor(id){
        this.id=id;
        
        this.el=null;
        this.parent=null;
    }
    
    // returns a promise
    // TODO Remove this ?
    display(){
        Log.error("abstract-view: display no defined for:"+this.id);
        return $q.resolve();
    }

    // This initialize the events on document ready
    // This is parrallel to the display function
    // TODO Remove this ?
    asyncInitEvents(){
        Log.error("abstract-view: asyncInitEvents no defined for:"+this.id);
        return $q.resolve();
    }

    // This is call when the view shoul be rendered
    renderView(){
        Log.error("abstract-view: renderView no defined for:"+this.id);
        return $q.resolve();
    }

    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    documentReady(){		
        if (this.el === null) {
            // The init function says that not to be initialized
            return $q.resolve();
        } else {
            Log.info("abstract-view: DocumentReady:"+this.id);

            return $q(this.renderView()).catch( (err) => {
                Log.error("Error on documentReady, fileabstract-view.",err);
                return $q.reject(err);
            });
        }
    }

    initialize(){
        Log.info("Initialize function not implemented in:"+this.id);
        return $q.resolve();
    }

    init(parent){
        this.parent=parent;

		// Options:
		// - Use the html data to detect the current page
		// - Use the user
		// - Look for one id in the page. We add to the html
        // tag the id with the page ex: <html id="my-view">
        // We Implement this ->
		
        // Check if the element is in the page
        this.el=document.getElementById(this.id);

        if (this.el!=null){

            Log.info("Initializing view:"+this.id);
            return $q(this.initialize())
                .catch( (err) => {
                    Log.error("Error on init, fileabstract-view.",err);
                    return $q.reject(err);
                });
        } else {
            this.el=null;
            return $q.resolve();
        }
    }
};


module.exports = SINGLETON;
