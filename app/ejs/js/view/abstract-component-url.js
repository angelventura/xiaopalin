/**
 * This is component that may have several widgets inside.
 * The component will be updated on URL modification
 *
 *  Esta es l interface que los widget pueden definir:
 *    - init: This can be called before the doscument ready to initialize the widget. Returns a promisse
 *    - display: This display the widget and returns a promise
 *    - asyncInitEvents: This is called to set the events may be before that the elements will be there.
 *    - reload: When data have been changed or need to be reloaded or the URL has been changed
 */

'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');
var $ = require('jquery');

const Log = require('../lib/log');
const Errors = require('../lib/error');

const Obj = require('../lib/obj');
const Url = require('../lib/url');

const BrowserHistory = require('../lib/browser-history');

const Ajax = require('../lib/ajax/ajax');

const Noty = require('../lib/widget/noty');


const AbstractRefreshDisplayElement = require('../lib/view/abstract-refresh-display-element');
const SINGLETON= class AbstractComponentUrl extends AbstractRefreshDisplayElement{
    constructor(id,childs=null){
		super(id);

        this.childs=this.getChilds(childs);
    }


    // THis gets the currents list of childs this is called on
    // Initialization URL Changes, etc ....
    getChilds(currentValue){
        return currentValue;
    }


    addChild(child){
        if(child){
            this.childs.push(child);
        }
    }

    display($el){
        return super.display($el).then(()=>{
            return this._callChilds("display",$el);
        });
    }

    asyncInitEvents(){
        return this._callChilds("asyncInitEvents");
    }

    refresh(){
        this.reload();
    }

    reload(){
        return super.refresh().then(()=>{
            return this._callChilds("reload");
        });
    }

    initialize(){
        return super.initialize().then( () =>{
            return this._callChilds("init",this)
                .then(()=>{
                    
                    // Subscrive;
                    BrowserHistory.subscribeEvents(() => {

                        // the refresh the childs
                        return this.reload();
                    });

                    return $q.resolve();
                });
        });        
    }


    /**
     * This call all the childs
     */
    _callChilds(functionName,args){
        if (this.childs.length === 0){
            return $q.resolve();            
        } else {
            const PROMISES=[];

            $.each(this.childs,(index,module)=>{
                const moduleId=Obj.id(module,"NO_ID_DEFINED_MODULE");
                
                const p=Obj.callPromiseFunction(module,functionName,args,moduleId);
                PROMISES.push(p);
            });
            
            return $q.all(PROMISES);
        }
    }


};

module.exports = SINGLETON;
