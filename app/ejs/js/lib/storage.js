/**
 * This uses the browser storage, If no defined it stores into a cookie.
 */
'use strict';
<% var currentName="storage"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const log = require('../lib/log');
// var Error = require('../lib/error');

const Cookies=require('js-cookie');

const SINGLETON={};

function sessionTest(){
	var mod = 'sesionTest';
	try {
		sessionStorage.setItem(mod, mod);
		sessionStorage.removeItem(mod);
		log.debug("sessionStorage is defined.");
		return true;
	} catch (e) {
		log.warn("sessionStorage is NOT DEFINED!!");
		return false;
	}		
}

function localTest(){
	var mod = 'localTest';
	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		log.debug("localStorage is defined.");
		return true;
	} catch (e) {
		log.warn("localStorage is NOT DEFINED!!");
		return false;
	}		
}

SINGLETON.parseJson=function(val,defaultValue){
    try {
        return JSON.parse(val);
    }catch(err){
        log.warn("JSON.parse:"+val+", return default value:"+defaultValue);
        return defaultValue;
    }
};


SINGLETON.cookie={};

SINGLETON.cookie.getStore=function(){
	var ret=Cookies.get('SESSION');
    if (ret==null) {
        return {};
    } else {
        // JSON.stringify(valor[, remplazo [, espacio]])
        // return JSON.parse(ret);
        return SINGLETON.parseJson(ret,{});
    }
};

SINGLETON.cookie.setStore=function(session){
	Cookies.set('SESSION',JSON.stringify(session));
};

SINGLETON.cookie.set=function(key,value){
    var session=SINGLETON.cookie.getStore();
    session[key]=value;
    SINGLETON.cookie.setStore(session);		
};

SINGLETON.cookie.get=function(key){
    var session=SINGLETON.cookie.getStore();
    return session[key];
};

SINGLETON.cookie.remove=function(key){
    var session=SINGLETON.cookie.getStore();
    delete session[key];
    SINGLETON.cookie.setStore(session);		
};


SINGLETON.session={};
SINGLETON.session.enabled=sessionTest();

SINGLETON.session.set=function(key,value){
    if (SINGLETON.session.enabled){
		try {
			sessionStorage.setItem(key,JSON.stringify(value));
		} catch (e) {
			log.warn("SessionStorage error:",e);
		}
    } else {
        log.info("Storage non supported ...");
		SINGLETON.cookie.set(key,value);
    }
};

SINGLETON.session.toggle=function(key,defaultValue){
    const value=SINGLETON.session.get(key,defaultValue);
    SINGLETON.session.set(key,!value);    
};

SINGLETON.session.get=function(key,defaultValue){		
	var ret;
    if (SINGLETON.session.enabled){
        ret=sessionStorage.getItem(key);
		if (ret==null){
            return defaultValue;
        } else {
            // return JSON.parse(ret);
            return SINGLETON.parseJson(ret,defaultValue);
        }			
    } else {
		ret=SINGLETON.cookie.get(key);

        log.info("Storage non supported ...");

		if (ret == null){
            return defaultValue;
        } else {
            return ret;
        }
    }
};

SINGLETON.session.remove=function(key){		
    if (SINGLETON.session.enabled){
        sessionStorage.removeItem(key);
    } else {
		SINGLETON.cookie.remove(key);
    }
};


SINGLETON.storage={};
SINGLETON.storage.cache={};

SINGLETON.storage.set=function(key,value){
	SINGLETON.storage.cache[key]=value;
};


SINGLETON.storage.get=function(key,defaultValue){		
	if (SINGLETON.storage.cache[key] !== undefined ){
		return SINGLETON.storage.cache[key];
	} else {
		var ret=SINGLETON.session.get(key,defaultValue);
		
		SINGLETON.storage.set(key,ret);

		return ret;
	}
	
};

/**
 * local storage
 */
SINGLETON.local={};
SINGLETON.local.enabled=localTest();

SINGLETON.local.set=function(key,value){
    if (SINGLETON.local.enabled){
		try {
			localStorage.setItem(key,JSON.stringify(value));
		} catch (e) {
			log.warn("LocalStorage error:",e);
		}
    } else {
        log.info("Storage non supported ...");
		SINGLETON.cookie.set(key,value);
    }
};

SINGLETON.local.toggle=function(key,defaultValue){
    const value=SINGLETON.local.get(key,defaultValue);
    SINGLETON.local.set(key,!value);    
};

SINGLETON.local.get=function(key,defaultValue){		
	var ret;
    if (SINGLETON.local.enabled){
        ret=localStorage.getItem(key);
		if (ret==null){
            return defaultValue;
        } else {
            // return JSON.parse(ret);
            return SINGLETON.parseJson(ret,defaultValue);
        }			
    } else {
		ret=SINGLETON.cookie.get(key);

        log.info("Storage non supported ...");

		if (ret == null){
            return defaultValue;
        } else {
            return ret;
        }
    }
};

SINGLETON.local.remove=function(key){		
    if (SINGLETON.local.enabled){
        localStorage.removeItem(key);
    } else {
		SINGLETON.cookie.remove(key);
    }
};

module.exports=SINGLETON;



