/**
 * This uses big-data-access to get the data
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const SINGLETON=class Data  {
    constructor(){        
    }    

    getWordList(name=null){
        return this.getWords();
    }

    getWords(){
        return require('../data/words');
    }
}


module.exports = new SINGLETON();
