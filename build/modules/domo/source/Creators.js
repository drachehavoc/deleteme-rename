import { DomoElement } from './DomoElement.js';
import { DomoEvent } from './DomoEvent.js';
export class Creator {
    static template(...domos) {
        let template = document.createElement('template');
        domos.forEach(domo => template.content.appendChild(domo.raw));
        return template;
    }
    static domo(tagname, ...elements) {
        return new DomoElement(tagname, ...elements);
    }
    static attr(key, value = null) {
        let attr = document.createAttribute(key);
        if (value)
            attr.value = value;
        return attr;
    }
    static text(text) {
        return document.createTextNode(text);
    }
    static evnt(eventname, callback, captureOrOptions = false) {
        return new DomoEvent(eventname, callback, captureOrOptions);
    }
}
//# sourceMappingURL=Creators.js.map