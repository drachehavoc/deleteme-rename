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
import { CmpStyleFor } from './StyleFor.js';
const style = css `
    * {
        box-sizing: border-box    
    }

    :host {
        display: inline-block;
        content: "error";
        vertical-align:  middle;
    }
`;
let CmpMaterialIcon = class CmpMaterialIcon extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(style.cloneNode(), this.icon =
            domo `i.material-icons`());
        this.root.appendChild(CmpStyleFor.import('material-icon'));
    }
    connectedCallback() {
        this.root.appendChild(this.template.content);
        this.icon.raw.textContent =
            this.textContent
                || getComputedStyle(this).content.replace(/"/g, '');
    }
};
CmpMaterialIcon = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], CmpMaterialIcon);
//# sourceMappingURL=MaterialIcon.js.map