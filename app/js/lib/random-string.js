/**
 * This is the comon globl log interface.
 */
'use strict';

console.log("Loading file:random-string.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var SINGLETON={};

/*
 * See: https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
 * Examples:
 *  console.log(randomString(16, 'aA'));
 *  console.log(randomString(32, '#aA'));
 *  console.log(randomString(64, '#A!'));
 */
SINGLETON.randomString=function(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) {
        mask += 'abcdefghijklmnopqrstuvwxyz';
    }
    
    if (chars.indexOf('A') > -1) {
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    if (chars.indexOf('#') > -1) {
        mask += '0123456789';
    }
    
    if (chars.indexOf('!') > -1) {
        mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    }
    
    var result = '';
    for (let i = length; i > 0; --i) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }
    
    return result;
};

SINGLETON.randomInt=function(length) {
    const val=SINGLETON.randomString(length,"#");

    return parseInt(val);
};

module.exports=SINGLETON;

