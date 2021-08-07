/**
 * This is the comon globl log interface.
 */
'use strict';
<% var currentName="random-string"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

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

