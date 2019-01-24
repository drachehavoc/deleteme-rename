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
let PrjBadges = class PrjBadges extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.maxPerLine = 10;
        this.badge = domo `div.badge`();
        this.template = template(css `
                * {
                    box-sizing: border-box    
                }

                :host {
                    display: grid;
                }

                content {
                    display: grid;
                    grid-gap: 3px;
                    grid-template-columns: repeat(${this.maxPerLine * 2}, 1fr);
                    padding: 1em;
                }

                content .badge {
                    flex: none;
                    grid-column: auto / span 2;
                    overflow: hidden;
                    /* background-image: url(hexagon.svg); */
                    background-color: #000000;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 90%;
                    clip-path: polygon(0% 75%, 0% 25%, 50% 0, 100% 26%, 100% 75%, 50% 100%);
                    transition: .3s;
                    cursor: pointer;
                }
                
                content .badge:after {
                    content: "";
                    padding-bottom: calc(100% * 1.15);
                    display: inline-block;
                    float: left;
                }
                
                content .badge:nth-child(1n+${this.maxPerLine}) {
                    margin-top: -30%    
                }

                content .badge:nth-child(${(this.maxPerLine * 2) - 1}n+1) {
                    grid-column-start: 2
                }

                content .badge:hover {
                    transform: scale(2);
                    z-index: 1;
                    position: relative;
                }
            `, this.content =
            domo `content`());
        this.root.appendChild(this.template.content);
        this.content.raw.style.setProperty('--per-line', this.maxPerLine.toString());
        let total = 28;
        while (total--) {
            this.content.append(this.badge.cloneNode());
        }
    }
};
PrjBadges = __decorate([
    component(),
    __metadata("design:paramtypes", [])
], PrjBadges);
//# sourceMappingURL=Badges.js.map