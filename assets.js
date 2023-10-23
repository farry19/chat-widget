export const styles = `
    .widget__container *, .widget__main * {
        box-sizing: border-box;
    }        
    h3, p, input {
        margin: 0;
        padding: 0;
    }
    .widget__main {
        position: relative;
    }
    .widget__chat {
        position: absolute;
        height: 60vh;
    }
    .widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 20vw;
        overflow: auto;
        right: -25px;
        bottom: 75px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: #e6e6e6a6;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        box-sizing: border-box;
    }
    .widget__icon {
        cursor: pointer;
        width: 50%;
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
        transition: transform .3s ease;
    }
    .widget__hidden {
        display: none;
    }
    .button__container {
        border: none;
        background-color: #fec400;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
    .widget__container.hidden {
        max-height: 0px;
    }
    .widget__header {
        padding: 1rem;
        background-color: #fec400;
        color: #000000;
        text-align: center;
    }
    .widget__header h3 {
        font-size: 1rem;
        font-weight: 400;
        margin-bottom: 8px;
    }
    form {
        padding: 1rem;
    }
    form .form__field {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    .form__field label {
        margin-bottom: 8px;
        font-size: 0.75rem;
    }
    .form__field input,
    .form__field textarea {
        border: 1px solid #fec400;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: #FFFFFF;
    }
    .form__field textarea::placeholder {
        font-family: Helvetica, Arial ,sans-serif;
    }
    form button {
        border-radius: 0.5rem;
        font-size: 1rem;
        background-color: #000000;
        color: #fec400;
        border: 0;
        width: 100%;
        cursor: pointer;
        padding: 0.5rem;
    }
    form button:hover {
        color: rgba(199, 199, 199, 1);
        background-color: rgba(66, 66, 66, 1);
    }
    .chat__input {
        width: 100%;
        border: none;
        padding: 0.75rem;
        border--bottom-left-radius: 10px;
        border--bottom-right-radius: 10px;
        background-color: #f9f9f9;
    }
    .chat__input:focus {
        outline: none;
        background-color: #fff;
    }
    #widget__chat ul{
        height: 350px;
        overflow: hidden;
        overflow-y: auto;
        padding-top:25px;
        list-style:none;
        margin-left:-15px;
    }
    #widget__chat ul .visitor-msg{
        float: left;
        color: #878484;
        position: relative;
        clear: both;
        display: inline-block;
        padding: 14px;
        margin: 0px 0px 20px 40px;
        border-radius: 10px;
        background: white;
        word-wrap: break-word;
        max-width: 81%;
        font: 12px/16px "Noto Sans", sans-serif;
    }
    #widget__chat ul .visitor-msg:before {
        position: absolute;
        top: 0px;
        width: 25px;
        height: 25px;
        border-radius: 25px;
        content: "";
        background-size: cover;
        left: -32px;
        background-image: url(https://github.com/ortichon.png);
    }
    #widget__chat ul .visitor-msg:after {
        border-left: 10px solid #ffffff00;
        left: -10px;
        position: absolute;
        top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid #ffffff;
    }
    #widget__chat ul .agent-msg {
        float: right;
        color: black;
        position: relative;
        clear: both;
        display: inline-block;
        padding: 14px;
        margin: 0 40px 20px 0;
        font: 12px/16px "Noto Sans", sans-serif;
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.2);
        word-wrap: break-word;
        max-width: 81%;
    }
    #widget__chat ul .agent-msg:before {
        position: absolute;
        top: -5px;
        width: 25px;
        height: 25px;
        border-radius: 25px;
        content: "";
        background-size: cover;
        right: -35px;
        background-image: url(https://github.com/Thatkookooguy.png);
    }
    #widget__chat ul .agent-msg:after {
        position: absolute;
        top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid rgba(25, 147, 147, 0.2);
        border-right: 10px solid transparent;
        right: -10px;
    }
`

export const MESSAGE_ICON = `
    <svg width="24" height="24" viewBox="-0.06 -0.075 0.72 0.72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-message">
        <path d="M.281.36H.51A.03.03 0 0 0 .54.33V.09A.03.03 0 0 0 .51.06H.09a.03.03 0 0 0-.03.03v.24a.03.03 0 0 0 .03.03.03.03 0 0 1 .03.03v.09L.281.36zM.09 0h.42A.09.09 0 0 1 .6.09v.24a.09.09 0 0 1-.09.09H.301L.108.564A.03.03 0 0 1 .06.54V.42A.06.06 0 0 1 0 .36V.09A.09.09 0 0 1 .09 0z"/>
    </svg>
`

export const CLOSE_ICON = `
    <svg width="24" height="24" viewBox="0 0 0.72 0.72" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color">
        <path d="M.402.36.591.171A.03.03 0 1 0 .548.128L.36.318.171.129a.03.03 0 0 0-.043.043l.189.189L.128.55a.03.03 0 0 0 0 .043.03.03 0 0 0 .043 0L.36.404l.189.189a.03.03 0 0 0 .043 0 .03.03 0 0 0 0-.043Z" style="fill:#000"/>
    </svg>
`
