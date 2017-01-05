import _debounce from 'lodash.debounce';
import EventEmitter from 'wolfy87-eventemitter';
import SmoothScroll from 'smooth-scroll'; 
import ScrollManager from './ScrollManager';
import ScrollHijack from './ScrollHijack';
import Controls from './Controls'; 

/* HMR */
if (module.hot) module.hot.accept();

window.cl = (process.env.NODE_ENV !== 'production') ? console.log.bind(this) : () => {}; 

document.addEventListener('DOMContentLoaded', () => {

    window.ee = new EventEmitter();

    new Controls();
    new ScrollManager();
    new ScrollHijack();

    SmoothScroll.init({speed: 650});

    window.addEventListener('resize', _debounce(() => {
        ee.emitEvent('RESIZE');
    }, 100)); 
});