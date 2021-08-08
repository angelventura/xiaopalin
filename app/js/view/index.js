/**
 * This is the console entry point
 */
'use strict';

console.log("Loading file:index.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');

// const log = require('../lib/log');
const Display = require('../lib/display');

const Data = require('../services/data');


const AbstractRefreshTab = require('../lib/view/abstract-refresh-tab');

let SINGLETON = new AbstractRefreshTab("index");

const id="index";
const template = "<div class=\"row form ui\"><h2> >word-card this</h2></div> {{#each this}} {{>word-card this}} {{/each}}<div class=\"row form ui\"><h2> word-card this</h2></div> {{#each this}} {{{word-card this}}} {{/each}} {{>json-closeable}}";

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
