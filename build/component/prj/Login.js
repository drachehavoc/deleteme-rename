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
import '../cmp/Input.js';
import '../cmp/MaterialIcon.js';
import '../cmp/Button.js';
const style = css `
    :host {
        width: 100%;
        height: 100%;
        display: block;
    }

    content {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.modal {
        width: 420px;
        padding: 2em;
        background: #FFF;
        border-radius: 8px;
        border: 1px solid #00000020;
        box-shadow: 0 15px 70px -30px #000000;
    }

    div.modal cmp-input:nth-child(1n+3) {
        margin: 1em 0;
    }
    
    slot {
        display: block;
        margin: 0 0 2em 0 ;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
`;
let PrjLogin = class PrjLogin extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.template = template(style.cloneNode(), this.container =
            domo `content`(domo `div.modal`(domo `slot`('slot'), domo `cmp-input`('login'), domo `cmp-input`('senha'), domo `div.buttons`(domo `cmp-button[type=light]`('recuperar senha'), domo `cmp-button`(domo `cmp-material-icon`('account_circle'), 'logar-se')))));
        this.root.appendChild(this.template.content);
    }
};
PrjLogin = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], PrjLogin);
//# sourceMappingURL=Login.js.map