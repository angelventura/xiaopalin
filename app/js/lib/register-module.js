/**
 * Use to register some modules that implements a set of functions, called "interface".
 *
 * The object INTERFACE will have as attributes names the names of the functions that
 * we want ot call throug this module.
 *
 * Registering one object, means that we will look for all the methods names declared by the 
 * interface. If the methods are found in the module, the module will be appended to the
 * array of the method name.
 *
 * Also the interface will contains a hash table of all the modules added to the interface
 * ussing as key the name passed to the register module.
 *
 */
'use strict';

console.log("Loading file:register-module.js.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
var $q = require('q');

var log = require('../lib/log');
var Error = require('../lib/error');

var SINGLETON={};

function getModule(INTERFACE,moduleName){
	return INTERFACE.__modules[moduleName];
}

function callModuleFunction(module,functionName,args){
    try {
        const functionMethod=module[functionName];
        
        if (!functionMethod){
            // Not all the methods are mandatories
            return $q.resolve();            
        } else {
            const promise=functionMethod.call(module,args);
            
            if (!promise){
                // function that retunrs nothing
                return $q.resolve();            
            } else {
                // just add a trace to avoiding been blind when something wrong happends
                return promise.catch((err)=>{
                    log.error("While calling module: "+SINGLETON.getModuleName(module),err);
                    return $q.reject(err);
                });
            }
        }
    }catch(err){
        log.error("While calling module: "+SINGLETON.getModuleName(module)+", function:"+functionName,err);
        return $q.reject(err);
    }
}

function setModule(INTERFACE,moduleName,module){
	return INTERFACE.__modules[moduleName]=module;
}

SINGLETON.getModule=function(INTERFACE,name){
	if (name){
		return getModule(INTERFACE,name);
	} else {
		return null;
	}
};


SINGLETON.setModuleName=function(module,name){
	module.___name=name;
};

SINGLETON.getModuleName=function(module){
	if (module.___name){
		return module.___name;
	} else {
		return "UnknownModuleName";
	}
};

/**
 * The INTERFACE is an object that will contain as attributes the name of the 
 * functions implemented. This attribute is an array containing all the modules
 * registerd that contains this function.
 *
 * Also we add to the interface an attribute to store the modules. This attribute 
 * is named ussing the name passed to the register function. This is a hastable of 
 * the modules.
 *
 * TODO: We will add an attribute _name to store the name of the module for loging purposes.
 *
 * Ex: var INTERFACE={init:[],render:[],exit:[]};
 */
SINGLETON.registerModule=function(INTERFACE,name,module){
	if (!module || !name ){
		log.error("ATTENTION Passing undefined module:"+name);
	} else {

		if (!INTERFACE.__modules){
			INTERFACE.__modules={}; // BUG FIXED
		}
		
		// if (INTERFACE[name]){
		if (getModule(INTERFACE,name)){
			log.warn("The module "+name+" already registered.");
			return ;
		} else {
			// INTERFACE[name]=module;
			setModule(INTERFACE,name,module);
			SINGLETON.setModuleName(module,name);
		}
		
		var prop;
		for (prop in INTERFACE){
			if (prop ==="__modules") {
				continue ;
			} else if ($.isFunction(module[prop])) {
				log.info("Initializing module:"+name+" function:"+prop);
				INTERFACE[prop].push(module);				
			} else {
				log.info("Module:"+name+" do not have function:"+prop);
			}
			
		}
	}

	return INTERFACE;
};

/**
 * This call for a moduleName registered the functionName passed using the args 
 * passed.
 * This return the return of the function call or null if the module does not exists
 * or the function is not implemented by the module.
 */
SINGLETON.callModule=function(INTERFACE,moduleName,functionName,args){
	var module=SINGLETON.getModule(INTERFACE,moduleName);

	if (module){
		if ($.isFunction(module[functionName])) {
			// log.debug("Executing "+functionName+", on module:"+SINGLETON.getModuleName(module) );

            return callModuleFunction(module,functionName,args);
			// return module[functionName].call(module,args).catch((err)=>{
            //     log.error("While calling module: "+SINGLETON.getModuleName(module));
            //     return $q.reject(err);
            // });
		} else {
			return null;
		}
	} else {
		return null;
	}
};

/**
 * For a functionName declared in the interface this call all the modules function
 * in parralell passing the args.
 * This will return an array of promissed.
 */
SINGLETON.call=function(INTERFACE,functionName,args){
	var PROMISES=[];

	var array=INTERFACE[functionName];

	
	$.each(array,function(index,module){		
		// log.debug("++ index:"+index+" f:"+functionName);
		log.debug("++ index:"+index+" executing "+functionName+", on module:"+SINGLETON.getModuleName(module) );

		try {

            const promise=callModuleFunction(module,functionName,args);
            // const promise=module[functionName].call(module,args).catch((err)=>{
            //     log.error("While calling module: "+SINGLETON.getModuleName(module));
            //     return $q.reject(err);
            // });
			PROMISES.push(promise);
		}catch(err){
			log.error("While calling module:"+SINGLETON.getModuleName(module)+", function:"+functionName,err);
		}
		// PROMISES.push(module[functionName].call(module,args));		
	});

	return $q.all(PROMISES);
};

/**
 * This call the function one after the other.
 * If stopOnFail is true the call secuence will return after the first fail
 * and the function will return imediatly anfter the firt fail.
 */ 
SINGLETON.callSequentially=function(INTERFACE,functionName,stopOnFails,args){

	var index=0;
	var moduleArray=INTERFACE[functionName];
	// This creates an sized empty array
	var functionsReturn=[moduleArray.length];


	// @see https://github.com/kriskowal/q#sequences
	var ret=$q(null);
	

	// calling for all the functions
	$.each(moduleArray,function (index,module) {
		ret=ret.then(function(){
			
			log.info("Sequential index:"+index+
					 ", Executing "+functionName+
					 ", on module:"+SINGLETON.getModuleName(module) );

			// use fcall to catch exctions 
			return $q.fcall(function(){
                return callModuleFunction(module,functionName,args);
				// return module[functionName].call(module,args).catch((err)=>{
                //     log.error("While calling module: "+SINGLETON.getModuleName(module));
                //     return $q.reject(err);
                // });
			});
			
		}).then(function(result){
			functionsReturn[index]=result;
			
			return functionsReturn;
		}).catch(function(err){
			log.error("ERROR at the sequential index:"+index+" Executing "+functionName+", on module:"+SINGLETON.getModuleName(module)+", err:",err );
			
			functionsReturn[index]=err;
			
			return functionsReturn;

		});
	});


	return ret;	
};


module.exports=SINGLETON;
