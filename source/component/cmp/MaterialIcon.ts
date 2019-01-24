import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css } from '../../modules/domo/source/syntax.js';
import { CmpStyleFor } from './StyleFor.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';

const style = css`
    * {
        box-sizing: border-box    
    }

    :host {
        display: inline-block;
        content: "error";
        vertical-align:  middle;
    }
`

@component()
class CmpMaterialIcon extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected icon!
        : DomoElement

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            this.icon =
            domo`i.material-icons`()
        )

    constructor() {
        super()
        this.root.appendChild(CmpStyleFor.import('material-icon'))
    }

    connectedCallback() {
        this.root.appendChild(this.template.content)
        this.icon.raw.textContent =
            this.textContent
            || (<string>getComputedStyle(this).content).replace(/"/g, '')
    }
}