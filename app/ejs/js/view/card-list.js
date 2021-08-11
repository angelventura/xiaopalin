/**
 * This is the console entry point
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

// const log = require('../lib/log');
const Display = require('../lib/display');

const Data = require('../services/data');

const id="<%- currentName -%>";
const template = "<%- render.partial("./js/view/"+currentName+"-template.ejs") -%>";


const AbstractRefreshTab = require('../lib/view/abstract-refresh-tab');
const SINGLETON= class CardList extends AbstractRefreshTab{

    constructor(){
		super("<%- currentName -%>");
    }


    initialize(){
        return Display.compile(id,template);
    }


    display(){
        
        this.setLoading(true);
        var $el=this.$el;
        
        const data=Data.getWords();
        
        var content=Display.render(id,data);
        
        $el.html(content);
        
        this.setLoading(false);
    }
};

module.exports = new SINGLETON();
