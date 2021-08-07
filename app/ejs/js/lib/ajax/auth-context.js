/**
 * This gets the current server Url and the header to make the request
 */
<% var currentName="auth-context"; %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');
const log = require('../../lib/log');
const Errors = require('../../lib/error');

const Storages = require('../../lib/storage');

const SINGLETON=class AuthContext {
    
    constructor(){
    }
    
    getAjaxUrl(uri){
        return "/TO_BE_DONE"+uri;
    }

    isUserLogged(){
        return false;        
    }
    
    getHeaders(){
        return {};
    }

    handleError(info,xhr){
        throw Errors.createApplicationError("Url:'"+info.url+
										    "', Data:"+log.obj(info.data)+
										    ", Status:"+xhr.status+
										    ", Response:"+xhr.responseText
										    ,xhr);
    }
};

module.exports = SINGLETON;
