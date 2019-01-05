import { template, domo, text, attr } from "./modules/domo/source/syntax.js";
import { DomoElement } from "./modules/domo/source/DomoElement.js";
import { Elemento } from "./modules/elemento/source/Elemento.js"

@Elemento.component({ extends: 'p' })

class XX extends HTMLParagraphElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected domo!
        : DomoElement

    protected text!
        : Text

    protected attr!
        : Attr

    protected template
        : HTMLTemplateElement
        = template(
            this.domo = domo`div`(
                this.text = text`oi`,
                this.attr = attr`class``inicial`,
            )
        )

    constructor() {
        super()
        this.template.content.appendChild(this.domo.cloneNode().raw)
        this.root.appendChild(this.template.content)
    }
}