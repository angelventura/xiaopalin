/**
 * This is a view with a refresh button based on ajax information and one
 * template to display it!
 */
'use strict';

console.log("Loading file:abstract-refresh-template-tab.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Display = require('../../lib/display');

const AbstractRefreshTab = require('../../lib/view/abstract-refresh-tab');

const SINGLETON= class AbstractRefreshTemplateTab extends AbstractRefreshTab{

    constructor(id,template){
		super(id);

		this.template=template;
        
        // preloaded data
        this.data=null;

        // marks when the initial data has been loaded
        this.initializationPromise=null;
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
            Log.error("abstract-refresh-template-tab: initializationPromise",err);
            return $q.reject(err);            
        });
        
        return $q.resolve();
    }

    // @deprecated use load data to allow compatibility with
    // abstract-refresh-display-tab.js
	getData(firstCall,$el){
		Log.debug("getAjaxInformation no implemented:"+this.id);
		return $q.resolve();
	}

    loadData(firstCall,$el){
        return this.getData(firstCall,this.$el);
    }

    displayData($el,data){
        var content=Display.render(this.id,data);
        
        this.$el.html(content);

        return $q.resolve();
    }

	refresh(firstCall,$el){
		this.setLoading(true);
        
		const data=this.loadData(firstCall,$el);
				
		$q(data).then( (data) => {
			
			// const content=Display.render(that.id,data);
			// $el.html(content);

            return this.displayData($el,data);
        }).catch( (err) => {
            Log.error("abstract-refresh-template-tab: ",err);
            return $q.reject(err);            
		}).finally( () =>{
			this.setLoading(false);
		});		
	}

    initEvents(){
		Log.debug("initEvents no implemented:"+this.id);        
    }

	display($el){
        return super.display($el).then(()=>{
            // this.displayData($el,this.data);
            // this.initEvents();
            
            // return $q.resolve();
            
            return $q(this.initializationPromise).then( () => {
                this.displayData($el,this.data);
                this.initEvents();
                
                return $q.resolve();
            }).catch( (err) => {
                Log.error("abstract-refresh-template-tab: displayData",err);
                return $q.reject(err);            
            });

        }).catch( (err) => {
            Log.error("abstract-refresh-template-tab: ",err);
            this.displayError($el,err);
            return $q.reject(err);            
        });
	}

};


module.exports = SINGLETON;
