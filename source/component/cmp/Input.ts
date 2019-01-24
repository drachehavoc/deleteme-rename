import { component } from "../../modules/elemento/source/Elemento.js";
import { template, css, domo, evnt } from "../../modules/domo/source/syntax.js";
import { DomoElement } from "../../modules/domo/source/DomoElement.js";
import '../cmp/ScrollPane.js'

const style = css`
    * {
        box-sizing: border-box;
        outline: none;
    }
    
    :host {
        content: "placeholder";
        display: block;
        outline: none;
    }
    
    content {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        --i--padding: 1em;
        --i--wordsize: 200px;
        --i--border: var(--border, 2px);
        --i--start: calc(var(--i--border) + var(--i--padding)); 
        --i--end: var(--i--start);
    }

    div.border {
        --i--borde-size: calc(var(--i--border) + 2px);
        border: var(--i--border) solid;
        border-color: var(--color-font-dim);
        border-radius: 5px;
        display: block;
        width: 100%;
        height: 100%;
        transition: .3s;
        clip-path: polygon(
            /* POINT A */ 0 0, 
            /* GAP A   */ var(--i--start) 0, var(--i--start) var(--i--borde-size), 
            /* GAP B   */ var(--i--end) var(--i--borde-size), var(--i--end) 0,
            /* POINT B */ 100% 0, 
            /* POINT C */ 100% 100%, 
            /* POINT D */ 0 100%);
    }

    content.not-empty div.border {
        border-color: red;
    }
    content.focus div.border {
        border-color: var(--color-spotlight);
    }

    content.not-empty div.border,
    content.focus div.border {
        --i--end: calc(var(--i--wordsize) + var(--i--start));
    }


    div.border cmp-scroll-pane {
        width: 100%;
        height: 100%
    }

    .input {
        outline: none;
        display: inline-block;
        min-width: 100%;
        padding: var(--i--padding);
    }

    .input:before { 
        /* gabiarra pro firefox 
           manter o tamanho do elemento
           mesmo se ele estiver vazio */
        content: '&';
        display: inline-block;
        visibility: hidden;
        width: 0
    }

    .input.no-nl br {
        display: none
    }

    div.placeholder {
        --i--scale: 1;
        position: absolute;
        z-index: 1;
        color: var(--color-font);
        transform: translateY(-50%) scale(var(--i--scale));
        left: calc(var(--i--start));
        top: 50%;
        transition: .3s;
    }
    
    content.not-empty div.placeholder {
        color: red;
    }

    content.focus div.placeholder  {
        color: var(--color-spotlight);
    }
    content.not-empty div.placeholder,
    content.focus div.placeholder  {
        --i--scale: .95;
        top: 0%;
    }
`

@component()
class CmpInput extends HTMLElement {
    private root
        : ShadowRoot
        = this.attachShadow({
            mode: 'open',
            delegatesFocus: true
        })

    private container!
        : DomoElement

    private placeholder!
        : DomoElement

    private input!
        : DomoElement

    private template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            this.container =
            domo`content`(
                this.placeholder =
                domo`div.placeholder`(),
                domo`div.border`(
                    domo`cmp-scroll-pane`(
                        this.input =
                        domo`span.input.no-nl[contenteditable=true][tabindex=1]`(
                            evnt`focus``${this._onFocus.bind(this)}`,
                            evnt`blur``${this._onBlur.bind(this)}`,
                            evnt`input``${this._onInput.bind(this)}`
                        )
                    )
                )
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
    }

    _onInput(ev: Event) {
        console.log('Baby shark, doo doo doo doo doo doo ')
    }

    _onFocus(ev: Event) {
        this.container.raw.style.setProperty('--i--wordsize', `${this.placeholder.raw.offsetWidth}px`)
        this.container.raw.classList.add('focus')
    }

    _onBlur(ev: Event) {
        if (!this.input.raw.textContent) {
            this.container.raw.classList.remove('not-empty')
        } else {
            this.container.raw.classList.add('not-empty')
        }
        this.container.raw.classList.remove('focus')
    }

    connectedCallback() {
        if (!this.hasAttribute('tabIndex'))
            this.setAttribute('tabIndex', "0");

        this.placeholder.raw.innerText
            = this.textContent
            || (<string>getComputedStyle(this).content).replace(/"/g, '')
    }

}