import { component } from '../../modules/elemento/source/Elemento.js'
import { template, domo, css } from '../../modules/domo/source/syntax.js';
import { DomoElement } from '../../modules/domo/source/DomoElement.js';
import '../cmp/Input.js'
import '../cmp/MaterialIcon.js'
import '../cmp/Button.js'

const style = css`
    :host {
        width: 100%;
        height: 100%;
        display: block;
    }

    content {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.modal {
        width: 420px;
        padding: 2em;
        background: #FFF;
        border-radius: 8px;
        border: 1px solid #00000020;
        box-shadow: 0 15px 70px -30px #000000;
    }

    div.modal cmp-input:nth-child(1n+3) {
        margin: 1em 0;
    }
    
    slot {
        display: block;
        margin: 0 0 2em 0 ;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }
`

@component()
class PrjLogin extends HTMLElement {
    protected root
        : ShadowRoot
        = this.attachShadow({ mode: 'open' })

    protected container!
        : DomoElement

    protected template
        : HTMLTemplateElement
        = template(
            style.cloneNode(),
            this.container =
            domo`content`(
                domo`div.modal`(
                    domo`slot`('slot'),
                    domo`cmp-input`('login'),
                    domo`cmp-input`('senha'),
                    domo`div.buttons`(
                        domo`cmp-button[type=light]`(
                            'recuperar senha'
                        ),
                        domo`cmp-button`(
                            domo`cmp-material-icon`('account_circle'),
                            'logar-se'
                        )
                    ),
                )
            )
        )

    constructor() {
        super()
        this.root.appendChild(this.template.content)
    }
}
