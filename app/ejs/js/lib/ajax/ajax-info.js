/**
 * This gets information aboutt the curent ajax calls
 */
'use strict';
<% var currentName="ajax"; %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>
	
var $ = require('jquery');
const $q = require('q');
const numeral = require('numeral');

const log = require('../../lib/log');

const SINGLETON={};

const context=[];

function getTime(initialTime){
    // var now = performance.now();
    const now=Date.now();
    return numeral(now-initialTime).format();
}

SINGLETON.createInfo=function(method,url,headers,data,start){
    const info={method:method,
                url:url,
                headers:headers,
                data:data,
                start:start,
                flying:true};

    context.push(info);

    return info;
};

SINGLETON.ok=function(info,serverData){
    info.ok=true;
    info.flying=false;
    
    info.serverData=serverData;
    info.time=getTime(info.start);

    log.debug("Ajax OK: ["+info.method+"]'"+info.url+"', time:"+info.time+", data:"+log.obj(info.data)+", response:"+log.obj(info.serverData));
};

SINGLETON.fails=function(info,xhr){
    info.ok=false;
    info.flying=false;

    info.serverData=null;
    info.time=getTime(info.start);
    
    info.statusText=xhr.statusText;
    info.status=xhr.status;
    info.readyState=xhr.readyState;
    info.responseText=xhr.responseText;
    
    log.error("Ajax OK: ["+info.method+"]'"+info.url+"', status:"+info.statusText+"["+info.status+"], state:"+ info.readyState+", responseText:"+info.responseText+", data:"+log.obj(info.data));

};

module.exports=SINGLETON;
