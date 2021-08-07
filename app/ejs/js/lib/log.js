/**
 * This is the comon globl log interface.
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const Obj = require('../lib/obj');

const SINGLETON={};


function getText(levelText,text,err){
	if (typeof err === 'undefined') {
		return (levelText+": "+text);		
	} else if (typeof err === 'string') {
		return (levelText+": "+text+", Exception: "+err);
	} else if (err && err.message ) {
		return (levelText+": "+text+", Exception: "+err.message);
	} else {
		return (levelText+": "+text+", Exception Obj: "+Obj.stringify(err));
	}
}

SINGLETON.obj=function(obj){
    if (obj && obj["toString"]){
        const ret=obj.toString();
        if ( ret && ret !== "[object Object]"){
            return ret;
        }
    }
    
	// const ret=JSON.stringify(obj,null,4);
	const ret=Obj.stringify(obj);
    
    if (ret === "{}"){
        const string=""+obj;

        if (string === "[object Object]"){
            return ret;
        } else {
            return ""+obj;
        }
    } else {
        return ret;
    }
};

SINGLETON.debug=function(text,err){
<%	if (DEBUG){ %>
				if (window.console) {
					console.debug(getText("Debug",text,err));
				}
<%	} %>
};

SINGLETON.info=function(text,err){
<%	if (DEBUG){ %>
				if (window.console) {
					console.info(getText("Info",text,err));
				}
<%	} %>
};

function _printException(tab,err){
	if (window.console && err) {
        let doStringify=true;

		if (err.message && err.stack) {            
			console.error(tab+"+ "+err.stack);
        } else {        
		    if (err.message) {            
			    console.error(tab+"+ "+err.message);
            }
        
		    if (err.stack){
                doStringify=false;
			    console.error(tab+"+ "+err.stack);
		    }

            if (doStringify){
		        console.error(tab+"+ "+"Error Object:"+Obj.stringify(err));
            }
        }

		if (typeof err.parent !== "undefined") {
		    console.error(tab+"+ "+"-- Parent Exception -->:");

            _printException(tab+"+",err.parent);
        }        
    }
}

function printError(level,text,err){
	var msg=getText(level,text,err);

	if (window.console) {
		
		console.error(msg);
		
		if (err){

            _printException("",err);

			// if (err.message) {
			// 	console.error("Exception cause:"+err.message);
				
			// 	if (err.stack){
			// 		console.error("Exception Stack:"+err.stack);
			// 	}
				
			// 	if (typeof err.parent !== "undefined") {
			// 		printError(level,"Origin Exception:",err.parent);
			// 	}

			// } else {
			// 	// console.error("-- Cause -->:"+JSON.stringify(err,null,4));
			// 	console.error("-- Cause -->:"+Obj.stringify(err));
			// }
		}
		
	} else {
		alert(msg);
	}
}


    

SINGLETON.warn=function(text,err){
	if (window.console) {
		console.warn(getText("WARN",text,err));
	}
};


SINGLETON.error=function(text,err){
	printError("ERROR",text,err);
};

SINGLETON.fatal=function(text,err){
	printError("FATAL",text,err);
};

module.exports=SINGLETON;

