/**
 * This is a child of the AbstractRefreshTab that 
 * get the information from a rest service and use a template to display it !
 */
'use strict';

console.log("Loading file:abstract-refresh-display-element.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');

const Closeable = require('../../lib/partial/closeable-partial');

const AbstractRefreshDisplayTab = require('../../lib/view/abstract-refresh-display-tab');

const SINGLETON= class AbstractRefreshDisplayTab extends AbstractRefreshDisplayTab{
    
    constructor(id,template){
		super(id,template);
    }
    
	display($el){
        return super.display($el).then(()=>{
            $('.auto-popup')
                .popup({
                    position   : 'right center',
                    lastResort:true,
                    setFluidWidth:true
                })
            ;
            
            Closeable.update($el);

            return null;
        });
    }
};


module.exports = SINGLETON;
