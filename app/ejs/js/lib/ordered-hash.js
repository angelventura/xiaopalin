/**
 * This creates an ordered hash
 */
'use strict';
<% var currentName="ordered-hash"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}) -%>

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
