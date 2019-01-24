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
        box-sizing: border-box
    }

    :host {
        flex: none;
        display: block;
        --i--size: var(--size, 20px);
        width: var(--i--size);
    }

    div.back {
        flex: none;
        display: block;
        position: relative;
        --i--size: var(--size, 20px);
        width: var(--i--size);
        padding-top: calc(var(--i--size) * 1.15);
        background-image: url(hexagon.svg);
        background-size: cover;

        clip-path: polygon(
            0% 75%, 0% 25%,
            50% 0, 
            100% 25%, 100% 75%,
            50% 100%);
    }
`;
let PrjBadge = class PrjBadge extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(style.cloneNode(), domo `div.back`());
        this.root.appendChild(this.template.content);
    }
    connectedCallback() {
        let parent = this.parentElement;
        let size = 100 / parseInt(parent.dataset.perLine || '1');
        parent.style.setProperty(`--size`, `${size}%`);
    }
};
PrjBadge = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], PrjBadge);
//# sourceMappingURL=Badge.js.map