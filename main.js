import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'
import { createPopup } from 'https://unpkg.com/@picmo/popup-picker@latest/dist/index.js?module'
import { styles, CLOSE_ICON, MESSAGE_ICON } from './assets.js'
import { API_ENDPOINT, WS_ENDPOINT } from './constants.js'

class FrontlineWidget {
  constructor(position = 'bottom-right') {
    const frontline_widget = document.getElementById('frontline-widget')

    this.organization_id = frontline_widget.getAttribute('data-o')
    this.department_id = frontline_widget.getAttribute('data-d')

    this.position = this.getPosition(position)
    this.open = false
    this.settings = {}
    this.initialize()
    this.injectStyles(this.settings)
    this._io = io(WS_ENDPOINT)
  }

  position = ''
  open = false
  widgetContent = null
  __name = null
  __email = null

  agent = null

  getPosition(position) {
    const [vertical, horizontal] = position.split('-')

    return {
      [vertical]: '30px',
      [horizontal]: '30px',
    }
  }

  async initialize() {
    /**
     * Get the widget saved settings
     */

    // fetch(`${API_ENDPOINT}?o=${this.organization_id}&d=${this.department_id}`)
    //   .then(response => response.json())
    //   .then(response => {
    //     // console.log('Response : ', response)
    //   })
    /**
     * Create and append a div element to the document body
     */

    const container = document.createElement('div')
    container.style.position = 'fixed'

    Object.keys(this.position).forEach(
      key => (container.style[key] = this.position[key])
    )
    document.body.appendChild(container)

    /**
     * Create a button element and give it a class of __fl__button__container
     */
    const buttonContainer = document.createElement('button')
    buttonContainer.classList.add('__fl__button__container')

    /**
     * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
     */
    const widgetIconElement = document.createElement('span')
    widgetIconElement.innerHTML = MESSAGE_ICON
    widgetIconElement.classList.add('__fl__widget__icon')
    this.widgetIcon = widgetIconElement

    /**
     * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement('span')
    closeIconElement.innerHTML = CLOSE_ICON
    closeIconElement.classList.add('__fl__widget__icon', '__fl__widget__hidden')
    this.closeIcon = closeIconElement

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon)
    buttonContainer.appendChild(this.closeIcon)
    buttonContainer.addEventListener('click', this.toggleOpen.bind(this))

    // const inputChatWidget = document.createElement("input");
    // inputChatWidget.classList.add("chat__input");
    // inputChatWidget.id = "chat__input";

    const img = document.createElement('img')
    const TextDiv = document.createElement('div')
    const inputChatWidget = document.createElement('input')
    const emojiButton = document.createElement('a')
    const attachmentButton = document.createElement('a')

    TextDiv.classList.add('Text__Div')

    emojiButton.id = 'emoji-button'
    attachmentButton.id = 'attachment-button'

    TextDiv.appendChild(emojiButton)
    TextDiv.appendChild(inputChatWidget)
    TextDiv.appendChild(attachmentButton)
    TextDiv.appendChild(img)

    inputChatWidget.placeholder = 'Reply ...'
    inputChatWidget.classList.add('chat__input')
    inputChatWidget.id = 'chat__input'

    img.src = '/public/attach-circle.png'

    // buttonContainer.addEventListener('click', this.toggleOpen.bind(this))

    /**
     * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
     */
    this.widgetContainer = document.createElement('div')
    this.widgetContainer.classList.add(
      '__fl__widget__hidden',
      '__fl__widget__container'
    )

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent()

    /**
     * Append the widget's content and the button to the container
     */

    this.widgetContainer.appendChild(TextDiv)

    // this.widgetContainer.appendChild(inputChatWidget);

    container.appendChild(this.widgetContainer)
    container.appendChild(buttonContainer)

    inputChatWidget.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        syndicateMessage(e)
      }
    })
  }

  syndicateMessage(e) {
    if (e.target.value !== '') {
      const dt = new Date()

      const timestamp = `${dt.getDate()}-${dt.getMonth()}-${dt.getFullYear()} ${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`

      const payload = {
        text: e.target.value,
        email: this.__email,
        type: 'visitor',
        timestamp,
      }

      this._io.emit('to_agent', payload)

      this.appendMessage(payload)
      e.target.value = ''
    }
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <main class="__fl__widget__main">
        <header class="__fl__widget__header">
            <h3 style="font-weight:550;">Give us some details before continuing</h3>
        </header>
        <form id="__fl__widget__form">
            <div id="form__name" class="form__field">
            </div>
            <div id="form__email" class="form__field">
            </div>
        </form>
        <div id="__fl__widget__chat" class="__fl__widget__hidden">
          <ul id="__fl__widget__messages">
            
          </ul>
        </div>
      </main>
    `
  }

  injectStyles() {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, '')
    document.head.appendChild(styleTag)
  }

  toggleOpen() {
    this.open = !this.open
    const name = localStorage.getItem('__fl__name')
    const email = localStorage.getItem('__fl__email')

    if (this.open) {
      this.__name = document.createElement('input')
      this.__name.type = 'text'

      this.__email = document.createElement('input')
      this.__email.type = 'text'

      if (name && email) {
        this.__email = email
        this.__name = name

        this.startChat(this.__name, this.__email)
      } else {
        const widget__form = document.getElementById('__fl__widget__form')
        const form__name = document.getElementById('form__name')

        this.widgetIcon.classList.add('__fl__widget__hidden')
        this.closeIcon.classList.remove('__fl__widget__hidden')
        this.widgetContainer.classList.remove('__fl__widget__hidden')

        this.__name.id = 'name'
        this.__name.placeholder = 'Name'

        form__name.appendChild(this.__name)

        const form__email = document.getElementById('form__email')

        this.__email.id = 'email'
        this.__email.placeholder = 'Email'

        form__email.appendChild(this.__email)

        const startButton = document.createElement('button')

        startButton.setAttribute('id', 'start-chat')
        startButton.style.textAlign = 'center'
        startButton.style.padding = '10px'
        startButton.style.background = '#FEC400'
        startButton.style.color = 'black'
        startButton.style.fontWeight = '500'
        startButton.innerHTML = 'Start Chat'

        widget__form.appendChild(startButton)

        startButton.addEventListener('click', e => {
          e.preventDefault()
          this.startChat(this.__name.value, this.__email.value)
        })
      }
    } else {
      this.createWidgetContent()
      this.widgetIcon.classList.remove('__fl__widget__hidden')
      this.closeIcon.classList.add('__fl__widget__hidden')
      this.widgetContainer.classList.add('__fl__widget__hidden')
    }
  }

  connect(name, email, organization_id, department_id) {
    this._io.emit('visitor_connected', {
      name,
      email,
      organization_id,
      department_id,
    })
  }

  startChat(name, email) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (email.match(validRegex) && name !== '') {
      const widget__form = document.getElementById('__fl__widget__form')
      const widget__chat = document.getElementById('__fl__widget__chat')

      this.__name = name
      this.__email = email

      localStorage.setItem('__fl__name', name)
      localStorage.setItem('__fl__email', email)

      this.widgetIcon.classList.add('__fl__widget__hidden')
      this.closeIcon.classList.remove('__fl__widget__hidden')
      this.widgetContainer.classList.remove('__fl__widget__hidden')

      widget__form.classList.add('__fl__widget__hidden')
      widget__chat.classList.remove('__fl__widget__hidden')

      this.connect(name, email, this.organization_id, this.department_id)

      this._io.on('message', message => this.appendMessage(message))
      this._io.on('visitor_connected', ({ messages }) => {
        messages.forEach(message => this.appendMessage(message))
      })

      let widgetChat = document.getElementsByClassName('Text__Div')[0] // Get the first element with the class 'Text__Div'

      if (widgetChat) {
        widgetChat.style.display = 'flex' // Apply style to the element if found

        const trigger = document.getElementById('emoji-button')
        const picker = createPopup(
          {},
          {
            referenceElement: trigger,
            triggerElement: trigger,
          }
        )

        picker.addEventListener('emoji:select', event => {
          const el = document.getElementById('chat__input')
          el.value = `${el.value} ${event.emoji}`
        })

        trigger.addEventListener('click', () => picker.toggle())
      }
    }
  }

  appendMessage(message) {
    const ul = document.getElementById('__fl__widget__messages')

    const li = document.createElement('li')

    li.style.backgroundImage = `${API_ENDPOINT}/_document/images/${message.type}`
    li.classList.add(
      `${message.type === 'visitor' ? 'visitor-msg' : 'agent-msg'}`
    )

    const output = message.text?.ok
      ? `<img src="${API_ENDPOINT}/_document/${message.text.filepath}" class="__fl__widget__media" />`
      : message.text

    li.innerHTML = `<div class="flex flex-col"><div>${output}</div><div class="__fl__timestamp">${message.timestamp}</div></div>`

    ul.appendChild(li)

    ul.scrollTop = ul.scrollHeight
  }
}

function initializeWidget() {
  return new FrontlineWidget()
}

initializeWidget()
