'use strict';

const gulp     = require('gulp');
const log      = require('fancy-log');

const imagemin = require('gulp-imagemin');

const config   = global.config;


function task() {
    log("Executing Task:"+__filename);

    return gulp.src(config.APP_PATH+'/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist+'/img'))
    ;
};

task.description = 'Optimizes the images on repository app/img/';

module.exports = task;





