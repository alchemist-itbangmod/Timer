import React from 'react'
import { compose, lifecycle } from 'recompose'

import socket from '../Core/socket'
import AppLayout from '../Core/AppLayout'
import { Layout } from '../Core/global'
import Time from './Time'

const room = `alchemist`

const TimeContainer = props => (
  <Layout>
    <Time time={props.time} />
  </Layout>
)

const enhancer = lifecycle({
  async componentWillMount () {
    socket.on(`${room}`, data => console.log(data))
  }
})

export default compose(
  AppLayout,
  enhancer
)(TimeContainer)
