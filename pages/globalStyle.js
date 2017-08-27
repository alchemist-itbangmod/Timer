import { injectGlobal } from 'styled-components'

injectGlobal`
  @import url('./static/css/bulma.css');
  @import url('./static/css/animate.css');
  @import url('./static/css/font-awesome.min.css');

  
  @font-face {
    font-family: 'digital';
    src: url('./static/font/digital7.ttf');
  }
  html {
    height: auto;
    min-height: 100vh;
    background-image : url('./static/img/bgdesktop.png');
    background-size: cover;
    background-attachment: fixed;
  }
  body {
    font-family: 'digital';
    margin: 0;
    // background-color: #17182f;
  }
  
  ::-webkit-scrollbar { 
      display: none; 
  }

  .columns {
    margin-right: 0;
  }
  .column {
    padding-right: 0;
  }
  
  .btn {
      font-size: 2.8rem;
      text-decoration: none;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: auto;
      min-height: 90px;
      min-width: 250px;
      z-index: 1;
      padding: 9px 24px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      overflow: hidden;
      background: linear-gradient(to right, #E67207 0%, #EF4E7B 50%, #A166AB 100%);
      transform: translate3d(0, 0, 0);
      transition: all .4s ease-out;
  }

  .btn:before {
      content: "";
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      background: #22292C;
      position: absolute;
      top: 2px;
      left: 2px;
      border-radius: 2px;
      z-index: -1
  }

  .btn:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: block;
      transition: all .4s ease-out;
      background: linear-gradient(to right, #E67207 0%, #EF4E7B 5%, #A166AB 50%);
      z-index: -3;
      opacity: 0
  }
  .btn:active,.btn:focus,.btn:hover {
      color: #fff;
      cursor: pointer;
      transform: translate3d(0, -3px, 0);
      box-shadow: 0px 8px 18px -3px rgba(161,102,171,0.3)
  }

  .heading {
      font-size: 8em;
      letter-spacing: 3px;
      font-family: 'digital';
      margin-bottom: 0.5em;
      display: inline-block;
      background-image: linear-gradient(90deg, #F79533 0%, #F37055 15%, #EF4E7B 30%, #A166AB 44%, #5073B8 58%, #1098AD 72%, #07B39B 86%, #6DBA82 100%);
      background-size: cover;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
  }

  i {
    font-size: 3em !important;
  }

  @media only screen and
  (width:1024px) {
    .heading {
      font-size: 5em;
    }
    .btn {
      font-size: 1.5rem;
      min-height: 60px;
      min-width: 170px;
    }
  }

  @media only screen and
  (min-width:1024px) {
    .level-item {
      font-size: 1em !important;
    }
  }

  @media only screen and
  (min-width:0px) and
  (max-width:800px) {
    .level-item {
      font-size: 1.3em !important;
    }
  }
  
  .index-layouts {
    display: flex;
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    font-family: sans-serif;
    z-index: 10;
    position: relative;
    overflow:hidden;
  }

  .pin-style {
    padding: 3em 1em 2em 1em;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    width: 70%;
    height: auto;
    // max-height: 255px;
  }

  .bigbox {
      position: absolute;
      width: 100vw;
      min-height: 100vh;
      z-index: 1;
      justify-content: center;
      display: flex;
      align-items: center;
      flex-direction: column;
  }

  .input-style {
    text-align: center;
    font-size: 4em;
    margin: 0 10px;
    width: 50%;
    height: 100px;
  }

  .line-style {
    position: absolute;
    left: 0;
    bottom: 7px;
    display: block;
    width: 200%;
    height: 4px;
    background: linear-gradient(to right, #E67207 10%, #EF4E7B 15%, #A166AB 50%);
    z-index: -1;
    transition: all 0.8s ease-out;
  }
  
`