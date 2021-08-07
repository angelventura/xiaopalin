'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');

// const ejsLint = require('ejs-lint');

const config = global.config;


function task() {
    
    return gulp.src("app/ejs/**/*.html")    
        .pipe(ejsLint())
	;
}


task.description = 'Verify the ejs code';


module.exports = task;
