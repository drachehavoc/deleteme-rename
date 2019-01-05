class Attribute {
    static reflect(desc = {}) {
        return (target, key) => {
            const constructor = target.constructor;
            if (!constructor.observedAttributes) {
                // define once
                // observedAttributes and _domo
                constructor.observedAttributes = [];
                target._domo = {};
                // attribute to property
                // ex: element.setAttribute(attr, val)
                let oldAttributeChangedCallback = target.attributeChangedCallback;
                target.attributeChangedCallback = function (...p) {
                    let [key, oldVal, newVal] = [...p];
                    if (this._domo[key].set)
                        this._domo[key].value = this._domo[key].set(newVal, this);
                    else
                        this._domo[key].value = newVal;
                    if (oldAttributeChangedCallback)
                        oldAttributeChangedCallback.bind(this)(...p);
                };
            }
            // if defined 
            // just skip
            if (target._domo[key])
                return;
            // add item to observedAttributes list
            //
            constructor.observedAttributes.push(key);
            // set descriptor
            //
            target._domo[key] = {
                value: null,
                get: function () { return this.value; },
                set: (v) => v,
            };
            Object.assign(target._domo[key], desc);
            // property to attribute
            // ex: obj.prop = val
            Object.defineProperty(target, key, {
                get() {
                    return this._domo[key].get();
                },
                set(v) {
                    this.setAttribute(key, v.toString());
                    this._domo[key].value = this._domo[key].set(v, this);
                }
            });
        };
    }
}
export class Elemento {
    static component(options) {
        return (constructor) => {
            let tagName = constructor.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
            if (!tagName.includes('-'))
                throw `Domo WebComponent Class needs a composite name, class '${constructor.name}' can't be a webComponent class.`;
            window.customElements.define(tagName, constructor, options);
        };
    }
    static get attr() {
        return Attribute;
    }
}
//# sourceMappingURL=Elemento.js.map