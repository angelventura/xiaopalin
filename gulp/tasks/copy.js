'use strict';

const gulp   = require('gulp');
const log    = require('fancy-log');

const config = global.config;

function task(cb) {
    
    log("Executing Task:"+__filename);

    // Assets
 	gulp.src(['app/assets/**/*'])
 	    .pipe(gulp.dest(config.dist + '/assets'));

 	gulp.src(['app/markdown/**/*'])
	    .pipe(gulp.dest(config.dist + '/markdown'));

    // DATA
    gulp.src(['app/ejs/ajax/**/*'])
        .pipe(gulp.dest(config.dist + '/ajax'));

	// Datatables
 	gulp.src(['node_modules/datatables.net*/css/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/datatables'));

    gulp.src(['node_modules/datatables.net*/js/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/datatables'));


    gulp.src(['node_modules/jszip/dist/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/jszip'));

    gulp.src(['node_modules/pdfmake/build/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/pdfmake'));

// require( 'jszip' );
// require( 'pdfmake' );
// require( 'datatables.net-se' )();
// require( 'datatables.net-autofill-se' )();
// require( 'datatables.net-buttons-se' )();
// require( 'datatables.net-buttons/js/buttons.colVis.js' )();
// require( 'datatables.net-buttons/js/buttons.flash.js' )();
// require( 'datatables.net-buttons/js/buttons.html5.js' )();
// require( 'datatables.net-buttons/js/buttons.print.js' )();
// require( 'datatables.net-colreorder-se' )();
// require( 'datatables.net-fixedcolumns-se' )();
// require( 'datatables.net-keytable-se' )();
// require( 'datatables.net-responsive-se' )();
// require( 'datatables.net-rowgroup-se' )();
// require( 'datatables.net-rowreorder-se' )();
// require( 'datatables.net-scroller-se' )();
// require( 'datatables.net-select-se' )();

	// json-formatter-js
    gulp.src(['node_modules/json-formatter-js/dist/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/json-formatter-js'));
    
	// clipboard
    gulp.src(['node_modules/clipboard/dist/**/*'])
 	    .pipe(gulp.dest(config.distVendors + '/clipboard'));
    
    // Sortable: /node_modules/sortablejs/Sortable.js
    gulp.src(['node_modules/sortablejs/*.js'])
        .pipe(gulp.dest(config.distVendors + '/sortablejs'));

    // Sweet date presentation library - http://momentjs.com/
    gulp.src(['node_modules/moment/min/moment.min.js'])
        .pipe(gulp.dest(config.distVendors + '/moment'));

    // jQuery plugin for auto-expanding text areas
    // Based on https://alistapart.com/article/expanding-text-areas-made-elegant
    gulp.src(['node_modules/expanding-textareas/dist/expanding.jquery.js'])
        .pipe(gulp.dest(config.distVendors + '/expanding-textareas'));

    // semantic-ui
    //
    //gulp.src(['node_modules/semantic-ui/dist/**/*'])
    //    .pipe(gulp.dest(config.distVendors + '/semantic-ui'));
    //
    // gulp.src(['node_modules/fomantic-ui/dist/**/*'])
    //    .pipe(gulp.dest(config.distVendors + '/semantic-ui'));

    gulp.src(['semantic/dist/**/*'])
        .pipe(gulp.dest(config.distVendors + '/semantic-ui'));


    // Noty Alerts - http://ned.im/noty/
    gulp.src(['node_modules/noty/js/noty/**/*'])
        .pipe(gulp.dest(config.distVendors + '/noty'));

    // Crypto-JS: node_modules/crypto-js/
    gulp.src(['node_modules/crypto-js/*.js'])
        .pipe(gulp.dest(config.distVendors + '/crypto-js'));

    // Show Down
    gulp.src(['node_modules/showdown/dist/*.js'])
        .pipe(gulp.dest(config.distVendors + '/showdown'));

    // @fortawesome/fontawesome-free
    gulp.src(['node_modules/@fortawesome/fontawesome-free/**/*'])
        .pipe(gulp.dest(config.distVendors + '/fontawesome-free'));

    // swiper
    gulp.src(['node_modules/swiper/*'])
        .pipe(gulp.dest(config.distVendors + '/swiper'));

    // JQUERY
    return gulp.src(['node_modules/jquery/dist/*'])
        .pipe(gulp.dest(config.distVendors + '/jquery'));
    
    // cb();
}

task.description = 'Copy the ressources to the dist folder:'+config.distVendors;


module.exports = task;
