/**
 * This is in charge of the table headers.
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
var $q = require('q');

var log = require('../../lib/log');
var Error = require('../../lib/error');

// DEPRECATED
const SINGLETON= class AbstractRefreshPanel {
    constructor(id){
        this.id=id;
        
        this.$el=null;
        this.$refreshButton=null;
    }
    
    setLoading(status){
        if (!this.$refreshButton){
            return ;
        } else {        
            if (status){
                this.$refreshButton.addClass("loading");
            } else {
                this.$refreshButton.removeClass("loading");
            }
        }
    }

    displayEl($el){
        log.debug("displayEl function not implementef, element:"+$el);        
    }

    display(){
        this.setLoading(true);

        $.each(this.$el, $current =>{
            this.displayEl($current);
        });
        
        this.setLoading(false);        
    }
        
    initEvents(){
        if (!this.$refreshButton){
            return ;
        } else {        

            // call back
            var that=this;
            this.$refreshButton.on('click', function(event) {
                that.display();
            });
        }
    }
        
    /**
     * This is a call after the jquery document ready event.
     * This can be used to bind events etc ...
     */
    documentReady(){
        this.$el=$(`#${this.id}-content`);
                
        if (this.$el.length > 0) {
            this.$refreshButton=$(`#${this.id}-refresh-button`);
            // set the menu
            $("#menu-item-"+this.id).addClass("active");
            // display the table
            this.display(this.$el);
            
            // call back
            this.initEvents();
        } else {
            $("#menu-item-"+this.id).removeClass("active");
        }        
    }

};


module.exports = SINGLETON;
