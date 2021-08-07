/**
 * This is create a promise to read loacal json files
 * https://developer.mozilla.org/es/docs/Web/API/FileReader
 *
 */
'use strict';

console.log("Loading file:json-filereader.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

// var $ = require('jquery');
// const $q = require('q');

// const Log = require('../../lib/log');
// const Obj = require('../../lib/obj');

const AbstractFileReader = require('../../lib/file/abstract-filereader');

const SINGLETON= class JSONFileReader extends AbstractFileReader {
    constructor(id){
        super(id);
    }

    parseRawText(text) {
        return JSON.parse(text);
    }        
};

// module.exports = new SINGLETON();
module.exports = SINGLETON;
