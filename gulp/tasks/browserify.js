'use strict';

const gulp          = require('gulp');
const log           = require('fancy-log');
const gulpif        = require('gulp-if');

const  browserify   = require('browserify');

const sourcemaps    = require('gulp-sourcemaps');
const source        = require('vinyl-source-stream');

const uglify        = require('gulp-uglify');

const buffer       = require('vinyl-buffer');
const watchify     = require('watchify');
const browserSync  = require('browser-sync');
const shim         = require('browserify-shim');

const brfs         = require('brfs');
const babelify	 = require('babelify');

const config = global.config;


function task() {
    log("Executing Task:"+__filename);

    const  BUNDLE_ENTRY = config.BUNDLE_NAME;
    log("Building:"+BUNDLE_ENTRY);
    

    const bundler = browserify({
        entries: [ config.scriptsEntryPoint ], // ./app/js/app.js
	    debug: true,
//	    cache: {},
//	    packageCache: {},
//	    fullPaths: true,
    });
//     }, watchify.args);

    var transforms = [
        babelify,
	    // shim,
	    // brfs
    ];


    transforms.forEach(function(transform) {
	    bundler.transform(transform);
    });
    
    
	const stream = bundler.bundle();
    
    return stream.on('error', log)
	    .pipe(source(BUNDLE_ENTRY))
	    .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true, debug:true}))
	    .pipe(sourcemaps.write('./'))
	    .pipe(
            gulp.dest(config.dist + config.scripts)
        )
	    .pipe(
            gulpif(config.browserifyReload, 
                   browserSync.reload({ 
                       stream: true, 
                       once: true })
                  )
        )    
    ;    
}

task.description = 'This compiles the javascript into a browser JS';

module.exports = task;
