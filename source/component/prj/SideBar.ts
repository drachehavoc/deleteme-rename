import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css, evnt, attr } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';

const style = css`
    * {
        box-sizing: border-box    
    }

    :host {
        display: block;
        background: var(--color-main-deep);
    }

    content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .user {
        position: relative;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
    }

    .user .name {
        padding: 1em;
        text-align: center;
        grid-column: 1 / 11;
        align-self: center;
    }

    .user .name span {
        font-size: 60%;
        display: block;
    }

    .user .thumb {
        --i--size: 50%;
        box-shadow: 0 0 1px 2px var(--color-font-dim);
        border-radius: 50%;
        display: flex;
        position: relative;
        grid-column: 3 / 9;
        grid-row: 2 / 8;
    }

    .user .thumb:before {
        content: "";
        padding-top: 100%;
    }

    .user .thumb .image {
        width: 100%;
        background-size: cover;
        background-image: var(--user-thumb);
        margin: 4%;
        border-radius: 50%;
    }

    .user .settings {
        box-shadow: 0 0 1px 2px var(--color-font-dim);
        background: #FFF;
        border-radius: 50%;
        bottom: 5%;
        right: 25%;
        grid-column-start: 8;
        grid-row-start: 6;
        z-index: 1;
        width: 140%;
        position: relative;
    }

    .user .settings:after {
        content: "";
        float: left;
        padding-top: 100%
    }
    
    .user .settings > * {
        content: "settings";
        position: absolute;
        color: var(--color-font-dim);
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ego.user {
        grid-template-rows: repeat(10, 20px);
        cursor: pointer;
    }

    .ego.user .name {
        --scale: 1;
        color: #FFF;
        text-shadow: 2px 2px 10px #000;
        grid-column: -10 / -3;
        grid-row: -2 / -1;
        z-index: 1;
        padding: 0;
        text-align: left;
        font-size: 1.5em;
        align-self: end;
        transform-origin: bottom;
        transform: translateY(25%) scale(var(--scale));
        transition: .3s;
    }

    .ego.user:hover .name {
        --scale: 1.1
    }

    .ego.user .thumb {
        border-radius: unset;
        background-image: var(--user-thumb);
        background-size: 100%;
        background-position: center;
        grid-column: 1 / none;
        grid-row: 1 / none;
        clip-path: polygon(0 0, 100% 0, 100% 87%, 0 100%);
        transition: 1s;
    }

    .ego.user:hover .thumb {
        opacity: .9;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        background-size: 110%;
    }

    .ego.user .thumb .image {
        display: none;
    }
    
    .ego.user .settings {
        --translate: 0%;
        box-shadow: unset;
        background: var(--color-font-dim);
        z-index: 1;
        width: 210%;
        grid-column: auto / -3;
        grid-row: 11 / none;
        align-self: center;
        right: 0;
        bottom: 0;
        transition: .3s;
        transform: translateY(var(--translate));
    }
    
    .ego.user:hover .settings {
        --translate: 25%
    }
    
    .ego.user .settings >  * {
        color: white
    }

    cmp-scroll-pane {
        display: flex;
        height: 100%;
    }

    .menu {
        width: 100%;
        max-height: 100%;
    }

    .menu .menu-item {
        display: block;
        padding: 1em;
        position: relative;
        transition: .4s;
        cursor: pointer;
        text-decoration: none;
        color: var(--color-font-dim)
    }
    
    .menu .menu-item:hover,
    .menu .menu-item.active {
        padding-left: 1.5em;
        color: var(--color-font)
    }

    .menu .menu-item.active:hover {
        padding-left: 2em;
    }

    .menu .menu-item:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 10px;
        background: var(--color-spotlight);
        opacity: 1;
        transform-origin: 100% 100%;
        transform: translateX(-100%);
        transition: .3s .3s;
    }

    .menu .menu-item:hover:before,
    .menu .menu-item.active:before {
        opacity: 1;
        transform: translateX(calc(-100% + 5px));
    }

    .menu .menu-item.active:hover:before {
        transform: translateX(calc(-100% + 8px));
    }
`

@component()
class PrjSideBar extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected menuItens
        : Array<{
            title: string,
            link: string,
            domo?: DomoElement
        }> = [
            {
                title: 'teste',
                link: '#'
            },
            {
                title: 'teste2',
                link: '#'
            },
            {
                title: 'teste3',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'testen',
                link: '#'
            },
            {
                title: 'teste end',
                link: '#'
            },
        ]

    protected menu!
        : DomoElement


    protected currentMenuItem
        : HTMLElement | null
        = null

    protected menuItem
        : DomoElement
        = domo`a.menu-item`(
            `...`,
            evnt`click``${ev => this._selectMenu(<MouseEvent>ev)}`
        )

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            domo`content`(
                domo`div.user.ego`(
                    domo`div.name`(
                        `Mikaela `,
                        domo`span`(`Fernanda Casagrande`)
                    ),
                    domo`div.thumb`(
                        domo`div.image`(),
                    ),
                    domo`div.settings`(
                        domo`cmp-material-icon`()
                    )
                ),

                domo`prj-badges`(),

                this.menu =
                domo`cmp-scroll-pane.menu`()
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
        this.menuItens.forEach(i => {
            let domoItem = this.menuItem.cloneNode()
            let domItem = <HTMLLinkElement>domoItem.raw
            i.domo = domoItem
            domItem.innerText = i.title
            domItem.href = i.link
            this.menu.append(domoItem)
        })

        if (this.menuItens[0] && this.menuItens[0].domo) {
            this.currentMenuItem = this.menuItens[0].domo.raw
            this.currentMenuItem.classList.add('active')
        }
    }

    private _selectMenu(ev: MouseEvent) {
        if (this.currentMenuItem)
            this.currentMenuItem.classList.remove('active')
        this.currentMenuItem = <HTMLElement>ev.target
        this.currentMenuItem.classList.add('active')
    }
}