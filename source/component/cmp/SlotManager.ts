import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css, text, evnt, attr } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';

const style = css`
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
`

@component()
class CmpSlotManager extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected container!
        : DomoElement

    protected main!
        : DomoElement

    protected currSlot
        : null | HTMLSlotElement
        = null

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            this.container =
            domo`content`(
                domo`slot`(),
                this.main =
                domo`main`()
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
        this._getSlots()
    }

    private _getSlots() {
        this.querySelectorAll('[slot]').forEach(el => {
            let slot = document.createElement('slot')
            slot.name = el.slot
            this.main.raw.appendChild(slot)
        })

        let firstSlot = this.main.raw.querySelector('slot')
        if (firstSlot) {
            firstSlot.classList.add('open')
        }
    }

    open(name: string) {
        let nextSlot = <HTMLSlotElement>this.main.raw.querySelector(`slot[name=${name}]`)
        if (nextSlot) {
            nextSlot.classList.add('open')
            if (this.currSlot)
                this.currSlot.classList.remove('open')
            this.currSlot = nextSlot
        }
    }
}