/**
 * This is the console entry point
 */
'use strict';
<% const currentName = r.getFileId(__filename); %>
<%- include('../snippet/js-head.ejs', {fileName: currentName+'.js'}); -%>

const $q = require('q');

const Obj = require('../lib/obj');
const Log = require('../lib/log');
const Display = require('../lib/display');

<%
const TEMPLATES=[
 	"word-card",
 	"word-list",
 	"img-src", 

    
];%>

const TEMPLATES=[
<%

    
TEMPLATES.forEach( (currentName,index) => {%>
   {
	   id:"<%- currentName -%>",
       content:"<%- render.partial("./js/partial/templates/"+currentName+".ejs") -%>"
   },
<%
});
%>
];


const SINGLETON=class Partials  {
    constructor(){        
    }    


    display(id,data=null){
        const content=Display.render(id,data);
        
        return content;
    }

    init(){
	    Log.info("Loading templates ...");
	    const promisses=[];
	    const that=this;

	    TEMPLATES.forEach( (el,index) => {
		    Log.info("Compiling partial:"+el.id);


            // {{word-card DATA }}
            Display.registerHelper(el.id, (content) =>{
                return that.display(el.id,content);
            });

            // {{> word-card DATA }}
		    promisses.push(Display.registerPartial(el.id,el.content));

            
	    });
        
	    return $q.all(promisses);
    }
    

}


module.exports=new SINGLETON();
