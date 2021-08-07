/**
 * Some times it takes a while to load data from the server taht probably din't change from last time.
 *
 * We will store the value on a local starge for the next time the applications starts uo not to have 
 * the need of dowloading from the server.
 *
 * Then on the background lets download a fresh copy and sotre in the session storage and the local storage.
 *
 * Add a this.content to support several calls in thesame page.
 *
 * May be a flag to refresh the data  each time ?
 */
'use strict';

console.log("Loading file:big-data-access.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');

const Errors = require('../../lib/error');
const Storages = require('../../lib/storage');

const SINGLETON=class BigDataAccess {
    
    constructor(id,backgroundUpdateFlag=true){
		this.id=id;

        // In case the contest is called several time on the same page.
        this.content=null;

        this.backgroundUpdateFlag=backgroundUpdateFlag;
    }

    getStorageName(){
        return "da-"+this.id;
    }

    /**
     * iin case something need to be done when reading from the lcoal storage
     */
    deSerialize(data){
        return data;
    }

    reload(){
        return this.update();
    }

    get(){
        // This in the local content
        if (this.content){


            // To allows th reload on the pages
            // next call we can fore the reloads
            if (this.backgroundUpdateFlag){
                this.backGroundUpdate();
            }
            
            return $q.resolve(this.content);
        }

        const storageName=this.getStorageName();


        // Then on the local storage
        const sessionValue=Storages.session.get(storageName,null);
        
        if (sessionValue){
            // Store into the content and return the value
            this.content=this.deSerialize(sessionValue);

            if (this.backgroundUpdateFlag){
                this.backGroundUpdate();
            }

            return $q.resolve(this.content);            
        }
        

        // then from the lcoal storate
        const localValue=Storages.local.get(storageName,null);

        if (localValue){
            // Store into the content and return the value
            this.content=this.deSerialize(localValue);

            // Just launch in the background this taks to update the curent session storage
            this.backGroundUpdate();

            return $q.resolve(this.content);            
        } 

        // hav to update from the server


        return this.update();
    }


    // this justs update the values on the background
    backGroundUpdate(){
        setTimeout( () =>this.update() , 1 );
    }
    
    update(){        
        return this.dataAccess().then( (value)=>{
            const storageName=this.getStorageName();
            
            Storages.session.set(storageName,value);
            Storages.local.set(storageName,value);

            this.content=this.deSerialize(value);
            
            return $q.resolve(this.content);            
        }).catch((err)=>{
            this.content=null;
            
            return Errors.reject("Getting the big data bavule for:"+this.id,err);
        });
        
    }

    dataAccess(){        
        return Errors.reject("Data Access Not implemented for:"+this.id);
    }
    
    
};


module.exports = SINGLETON;
