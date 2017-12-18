import React, { Component } from 'react'

import Head from 'next/head'

import {compose, 
  withState, 
  lifecycle, 
  withHandlers} from 'recompose'

import socket from './libs/socket'

import { Link, Router } from './routes'
  
import styled from 'styled-components'


import './globalStyle'

const Index = props => {
  return (
    <div>
      <Head>
        <title> Alchemist Timer </title>
      </Head>
      <div className="index-layouts">
        <div className="bigbox">
          <h1 className="heading animated fadeInUp">Alchemist Timer</h1>
          <div className="pin-style animated fadeInUp">
            <input
              type="password"
              size="1"
              value={props.pin === undefined ? '' : props.pin}
              autoFocus={true}
              onChange={e => props.changePin(e)}
              className="input input-style"
              onKeyPress={(e) => { ((e.keyCode || e.which) === 13) ? props.login(props) : console.log('not pass') }}
            />
            <br />
            <br />
            <span >
              <Link route={props.url}>
                <a onClick={()=>{ props.login(props) }} className="btn animated pulse">
                  Join
                  <span className="line-style" />
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const IndexCompose = compose(
 withState('pin','setPin', ''),
 withState('url','setUrl', '/'),
 lifecycle({
   async componentDidMount() {
     socket.on('auth',(data) => {
       let url = `/${data.room}`
       if(data.room)
         this.props.setUrl(url)
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
  }
 })
)(Index)

export default IndexCompose
