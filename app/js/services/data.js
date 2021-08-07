/**
 * This uses big-data-access to get the data
 */
'use strict';

console.log("Loading file:data.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

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
