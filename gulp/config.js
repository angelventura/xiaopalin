'use strict';

const log = require('fancy-log');
const path = require('path');

function getBuildDate() {
    const buildDate=new Date();

    return buildDate.getFullYear()+"/"+
        ("0"+(buildDate.getMonth()+1)).slice(-2)+"/"+
        ("0"+buildDate.getDate()).slice(-2)
};

const buildDate = getBuildDate();

    

//
// Constants 
//

global.ROOT = path.resolve(".");

const packageJson = require(global.ROOT+"/package.json");
const meta=require(global.ROOT+'/app/ejs/METADATA.json');

const servicesContext="/sam";
// const servicesContext="http://sam-test.ces-cdr.eu.int/sam/";


const SINGLETON = {

    port: 3000,

    isProd: global.isProd,
    
    // Version, date, etc ...
    buildDate: buildDate,
    version: packageJson.version,

    // Objects
    package: packageJson,
    meta: meta,
    
    // Absolute Paths
    PROJECT_ROOT    : global.ROOT,
    APP_PATH        : global.ROOT+'/app',

    // Entries points and relative paths
    BUNDLE_NAME:"bundle.js",
    dist: './dist',
    distVendors: './dist/vendors',
    scripts: '/js',

    // Put this into tru in the watch tasks
    // To reload browser on browserify end task
    browserifyReload: false,

    servicesContext: servicesContext,
    distMock: './dist'+servicesContext,

    sassEntryPoint: 'app/sass/custom.scss',
    scriptsEntryPoint: './app/js/app.js',
    metaPath: global.ROOT+'/app/ejs/METADATA.json',
    repositoryUrl: getRepositoryUrl(packageJson)
}

if (process.env.NODE_PRODUCTION || process.env.NODE_ENV === 'production'){
    global.isProd=true;
    SINGLETON.DEBUG=false;
    SINGLETON.distMock=null;

    log("+++++++++++++++++++++++++++++++++++++++++++++");
    log("++++++ INSTALLING PRODUCTION "+packageJson.name+": "+packageJson.version);
    log("++++++ Version: "+buildDate);
    log("++++++ Build Date: "+buildDate);
    log("+++++++++++++++++++++++++++++++++++++++++++++");
} else {
    global.isProd=false;
    SINGLETON.DEBUG=true;

    log("+ Development "+packageJson.name+": "+packageJson.version);
    log("+ Developpment");
    log("+ Build Date: "+buildDate);    


    // SINGLETON.meta.EXTERNAL_SERVICES_URL = SINGLETON.meta.EXTERNAL_SERVICES_URL_LOCAL;
    SINGLETON.meta.EXTERNAL_SERVICES_URL = SINGLETON.meta.EXTERNAL_SERVICES_URL_TEST;
}




function getRepositoryUrl(packageJson){
    if (!packageJson || !packageJson.repository || !packageJson.repository.url){
        return null;
    }

    // svn+https://iptlss03.stib-mivb.be:444/svn/ECM/b2c-layer/b2c-admin-doc/trunk
    

    // log(" ++++++++ Repository Url:"+packageJson.repository.url);
    const url = packageJson.repository.url.match(/.*\+(.*)/);
    // log(" ++++++++ Repository Url:"+url[1]);

    return url[1];
}

global.config=SINGLETON;
module.exports = SINGLETON;
