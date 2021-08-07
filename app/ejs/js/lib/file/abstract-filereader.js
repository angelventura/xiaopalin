/**
 * This is an abstract class to all reader of local file in different formats.
 
 * https://developer.mozilla.org/es/docs/Web/API/FileReader
 *
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Obj = require('../../lib/obj');


const SINGLETON= class AbstractFileReader {
    constructor(id){
        this.id=id;
        this.reader = new FileReader();
        
        this.deferred=null;
        this.file=null;
        
        const that=this;
        
        this.reader.onabort=function(event) {
            Log.info(`On Abort: ${event.type}: ${event.loaded} bytes transferred`);
        };        
        this.reader.onerror=function(event) {
            Log.info(`On Error: ${event.type}: ${event.loaded} bytes transferred`);
        };
        this.reader.onload=function(event) {
            Log.info(`On Load: ${event.type}: ${event.loaded} bytes transferred`);
        };
        this.reader.onloadstart=function(event) {
            Log.info(`On Load Start: ${event.type}: ${event.loaded} bytes transferred`);
        };

        this.reader.onloadend=function(event) {

            Log.info(`On Load End: ${event.type}: ${event.loaded} bytes transferred`);

            if (event.target.readyState === FileReader.DONE) { // DONE == 2

                Log.info("File readed:"+that.file.name);

                const array=that.parseRawText(event.target.result);
                
                that.deferred.resolve(array);
                
            }
        };
        
        this.reader.onprogress=this.onprogress;
    }

    read(file) {
        if (!file){
            this.file=null;
            return $q.resolve([]);
        } else {
            this.file=file;
            this.deferred = $q.defer();
            
            const dummy=this.reader.readAsText(file, "UTF-8");

            // const value=this.reader.result;
            // Log.info("File readed:"+file.name);
            
            // if (value){
            //     return $q.resolve(this.parseRawText(value));
            // } else {
            //     Log.info("The file:"+file.name+" is empty");
            //     return $q.resolve([]);
            // }

            return this.deferred.promise;
        }
    }

    parseRawText(text) {
        alert("File reader:"+this.id+" parseRawText not implemented");
        return null;
    }
        
    /**
     * Event Functions
     */
    onabort(event){
        Log.info("Onabort");
    }
    onerror(event){
        Log.info("Onerror");
    }
    onload(event){
        Log.info("Onload");
    }
    onloadstart(event){
        Log.info("Onloadstart");
    }
    onloadend(event){
        Log.info("Onloadend");
    }
    onprogress(event){
        Log.info("Onprogress");
    }    
};

// module.exports = new SINGLETON();
module.exports = SINGLETON;
