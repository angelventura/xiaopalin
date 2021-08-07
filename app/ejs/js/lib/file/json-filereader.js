/**
 * This is create a promise to read loacal json files
 * https://developer.mozilla.org/es/docs/Web/API/FileReader
 *
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

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
