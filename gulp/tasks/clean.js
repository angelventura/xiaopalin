'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');
const del    = require('del');

const config = global.config;

function task(cb) {
    log("Executing Task:"+__filename);

    return del([config.dist,'app/js'], cb);
}

task.description = 'Clean the dis/ and the app/js files';

// clean.flags = { '-e': 'An example flag' };

module.exports = task;
