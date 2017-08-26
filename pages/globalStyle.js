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
  
`