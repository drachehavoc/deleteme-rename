import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css, evnt, attr } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';

const style = css`
    * {
        box-sizing: border-box        
    }

    :host {
        display: block;
        height: 75px;
        overflow: hidden;
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
    }

    slot {
        display: block
    }

    .scroll-y-true .holder-y,
    .scroll-x-true .holder-x {
        opacity: 1;
        visibility: visible;
    }

    .holder {
        --i--scroll-radius: var(--scroll-radius, 5px);
        --i--scroll-thickness: var(--scroll-thickness, 5px);
        --i--scroll-length: var(--scroll-length, 30px);
        --i--scroll-distance: var(--scroll-distance, 3px);
        --i--scroll-color: var(--scroll-color, rgba(0, 0, 0, .5));
        background: var(--i--scroll-color);
        border-radius: var(--i--scroll-radius);
        border: 1px solid var(--scroll-color-border, rgba(255, 255, 255, .5));
        transition: 
            visibility .3s,
            opacity .3s;
        opacity: 0;
        visibility: hidden;
    }

    .holder-y {
        position: absolute;
        width: var(--i--scroll-thickness);
        height: var(--i--scroll-length);
        z-index: 99999;
        right: var(--i--scroll-distance);
        top: calc(var(--scroll-y) * 100%);
        transform: translateY(calc(var(--scroll-y) * -100%));
    }

    .holder-x {
        position: absolute;
        width: var(--i--scroll-length);
        height: var(--i--scroll-thickness);
        z-index: 99999;
        bottom: var(--i--scroll-distance);
        left: calc(var(--scroll-x   ) * 100%);
        transform: translateX(calc(var(--scroll-x) * -100%));
    }
`

@component()
class CmpScrollPane extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected container!
        : DomoElement

    protected main!
        : DomoElement

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            this.container =
            domo`content`(
                evnt`mousedown``${ev => this._startBoth(<MouseEvent>ev)}`,
                evnt`mouseenter``${ev => this._checkbars(<MouseEvent>ev)}`,
                evnt`mouseleave``${ev => this._hidebars(<MouseEvent>ev)}`,
                domo`div.holder.holder-y`(
                    evnt`mousedown``${ev => this._startY(<MouseEvent>ev)}`,
                ),
                domo`div.holder.holder-x`(
                    evnt`mousedown``${ev => this._startX(<MouseEvent>ev)}`,
                ),
                this.main =
                domo`main`(
                    evnt`scroll``${ev => this._scrolling(<UIEvent>ev)}`,
                    domo`slot`(
                        `...`
                    )
                )
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
    }

    // --- CHECK IF IT HAS BARS ------------------------------------------------

    private _checkbars(ev: MouseEvent) {
        if (this.main.raw.scrollHeight > this.offsetHeight) {
            this.container.raw.classList.add('scroll-y-true')
        } else {
            this.container.raw.classList.remove('scroll-y-true')
        }

        if (this.main.raw.scrollWidth > this.offsetWidth) {
            this.container.raw.classList.add('scroll-x-true')
        } else {
            this.container.raw.classList.remove('scroll-x-true')
        }
    }

    private _hidebars(ev: MouseEvent) {
        this.container.raw.classList.remove('scroll-y-true')
        this.container.raw.classList.remove('scroll-x-true')
    }

    // --- MOVE BARS -----------------------------------------------------------

    private _scrolling(ev: UIEvent) {
        let y = this.main.raw.scrollTop / (this.main.raw.scrollHeight - this.main.raw.offsetHeight)
        let x = this.main.raw.scrollLeft / (this.main.raw.scrollWidth - this.main.raw.offsetWidth)
        this.container.raw.style.setProperty('--scroll-y', `${y}`)
        this.container.raw.style.setProperty('--scroll-x', `${x}`)
    }

    // --- MOVE Y --------------------------------------------------------------

    private _callbackMoveY = (ev: MouseEvent) => {
        ev.preventDefault()
        let h = this.main.raw.offsetHeight
        let s = this.main.raw.scrollHeight
        let y = ev.movementY * (s / h)
        this.main.raw.scrollBy(0, y)
    }

    private _callbackStopY = (ev: MouseEvent) => {
        window.removeEventListener('mousemove', this._callbackMoveY)
        window.removeEventListener('mouseup', this._callbackStopY)
    }

    private _startY(ev: MouseEvent) {
        window.addEventListener('mousemove', this._callbackMoveY)
        window.addEventListener('mouseup', this._callbackStopY)
    }

    // --- MOVE X --------------------------------------------------------------

    private _callbackMoveX = (ev: MouseEvent) => {
        ev.preventDefault()
        let w = this.main.raw.offsetWidth
        let s = this.main.raw.scrollWidth
        let x = ev.movementX * (s / w)
        this.main.raw.scrollBy(x, 0)
    }

    private _callbackStopX = (ev: MouseEvent) => {
        window.removeEventListener('mousemove', this._callbackMoveX)
        window.removeEventListener('mouseup', this._callbackStopX)
    }

    private _startX(ev: MouseEvent) {
        window.addEventListener('mousemove', this._callbackMoveX)
        window.addEventListener('mouseup', this._callbackStopX)
    }

    // --- MOVE BOTH -----------------------------------------------------------

    private _callbackStopBoth = (ev: MouseEvent) => {
        window.removeEventListener('mousemove', this._callbackMoveY)
        window.removeEventListener('mousemove', this._callbackMoveX)
        window.removeEventListener('mouseup', this._callbackStopBoth)
    }

    private _startBoth(ev: MouseEvent) {
        if (ev.ctrlKey) {
            ev.preventDefault()
            window.addEventListener('mousemove', this._callbackMoveY)
            window.addEventListener('mousemove', this._callbackMoveX)
            window.addEventListener('mouseup', this._callbackStopBoth)
        }
    }
}