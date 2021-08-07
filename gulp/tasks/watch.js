'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');

const config = global.config;

// var runSequence = require('run-sequence');

// function watchGulp(cb) {
    
// 	gulp.watch('app/sass/**/*.scss',
// 			   ['sass']);
	
    
// 	gulp.watch(['app/ejs/*.html',
//                 'app/ejs/**/*.ejs',
//                 'app/ejs/template/**/*.ejs',
//                 'app/ejs/pages/**/*.ejs',
//                 'app/md/**/*.md',
//                ],[
//                    'ejs-html'
//                ]);
    
    
// 	gulp.watch(['app/ejs/js/**/*.js',
//                 'app/ejs/js/**/*.ejs',
//                 'app/md/**/*.md',
//                ],function(){
//                    runSequence([
// 		               'ejs-js',
// 	               ],[
// 	                   'jshint',
// 	                   'browserify'
//                    ]);
//                });

//     cb();
// }

function task(cb) {

    log("Executing Task:"+__filename);

    config.browserifyReload=true;

	gulp.watch('app/sass/**/*.scss',
			   gulp.task('sass'));
	

	gulp.watch(['app/ejs/*.html',
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
	                           'browserify'
	                           //'browserify',
	                           //'browserify-admin',
	                           //'browserify-console',
	                           //'browserify-application'            

                           )
                          )
              );

    cb();
}

task.description = 'This watch modificartions on the file';

module.exports = task;
