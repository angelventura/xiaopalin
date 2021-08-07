/**
 * Base to generate JSON files
 */
'use strict';

console.log("Loading file:abstract-json-generated-file.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');

const Log = require('../../lib/log');
const Errors = require('../../lib/error');

const Ajax = require('../../lib/ajax/ajax');

const SINGLETON= class AbstractJSONReport{
    
    constructor(id,name,description){
		this.id=id;
        this.name=name;
        this.description=description;
        
        this.encoding="data:application/json;charset=utf-8";

        this.fileName=this.id+".json";
    }


    generate(){
        try {
            return $q(this.content()).then( (content) =>{
                return this._download(content);
            }).catch( (err) =>{
                Log.error("Generating report report:"+this.id,err);
                return $q.reject(err);
            });
        }catch(err) {
            Log.error("Generating report report:"+this.id,err);                        
            return $q.reject(err);
        }
                                                
    }

    // This must return a promise
    setFileName(newFileName){
        
        if (newFileName){
            this.fileName=newFileName;
        }
    }

    _download(content){
        try {
            const encodedContent=encodeURIComponent(content);
            
            // const csvContent = this.encoding+','+content;            
            // const encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            const encodedUri=this.encoding+','+encodedContent;
            
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", this.fileName);
            document.body.appendChild(link); // Required for FF
            
            link.click();
            
            return $q.resolve();
        }catch(err) {
            Log.error("Dowloading content for report:"+this.id,err);            
            return $q.reject(err);
        }
    }

    // This must return a promise
    content(){
        alert("Content function not implemented for:"+this.id);
        return $q.resolve();
    }

};

module.exports = SINGLETON;
