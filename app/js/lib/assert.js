/**
 * This handle Promisses and errors
 */

console.log("Loading file:assert.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const Log = require('../lib/log');

class Assert  {

    notEmpty(value,message){
        if (value){
            return value;
        } else {
            const msg="Not Empty assert fails: "+message+".";
            const err=new Error(msg);
            
            const msg_trace=msg+"\n"+err.stack.toString();
            
            Log.error(msg_trace);
            alert(msg_trace);
                        
            return null;
        }
    }
    
}

module.exports = new Assert();
