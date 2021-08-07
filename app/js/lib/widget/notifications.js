/**
 * Application Wide Text Notification module.
 * https://github.com/needim/noty/ - License MIT
 *
 * Simple Use: Noty._type_(Object);
 *
 * Object = {
 *  text: "Message Text",
 *  title: "Message Title", // Optional
 *  timeout: 10000 or false // timeout in ms - optional
 * }
 *
 * _type_ = 'info' (use when in doubt), 'success', 'error', 'warning', 'notification', 'killer'
 *
 *
 */
'use strict';

console.log("Loading file:notifications.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const noty = require('noty');
const hash = require('object-hash');

const Log = require('../../lib/log');

const Obj = require('../../lib/obj');

const Display = require('../../lib/display');


const templateId="notifications";
const template = "<ul class=\"list\"><li>{{text}}</li> {{#err}} {{#statusText}}<li><b>Status:</b> {{.}}</li>{{/statusText}} {{#responseText}}<li><b>Message:</b> {{.}}</li>{{/responseText}} {{#url}}<li><b>Url:</b> {{.}}</li>{{/url}} {{/err}}</ul>";


const SINGLETON={};

function initNotificationsLookAndFell() {
    try {
        $.noty.defaults = {
            layout: 'top',
            theme: 'semanticUI', // or relax
            type: 'information', // success, error, warning, information, notification
            text: '', // [string|html] can be HTML or STRING
            size: '',
		    
            dismissQueue: true, // [boolean] If you want to use queue feature set this true
            force: false, // [boolean] adds notification to the beginning of queue when set to true
            maxVisible: 5, // [integer] you can set max visible notification count for dismissQueue true option,
            
            timeout: false, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
            progressBar: false, // [boolean] - displays a progress bar
            closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications,
            modal: false, // [boolean] if true adds an overlay
            killer: false, // [boolean] if true closes all notifications and shows itself
		    
            callback: {
                beforeShow: function() {
                },
                onShow: function() {
                    //Enable transition
                    // this.$bar.addClass('transition');
                    //Actual transition
                    // this.$bar.transition(this.options.animation.open);
                },
                //afterShow: function() {},
                onClose: function() {
                    //Enable transition
                    // this.$bar.addClass('transition');
                    //Actual transition
                    // this.$bar.transition(this.options.animation.close);
                }
                //afterClose: function() {},
                //onCloseClick: function() {}
            },
		    
            buttons: false // [boolean|array] an array of buttons, for creating confirmation dialogs.
        };
    }catch(err){
        Log.error("While setting the $.noty.defaults",err);
    }

}
	
/*
 * Check if message id already exists on the screen
 */
function isMessageOnScreen(msgId) {
    if ($(`#${msgId}`).length) {
        return $(`#${msgId}`);
    } else {
        return false;
    }
}


function hashItOut(object) {
	return hash(object);
}

function displayMessage(object) {
	// If Message is present on the DOM, call users' attention,
	// but do NOT display another copy
	if (isMessageOnScreen(object.id)) {
		var $message = isMessageOnScreen(object.id);
		$message.transition('bounce');

		var notyId = $message[0].id;

		var self = $.noty.get(notyId);
		self.dequeueClose(self);
		self.bindTimeout();
		return false;
	} else {
	    // If message is NOT in DOM - show it
		noty(object);
	}
}

function buildConfig(CONFIG,options){
    // const reponseText=Obj.get(options,"err.responseText",null);

    
    
    // if (reponseText) {
    //     options.text+=` <br> ${reponseText}`;
    // }

    const ret=$.extend({},CONFIG, options );

    ret.text=Display.render(templateId,options);
            
    // ret.text=`<ul class="list">`+
    //     `<li>${options.text}</li>`+
    //     `<li>${options.err.responseText}</li>`+
    //     `<li>Url: ${options.err.url}</li>`+
    //     `<li>Status: ${options.err.url}</li>`+
    //     `</ul>`;

    return ret;
}


// Static construction, some time gain
const INFO_CONFIG={
	title: '',
	text: '',
	type: 'info',
	icon: 'info icon',
	header: 'System Notification',
	timeout: 3000
};

SINGLETON.info=function(options){
	const config=buildConfig(INFO_CONFIG, options);

	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);

	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};

const SUCCESS_CONFIG = {
	title: '',
	text: '',
    type: 'success',
	icon: 'checkmark icon',
	header: 'Sweet...',
	timeout: 3000
};

// The most common messages
SINGLETON.success=function(options){

	const config=buildConfig(SUCCESS_CONFIG, options );

	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);

	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};

const ERROR_CONFIG = {
	title: '',
	text: '',
    type: 'error',
	icon: 'warning sign icon',
	header: 'Error!',
	timeout: false
};

SINGLETON.error=function(options){
	const config=buildConfig(ERROR_CONFIG, options );

	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);

	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};

const WARNING_CONFIG = {
	title: '',
	text: '',
    type: 'warning',
	icon: 'warning icon',
	header: 'Watch Out',
	timeout: 6000,
};

SINGLETON.warning=function(options){
	const config=buildConfig(WARNING_CONFIG, options );
	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);
	
	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};

const NOTIFICATION_CONFIG = {
	title: '',
	text: '',
    type: 'notification',
	icon: 'info icon',
	header: 'Take note'
};

SINGLETON.notification=function(options){

	const config=buildConfig(WARNING_CONFIG, options );
	
	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);
	
	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};

const KILLER_CONFIG = {
	title: '',
	text: '',
    header: 'Important Announcement',
	killer: true,
	timeout: false
};

SINGLETON.killer=function(options){

	const config=buildConfig(KILLER_CONFIG, options );

	// Calculate Message Hash (for future comparison) and store in confid.id
	config.id = hashItOut(config);

	// Stop building the message if it already exists in the DOM
	displayMessage(config);
};


// Compile ...
Display.compile(templateId,template);

// The docuemnt ready event
$(document).ready(function(){
    initNotificationsLookAndFell();    
});



module.exports = SINGLETON;
