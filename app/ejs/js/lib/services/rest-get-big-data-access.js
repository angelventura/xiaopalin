/**
 * A helper for big-data-access for REST-GET ajax calls
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const Ajax = require('../../lib/ajax/ajax');

const BigDataAccess = require('../../lib/services/big-data-access');

const SINGLETON=class RestGetBigDataAccess extends BigDataAccess {
    constructor(url,data){
        super(url);
        
        this.url=url;
        
        this.data=data;
    }   
    
    setData(data){
        this.data=data;
    }

    dataAccess(){        
        return Ajax.get(this.url,this.data);
    }
 

};


module.exports = SINGLETON;

