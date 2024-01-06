import { API_ENDPOINT } from "./constants.js";

export const styles = `
/**Scrollbar Style**/
/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px lightgrey;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
},
    .__fl__widget__container *, .__fl__widget__main * {
        box-sizing: border-box;
        z-index:99999;
    }        
    h3, p, input {
        margin: 0;
        padding: 0;
    }
    .__fl__widget__main {
        position: relative;
    }
    .__fl__widget__chat {
        position: absolute;
        height: 60vh;
    }
    .__fl__widget__container {
        box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
        width: 350px;
        overflow: hidden;
        right: -25px;
        bottom: 75px;
        position: absolute;
        transition: max-height .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        box-sizing: border-box;
    }
    .__fl__widget__icon {
        cursor: pointer;
        width: 50%;
        position: absolute;
        top: calc(50% - 15px);
        left: calc(50% - 16px);
        transition: transform .3s ease;
    }
    .__fl__widget__hidden {
        display: none;
    }
    .__fl__button__container {
        border: none;
        background-color: #fec400;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
    .__fl__widget__container.hidden {
        max-height: 0px;
    }
    .__fl__widget__header {
        padding: 1rem;
        background-color: #fec400;
        color: #000000;
        text-align: center;
    }
    .__fl__widget__header h3 {
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
        border: 1px solid #F5F5F5;
        border-radius: 0.5rem;
        padding: .8rem;
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
    .Text__Div{
        flex-direction: row;
        justify-content: space-around;
        padding-left: 10px;
        padding-right: 10px;
        align-items: center;
        padding-top:5px;
        padding-bottom:5px;
        display:none;
    }
    .Text__Div #emoji-button {
        content: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="%230D082C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="%230D082C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M9 9H9.01" stroke="%230D082C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3Cpath d="M15 9H15.01" stroke="%230D082C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3C/svg%3E');
        display: inline-block;
        width: 24px; /* Adjust width and height as needed */
        height: 24px;
        cursor:pointer;
    }
    .Text__Div #attachment-button {
        content: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 24 24" fill="none"%3E%3Cg id="SVGRepo_bgCarrier" stroke-width="0"%3E%3C/g%3E%3Cg id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"%3E%3C/g%3E%3Cg id="SVGRepo_iconCarrier"%3E%3Cpath d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674" stroke="%23000000" stroke-width="1.176" stroke-linecap="round" stroke-linejoin="round"%3E%3C/path%3E%3C/g%3E%3C/svg%3E');
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
      }   
      .Text__Div #send-message-button{
        content: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="0.00024"%3E%3Cg id="SVGRepo_bgCarrier" stroke-width="0"%3E%3C/g%3E%3Cg id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"%3E%3C/g%3E%3Cg id="SVGRepo_iconCarrier"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z" fill="%23000000"%3E%3C/path%3E%3C/g%3E%3C/svg%3E');
        display: inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        background: #fdc300;
        padding: 10px;
        border-radius: 50%;
      }
    .Text__Div input{
        padding: 10px;
        background:none;
    }
    .Text__Div img{
        padding:5px;
        cursor:pointer;
    }
    
    #__fl__widget__chat ul{
        height: 350px;
        overflow: hidden;
        overflow-y: auto;
        padding-top:25px;
        list-style:none;
        padding: 15px;
    }
    #__fl__widget__chat ul li{
        padding: 14px 14px 7px 14px;
    }
    #__fl__widget__chat ul .visitor-msg{
        float: left;
        color: #878484;
        position: relative;
        clear: both;
        display: inline-block;
        margin: 0px 0px 20px 40px;
        border-radius: 10px;
        background: #F1F7FF;
        word-wrap: break-word;
        max-width: 81%;
        font: 12px/16px "Noto Sans", sans-serif;
    }
    #__fl__widget__chat ul .visitor-msg:before {
        position: absolute;
        top: 0px;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        content: "";
        background-size: cover;
        left: -42px;
        background-color: #FF9900;
        background-image: url(${API_ENDPOINT}/_document/images/visitor.png);
    }
    #__fl__widget__chat ul .visitor-msg:after {
        border-left: 10px solid #ffffff00;
        left: -10px;
        position: absolute;
        top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid #F1F7FF;
    }
    #__fl__widget__chat ul .agent-msg {
        float: right;
        color: black;
        position: relative;
        clear: both;
        display: inline-block;
        margin: 0 40px 20px 0;
        font: 12px/16px "Noto Sans", sans-serif;
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.2);
        word-wrap: break-word;
        max-width: 81%;
    }
    #__fl__widget__chat ul .agent-msg:before {
        position: absolute;
        top: -5px;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        content: "";
        background-size: cover;
        right: -42px;
        background-color: #9900FF;
        background-image: url(${API_ENDPOINT}/_document/images/agent.png);
    }
    #__fl__widget__chat ul .agent-msg:after {
        position: absolute;
        top: 10px;
        content: "";
        width: 0;
        height: 0;
        border-top: 10px solid rgba(25, 147, 147, 0.2);
        border-right: 10px solid transparent;
        right: -10px;
    }
    .__fl__widget__media {
        width: 200px;
    }
    .__fl__timestamp {
        font-size: 0.5rem;
    }
`;

export const MESSAGE_ICON = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6665 12C22.6665 17.16 18.1865 21.3333 12.6665 21.3333L11.4265 22.8267L10.6932 23.7067C10.0665 24.4534 8.8665 24.2933 8.45317 23.4L6.6665 19.4666C4.23984 17.76 2.6665 15.0533 2.6665 12C2.6665 6.83999 7.1465 2.66666 12.6665 2.66666C16.6932 2.66666 20.1732 4.89333 21.7332 8.09333C22.3332 9.28 22.6665 10.6 22.6665 12Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3334 17.1467C29.3334 20.2 27.7601 22.9067 25.3334 24.6134L23.5468 28.5466C23.1334 29.44 21.9334 29.6134 21.3067 28.8534L19.3334 26.48C16.1067 26.48 13.2268 25.0533 11.4268 22.8267L12.6667 21.3333C18.1867 21.3333 22.6667 17.16 22.6667 12C22.6667 10.6 22.3334 9.28002 21.7334 8.09335C26.0934 9.09335 29.3334 12.7733 29.3334 17.1467Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.3335 12H16.0002" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const CLOSE_ICON = `
<svg width="32" height="32" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4182 24.5622C19.5476 24.5622 24.5625 19.5473 24.5625 13.4179C24.5625 7.28855 19.5476 2.27362 13.4182 2.27362C7.28885 2.27362 2.27393 7.28855 2.27393 13.4179C2.27393 19.5473 7.28885 24.5622 13.4182 24.5622Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.2642 16.5717L16.5718 10.2641" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5718 16.5717L10.2642 10.2641" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
