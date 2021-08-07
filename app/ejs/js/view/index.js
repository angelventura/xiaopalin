/**
 * This is the console entry point
 */
'use strict';
<% var currentName = "index"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

// const log = require('../lib/log');
const Display = require('../lib/display');

const Data = require('../services/data');


const AbstractRefreshTab = require('../lib/view/abstract-refresh-tab');

let SINGLETON = new AbstractRefreshTab("<%- currentName -%>");

const id="<%- currentName -%>";
const template = "<%- render.partial("./js/view/"+currentName+"-template.ejs") -%>";

SINGLETON.initialize=function(){
    return Display.compile(id,template);
};


SINGLETON.display=function(){

    this.setLoading(true);
    var $el=this.$el;
    
    const data=Data.getWords();
    
    var content=Display.render(id,data);
        
    $el.html(content);
        
    this.setLoading(false);
};

module.exports = SINGLETON;
