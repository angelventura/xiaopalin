'use strict';

const gulp          = require('gulp');
const log           = require('fancy-log');

const ejs           = require("gulp-ejs");
const gulpif        = require('gulp-if');

const browserSync   = require('browser-sync');



const htmlclean     = require('htmlclean');
const handlebars    = require('handlebars');
const fs            = require('fs');
const markdown      = require('./markdown');

const config        = global.config;


function task() {
    
    log("Executing Task:"+__filename);
    
    return gulp.src("app/ejs/**/*.html")
        .pipe(
            ejs({
			    config:config,
			    package:config.package,
                repositoryUrl:config.repositoryUrl,
			    meta:config.meta,

			    DEBUG:config.DEBUG,
                
                PROJECT_ROOT:config.PROJECT_ROOT,
                
			    htmlclean:htmlclean,
			    handlebars:handlebars,
                fs:fs,
                markdown:markdown
		    },{
			    ext:config.HTML_EXT
		    },{
			    ext:config.HTML_EXT
		    }).on('error', log))
        .pipe(gulp.dest(config.dist).on('error', log))   
    
    	.pipe(gulpif(config.browserifyReload, browserSync.reload({ stream: true,once: true })))
    	// .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })))
    ;
}

task.description = 'Apply the ejs scriptles to the *.html files';


module.exports = task;
