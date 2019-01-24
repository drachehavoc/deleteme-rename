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
        display: block;
        width: 800px;
        height: 600px;
    }

    content {
        display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
    }

    content main {
        display: block;
        width: 100%;
        height: 100%;
    }

    content main {
        position: relative;
    }

    content main slot {
        display: block;
        height: fit-content;
        min-width: 100%;
        min-height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: .3s;
        opacity: 0;
        visibility: hidden;
    }

    content main slot.open {
        opacity: 1;
        visibility: visible;
    }
`;
let CmpSlotManager = class CmpSlotManager extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.currSlot = null;
        this.template = template(style.cloneNode(), this.container =
            domo `content`(domo `slot`(), this.main =
                domo `main`()));
        this.root.appendChild(this.template.content);
        this._getSlots();
    }
    _getSlots() {
        this.querySelectorAll('[slot]').forEach(el => {
            let slot = document.createElement('slot');
            slot.name = el.slot;
            this.main.raw.appendChild(slot);
        });
        let firstSlot = this.main.raw.querySelector('slot');
        if (firstSlot) {
            firstSlot.classList.add('open');
        }
    }
    open(name) {
        let nextSlot = this.main.raw.querySelector(`slot[name=${name}]`);
        if (nextSlot) {
            nextSlot.classList.add('open');
            if (this.currSlot)
                this.currSlot.classList.remove('open');
            this.currSlot = nextSlot;
        }
    }
};
CmpSlotManager = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], CmpSlotManager);
//# sourceMappingURL=SlotManager.js.map