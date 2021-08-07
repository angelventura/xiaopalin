/**
 * This service stores the value in the session storage.
 *
 * Do not forget to call the standard init method implementation.
 */
'use strict';

console.log("Loading file:session-persistence-service.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const $q = require('q');
const Errors = require('../../lib/error');
const Storages = require('../../lib/storage');

const SINGLETON=class SessionPersistence {
    constructor(id){
		this.id=id;
        this.content=null;
    }

    // This get the value if not defined in storage
    getDefaultValue(){        
        return $q.resolve(null);
    }

    getValue(){
        return this.content;
    }

    // Storage name
    getStorageName(){
        return "ss-"+this.id;
    }

    serialize(data){
        return data;
    }

    deSerialize(data){
        return data;
    }

    getFromStorage(){
        this.content=this.deSerialize(
            Storages.session.get(this.getStorageName(),null)
        );

        if (this.content === null){
            return this.getDefaultValue().then((content)=>{
                this.content=content;
                
                return $q.resolve();
            }).catch((err)=>{
                this.content=null;
                
                return Errors.reject("Getting default value for:"+this.id,err);
            });
        } else {
            return $q.resolve();
        }

    }

    remove(){
        Storages.session.remove(this.getStorageName());

        this.content=null;
    }

    setValue(value){
        // if (value!== null){
        Storages.session.set(this.getStorageName(),
                             this.serialize(value));
        // }
        this.content=value;        
    }

    init(){
        return this.getFromStorage();
    }
};

module.exports = SINGLETON;
