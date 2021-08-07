/**
 * This is a handlebars based template engine
 * See also the ~/projects/video-skins/skin-black/src/ejs/js/lib/display.js mustache based template engine
 * But we are moving to a react.js based engine
 */
<% var currentName="display"; %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

var $ = require('jquery');
var Q = require('q');
var Handlebars=require('handlebars');

const Obj = require('../lib/obj');
// const Log = require('../lib/log');
const Errors = require('../lib/error');

var SINGLETON={};

// here we store the compiled templates
var TEMPLATES={
};

// https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
// Ex: {{#ifCond var1 '==' var2}} 
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
    case '==':
        /* jshint -W116 */
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
        /* jshint +W116 */
    case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
        /* jshint -W116 */
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
        /* jshint +W116 */
    case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
        return options.inverse(this);
    }
});

Handlebars.registerHelper('stringify', function(content) {
    return Obj.stringify(content);
});

/**
 * {{ stringify .}}
 * https://handlebarsjs.com/expressions.html
 */
SINGLETON.registerHelper=function(helperName,f){	
    Handlebars.registerHelper(helperName,f);    	
};


/**
 *
 * {{> partila-name}}
 * https://handlebarsjs.com/partials.html
 */
SINGLETON.registerPartial=function(partialId,source){
    Handlebars.registerPartial(partialId,source);    
	// Also compile to be used as a template
	return SINGLETON.compile(partialId,source);
};

SINGLETON.compile=function(templateId,source){
    var deferred = Q.defer();
    setTimeout(function(){
        try {
            var template=Handlebars.compile(source);
            TEMPLATES[templateId]=template;

            return deferred.resolve(template);
        }catch(err){
			return Errors.reject("While compiling templateId: " + templateId,err);
        }
    }, 0);
    return deferred.promise;    
};

/**
 * This apply the template to that data and return de values USING
 * THE PARTIALS DEFINED GLOBALY
 */ 
SINGLETON.render=function(templateId,data){
	
    if (TEMPLATES[templateId]){
        try {
            return (TEMPLATES[templateId])(data);
        }catch(err){
			var newError=Errors.createApplicationError("While rendering templateId: " + templateId,err);

			throw newError;
        }
    } else {
        // throw new Error("Template ID:'"+templateId+"' not found, compile it before.");
		var newError2=Errors.createApplicationError("Template ID:'"+templateId+"' not found, compile it before.");
		
		Errors.sendError("Display.render",newError2);
		throw newError2;
    }
};


/**
 * For the elements passed in param, ex: "#pepe",".class","this".
 * Use the content as a template and the date passed to render into.
 */
SINGLETON.renderInto=function(element,data){
	$(element).each(function( index ) {
		var template=$(this).html();
		var content=SINGLETON.render(template,data);
		$(this).html(content);
	});
};

/**
 * Uses the template and the date to generate a content the will be inserted into 
 * The element
 */
SINGLETON.renderIntoElement=function(element,templateId,data){
	var content=SINGLETON.render(templateId,data);
	$(element).each(function( index ) {
		$(this).html(content);
	});	
};


module.exports=SINGLETON;
