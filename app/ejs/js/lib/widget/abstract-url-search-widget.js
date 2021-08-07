/**
 * This the implementation on an input type text.
 * The input may not be present on document ready
 * this is the reasin why we call the _el() method
 * each time we need it.
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
const $q = require('q');

const Log = require('../../lib/log');
const Obj = require('../../lib/obj');
const El = require('../../lib/element');

const BrowserHistory = require('../../lib/browser-history');

const DEFAULT_SEARCH_TEMPLATE = require('../../lib/widget/default-search-template');

// $.fn.search.settings.debug=true;


const Parent = require('../../lib/widget/abstract-url-widget');
const SINGLETON=class InputUrl extends Parent {

	/**
     * paramName: The parameter name that will be used in the url.
     * defaultValue: The value that will be used if not defined in the url.
     * selector: The selector where the search widget wil be build
     * idField: The field of the result object that will be used as id. This means, will be passed to the parameter
     */
    constructor(paramName,defaultValue,selector,idField){
        super("<%- currentName -%>",paramName,defaultValue);

        this.$el=null;
        
        if (selector){
            this.selector=selector;
        } else {
            this.selector="#"+paramName;
        }

        if (idField){
            this.idField=idField;
        } else {
            this.idField="id";
        }
    }

    setSelector(selector){
        this.selector=selector;
    }

    
    _el(){
        // The $el may not exists because it is
        // build as a result of an ajax call then
        // We try to build this.$el each time it is used
        this.$el=El.get(this.selector,null);
 
        // this.$el=$(this.selector);
        // if (this.$el){

        //     if (this.$el.length === 0 ){
        //         this.$el=null;
        //         // alert("Element not found:"+this.selector);
        //     }
        // }
        return this.$el;
    }

    /**
     * This updathe this widet withs this value for the Id
     */    
    _updateWidget(newValue){
        if (!newValue){
            return this._clearWidget();
        } else {
            const $selector=this._el();

            if (!$selector){
                return ;
            } else {        
                // search for the value in the "cache"
                const result=$selector.search('get result', newValue);
                
                if (result){
                    // something found                    
                    const value=this._updateWidgetFromObject(result);
                    const displayName=this._getDisplayName(result);
                    
                    $selector.search('set value', displayName);
                } else {
                    // set the value in the search field
                    $selector.search('set value', newValue);
                    // Do the search
                    const toto=$selector.search('query', ()=>{});
                    // tray again
                    const result2=$selector.search('get result');
                    // Hide the results
                    $selector.search('hide results',()=>{});
                    if (result2){
                        const value=this._updateWidgetFromObject(result2);
                        const displayName=this._getDisplayName(result2);
                        $selector.search('set value', displayName);
                    } else {                    
                        // nothing found clear the widget
                        return this._clearWidget();
                    }
                }
            }
        }
    }

    _clearWidget(){
        const $selector=this._el();
        
        if ($selector){
            const value=this._updateWidgetFromObject(null);
            const displayName=this._getDisplayName(null);
            
            $selector.search('set value', displayName);
        }
    }

    // This display the widget and returns a promise
    display($el){
        this._buildUrlSelector();        
    }


    _buildUrlSelector(){
        const $selector=this._el();
            
        if (!$selector){
            alert("File: <%- currentName -%>, id:"+this.id+", selector not found: "+this.selector);
            Log.error("File: <%- currentName -%>, id:"+this.id+", selector not found: "+this.selector);
            return ;
        } else {
            const that=this;
            
            // This to gets the values
            const promise=this._getPromiseOfValues();
            
            $q(promise)
                .then( (data) =>{
                    $selector.removeClass("loading");

                    if (!data){
                        $selector.addClass("disabled");
                    } else {
                        $selector
                            .search({
                                onSelect(result,response){
                                    const id=Obj.getValue(result,that.idField,"");
                                    BrowserHistory.pushParameter(that.paramName,id);
                                },
                                onResultsClose(){
                                    const value=$selector.search('get value');
                                    if (!value){
                                        BrowserHistory.removeParameter(that.paramName);
                                    }
                                },

                                source:data,
                                // selectFirstResult:true,
                                fields: this.getDisplayFields(),
                                searchFields: this.getSearchFields(),
                                type: 'customType',
                                templates:this._getSearchTemplate()
                            })
                        ;

                        this._updateWidget(this.getValue());                    
                    }                
                    
                })
                .catch( (err) =>{
                    Log.error("File: <%- currentName -%>, error",err);
                    $selector.removeClass("loading");
                    $selector.addClass("disabled");                    
                });
            
        }
    }

    pushNewValueToUrl(newValue){
        this._pushNewValueToUrl(newValue);
    }
    
    pushInputValueToUrl(){
        if (this._el()){
            const val=this.$el.val();
            this._pushNewValueToUrl(val);
        }
    }

    resetInputValue(){
        this.updateFromUrl();
    }

    updateFromUrl(){
        if (this._el()){
            const oldValue=this._getValueFromUrl();

            this._updateWidget(oldValue);
        }
    }

    getDisplayFields(){
        return {  // fields for the display
            title: "title",
            description: "description",
        };
    }

    getSearchFields(){
        return [ // search fields
            "id",
            "name",
            "description",
        ];
    }
    
    _getPromiseOfValues(){
        // This should retuns a promise of the values
        // Example const promise=Ajax.get(url);

        return $q.resolve();
    }

    _updateWidgetFromObject(result){
        // result may be null
        // This should update the apereance on the widget depending on the values;
    }
    
    _getDisplayName(result){
        // result may be null
        // This should return the string to be displayed in the user search imput
        return Obj.getValue(result,this.idField,"");
    }

    _getSearchTemplate(){
        // This is the template to be used to display the result set list
        return DEFAULT_SEARCH_TEMPLATE;
    }

};


module.exports = SINGLETON;
