import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';

@component()
class PrjBadges extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected maxPerLine
        = 10

    protected content!
        : DomoElement

    protected badge
        : DomoElement
        = domo`div.badge`()

    protected template
        : HTMLTemplateElement
        = template(
            css`
                * {
                    box-sizing: border-box    
                }

                :host {
                    display: grid;
                }

                content {
                    display: grid;
                    grid-gap: 3px;
                    grid-template-columns: repeat(${this.maxPerLine*2}, 1fr);
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

                content .badge:nth-child(${(this.maxPerLine*2)-1}n+1) {
                    grid-column-start: 2
                }

                content .badge:hover {
                    transform: scale(2);
                    z-index: 1;
                    position: relative;
                }
            `,
            this.content =
            domo`content`()
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
        this.content.raw.style.setProperty('--per-line', this.maxPerLine.toString())
        let total = 28  
        while (total--) {
            this.content.append(this.badge.cloneNode())
        }
    }
}
