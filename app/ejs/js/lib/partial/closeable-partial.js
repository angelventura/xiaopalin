/**
 * This handles the elements that can be closed or opened. Locks for one 
 * id data in the element to decide if it's open or closed storing the 
 * status in the local storage.
 *
 * CLOSEABLE_AWARE the element that should contain the data-id=""
 * CLOSED_CLASS The class that will be added to the elemnt when the element is closed.
 * CLOSEABLE_BUTTON: Click on this element changes the status open/closed
 */
'use strict';
<% var currentName = "closeable"; %>
<%- include('../../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');

const Storages = require('../../lib/storage');

const AbstractPartial = require('../../lib/partial/abstract-partial');

const CLOSED_CLASS="closeable-closed";
const _CLOSEABLE_AWARE=".closeable";
const _CLOSEABLE_BUTTON=".closeable-button";

const SINGLETON= class MyClass extends AbstractPartial{
    constructor(){
        super("<%- currentName -%>");
    }

    isClossed(id=null){
        if (id) {
            return Storages.local.get("closeable-"+id+"-closed",false);

        } else {
            return false;
        }
    }
    toggle(id=null){
        if (id) {
            Storages.local.toggle("closeable-"+id+"-closed",false);
        }
    }

    getCloseableId($el){
        if (!$el){
            return null;
        }
        const id=$el.data("id");

        return id;
    }


    displayElement($el=null){
        const id=this.getCloseableId($el);
        const status=this.isClossed(id);

        if (status === true){
            $el.addClass(CLOSED_CLASS);
        } else {
            $el.removeClass(CLOSED_CLASS);
        }
    }

    toggleElement($el=null){
        const id=this.getCloseableId($el);

        if ($el.hasClass(CLOSED_CLASS)){
            // Oppening
            $el.removeClass(CLOSED_CLASS);

            Storages.local.set("closeable-"+id+"-closed",false);
        } else {
            // Clossing
            $el.addClass(CLOSED_CLASS);
            Storages.local.set("closeable-"+id+"-closed",true);
        }
    }

    closeElement($el=null){
        const id=this.getCloseableId($el);

        if ($el.hasClass(CLOSED_CLASS)){
            // Oppening
            // $el.removeClass(CLOSED_CLASS);
            // Storages.local.set("closeable-"+id+"-closed",false);
        } else {
            // Clossing
            $el.addClass(CLOSED_CLASS);
            Storages.local.set("closeable-"+id+"-closed",true);
        }
    }

    openElement($el=null){
        const id=this.getCloseableId($el);

        if ($el.hasClass(CLOSED_CLASS)){
            // Oppening
            $el.removeClass(CLOSED_CLASS);
            Storages.local.set("closeable-"+id+"-closed",false);
        } else {
            // Clossing
            // $el.addClass(CLOSED_CLASS);
            // Storages.local.set("closeable-"+id+"-closed",true);
        }
    }


    render(){
        this.update();
    }

    update($el){
        if ($el){
            $el.find(_CLOSEABLE_AWARE).each( (index,el) => {
                this.displayElement($(el));
            });

        } else {
            // Close the elements that should be closed
            $(_CLOSEABLE_AWARE).each( (index,el) => {
                this.displayElement($(el));
            });
        }
    }

    initialize(parent){
        // subscrive events
        $("html").on("click",_CLOSEABLE_BUTTON, (e) =>{
            const $el=$(e.currentTarget);
            const $closeableAware=$el.closest(_CLOSEABLE_AWARE);

            this.toggleElement($closeableAware);
        });
    }

};


module.exports = new SINGLETON();
