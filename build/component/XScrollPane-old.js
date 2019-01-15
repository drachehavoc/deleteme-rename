var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { component } from '../modules/elemento/source/Elemento.js';
import { template, domo, css, text, evnt, attr } from '../modules/domo/source/syntax.js';
let XScrollPaneOld = class XScrollPaneOld extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.css = css `
        * {
            
        }

        :host {
            display: block;
            width: 100px; 
            height: 100px; 
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
            background: red;
        }

        slot {
            display: block
        }

        .holder {
            --i-radius: var(--radius, 10px);
            --i-thickness: var(--thickness, 3px);
            --i-length: var(--length, 9px);
            --i-distance: var(--distance, 1px);
            --i-color: var(--color, rgba(0, 0, 0, .5));
            background: var(--i-color);
            border-radius: var(--i-radius)
        }

        .holder-y {
            position: absolute;
            width: var(--i-thickness);
            height: var(--i-length);
            z-index: 99999;
            right: var(--i-distance);
            top: var(--scroll-y);
            transform: translateY(calc(var(--scroll-y) * -1));
        }

        .holder-x {
            position: absolute;
            width: var(--i-length);
            height: var(--i-thickness);
            z-index: 99999;
            bottom: var(--i-distance);
            left: var(--scroll-x);
            transform: translateX(calc(var(--scroll-x) * -1));
        }
    `;
        this.template = template(this.css, domo `content`(domo `div`(attr `class` `holder holder-y`), domo `div`(attr `class` `holder holder-x`), this.content =
            domo `main`(evnt `scroll` `${ev => this._scrolling(ev)}`, domo `slot`(text `...`), this.endElement =
                domo `div`())));
        this.root.appendChild(this.template.content);
    }
    _scrolling(ev) {
        let totalY = this.content.raw.scrollHeight - this.content.raw.offsetHeight;
        let totalX = this.content.raw.scrollWidth - this.content.raw.offsetWidth;
        let currentY = this.content.raw.scrollTop;
        let currentX = this.content.raw.scrollLeft;
        let percentageY = (currentY / totalY) * 100;
        let percentageX = (currentX / totalX) * 100;
        this.style.setProperty('--scroll-y', `${percentageY}%`);
        this.style.setProperty('--scroll-x', `${percentageX}%`);
    }
};
XScrollPaneOld = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], XScrollPaneOld);
//# sourceMappingURL=XScrollPane-old.js.map