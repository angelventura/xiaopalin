'use strict';

const gulp        = require('gulp');
const log         = require('fancy-log');

const sass        = require('gulp-sass');
const browserSync = require('browser-sync');

const config = global.config;

sass.compiler = require('dart-sass');

sass.includePaths= ['node_modules'];

// TODO: source maps https://www.npmjs.com/package/gulp-sass

function task() {
    
    log("Executing Task:"+__filename);


    return gulp.src( config.sassEntryPoint )
        .pipe(sass( { includePaths: ['node_modules/'] }).on('error', sass.logError))
        .pipe(gulp.dest(config.dist+'/css'))
    
    	.pipe(browserSync.reload({stream: true}))
    // .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })))
    ;
}
 

task.description = 'Buils the sass files, entry point: '+config.sassEntryPoint+', destination:' + config.dist+'/css';

module.exports = task;
