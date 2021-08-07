/**
 * Som utils to handle doom elements
 */
'use strict';

console.log("Loading file:element.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const Log = require('../lib/log');
const Obj = require('../lib/obj');
const Errors = require('../lib/error');

const Display = require('../lib/display');

const SINGLETON={};

SINGLETON.assert=function(selector,file,widgetId){
    const $ret=$(selector);

    if ($ret.length === 0){
        const msg="File: "+file+", WidgetId: "+widgetId+", selector not found: "+selector;

        Log.error(msg);
        alert(msg);

        const err=Errors.createApplicationError(msg);

        throw err;
        // return null;
    } else {
        return $ret;
    }
};

SINGLETON.display=function($el,templateId,data,defaultValue=null){
    if (templateId && $el) {

        try {
            const content=Display.render(templateId,data);

            $el.html(content);
        }catch(err){
            Log.error("While display template Id:"+templateId+", data:"+Obj.stringify(data),err);

            $el.html(defaultValue);

        }

    }
};

SINGLETON.get=function(selector,defaultValue){
    const $ret=$(selector);

    if ($ret.length === 0){
        return defaultValue;
    } else {
        return $ret;
    }
};

SINGLETON.isEmpty=function($el){
    return ! SINGLETON.isNotEmpty($el);
};

SINGLETON.isNotEmpty=function($el){
    if ($el && $el.length >0 ){
        return true;
    } else {
        return false;
    }
};

/**
 * Event Helpers
 */    
SINGLETON.getEventEl=function(event,defaultvalue){
    /* https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
     *
     * event.target is the node from which the event originated, 
     * ie. wherever you place your event listener (on paragraph 
     * or span), event.target refers to node (where user clicked).
     * event.currentTarget, on the opposite, refers to the node 
     * on which current-event listener was attached
     */
    
    if (event){
        const $el=$(event.currentTarget);

        if ($el.length !== 0){
            return $el;
        }
    }

    return defaultvalue;
};


/**
 * Event Helpers
 */    
SINGLETON.getDataId=function(event,defaultvalue){
    /* https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
     *
     * event.target is the node from which the event originated, 
     * ie. wherever you place your event listener (on paragraph 
     * or span), event.target refers to node (where user clicked).
     * event.currentTarget, on the opposite, refers to the node 
     * on which current-event listener was attached
     */
    
    if (event){
        const $el=$(event.currentTarget);
        const id=$el.data("id");

        if (id){
            return id;
        }        
    }

    return defaultvalue;
};


/**
 * Event Helpers
 */    
SINGLETON.getEventData=function(event,name,defaultvalue){
    if (event && name ){
        const $el=$(event.currentTarget);
        const value=$el.data(name);

        if (value){
            return value;
        }        
    }

    return defaultvalue;
};


/**
 * Event delegation subscription
 */    
SINGLETON.clickEvent=function(selector,f){
    return SINGLETON.subscriveEvent(selector,'click',f);
};

SINGLETON.subscriveEvent=function(selector,eventType,f){
    $(document).on(eventType,selector, (event) => {
        f(event);
    });        
};

SINGLETON.eventStop=function(event){
    if (event){
        event.preventDefault();
        event.stopPropagation();
    }
};



// The user hits enter for validation the form or something
SINGLETON.subscriveEnterHit=function(selector,f){
    $(document).on('keydown',selector, (event) => {
        if (event.keyCode === 13) {
            f(event);
        }        
    });
};

// The user hits Escape to cancel the current operation
SINGLETON.subscriveEscapeHit=function(selector,f){
    $(document).on('keydown',selector, (event) => {
        if (event.keyCode === 27) {
            f(event);
        }        
    });
};

module.exports=SINGLETON;

