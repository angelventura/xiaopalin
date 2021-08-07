/**
 * THis is an abstract0view that also detects it's content and send bact to the parents
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
var $q = require('q');

var log = require('../../lib/log');
var Error = require('../../lib/error');

var AbstractView = require('../../lib/view/abstract-view');

// DEPRECATED ???
const SINGLETON=class AbstractViewContent extends AbstractView{
	
    constructor(id){
		super(id);
        this.$el=null;
    }
	

	// TODO
	
    displayEl($el){
        log.debug("displayEl function not implemented, element:"+this.id);        
    }

    display(){
        this.setLoading(true);

        $.each(this.$el, $current =>{
            this.displayEl($current);
        });

        this.setLoading(false);        
    }
        
        
    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    documentReady(){
        this.$el=$(`#${this.id}-content`);
                
        if (this.$el.length > 0) {
            // set the menu
            $("#menu-item-"+this.id).addClass("active");
            // display the table
            this.display(this.$el);            
        } else {
            $("#menu-item-"+this.id).removeClass("active");
        }        
    }

    initialize(){
        log.info("Initialize function not implemented in:"+this.id);
        return $q.resolve();
    }

};


module.exports = SINGLETON;
