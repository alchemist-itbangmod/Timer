import React from 'react'
import { injectGlobal } from 'styled-components'

export default (Component) => class AppLayout extends React.Component {
  async componentWillMount () {
    injectGlobal`
      @font-face {
        font-family: 'segment';
        src: url('/static/font/Segment7Standard.otf');
        unicode-range: U+0030-0039;
      }
      @font-face {
        font-family: 'digital';
        src: url('/static/font/digital7.ttf');
      }
      body {
        color: #fff;
        background-size: cover;
        background-image: url('/static/img/bg.png');
        font-family: 'digital';
      }
      .button {
        transition: 0.4s;
      }
      .button.is-rounded {
        border-radius: 290486px;
        padding-left: 1em;
        padding-right: 1em;
      }
    `
  }
  render () {
    return (
      <Component {...this.props} />
    )
  }
}
