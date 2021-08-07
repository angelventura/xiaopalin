/**
 * background-task.js
 * This to solve the problem when clicking to fast on a button that start creating a lot of tasks ....
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../lib/log');
const Errors = require('../lib/error');


const SINGLETON=class BackgroundTask {

    constructor(time,f){
        this.f=f;        

        // time to wait ofor a new call in mills
        if (time){
            this.time=time;
        }else {
            this.time=200; 
        }            


        this.isRunning=false;
        this.deferred=null;
        this.idTimeout=null;
        
    }

    /**
     * if a call is launched this pospone the call
     **/
    pospone(f){

        // Update the current function
        if (f!=null){
            this.f=f;
        }
        
        
        // iF no function resolve
        if ( !this.f){
            // no function return 
            return $q.resolve();
        }
        

        // create a new defer
        if (this.deferred==null){
            this.deferred = $q.defer();            
        }


        // clear the current timeout
        if (this.idTimeout!=null){
            // clear the current time out
            clearTimeout(this.idTimeout);
        }

        // make the new call
        this.idTimeout=setTimeout( () =>{
                             
            $q(this.f()).then( ()=>{                    
                this.deferred.resolve();
            }).catch( (err)=>{
                this.deferred.reject(err);                    
            }).finally(()=>{
                // cleanup for the next call
                this.deferred=null;
                this.idTimeout=null;
            });
            
        }, this.time);
            
        return this.deferred.promise;
    }


    /**
     * This make a call if no one is launched.
     * If the call is launched this just change the function to
     * be executed to execute this one
     */
    call(f){

        // First change the function
        if (f!=null){
            this.f=f;
        }

        if (this.deferred!==null){
            // return the already running promise
            return this.deferred.promisse;
        } else {        
            
            if ( !this.f){
                // no function return 
                return $q.resolve();
            }
            
            
            this.deferred = $q.defer();
            
            this.idTimeout=setTimeout( () =>{
                             
                $q(this.f()).then( ()=>{                    
                    this.deferred.resolve();
                }).catch( (err)=>{
                    this.deferred.reject();                    
                }).finally(()=>{
                    // cleanup for the next call
                    this.deferred=null;
                    this.idTimeout=null;
                });
                
            }, this.time);
            
            return this.deferred.promise;            

        }

    }

};


module.exports = SINGLETON;
	
