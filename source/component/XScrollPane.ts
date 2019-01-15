import { component } from '../modules/elemento/source/Elemento.js'
import { template, domo, css, text, evnt, attr } from '../modules/domo/source/syntax.js';
import { DomoElement } from '../modules/domo/source/DomoElement.js';

const style = css`
    * {
        
    }

    :host {
        display: block;
    }

    main::-webkit-scrollbar { 
        width: 0 !important; 
        height: 0 !important; 
    }

    content {
        position: relative;
        display: block;
        width: 100%; 
        height: 100%; 
    }

    main {
        position: relative;
        display: block;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        scrollbar-width: none;
        /* background: red; */
    }

    slot {
        display: block
    }

    .holder {
        --i-radius: var(--radius, 5px);
        --i-thickness: var(--thickness, 5px);
        --i-length: var(--length, 100px);
        --i-distance: var(--distance, 3px);
        --i-color: var(--color, rgba(0, 0, 0, .5));
        background: var(--i-color);
        border-radius: var(--i-radius);
        border: 1px solid var(--color-border, rgba(255, 255, 255, .5));
    }

    .holder-y {
        position: absolute;
        width: var(--i-thickness);
        height: var(--i-length);
        z-index: 99999;
        right: var(--i-distance);
        top: var(--scroll-y);
        transform: translateY(calc(var(--scroll-y) * -1));
    }

    .holder-x {
        position: absolute;
        width: var(--i-length);
        height: var(--i-thickness);
        z-index: 99999;
        bottom: var(--i-distance);
        left: var(--scroll-x);
        transform: translateX(calc(var(--scroll-x) * -1));
    }
`

@component()
class XScrollPane extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected content!
        : DomoElement

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            domo`content`(
                evnt`mousedown``${ev => this._startBoth(<MouseEvent>ev)}`,
                domo`div`(
                    evnt`mousedown``${ev => this._startY()}`,
                    attr`class``holder holder-y`
                ),
                domo`div`(
                    evnt`mousedown``${ev => this._startX()}`,
                    attr`class``holder holder-x`
                ),
                this.content =
                domo`main`(
                    evnt`scroll``${ev => this._scrolling(ev)}`,
                    domo`slot`(
                        text`...`
                    )
                )
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
    }

    // --- MOVE BARS -----------------------------------------------------------

    _scrolling(ev: Event) {
        let totalY = this.content.raw.scrollHeight - this.content.raw.offsetHeight
        let totalX = this.content.raw.scrollWidth - this.content.raw.offsetWidth
        let currentY = this.content.raw.scrollTop
        let currentX = this.content.raw.scrollLeft
        let percentageY = (currentY / totalY) * 100
        let percentageX = (currentX / totalX) * 100
        this.style.setProperty('--scroll-y', `${percentageY}%`)
        this.style.setProperty('--scroll-x', `${percentageX}%`)
    }

    // --- MOVE Y --------------------------------------------------------------

    _callbackMoveY = (ev: MouseEvent) => {
        ev.preventDefault()
        let h = this.content.raw.offsetHeight
        let s = this.content.raw.scrollHeight
        let y = ev.movementY * (s / h)
        this.content.raw.scrollBy(0, y)
    }

    _callbackStopY = () => {
        window.removeEventListener('mousemove', this._callbackMoveY)
        window.removeEventListener('mouseup', this._callbackStopY)
    }

    _startY() {
        window.addEventListener('mousemove', this._callbackMoveY)
        window.addEventListener('mouseup', this._callbackStopY)
    }

    // --- MOVE X --------------------------------------------------------------

    _callbackMoveX = (ev: MouseEvent) => {
        ev.preventDefault()
        let w = this.content.raw.offsetWidth
        let s = this.content.raw.scrollWidth
        let x = ev.movementX * (s / w)
        this.content.raw.scrollBy(x, 0)
    }

    _callbackStopX = () => {
        window.removeEventListener('mousemove', this._callbackMoveX)
        window.removeEventListener('mouseup', this._callbackStopX)
    }

    _startX() {
        window.addEventListener('mousemove', this._callbackMoveX)
        window.addEventListener('mouseup', this._callbackStopX)
    }

    // --- MOVE BOTH -----------------------------------------------------------

    _callbackStopBoth = (ev: KeyboardEvent) => {
        if (ev.key == 'Control') {
            window.removeEventListener('mousemove', this._callbackMoveY)
            window.removeEventListener('mousemove', this._callbackMoveX)
            window.removeEventListener('keyup', this._callbackStopBoth)
        }
    }

    _startBoth(ev: MouseEvent) {
        if (ev.ctrlKey) {
            window.addEventListener('mousemove', this._callbackMoveY)
            window.addEventListener('mousemove', this._callbackMoveX)
            window.addEventListener('keyup', this._callbackStopBoth)
        }
    }
}