/**
 * This is the console entry point
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');

const El = require('../lib/element');

const AbstractPartial = require('../lib/partial/abstract-partial');

const SINGLETON=class PlaySound extends AbstractPartial {

    constructor(){
		super("<%- currentName -%>");

        this.cache={};
    }


    initialize(){
        El.clickEvent(".play",(e)=>{
            El.eventStop(e);

            const id=El.getDataId(e,null);

            this.play(id);
        });
    }


    play(id=null){
        if (id){
            
            let audio=this.cache[id];
            
            if (! audio){
                const path=`<%- meta.SOUND_PATH %>/data/${id}.mp3`;

                // alert("Path:"+path);

                audio = new Audio(path);
                this.cache[id]=audio;
            }
            audio.play();

            // alert("Sound:"+path);
        }
    }
};


module.exports = new SINGLETON();

