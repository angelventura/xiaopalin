/**
 * Window objects based on a element
 */
'use strict';
<% var currentName="widget"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
var Q = require('q');

var log = require('../lib/log');
//var E = require('../lib/error');

var Display = require('../lib/display');

var SINGLETON=function(_opened){

	var that={
		id:null,
		template:null,
		opened:_opened,
		selector:null
	};
	
	/**
	 * This function is called to initialize the view. 
	 * It may be called when the doom is not still
	 * present. This function returns a promise.
	 */
	that.init=function(){
		if (that.id && that.template){
			return Display.compile(that.id,that.template);
		} else {
			return null;
		}
	};

	/**
	 * This function should be called one after the document is ready.
	 * This function mat return a promise.
	 */
	that.documentReady=function(){
		return null;
	};

	that.close=function(){
		if (that.opened && that.selector){
			that.opened=false;
			that.selector.fadeOut();

			$(document).trigger("trlg:widget-visivility-changed",that,that.opened);
		}
	};

	that.open=function(){
		if (!that.opened && that.selector){
			that.opened=true;
			that.selector.fadeIn();
			
			$(document).trigger("trlg:widget-visivility-changed",that,that.opened);
		}
	};

	that.switch=function(){
		if (that.opened){
			that.close();		
		} else {
			that.open();
		}
		return that.opened;
	};

	that.isOpen=function(){
		return that.opened;
	};

	that.listenOnVisivilityChanged=function(f){
		if ($.isFunction(f)){
			$(document).on("trlg:widget-visivility-changed",f);
		}	
	};


	that.render=function(_element){
		var target=(_element)?_element:"#"+this.id;
		
		this.selector=$(target);

		if (this.selector.length<=0){
			// no selector
			log.info("No element found:"+target);
			return null;			
		} else if (!this.isOpen()) {
			log.info("The element is closed:"+this.id);
			return null;			
			
		} else {
			if ($.isFunction(this.childRender)) {
				this.open();

				return this.childRender(this.selector);
			} else if ($.isFunction(this.getData)) {
				this.open();

				var data=this.getData();
				var content=Display.render(SINGLETON.id,data);
				this.selector.html(content);
				return null;
			}

		}		
	};
	
	return that;
};

module.exports=SINGLETON;
