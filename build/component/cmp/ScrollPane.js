var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { component } from '../../modules/elemento/source/Elemento.js';
import { template, domo, css, evnt } from '../../modules/domo/source/syntax.js';
const style = css `
    * {
        box-sizing: border-box        
    }

    :host {
        display: block;
        height: 75px;
        overflow: hidden;
    }

    main::-webkit-scrollbar { 
        width: 0 !important; 
        height: 0 !important; 
    }

    content {
        position: relative;
        display: block;
        width: 100%; 
        height: 100%; 
    }

    main {
        position: relative;
        display: block;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        scrollbar-width: none;
    }

    slot {
        display: block
    }

    .scroll-y-true .holder-y,
    .scroll-x-true .holder-x {
        opacity: 1;
        visibility: visible;
    }

    .holder {
        --i--scroll-radius: var(--scroll-radius, 5px);
        --i--scroll-thickness: var(--scroll-thickness, 5px);
        --i--scroll-length: var(--scroll-length, 30px);
        --i--scroll-distance: var(--scroll-distance, 3px);
        --i--scroll-color: var(--scroll-color, rgba(0, 0, 0, .5));
        background: var(--i--scroll-color);
        border-radius: var(--i--scroll-radius);
        border: 1px solid var(--scroll-color-border, rgba(255, 255, 255, .5));
        transition: 
            visibility .3s,
            opacity .3s;
        opacity: 0;
        visibility: hidden;
    }

    .holder-y {
        position: absolute;
        width: var(--i--scroll-thickness);
        height: var(--i--scroll-length);
        z-index: 99999;
        right: var(--i--scroll-distance);
        top: calc(var(--scroll-y) * 100%);
        transform: translateY(calc(var(--scroll-y) * -100%));
    }

    .holder-x {
        position: absolute;
        width: var(--i--scroll-length);
        height: var(--i--scroll-thickness);
        z-index: 99999;
        bottom: var(--i--scroll-distance);
        left: calc(var(--scroll-x   ) * 100%);
        transform: translateX(calc(var(--scroll-x) * -100%));
    }
`;
let CmpScrollPane = class CmpScrollPane extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(style.cloneNode(), this.container =
            domo `content`(evnt `mousedown` `${ev => this._startBoth(ev)}`, evnt `mouseenter` `${ev => this._checkbars(ev)}`, evnt `mouseleave` `${ev => this._hidebars(ev)}`, domo `div.holder.holder-y`(evnt `mousedown` `${ev => this._startY(ev)}`), domo `div.holder.holder-x`(evnt `mousedown` `${ev => this._startX(ev)}`), this.main =
                domo `main`(evnt `scroll` `${ev => this._scrolling(ev)}`, domo `slot`(`...`))));
        // --- MOVE Y --------------------------------------------------------------
        this._callbackMoveY = (ev) => {
            ev.preventDefault();
            let h = this.main.raw.offsetHeight;
            let s = this.main.raw.scrollHeight;
            let y = ev.movementY * (s / h);
            this.main.raw.scrollBy(0, y);
        };
        this._callbackStopY = (ev) => {
            window.removeEventListener('mousemove', this._callbackMoveY);
            window.removeEventListener('mouseup', this._callbackStopY);
        };
        // --- MOVE X --------------------------------------------------------------
        this._callbackMoveX = (ev) => {
            ev.preventDefault();
            let w = this.main.raw.offsetWidth;
            let s = this.main.raw.scrollWidth;
            let x = ev.movementX * (s / w);
            this.main.raw.scrollBy(x, 0);
        };
        this._callbackStopX = (ev) => {
            window.removeEventListener('mousemove', this._callbackMoveX);
            window.removeEventListener('mouseup', this._callbackStopX);
        };
        // --- MOVE BOTH -----------------------------------------------------------
        this._callbackStopBoth = (ev) => {
            window.removeEventListener('mousemove', this._callbackMoveY);
            window.removeEventListener('mousemove', this._callbackMoveX);
            window.removeEventListener('mouseup', this._callbackStopBoth);
        };
        this.root.appendChild(this.template.content);
    }
    // --- CHECK IF IT HAS BARS ------------------------------------------------
    _checkbars(ev) {
        if (this.main.raw.scrollHeight > this.offsetHeight) {
            this.container.raw.classList.add('scroll-y-true');
        }
        else {
            this.container.raw.classList.remove('scroll-y-true');
        }
        if (this.main.raw.scrollWidth > this.offsetWidth) {
            this.container.raw.classList.add('scroll-x-true');
        }
        else {
            this.container.raw.classList.remove('scroll-x-true');
        }
    }
    _hidebars(ev) {
        this.container.raw.classList.remove('scroll-y-true');
        this.container.raw.classList.remove('scroll-x-true');
    }
    // --- MOVE BARS -----------------------------------------------------------
    _scrolling(ev) {
        let y = this.main.raw.scrollTop / (this.main.raw.scrollHeight - this.main.raw.offsetHeight);
        let x = this.main.raw.scrollLeft / (this.main.raw.scrollWidth - this.main.raw.offsetWidth);
        this.container.raw.style.setProperty('--scroll-y', `${y}`);
        this.container.raw.style.setProperty('--scroll-x', `${x}`);
    }
    _startY(ev) {
        window.addEventListener('mousemove', this._callbackMoveY);
        window.addEventListener('mouseup', this._callbackStopY);
    }
    _startX(ev) {
        window.addEventListener('mousemove', this._callbackMoveX);
        window.addEventListener('mouseup', this._callbackStopX);
    }
    _startBoth(ev) {
        if (ev.ctrlKey) {
            ev.preventDefault();
            window.addEventListener('mousemove', this._callbackMoveY);
            window.addEventListener('mousemove', this._callbackMoveX);
            window.addEventListener('mouseup', this._callbackStopBoth);
        }
    }
};
CmpScrollPane = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], CmpScrollPane);
//# sourceMappingURL=ScrollPane.js.map