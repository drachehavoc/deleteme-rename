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
import { template, domo, css } from '../../modules/domo/source/syntax.js';
const style = css `
    * {
        box-sizing: border-box;
        outline: none;
    }
    
    :host {
        display: inline-block;
        cursor: pointer;
        outline: none;
    }
    
    content {
        --radius: 5px;
        display: block;
        position: relative;
        border-radius: var(--radius);
        overflow: hidden
    }

    content:after {
        content: ' ';
        position: absolute;
        top: -100%;
        left: 0;
        right: -100%;
        bottom: 0;
        background: var(--color-spotlight);
        opacity: 1;
        transition: .5s;
        transform-origin: 0% 100%;
        transform: rotate(-180deg);
    }
    
    :host(:focus) content:after,
    content:hover:after {
        opacity: .2;
        filter: brightness(150%);
        transform: rotate(0deg);
    }

    slot {
        display: block;
        color: var(--color-spotlight);
        border-radius: var(--radius);
        border: 2px solid var(--color-font-dim);
        overflow: hidden;
        position: relative;
        z-index: 1;
        padding: .5em;
        transition: 1s
    }

    :host(:focus) slot,
    content:hover slot {
        border: 2px solid var(--color-spotlight);
        color: var(--color-font)
    }
`;
let CmpButton = class CmpButton extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(style.cloneNode(), domo `content`(domo `slot`()));
        this.root.appendChild(this.template.content);
    }
    connectedCallback() {
        if (!this.hasAttribute('tabIndex'))
            this.setAttribute('tabIndex', "0");
    }
};
CmpButton = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], CmpButton);
//# sourceMappingURL=Button.js.map