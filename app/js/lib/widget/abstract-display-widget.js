/**
 * Widget that use a template to display the GUI
 */
'use strict';

console.log("Loading file:abstract-display-widget.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Errors = require('../../lib/error');

const Display = require('../../lib/display');

const AbstractWidget = require('../../lib/widget/abstract-widget');

const SINGLETON=class AbstractDisplayWidget extends AbstractWidget {
	
    constructor(id,template){
        super(id);
        
        this.template=template;
        this.$el=null;
    }

    getData(){
        Log.debug("abstract-display-widget: getData not implemented:"+this.id);
        return $q.resolve({});
    }

    render(){
        if (this.$el){
            return $q(this.getData()).then( (data) => {
                // const _html=this.$el.html();                
                // if (_html !== '') {
                //     debugger;
                //     alert(_html);
                // }                
                const content=Display.render(this.id,data);
                this.$el.html(content);
                
                return $q.resolve();                
            }).catch( (err) => {
                return Errors.reject("abstract-display-widget: render()",err);
            });                        
        } else {
            return $q.resolve();            
        }
    }

    // This display the widget and returns a promise
    display($el){
        
        if ($el && $el.length >0){
            this.$el=$el;
        }
        
        return this.render();
    }

    // This can be called before the document ready
    // To initialize the widget.
    // Returns a promisse
    init(){
        return $q(super.init()).then(()=>{
            return Display.compile(this.id,this.template);
        }).catch( (err) => {
            return Errors.reject("abstract-display-widget: init()",err);
        });
    }
};


module.exports = SINGLETON;
