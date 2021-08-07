/**
 * This is the console entry point
 */
'use strict';

console.log("Loading file:default-search-template.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

const SINGLETON={};

SINGLETON.name='customType';

SINGLETON.customType=function(response, fields, preserveHTML) {
    // node_modules/fomantic-ui/src/definitions/modules/search.js:409
    let html = '';
    let escape = $.fn.search.settings.templates.escape;

    
    if(response[fields.results] !== undefined) {

        // each result
        $.each(response[fields.results], function(index, result) {
            if(result[fields.url]) {
                html  += '<a class="result" href="' + result[fields.url].replace(/"/g,"") + '">';
            }
            else {
                html  += '<a class="result">';
            }
            if(result["image"]) {
                html += '' +
                     '<div class="image">' +
                     ' <img src="data:image/jpg;base64,' + result["image"].replace(/"/g,"") + '">' +
                     '</div>'
                ;
            }
            html += '<div class="content">';
            if(result[fields.price] !== undefined) {
                html += '<div class="price">' + escape(result[fields.price], preserveHTML) + '</div>';
            }
            if(result[fields.title] !== undefined) {
                html += '<div class="title">' + escape(result[fields.title], preserveHTML) + '</div>';
            }
            if(result[fields.description] !== undefined) {
                html += '<div class="description">' + escape(result[fields.description], preserveHTML) + '</div>';
            }
            html += '</div>';
            html += '</a>';
        });
        if(response[fields.action]) {
            if(fields.actionURL === false) {
                html += '' +
                    '<div class="action">' +
                    escape(response[fields.action][fields.actionText], preserveHTML) +
                    '</div>'
                ;
            } else {
                html += '' +
                    '<a href="' + response[fields.action][fields.actionURL].replace(/"/g,"") + '" class="action">' +
                    escape(response[fields.action][fields.actionText], preserveHTML) +
                    '</a>'
                ;
            }
        }
        return html;

    }
};

module.exports=SINGLETON;
