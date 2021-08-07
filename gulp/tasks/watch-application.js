'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');

const config = global.config;


function task(cb) {

    log("Executing Task:"+__filename);

    config.browserifyReload=true;

	gulp.watch('app/sass/**/*.scss',
			   gulp.task('sass'));
	

	gulp.watch(['app/ejs/application/*.html',
                'app/ejs/**/*.ejs',
                'app/md/**/*.md',
               ],
               gulp.task('ejs-html')
              );
    

	gulp.watch(['app/ejs/js/**/*.js',
                'app/ejs/js/**/*.ejs',
                'app/md/**/*.md',
               ],
               gulp.series('ejs-js',
                           gulp.parallel(
	                           // 'eslint',
	                           'browserify-application'
                           )
                          )
              );

    cb();
}

task.description = 'This watch modificartions on the application files';

module.exports = task;
