/**
 * This is a view with a refresh button
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
// const Errors = require('../../lib/error');

const AbstractTab = require('../../lib/view/abstract-tab');

const SINGLETON= class AbstractRefreshTab extends AbstractTab{

    constructor(id){
		super(id);
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

    // return is ignored
	refresh(firstCall,$el){
        Log.error("<%- currentName -%>: refresh no defined for:"+this.id);
	}

    // // This may be call after the display
    // initEvents(){
    //     log.debug("initEvents no implemented:"+this.id);        
    //     // return $q.resolve();
    //     return $q.resolve();
    // }

	display($el){
        Log.info("<%- currentName -%>: display ...");
        
        this.$refreshButton=$(`#${this.id}-refresh-button`);

        // call back
        // var that=this;
		this.$refreshButton.on('click', (event) => {
            this.refresh(false,this.$el);
        });
		
        return $q.resolve();
	}

};


module.exports = SINGLETON;
