/**
 * jQuery semantic UI JS
 */
'use strict';

console.log("Loading file:ajax.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */
	
var $ = require('jquery');
const $q = require('q');

const log = require('../../lib/log');

const AjaxInfo = require('../../lib/ajax/ajax-info');

let AuthContext = require('../../lib/ajax/auth-context');

const SINGLETON={};


/**
 * THIS OVERWRITE THE DEFAULT AUT CONTEXT
 */
SINGLETON.setAuthContext=function(authContext){
    AuthContext=authContext;
};

SINGLETON.getAjaxUrl=function(uri){
    return AuthContext.getAjaxUrl(uri);
};

SINGLETON.get=function(uri,data){
    const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    
    const start = performance.now();

    const call=AjaxInfo.createInfo("GET",url,headers,data,start);

	return $q($.ajax({
		url: url,
        // xhrFields: {
        //     withCredentials: true
        // },
		data: data,
		type: "GET",
        headers : headers,

//        crossDomain: true,
//        xhrFields: {
//            withCredentials: true
//        },

    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        if (xhr.status === 200){
            log.error("This error may be that the json is not well formated. JSON:"+xhr.responseText);
        }
        AjaxInfo.fails(call,xhr);
        
        return AuthContext.handleError(call,xhr);
	});
};


SINGLETON.getAU=function(url,data){
    const start = performance.now();

    const call=AjaxInfo.createInfo("GET",url,{},data,start);
    
	return $q($.ajax({
		url: url,
		data: data,
		type: "GET",
        //        headers : headers,
    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        AjaxInfo.fails(call,xhr);

        return AuthContext.handleError(call,xhr);
	});
};


SINGLETON.post=function(uri,data){
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    	
    const start = performance.now();
    const call=AjaxInfo.createInfo("POST",url,headers,data,start);

	return $q($.ajax({
		url: url,
		data: log.obj(data),
		contentType:'application/json',
		type: "POST",
        headers : headers
    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        AjaxInfo.fails(call,xhr);
            
        return AuthContext.handleError(call,xhr);
	});    	
};

SINGLETON.put=function(uri,data){	
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    
    var start = performance.now();

    const call=AjaxInfo.createInfo("PUT",url,headers,data,start);

	return $q($.ajax({
		url: url,
		data: log.obj(data),
		contentType:'application/json',
		type: "PUT",
        headers : headers
    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        AjaxInfo.fails(call,xhr);
        
        return AuthContext.handleError(call,xhr);
	});
};

SINGLETON.delete=function(uri,data){
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    
    const start = performance.now();

    const call=AjaxInfo.createInfo("DELETE",url,headers,data,start);
    
	return $q($.ajax({
		url: url,
		data: log.obj(data),
        contentType:'application/json',
		type: "DELETE",
        headers : headers,
    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        AjaxInfo.fails(call,xhr);
        
        return AuthContext.handleError(call,xhr);
	});	
};

SINGLETON.patch=function(uri,data){
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    
    const start = performance.now();

    const call=AjaxInfo.createInfo("PATCH",url,headers,data,start);
    
	return $q($.ajax({
		url: url,
		data: log.obj(data),
        contentType:'application/json',
		type: "PATCH",
        headers : headers,
    })).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr) {
        AjaxInfo.fails(call,xhr);
        
        return AuthContext.handleError(call,xhr);
	});	
};


SINGLETON.postForm=function(uri,data){
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    
    const start = performance.now();
    const call=AjaxInfo.createInfo("POST-FORM",url,headers,data,start);
    
	return $q($.ajax({
		url: url,
		data: data,
		contentType:'application/x-www-form-urlencoded',
		type: "POST",
        headers : headers
	})).then(function (response) {
        AjaxInfo.ok(call,response);
		return response;
    }, function (xhr, textStatus, errorThrown) {
        AjaxInfo.fails(call,xhr);
        
        return AuthContext.handleError(call,xhr);
	});
};

SINGLETON.getText=function(uri,data){
	const url=SINGLETON.getAjaxUrl(uri);
    const headers=AuthContext.getHeaders();
    	
    const start = performance.now();
    const call=AjaxInfo.createInfo("GET-TEXT",url,headers,data,start);

	return $q($.ajax({
        url: url,
        data: data,
        headers : headers,
        dataType: 'text/plain',
    })).then(function (response) {
        AjaxInfo.ok(call,response);
        return $q.resolve(response);
    }, function (xhr, textStatus, errorThrown) {
        if (xhr.status === 200){
            const response=xhr.responseText;
            AjaxInfo.ok(call,response);
            return $q.resolve(response);
        } else {
            AjaxInfo.fails(call,xhr);
            
            return AuthContext.handleError(call,xhr);
        }
    });
};

module.exports=SINGLETON;

