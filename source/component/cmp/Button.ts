import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';


const style = css`
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
        height: 100%;   
        display: block;
        position: relative;
        border-radius: var(--radius);
        overflow: hidden;
        --i--color-main: var(--color-spotlight);
    }

    content:after {
        content: ' ';
        position: absolute;
        top: -100%;
        left: 0;
        right: -100%;
        bottom: 0;
        background: var(--i--color-main);
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
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--i--color-main);
        border-radius: var(--radius);
        border: 2px solid var(--i--color-main);
        overflow: hidden;
        position: relative;
        z-index: 1;
        padding: .5em;
        transition: 1s
    }

    :host(:focus) slot,
    content:hover slot {
        border: 2px solid var(--i--color-main);
        color: var(--color-font)
    }

    /* ---------------------------------------------------------------------- */

    :host([type=link]) slot {
        border: 0 none
    }

    /* ---------------------------------------------------------------------- */

    :host([type=light]) content {
        --i--color-main: var(--color-font)
    }
    
    :host([type=light]) slot {
        border: 0 none;
        color: var(--color-font-dim)
    }

    :host([type=light]:hover) slot {
        border: 0 none;
        color: var(--color-font)
    }

    /* ---------------------------------------------------------------------- */

    :host([type=success]) content {
        --i--color-main: #28a745
    }

    :host([type=danger]) content {
        --i--color-main: #dc3545
    }

    :host([type=warning]) content {
        --i--color-main: #ffc107
    }

    :host([type=info]) content {
        --i--color-main: #17a2b8
    }

`

@component()
class CmpButton extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            domo`content`(
                domo`slot`()
            )
        )

    constructor() {
        super();
        this.root.appendChild(this.template.content)
    }


    connectedCallback() {
        if (!this.hasAttribute('tabIndex'))
            this.setAttribute('tabIndex', "0");
    }
}
