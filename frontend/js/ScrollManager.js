import scrollMonitor from 'scrollmonitor';
import {setState} from './state';

export default class ScrollManager {
    constructor() {
        this.cache = this.cacheDom();
        this.bindEvents();
    }
    cacheDom() {
        return {
            _sections: [...document.querySelectorAll('.l-section')],
        }
    }
    bindEvents() {
        const { _sections } = this.cache;
        
        // creating objects that needs watching
        const watchers = _sections.map(_section => scrollMonitor.create(_section));
        
        // applying 'enter event' on each element
        watchers.map(watcher => 
            watcher.fullyEnterViewport(() => {
                setState(watcher.watchItem.dataset.id);
            })
        );
    }
}