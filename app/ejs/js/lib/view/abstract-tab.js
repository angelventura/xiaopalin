/**
 * Child of AbstractView.
 * This looks for one id in the page, the ${this.id}-content, if this cand be found
 * this should be rendered into the element. The this call the display function
 * Uses the "#menu-item-"+this.id to activate the menu
 * Call async the asyncInitEvents in parallel with the display function
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const El = require('../../lib/element');

var AbstractView = require('../../lib/view/abstract-view');

const SINGLETON=class AbstractTab extends AbstractView {
	
    constructor(id){
		super(id);
        this.$el=null;
    }
        
    // returns a promise
    display(){
        Log.debug("<%- currentName -%>: Display no implemented:"+this.id);
        return $q.resolve();
    }

    // This initialize the events on document ready
    // This is parrallel to the display function
    asyncInitEvents(){
        return $q.resolve();
    }

    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    renderView(){
        const name=`#${this.id}-content`;
        const $menu=$(`#menu-item-${this.id}`);
		this.$el=$(name);
        
		if (this.$el.length > 0) {
            Log.info("<%- currentName -%>: Rendering into element:"+name);

			// set the menu
			$menu.addClass("active");
			// display the table
			// return $q(this.display(this.$el));

            try {
                return $q.all([this.display(),
                               this.asyncInitEvents()
                              ]).catch( (err) => {
                                  Log.error("Error on renderView, file<%- currentName -%>.",err);
                                  return $q.reject(err);
                              });
            } catch(err){
                Log.error("Error on renderView, file<%- currentName -%>.",err);
                return $q.reject(err);
            }                
		} else {
            Log.error("<%- currentName -%>: Element to render not found:"+name);
			$menu.removeClass("active");
            return null;            
		}
    }


    /**
     * Event delegation subscription
     */    
    clickEvent(selector,f){
        // return this.subscriveEvent(selector,'click',f);
        return El.clickEvent(selector,f);
    }

    subscriveEvent(selector,eventType,f){
        return El.subscriveEvent(selector,eventType,f);

        // $(document).on(eventType,selector, (event) => {
        //     f(event);
        // });        
    }

    getEl(selector,defaultValule,errorMessage){
        alert("deprecated getEl use Element.get:"+this.id);
        const $el=$(selector);

        if ($el.length === 0 ){

            if (errorMessage){
                Log.error(errorMessage+' Selector: '+selector);
                alert(errorMessage+' Selector: '+selector);
            } 
            return defaultValule;
        } else {
            return $el;
        }

        // Consider ussing non jQuery
        // document.querySelector(".example");
    }
     

};


module.exports = SINGLETON;
