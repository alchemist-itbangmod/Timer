import { injectGlobal } from 'styled-components'

injectGlobal`
  @import url('./static/css/bulma.css');
  
  @font-face {
    font-family: 'digital';
    src: url('./static/font/digital7.ttf');
  }

  body {
    font-family: 'digital';
    margin: 0;
    background-color: #17182f;
  }

  .columns {
    margin-right: 0;
  }
  .column {
    padding-right: 0;
  }

  
  .btn {
      text-decoration: none;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: auto;
      min-height: 90px;
      min-width: 250px;
      z-index: 1;
      padding: 9px 24px;
      font-size: 1.5rem;
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

  
`