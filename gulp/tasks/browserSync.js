'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');

const browserSync = require('browser-sync');
const url         = require('url');
const proxy       = require('proxy-middleware');


const config = global.config;

function browserSyncGulp(cb) {
    log("Executing Task:"+__filename);

	// const proxyOpts = url.parse("http://localhost:8080/sam/");    
	const proxyOpts = url.parse("http://sam-test.ces-cdr.eu.int/sam/");
	proxyOpts.route = config.servicesContext;
	    

	var browserSyncConfig = {
	    port: config.port,
	    server: {
	        baseDir: config.dist,
			index: "index.html"
	    },
        middleware: function(req,res,next) {

			// if (req.url.indexOf(config.servicesContext) === 0) {
            //     // USE MOCK
            //     // if (config.distMock){
            //     //     log("MOCK:"+req.url);
            //     //     res.setHeader("Content-Type", "application/json");
            //     //     return next();
            //     // } else {
            //     //     log("Proxy:"+req.url);
            //     //     return proxy(proxyOpts)(req,res,next);
            //     // }
            //     // USE PROXY
            //     log("Proxy:"+req.url);
            //     return proxy(proxyOpts)(req,res,next);
            //
			// } else {
			// 	return next();
			// }

			return next();
	
        },

		// logLevel: "debug",
	    logPrefix: 'BrwSync',
	    minify: false,
	    notify: false,
	    open: false
	};

	browserSync(browserSyncConfig);
	//browserSync({});

    cb();
}

module.exports = browserSyncGulp;
