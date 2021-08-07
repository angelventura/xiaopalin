/**
 * Use this to dinamiclay load a javascript url
 */
'use strict';

console.log("Loading file:.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');

const SINGLETON={};

SINGLETON.loadjs=function(src,callback) {
	
    let script = document.createElement("script");
    script.type = "text/javascript";

	// https://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
			
            if (script.readyState === "loaded" ||
                script.readyState === "complete"){
                script.onreadystatechange = null;
				if (callback){
					callback();
				}
            }
        };
    } else {  //Others
        script.onload = function(){
			if (callback){
				callback();
			}
        };
    }
	

	script.src = src;

    // document.body.appendChild(script);
	document.getElementsByTagName("head")[0].appendChild(script);
};

SINGLETON.promise=function(src){
	var deferred = $q.defer();

	SINGLETON.loadjs(src,function(){

		deferred.resolve();
		
		// if (error) {
		// 	deferred.reject(new Error(error));
		// } else {
		// 	deferred.resolve(text);
		// }
	});

	return deferred.promise;
};


module.exports=SINGLETON;
