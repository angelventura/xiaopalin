/**
 * Application modules hanlde those event. All the events returns promises.
 * init: The javascript is loaded, something can be doren before the doom is done.
 * documentReady: All the components has been initialided, the dom is ready but the components are not still redered.
 * render: Use to render the element if any. The apllication is initialized and document ready has been call for all the elements.
 */
'use strict';
<% var currentName="app-module"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var Q = require('q');

var log = require('../lib/log');

var SINGLETON=function(_id){
	var that={
		id:_id
	};

	/**
	 * The doom is not guarantied, return a promise
	 */
	that.init=function(){
		log.debug("Initializing the element:"+that.id);
		
		return null;
	};

	that.documentReady=function(){
		log.debug("documentReady:"+that.id);
		return null;
	};

	that.render=function(){
		log.debug("Rendering:"+that.id);
		
		return null;
	};

	return that;
};


module.exports=SINGLETON;
