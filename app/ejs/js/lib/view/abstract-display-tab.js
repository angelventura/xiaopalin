/**
 * This is a page that render from a template some information.
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Display = require('../../lib/display');

const AbstractTab = require('../../lib/view/abstract-tab');

const SINGLETON= class AbstractDisplayTab extends AbstractTab{

    constructor(id,template){
		super(id);
        this.template=template;
    }

    initialize(){
       return $q.all([
           super.initialize(),
           Display.compile(this.id,this.template)
       ]);
    }
    
    loadData(){
		Log.debug("getDataPromisse not implemented:"+this.id);
        return $q.resolve();
    }


    initEvents(){
		Log.debug("initEvents no implemented:"+this.id);        
    }

    display($el){
        try {
            return $q(this.loadData()).then( (data) =>{
                var content=Display.render(this.id,data);
                
                this.$el.html(content);        
                
                this.initEvents();
                
                return $q.resolve();            
            }).catch( (err) =>{
                return $q.reject(err);            
            });
        }catch(err){
            return $q.reject(err);            
        }
	}

};


module.exports = SINGLETON;
