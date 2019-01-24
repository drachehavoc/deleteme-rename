import { component } from '../../modules/elemento/source/Elemento.js'

@component({ extends: 'link' })
export class CmpStyleGlobal extends HTMLLinkElement {
    private static _links
        : HTMLTemplateElement
        = document.createElement('template')

    constructor() {
        super()
    }
    
    connectedCallback() {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = this.href
        CmpStyleGlobal._links.content.appendChild(link)
    }

    static import() {
        return CmpStyleGlobal._links.content.cloneNode(true) 
    }
}