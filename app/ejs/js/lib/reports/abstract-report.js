/**
 * Mother class for all the report. TODO Move this to CSV Report
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');

const Log = require('../../lib/log');
const Errors = require('../../lib/error');

const SINGLETON= class AbstractReport{
    
    constructor(id,name,description){
		this.id=id;
        this.name=name;
        this.description=description;
        this.encoding="data:text/csv;charset=utf-8";
        this.fileName=this.id+".csv";

        this.newColumn=';';
        this.newLine='\r\n';
        this.nc=';';
        this.nl='\r\n';
    }

    addColumn(buff,value,defaultValue='N/A'){
        if (!buff){
            buff="";
        }
        if (!value){
            buff+=(defaultValue+this.newColumn);
        } else {
            buff+=(value+this.newColumn);
        }

        return buff;
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

    _download(content){
        try {
            const csvContent = this.encoding+','+content;
            
            const encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
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

    content(){
        Log.error("Content not impelemented for report:"+this.id);
        return "";
    }

};

module.exports = SINGLETON;
