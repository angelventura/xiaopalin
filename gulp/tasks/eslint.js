'use strict';

const gulp          = require('gulp');
const log           = require('fancy-log');


const eslint = require("gulp-eslint");


const config        = global.config;

function task() {

    log("Executing Task:"+__filename);
    
    return gulp.src("app/ejs/js/**/*.js")
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())

        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());	
}

task.description = 'Appli eslint to the Js files';


module.exports = task;
