/**
 * This is a helper function to create an HTML drop zone
 * to import files.
 */
'use strict';

console.log("Loading file:drop-zone.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Obj = require('../../lib/obj');

const El = require('../../lib/element');

const LINE_VALUES_REGEXP = /(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\";]+)/g;


const SINGLETON= class DropZone {

    static createFromElId(dropZoneId){
        if (!dropZoneId){
            alert("Not element Id specified");
            return null;
        } else {
            const el=document.getElementById(dropZoneId);

            if (el){
                return new DropZone(el);
            } else {
                alert("Not element Id found:"+dropZoneId);
                return null;
            }            
        }
    }

    constructor(el){
        if (!el){
            alert("Drop zone element not found");
            
            return;
        } else {
            this.dropZone=el;
        }
    }

    highlight(event,dropZone){
        El.eventStop(event);

        dropZone.classList.add('highlight');
    }

    unhighlight(event,dropZone) {
        El.eventStop(event);

        dropZone.classList.remove('highlight');
    }
    

    handleFiles(files) {
        //
        // https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        //
        // Keep in mind that files is not an array, but a FileList. So, when we
        // implement handleFiles, we’ll need to convert it to an array in order
        // to iterate over it more easily:
        //
        // function handleFiles(files) {
        //     ([...files]).forEach(uploadFile)
        // }
        //
        
        if (! files || !files[0]){
            alert("No files");
            return ;
        } else {
            ([...files]).forEach((f) => {
                this.uploadFile(f);
            });            
        }
    }

    uploadFile(file) {        
        alert("Upload file not Implemented");
    }

    initEvents(){
        if (!this.dropZone){
            alert("Drop zone element not found");
            
            return;
        } 

        this.dropZone.addEventListener('dragenter', (event) =>{
            this.highlight(event,this.dropZone);
        });
        
        this.dropZone.addEventListener('dragleave', (event) =>{
            this.unhighlight(event,this.dropZone);
        });
        
        this.dropZone.addEventListener('dragstart', (event) =>{
            this.highlight(event,this.dropZone);
        });
        
        this.dropZone.addEventListener('dragend', (event) =>{
            this.unhighlight(event,this.dropZone);
        });
        
        this.dropZone.addEventListener('dragover', (event) =>{
            this.highlight(event,this.dropZone);
            event.dataTransfer.dropEffect = 'move'; // Explicitly show this is a copy.
        });
        
        this.dropZone.addEventListener('drop', (event) =>{
            El.eventStop(event);
            
            this.unhighlight(event,this.dropZone);
            
            const dt=event.dataTransfer;
            const files = dt.files; // FileList object.
            this.handleFiles(files);                
        });
            
    }

};

// module.exports = new SINGLETON();
module.exports = SINGLETON;
