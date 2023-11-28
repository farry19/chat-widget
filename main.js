import { io } from 'https://cdn.socket.io/4.5.4/socket.io.esm.min.js'
import { styles, CLOSE_ICON, MESSAGE_ICON } from './assets.js'

// const ENDPOINT = `http://localhost:8080`
const ENDPOINT = `wss://api.frontlinesupport.io`
const API_ENDPOINT = `${ENDPOINT}/widget-settings`
const WS_ENDPOINT = `${ENDPOINT}`

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
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement('button')
    buttonContainer.classList.add('button__container')

    /**
     * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
     */
    const widgetIconElement = document.createElement('span')
    widgetIconElement.innerHTML = MESSAGE_ICON
    widgetIconElement.classList.add('widget__icon')
    this.widgetIcon = widgetIconElement

    /**
     * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement('span')
    closeIconElement.innerHTML = CLOSE_ICON
    closeIconElement.classList.add('widget__icon', 'widget__hidden')
    this.closeIcon = closeIconElement

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon)
    buttonContainer.appendChild(this.closeIcon)
    buttonContainer.addEventListener('click', this.toggleOpen.bind(this))

    const inputChatWidget = document.createElement('input')
    inputChatWidget.classList.add('chat__input')
    inputChatWidget.id = 'chat__input'

    // buttonContainer.addEventListener('click', this.toggleOpen.bind(this))

    /**
     * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
     */
    this.widgetContainer = document.createElement('div')
    this.widgetContainer.classList.add('widget__hidden', 'widget__container')

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent()

    /**
     * Append the widget's content and the button to the container
     */

    this.widgetContainer.appendChild(inputChatWidget)

    container.appendChild(this.widgetContainer)
    container.appendChild(buttonContainer)

    inputChatWidget.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const payload = {
          text: e.target.value,
          email: this.__email,
          type: 'visitor',
        }

        this._io.emit('to_agent', payload)

        this.appendMessage(payload)
        e.target.value = ''
      }
    })
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <main class="widget__main">
        <header class="widget__header">
            <h3>Start a conversation</h3>
            <p>We usually respond within a few hours</p>
        </header>
        <form id="widget__form">
            <div id="form__name" class="form__field">
                <label for="name">Name</label>
            </div>
            <div id="form__email" class="form__field">
                <label for="email">Email</label>
            </div>
        </form>
        <div id="widget__chat" class="widget__hidden">
          <ul id="widget__messages">
            
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
        const widget__form = document.getElementById('widget__form')
        const form__name = document.getElementById('form__name')

        this.widgetIcon.classList.add('widget__hidden')
        this.closeIcon.classList.remove('widget__hidden')
        this.widgetContainer.classList.remove('widget__hidden')

        this.__name.id = 'name'
        this.__name.placeholder = 'Enter your name'

        form__name.appendChild(this.__name)

        const form__email = document.getElementById('form__email')

        this.__email.id = 'email'
        this.__email.placeholder = 'Enter your email'

        form__email.appendChild(this.__email)

        const startButton = document.createElement('button')
        startButton.innerHTML = 'Start Chat'

        widget__form.appendChild(startButton)

        startButton.addEventListener('click', e => {
          e.preventDefault()
          this.startChat(this.__name.value, this.__email.value)
        })
      }
    } else {
      this.createWidgetContent()
      this.widgetIcon.classList.remove('widget__hidden')
      this.closeIcon.classList.add('widget__hidden')
      this.widgetContainer.classList.add('widget__hidden')
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
      const widget__form = document.getElementById('widget__form')
      const widget__chat = document.getElementById('widget__chat')

      this.__name = name
      this.__email = email

      localStorage.setItem('__fl__name', name)
      localStorage.setItem('__fl__email', email)

      this.widgetIcon.classList.add('widget__hidden')
      this.closeIcon.classList.remove('widget__hidden')
      this.widgetContainer.classList.remove('widget__hidden')

      widget__form.classList.add('widget__hidden')
      widget__chat.classList.remove('widget__hidden')

      this.connect(name, email, this.organization_id, this.department_id)

      this._io.on('message', message => this.appendMessage(message))
      this._io.on('visitor_connected', ({ messages }) => {
        messages.forEach(message => this.appendMessage(message))
      })

      this._io.on('agent_joined', payload => console.log(payload))
    }
  }

  appendMessage(message) {
    const ul = document.getElementById('widget__messages')

    const li = document.createElement('li')
    li.classList.add(
      `${message.type === 'visitor' ? 'visitor-msg' : 'agent-msg'}`
    )

    li.innerHTML = `<div class="flex flex-col">${message.text}</div>`

    ul.appendChild(li)

    ul.scrollTop = ul.scrollHeight
  }
}

function initializeWidget() {
  return new FrontlineWidget()
}

initializeWidget()
