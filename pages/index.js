import React, { Component } from 'react'

import Head from 'next/head'

import {compose, 
  withState, 
  lifecycle, 
  withHandlers} from 'recompose'

import socket from './libs/socket'

import { Link, Router } from './routes'
  
import styled from 'styled-components'


import './style'

const Index = props => {
  return (
    <div>
      <Head>
        <title>Timer | SIT CRAFT CAMP</title>
      </Head>
      <div className="index-layouts">
        <div className="bigbox">
          <h1 className="heading animated fadeInUp">SIT CRAFT CAMP Timer!</h1>
          <div className="pin-style animated fadeInUp">
            <input
              type="password"
              value={props.pin === undefined ? '' : props.pin}
              autoFocus={true}
              onChange={e => props.changePin(e)}
              className="input input-style"
              onKeyPress={(e) => { ((e.keyCode || e.which) === 13) ? props.goRoom(props) : '' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const IndexCompose = compose(
 withState('pin','setPin', ''),
 withState('url','setUrl', '/'),
 withState('path','setPath', ''),
 withState('slug','setSlug', ''),
 lifecycle({
   async componentDidMount() {
     socket.on('auth', async (data) => {
      let url = `/${data.room}`
      if (data.room) {
        await this.props.setUrl(url)
      }
      let lastSlash = await url.lastIndexOf('/') + 1
      let prefixPath = await url.substr(url.indexOf('/'), lastSlash - 1)
      let convertSlug = await url.substr(lastSlash)
      await this.props.setPath(prefixPath)
      await this.props.setSlug(convertSlug)
     })
   }
 }),
 withHandlers({
   changePin: props => (e) => {
    let { pin, setPin } = props
    let newPin = e.target.value.toUpperCase()
    if (newPin.length > 6) {
      newPin = newPin.substr(0, 6)
    }
    setPin(newPin)
    if (newPin.length > 5) {
      socket.emit('auth', { key: newPin })
    }
  },
  login: props => () => {
    let { url } = props
    let lastSlash = url.lastIndexOf('/') + 1
    let prefixPath = url.substr(url.indexOf('/'), lastSlash - 1)
    let convertSlug = url.substr(lastSlash)
    Router.push({
      pathname: `/routes${prefixPath}`,
      query: { slug: `${convertSlug}` }
    })
    props.setPin('')
  },
  goRoom: props => () => {
    let { path, slug } = props
    Router.push({
      pathname: `/routes${path}`,
      query: { slug: `${slug}` }
    })
  },
 })
)(Index)

export default IndexCompose
