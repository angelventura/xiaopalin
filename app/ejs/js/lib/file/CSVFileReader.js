/**
 * This ise promissed to read local files.
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

const LINE_VALUES_REGEXP = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\";]+)/g;

const AbstractFileReader = require('../../lib/file/abstract-filereader');

const SINGLETON= class CSVFileReader extends AbstractFileReader {
    constructor(id){
        super(id);
    }

    parseRawText(text) {
        let matches;
        let currentLine=0;
        
        let ret=[];
        
        let lines = text.split(/(?:\r\n|\n)+/).filter((line) => {
            const values=[];
            
            while (matches = LINE_VALUES_REGEXP.exec(line)) {
                let value = matches[1] || matches[2];
                value = value.replace(/\"\"/g, "\"");
                
                values.push(value);
            }

            ret.push(values);
            currentLine++;
            
            return true;
        });
        
        return ret;
    }
};


// const SINGLETON= class CSVFileReader {
//     constructor(id){
//         this.id=id;
//         this.reader = new FileReader();
        
//         this.deferred=null;
//         this.file=null;
        
//         const that=this;
        
//         this.reader.onabort=function(event) {
//             Log.info(`On Abort: ${event.type}: ${event.loaded} bytes transferred`);
//         };        
//         this.reader.onerror=function(event) {
//             Log.info(`On Error: ${event.type}: ${event.loaded} bytes transferred`);
//         };
//         this.reader.onload=function(event) {
//             Log.info(`On Load: ${event.type}: ${event.loaded} bytes transferred`);
//         };
//         this.reader.onloadstart=function(event) {
//             Log.info(`On Load Start: ${event.type}: ${event.loaded} bytes transferred`);
//         };

//         this.reader.onloadend=function(event) {

//             Log.info(`On Load End: ${event.type}: ${event.loaded} bytes transferred`);

//             if (event.target.readyState === FileReader.DONE) { // DONE == 2

//                 Log.info("File readed:"+that.file.name);

//                 const array=that.parseRawText(event.target.result);
                
//                 that.deferred.resolve(array);
                
//             }
//         };
        
//         this.reader.onprogress=this.onprogress;
//     }

//     read(file) {
//         if (!file){
//             this.file=null;
//             return $q.resolve([]);
//         } else {
//             this.file=file;
//             this.deferred = $q.defer();
            
//             const dummy=this.reader.readAsText(file, "UTF-8");

//             // const value=this.reader.result;
//             // Log.info("File readed:"+file.name);
            
//             // if (value){
//             //     return $q.resolve(this.parseRawText(value));
//             // } else {
//             //     Log.info("The file:"+file.name+" is empty");
//             //     return $q.resolve([]);
//             // }

//             return this.deferred.promise;
//         }
//     }

//     parseRawText(text) {
//         let matches;
//         let currentLine=0;
        
//         let ret=[];
        
//         let lines = text.split(/(?:\r\n|\n)+/).filter((line) => {
//             const values=[];
            
//             while (matches = LINE_VALUES_REGEXP.exec(line)) {
//                 let value = matches[1] || matches[2];
//                 value = value.replace(/\"\"/g, "\"");
                
//                 values.push(value);
//             }

//             ret.push(values);
//             currentLine++;
            
//             return true;
//         });
        
//         return ret;
//     }
    
//     // parseRawText(text,listener) {
//     //     if (listener == null) {
//     //         Log.error("No listener...");
            
//     //         return ;
//     //     } else {        
//     //         const valuesRegExp = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\";]+)/g;
//     //         let matches;
//     //         let currentLine=0;
            
//     //         let lines = text.split(/(?:\r\n|\n)+/).filter((line) => {
//     //             const values=[];
                
//     //             while (matches = valuesRegExp.exec(line)) {
//     //                 let value = matches[1] || matches[2];
//     //                 value = value.replace(/\"\"/g, "\"");
                    
//     //                 values.push(value);
//     //             }

//     //             const ret=listener(values,currentLine,line);
//     //             currentLine++;
                
//     //             if (ret === false){
//     //                 return false;
//     //             } else {
//     //                 return true;
//     //             }
                
//     //             // return line.length !== 0;
//     //         });

//     //         return ;
//     //     }        
//     // }
    
//     /**
//      * Event Functions
//      */
//     onabort(event){
//         Log.info("Onabort");
//     }
//     onerror(event){
//         Log.info("Onerror");
//     }
//     onload(event){
//         Log.info("Onload");
//     }
//     onloadstart(event){
//         Log.info("Onloadstart");
//     }
//     onloadend(event){
//         Log.info("Onloadend");
//     }
//     onprogress(event){
//         Log.info("Onprogress");
//     }    
// };

// module.exports = new SINGLETON();
module.exports = SINGLETON;
