import {state} from './state';

export default class Controls {
    constructor() {
        this.cache = this.cacheDom();
        this.lastSlide = false;
        this.bindEvents();
    }

    cacheDom() {
        return {
            _navItems: [...document.querySelectorAll('.m-navigation__item')],
            _stepItems: [...document.querySelectorAll('.m-stepper__item')],
            _anchor: document.querySelector('.m-anchor'),
            _anchorText: document.querySelector('.m-anchor__name')
        }
    }

    bindEvents() {
        ee.addListener('STATE_CHANGED', this.updateUI.bind(this));
    }

    updateNavigation(state) {
        const { _navItems } = this.cache;
        _navItems.forEach(item => item.classList.remove('is-active'));
        _navItems[state.id].classList.add('is-active'); 
    }

    updateStepper(state) {
        const { _stepItems } = this.cache;
        _stepItems.forEach(item => item.classList.remove('is-active'));
        _stepItems[state.id].classList.add('is-active');
    }

    updateAnchor(state) {
        const { _anchor,_anchorText } = this.cache;
        const hash = state.hash[state.id + 1] || '';

        _anchorText.innerHTML = state.slides[state.id + 1] || '';
        _anchor.href = `#${hash}`;
        
        if(state.id === state.slides.length - 1) {
            _anchor.style.opacity = 0;
            this.lastSlide = true;
        } else {
            if(!this.lastSlide) return;
            _anchor.style.opacity = 1;
            this.lastSlide = false;
        }
    }

    updateUrl(state) {
        window.location.hash = state.hash[state.id];
    }

    updateUI() {
        this.updateNavigation(state);
        this.updateStepper(state);
        this.updateAnchor(state);
        this.updateUrl(state);
    }
}