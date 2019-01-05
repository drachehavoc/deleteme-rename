export class Elemento {
    static component(options) {
        return (constructor) => {
            let tagName = constructor.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
            if (!tagName.includes('-'))
                throw `Domo WebComponent Class needs a composite name, class '${constructor.name}' can't be a webComponent class.`;
            window.customElements.define(tagName, constructor, options);
        };
    }
}
//# sourceMappingURL=Elemento.js.map