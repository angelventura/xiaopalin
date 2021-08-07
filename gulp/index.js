const gulp = require('gulp');
const log = require('fancy-log');
const path = require('path');

// This defines some global properties
// like : global.config
const config = require('./config');


// TASKS
gulp.task('clean', require('./tasks/clean'));
gulp.task('copy', require('./tasks/copy'));
gulp.task('img', require('./tasks/img'));
gulp.task('sass', require('./tasks/sass'));

// Not necessary does not work ...
// gulp.task('ejs-lint', require('./tasks/ejs-lint'));

gulp.task('ejs-html', require('./tasks/ejs-html'));
gulp.task('ejs-js', require('./tasks/ejs-js'));

gulp.task('browserify', require('./tasks/browserify'));

gulp.task('eslint', require('./tasks/eslint'));

gulp.task('browserSync', require('./tasks/browserSync'));
gulp.task('watch', require('./tasks/watch'));
gulp.task('watch-admin', require('./tasks/watch-admin'));
gulp.task('watch-console', require('./tasks/watch-console'));
gulp.task('watch-application', require('./tasks/watch-application'));

log('Starting ...');

gulp.task('default',
    gulp.series('clean',
        gulp.parallel(
            'copy',
            'img',
            'sass',
            'ejs-html',
            'ejs-js',
            //      'eslint',
        ),
        gulp.parallel( /*'eslint',*/ 
	        'browserify',
        ),
        gulp.parallel('browserSync', 
                    'watch',
                   )));

gulp.task('dist',
          gulp.series('clean',
                      // 'eslint',
                      gulp.parallel(
                          'copy',
                          'img',
                          'sass',
                          'ejs-html',
                          'ejs-js',
                      ),
                      gulp.parallel(/*'eslint',*/ 
	                      'browserify',
                      ),
                     ),
         );

log('Ending ...');
