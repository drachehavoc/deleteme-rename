var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { template, domo, text, attr } from "./modules/domo/source/syntax.js";
import { Elemento } from "./modules/elemento/source/Elemento.js";
let XX = class XX extends HTMLParagraphElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(this.domo = domo `div`(this.text = text `oi`, this.attr = attr `class` `inicial`));
        this.template.content.appendChild(this.domo.cloneNode().raw);
        this.root.appendChild(this.template.content);
    }
};
XX = __decorate([
    Elemento.component({ extends: 'p' }),
    __metadata("design:paramtypes", [])
], XX);
//# sourceMappingURL=main.js.map