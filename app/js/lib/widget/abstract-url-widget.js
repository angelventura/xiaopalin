/**
 * This uses the value of one url parameter.
 *
 * When the user change the value, this is pusehd to the url. This will launch the BrowserHistory listener.
 *
 * On url modifications the mthod urlModifiedListener should be called to uptate its value.
 */
'use strict';

console.log("Loading file:abstract-url-widget.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');

const BrowserHistory = require('../../lib/browser-history');

const AbstractWidget = require('../../lib/widget/abstract-widget');

const SINGLETON=class AbstracturlWidget extends AbstractWidget {
	
    constructor(id,paramName,defaultValue){
        super(id);

        this.paramName=paramName;
        this.defaultValue=defaultValue;
    }

    getParameterName(){
        return this.paramName;
    }

    setParameterName(parameterName){
        if (parameterName){
            this.paramName=parameterName;
        }
    }

    getDefaultValue(){
        return this.defaultValue;
    }

    
    getValue(){
        return this._getValueFromUrl();
    }

    // This will set the value of the widget and will modify the url value and launch the BrowserHistory listener.
    setValue(value){
        const oldValue=this._getValueFromUrl();

        if (oldValue !== value){
            // This is not needed because on _pushNewValueToUrl
            // The url will be launched and the page refresjed and this widget sould be updated
            // this._updateWidget(val);
            this._pushNewValueToUrl(value);
            
        }
    }

    // This gets the value from the url and update the widget
    urlModifiedListener(){
        const newValue=this._getValueFromUrl();

        if (newValue) {
            this._updateWidget(newValue);
        } else {
            this._clearWidget();
        }
    }
    
    _updateWidget(newValue){
        // This should update the content of the url widget
        Log.debug("abstract-url-widget: _updateWidget no implemented:"+this.id);
    }

    _clearWidget(){
        this._updateWidget("");
    }

    // This push a new value to the url
    _pushNewValueToUrl(val){
        const oldValue=BrowserHistory.getParameter(this.paramName,null);

        if (oldValue === null || oldValue !== val ) {

            if (val === null){
                // If value == null remove the paremeter from url
                this.removeParameterFromUrl();
            } else {
                BrowserHistory.pushParameter(this.paramName,val);
            }
        }

        
    }

    _getValueFromUrl(){
        const value=BrowserHistory.getParameter(this.paramName,this.defaultValue);

        return value;
    }

    removeParameterFromUrl(){
        BrowserHistory.removeParameter(this.paramName);
    }

};


module.exports = SINGLETON;
