import $ from 'jquery'; 
import fullpage from 'fullpage.js'
import scrollMonitor from 'scrollmonitor';
import viewport from './viewport';

let state = {
    width: null,
    initialize: false
}

export default class ScrollHijack {
    constructor() {
        this.bindEvents();
        this.hijackHandler();
    }

    bindEvents() {
        ee.addListener('RESIZE', this.hijackHandler.bind(this));
    }

    hijackHandler() {
        state.width = viewport().width;

        if(state.width >= 750) {
            !state.initialize && this.init();
        } else {
            state.initialize && this.destroy();            
        }
    }

    init() {
        $('#fullpage').fullpage({
            css3: true,
            scrollingSpeed: 650,
            scrollBar: true     
        });
        state.initialize = true;
    }

    destroy() {
        $.fn.fullpage.destroy('all');
        state.initialize = false;
    }
}