/**
 * 
 */
'use strict';

console.log("Loading file:abstract-refresh-form-element.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const log = require('../../lib/log');

const Display = require('../../lib/display');

const Closeable = require('../../lib/partial/closeable-partial');

const Parent = require('../../lib/view/abstract-refresh-display-element');

const SINGLETON= class AbstractClass extends Parent{
    
    constructor(id,template){
		super(id,template);
        this.$form=null;
    }

    getFormConfig(){
        log.error("getFormConfig not implemented");
        return {};
    }
    
    _getForm(){
        const $form=$("#form-"+this.id);

        if ($form.length>0){
            this.$form=$form;
        } else {
            this.$form=null;            
        }
    }

    _refreshInformationFromServer(data){
        this.setLoading(true);        

        try {
            this.formatJson(data);
            var content=Display.render(this.id,data);
            
            this.$el.html(content);        
            
            return $q.resolve();
        } finally {
            this.setLoading(false);
        }
	}

    _submitForm(event){
        if (this.$form === null){
            log.error("form is not valid");
            return;            
        } else {
            this.$form.dimmer('show');

            if (event){
                event.preventDefault();
                event.stopPropagation();
            }

            const data = this.$form.form('get values');

            $q(this.submit(data)).then( (value) => {
                if (!value){
                    this.refresh(false,this.$el);
                } else {
                    this._refreshInformationFromServer(value);
                }

                // reload the form
                this._getForm();
                
            }).catch( (err) =>{
                let errorMsg;
                
                if (err.statusText) {
                    errorMsg=err.statusText;
                } else if (err.message) {
                    errorMsg=err.message;                
                } else {
                    errorMsg=log.obj(err);
                }

                this.$form.find('.error.message').text(errorMsg).show();
            }).finally( () => {
                this.$form.dimmer('hide');
            });            
        }
    }
    
	display($el){
        // First close the parent stufff
        // Maybe the form is created by the parremt
        return super.display($el).then(()=>{
            
            // get the form
            this._getForm();

            if (this.$form){
                const config=this.getFormConfig();

                if (config!=null) {
                    const that=this;
                    this.$form.form(config).on('submit',(event)=>{
                        // Check if the form is valib before submit
                        if (that.$form.form('is valid')){
                            that._submitForm(event);
                        }
                    });
                } else {
                    log.info("Form config not defined avoiding form implementation");
                    this.$form=null;
                }
            }
            
            return $q.resolve();
        });
    }
};


module.exports = SINGLETON;
