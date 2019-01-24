var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CmpStyleFor_1;
import { component } from '../../modules/elemento/source/Elemento.js';
let CmpStyleFor = CmpStyleFor_1 = class CmpStyleFor extends HTMLLinkElement {
    constructor() {
        super();
        if (!this.hasAttribute('for'))
            throw 'ComStyleFor precisa ter o attributo for';
        this.for = this.getAttribute('for').split(' ');
        this.for.forEach(name => {
            if (!CmpStyleFor_1._links[name])
                CmpStyleFor_1._links[name] = document.createElement('template');
        });
    }
    connectedCallback() {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = this.href;
        this.for.forEach(name => CmpStyleFor_1._links[name].content.appendChild(link.cloneNode()));
    }
    static import(name) {
        if (!CmpStyleFor_1._links[name])
            throw `nenhum CmpStyleFor definido com a propriedade 'for' contendo o sguinte valor: ${name}`;
        return CmpStyleFor_1._links[name].content.cloneNode(true);
    }
};
CmpStyleFor._links = {};
CmpStyleFor = CmpStyleFor_1 = __decorate([
    component({ extends: 'link' }),
    __metadata("design:paramtypes", [])
], CmpStyleFor);
export { CmpStyleFor };
//# sourceMappingURL=StyleFor.js.map