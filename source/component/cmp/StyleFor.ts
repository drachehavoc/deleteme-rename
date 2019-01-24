import { component } from '../../modules/elemento/source/Elemento.js'
import { domo } from '../../modules/domo/source/syntax.js';

@component({ extends: 'link' })
export class CmpStyleFor extends HTMLLinkElement {
    private static _links
        : { [n: string]: HTMLTemplateElement }
        = {}

    private for
        : string[]

    constructor() {
        super()
        if (!this.hasAttribute('for'))
            throw 'ComStyleFor precisa ter o attributo for'

        this.for = (<string>this.getAttribute('for')).split(' ')

        this.for.forEach(name => {
            if (!CmpStyleFor._links[name])
                CmpStyleFor._links[name] = document.createElement('template')
        })
    }

    connectedCallback() {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = this.href
        this.for.forEach(name => CmpStyleFor._links[name].content.appendChild( link.cloneNode() ))
    }

    static import(name: string) {
        if (!CmpStyleFor._links[name])
            throw `nenhum CmpStyleFor definido com a propriedade 'for' contendo o sguinte valor: ${name}`
        return CmpStyleFor._links[name].content.cloneNode(true)
    }
}