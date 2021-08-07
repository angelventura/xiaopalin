/**
 * This is a child of the AbstractRefreshTab that 
 * get the information from a rest service and use a template to display it !
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Obj = require('../../lib/obj');
const Display = require('../../lib/display');

import JSONFormatter from 'json-formatter-js';

const AbstractRefreshTab = require('../../lib/view/abstract-refresh-tab');

const SINGLETON= class AbstractRefreshDisplayTab extends AbstractRefreshTab{

    constructor(id,template){
		super(id);

        this.template=template;
        
        // preloaded data
        this.data=null;
        
        // marks when the initial data has been loaded
        this.initializationPromise=null;
        
        this.$elJson=null;        
    }

    initialize(){        
        this.initializationPromise=$q.all([
            // super.initialize(),
            Display.compile(this.id,this.template),
            this.loadData(true).then( (data) =>{
                this.data=data;
                return $q.resolve(data);
            })
        ]).catch( (err) => {
            Log.error("<%- currentName -%>: initializationPromise",err);
            return $q.reject(err);            
        });
        
        // Give more time
        // 
        return $q.resolve();
    }
    
    loadData(firstCall){
		Log.debug("<%- currentName -%>: getDataPromisse not implemented:"+this.id);
        return $q.resolve();
    }

    formatJson(data){
        if (this.$elJson == null){
            this.$elJson=$(`#${this.id}-json`);
        }

        if (this.$elJson.length > 0){

            if (data){
    	        const formatter = new JSONFormatter(data);
                const value=formatter.render();
                this.$elJson.html(value);
            } else {
                this.$elJson.html("No Data");
            }
            
        } else {
            // This is meay be normal we disable the
            // format in production
            Log.debug("<%- currentName -%>: formatJson: json panel not found "+`#${this.id}-json`);
        }
        
    }

    displayError($el,err){
        // this.$el.html(`<pre>${JSON.stringify(err,null,4)}</pre>`);        
        this.$el.html(`<pre>${Obj.stringify(err)}</pre>`);        
    }

    displayData($el,data){
        Log.info("<%- currentName -%>: displayData:",data);

        // the content first
        var content=Display.render(this.id,data);
        
        this.$el.html(content);
        
        // the the json
        this.formatJson(data);
        
        return $q.resolve();
    }
    
    asyncInitEvents(){
        Log.info("<%- currentName -%>: asyncInitEvents ...");

        // parent: just init te events
        return super.asyncInitEvents().then(()=>{

            // wait for the initialization promise:
            return $q(this.initializationPromise).then( () => {
                return $q.resolve();
            }).catch( (err) => {
                Log.error("<%- currentName -%>: initializationPromise",err);
                return $q.reject(err);            
            });

            
        }).catch( (err) => {
            // debugger;
            Log.error("<%- currentName -%>: ",err);
            return $q.reject(err);            
        });
    }

    display($el){
        Log.info("<%- currentName -%>: display ...");

        // parent: just init te events
        return super.display($el).then(()=>{

            // wait for the initialization promise:
            return $q(this.initializationPromise).then( () => {
                // then display 
                return this.displayData($el,this.data);
            }).catch( (err) => {
                Log.error("<%- currentName -%>: displayData",err);
                return $q.reject(err);            
            });

            
        }).catch( (err) => {
            // debugger;
            Log.error("<%- currentName -%>: ",err);
            this.displayError($el,err);
            return $q.reject(err);            
        });
    }

	refresh(firstCall,$el){
        // See abstract-refresh-template-tab.js
        this.setLoading(true);        

        const loadPromisse=this.loadData(firstCall);

        return $q(loadPromisse).then( (serverData) =>{
            this.data=serverData;
            return this.displayData($el,this.data);
            
        }).catch( (err) => {
            // debugger;

            Log.error("<%- currentName -%>: ",err);
            this.displayError($el,err);
            return $q.reject(err);            
        }).finally( () =>{
            this.setLoading(false);        
        });       
	}
};


module.exports = SINGLETON;
