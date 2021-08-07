/**
 * This library transform object using a matrix of function or contants
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

var log = require('../lib/log');
var Error = require('../lib/error');

var SINGLETON={};

SINGLETON.toInt=function(value){
	if (value === null) {
		return undefined;
	} else if (typeof value === 'string' ) {

		if (!isNaN(value)){
			return parseInt(value);
		}

	} else {
		if (!isNaN(value)){
			return value;
		}

	}

	log.error("toInt, value not transformed, value to transform:"+value);

};

SINGLETON.delete=function(){
};

SINGLETON.toBoolean=function(value){
	if (value === null) {
		return undefined;
	} else if (typeof value === 'boolean' ) {
		return value;
	} else if (typeof value === 'string' ) {
		if (value.toLowerCase() === 'true') {
			return true;
		} else if (value.toLowerCase() === 'false') {
			return false;
		}
	}

	log.error("toBoolean, value not transformed, value to transform:"+value);
};

SINGLETON.transform=function(T,obj){
	if (!obj){
		return obj;
	} else if (typeof obj === 'object' ) {
		for(var propt in T){
			var value=T[propt];
			
			if ($.isFunction(value)){
				
				if (value === SINGLETON.delete){
					delete obj[propt];
				} else {
					var valueToTransform=obj[propt];
					
					var newValue=value(valueToTransform);
					
					obj[propt]=newValue;
				}
			}
			
		}
	}

	return obj;
};


module.exports=SINGLETON;
