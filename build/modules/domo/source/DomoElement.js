import { DomoEvent } from "./DomoEvent.js";
export class DomoElement {
    constructor(tagOrNode, ...elements) {
        this._children = [];
        this._clonableNodes = [];
        tagOrNode instanceof HTMLElement
            ? this._domElement = tagOrNode
            : this._domElement = document.createElement(tagOrNode);
        this._elements = elements;
        DomoElement._limbo.appendChild(this._domElement);
        this._elements.forEach(el => this.append(el));
    }
    get raw() {
        return this._domElement;
    }
    get attr() {
        return this._domElement.attributes;
    }
    append(el) {
        switch (el.constructor) {
            case DomoElement:
                let domo = el;
                this._children.push(domo);
                this._clonableNodes.push(domo);
                this._domElement.appendChild(domo.raw);
                break;
            case DomoEvent:
                let evt = el;
                this._clonableNodes.push(evt);
                this._domElement.addEventListener(evt.name, evt.callback, evt.capturing);
                break;
            case Text:
                let txt = el;
                this._clonableNodes.push(txt);
                this._domElement.appendChild(txt);
                break;
            case String:
                let str = new Text(el);
                this._clonableNodes.push(str);
                this._domElement.appendChild(str);
                break;
            case Attr:
                let attr = el;
                this._domElement.setAttributeNode(attr);
                break;
        }
    }
    cloneNode() {
        let clonedNodes = [];
        let domClone = this._domElement.cloneNode();
        clonedNodes = (this._clonableNodes.map(el => el.cloneNode()));
        return new DomoElement(domClone, ...clonedNodes);
    }
}
DomoElement._limbo = document.createElement('template').content;
//# sourceMappingURL=DomoElement.js.map