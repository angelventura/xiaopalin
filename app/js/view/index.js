/**
 * This is the console entry point
 */
'use strict';

console.log("Loading file:index.js ...");/*global document:false, sessionStorage: false, console: false, alert: false, $: false, window: false, jQuery:false,  location:false, debugger:false, navigator:false, localStorage:false,google: false */

var $ = require('jquery');
const Log = require('../lib/log');

// const log = require('../lib/log');
const Display = require('../lib/display');

const Data = require('../services/data');

const id="index";
const template = "<div class=\"swiper-container\" style=\"width:290px;height:100%;\"><div class=\"swiper-wrapper\"> {{#each this}}<div class=\"swiper-slide\"> {{>word-card this}}</div> {{/each}}</div><div class=\"swiper-button-prev\"></div><div class=\"swiper-button-next\"></div></div>";

const Swiper = require('swiper');
const Play = require('../partial/play-sound');


const AbstractRefreshTab = require('../lib/view/abstract-refresh-tab');
const SINGLETON= class CardList extends AbstractRefreshTab{

    constructor(){
		super("index");

        this.swiper=null;
        this.data=Data.getWords();
    }


    initialize(){
        return Display.compile(id,template);
    }


    display(){
        
        this.setLoading(true);
                
        const content=Display.render(id,this.data);
        
        this.$el.html(content);
        
        this.setLoading(false);



        this.swiper = new Swiper.Swiper('.swiper-container', {
            // Optional parameters
            //  direction: 'vertical',
            direction: 'horizontal',
            loop: true,
            speed: 400,
            // spaceBetween: 100,            

            // If we need pagination
            // pagination: {
            //     el: '.swiper-pagination',
            // },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        });


        this.swiper.on('slideChangeTransitionEnd',  (swiper) =>{
            // const index=swiper.activeIndex;
            // const $el=swiper.$el;
            const id=$('.swiper-slide-active .card').attr('data-id');

            this.play(id);
        });

    }

    // getCard(id){
    //     if (this.data && id){
    //         try {
    //             return this.data[id];
    //         }catch(err){
    //             log.error(err);
    //         }
    //     }
    //
    //     return null;
    // }

    play(id){
        Play.play(id);
    }
};

module.exports = new SINGLETON();
