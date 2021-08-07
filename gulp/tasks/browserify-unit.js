'use strict';

const gulp          = require('gulp');
const log           = require('fancy-log');
const gulpif        = require('gulp-if');

const browserify   = require('browserify');

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

module.exports = function (entryName,outName) {
    log("Initializing browserify-unit:"+entryName+" name:"+outName);


    //function task() {
    function browserifyBuild(cb) {
        log("Executing Task:"+__filename);
        log("Preparing browserify-unit:"+entryName+" name:"+outName);
        log("config.browserifyReload:"+config.browserifyReload);
        
        const  BUNDLE_ENTRY = outName;
                               
        let bundler;



        if (config.browserifyReload) {

            bundler = browserify({
                entries: [ entryName ], // ./app/js/app.js
	            debug: true,
                cache: {},
                packageCache: {},
                
                plugin: [watchify],
                //            insertGlobals: true,
                //            fast:true,
                //            verbose:true
            }, watchify.args);


        } else {
            bundler = browserify({
                entries: [ entryName ], // ./app/js/app.js
	            debug: true,
            });

        }

        bundler.on('update', rebundle);

        var transforms = [
            babelify,
	        // shim,
	        // brfs
        ];

        
        transforms.forEach(function(transform) {
	        bundler.transform(transform);
        });
        
        
	    const stream = bundler.bundle();

	    function rebundle() {
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
        
	    rebundle();

        cb();

        log("After Rebundle DONE:"+entryName);
    }

    browserifyBuild.description = "Broserify for "+outName;

    return browserifyBuild;


};
