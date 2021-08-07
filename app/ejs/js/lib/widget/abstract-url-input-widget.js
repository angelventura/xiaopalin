/**
 * This the implementation on an input type text.
 * The input may not be present on document ready
 * this is the reasin why we call the _el() method
 * each time we need it.
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');

const BrowserHistory = require('../../lib/browser-history');

const Parent = require('../../lib/widget/abstract-url-widget');

const SINGLETON=class InputUrl extends Parent {
	
    constructor(paramName,defaultValue,selector){
        super("<%- currentName -%>",paramName,defaultValue);

        this.$el=null;
        this.buttonSelector=null;
        
        if (selector){
            this.selector=selector;
        } else {
            this.selector="#"+paramName;
        }
    }

    _el(){
        // The $el may not exists because it is
        // build as a result of an ajax call then
        // We try to build this.$el each time it is used
        
        this.$el=$(this.selector);
        if (this.$el){

            if (this.$el.length === 0 ){
                this.$el=null;
                // alert("Element not found:"+this.selector);
            }
        }
        return this.$el;
    }

    setButtonSelector(selector){
        this.buttonSelector=selector;
    }
    

    setSelector(selector){
        this.selector=selector;
    }

    
    _updateWidget(newValue){
        if (this._el()){
            this.$el.val(newValue);
        }
    }

    initEl(){
        this._el();
        
        // Update the value
        this.urlModifiedListener();
        
        // init the events
        this.initEvents();
    }

    pushInputValueToUrl(){
        if (this._el()){
            const val=this.$el.val();
            this._pushNewValueToUrl(val);
        }
    }

    resetInputValue(){
        this.updateFromUrl();
    }

    updateFromUrl(){
        if (this._el()){
            const oldValue=this._getValueFromUrl();
            
            this.$el.val(oldValue);
        }
    }

    initEvents(){
        this.subscriveEvent(this.selector,'keyup', (e) => {
            if (e.keyCode === 13) {
                // enter
                this.pushInputValueToUrl();
                
                e.preventDefault();
                e.stopPropagation();
            } else if (e.keyCode === 27) {
                debugger;

                // escape
                this.resetInputValue();
                e.preventDefault();
                e.stopPropagation();
            }            
        });

        if (! this.buttonSelector){
            // If no button ot submit
            // on focus out we must do something
            
            this.subscriveEvent(this.selector,'focusout', (e) => {

                // this.pushInputValueToUrl();
                this.resetInputValue();
                
                e.preventDefault();
                e.stopPropagation();
            });
        }

        if (this.buttonSelector){
            this.clickEvent(this.buttonSelector,(e)=>{
                
                this.pushInputValueToUrl();
                
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    // This display the widget and returns a promise
    display($el){
        this.initEl();

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
