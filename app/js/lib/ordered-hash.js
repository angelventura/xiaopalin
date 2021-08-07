/**
 * This creates an ordered hash
 */
'use strict';

console.log("Loading file:ordered-hash.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

/**
 * https://stackoverflow.com/questions/2798893/ordered-hash-in-javascript
 *
 * Usage:
 * 
 * const OrderedHash=require('../lib/ordered-hash');
 * var myHash = OrderedHash();
 */
function SINGLETON() {
    var keys = [];
    var vals = {};
	
    return {
        push: function(k,v) {
            if (!vals[k]) {
				keys.push(k);
			}
			
            vals[k] = v;
        },
        insert: function(pos,k,v) {
            if (!vals[k]) {
                keys.splice(pos,0,k);
                vals[k] = v;
            }
        },
        val: function(k) {
			return vals[k];
		},
        length: function(){
			return keys.length;
		},
        keys: function(){
			return keys;
		},
        values: function(){
			return vals;
		}
    };
}

module.exports=SINGLETON;
