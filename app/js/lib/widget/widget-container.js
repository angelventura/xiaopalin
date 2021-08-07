/**
 * This gives hierarchy to the widgets adding the notion of parent and childs
 */
'use strict';

console.log("Loading file:widget-container.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Obj = require('../../lib/Obj');

const AbstractWidget = require('../../lib/abstract-widget');
const SINGLETON=class AbstractWidgetContainer extends AbstractWidget{
	
    constructor(id){
        this.parent=null;
        this.childs=[];
    }

    setParent(parent){
        this.parent=parent;
    }
    
    addChild(child){
        if(child){
            this.childs.push(child);
        }
    }

    toBeRefreshed(){
        if (this.parent){
            this.parent.toBeRefreshed();
        } else {
            this.refresh();
        }
    }

    _callChilds(functionName,args){
        if (this.childs.length === 0){
            return $q.resolve();            
        } else {
            const PROMISES=[];

            $.each(this.childs,(index,module)=>{
                const p=Obj.callPromiseFunction(module,functionName,args,module.id);
                PROMISES.push(p);
            });
            
            return $q.all(PROMISES);
        }

    }

    refresh(){
        return this._callChilds("refresh",{});
    }

    
    // This display the widget and returns a promise
    display($el){
        return this._callChilds("display",{$el:$el});
    }

    // This van be called before the doscument ready
    // To initialize the widget.
    // Returns a promisse
    init(){
        return this._callChilds("init",{});
    }


};


module.exports = SINGLETON;
