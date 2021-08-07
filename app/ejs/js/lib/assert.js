/**
 * This handle Promisses and errors
 */
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

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
