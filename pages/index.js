import React, { Component } from 'react'

import Head from 'next/head'

import {compose, 
  withState, 
  lifecycle, 
  withHandlers} from 'recompose'

import socket from './libs/socket'

import { Link } from './routes'
  
import styled from 'styled-components'
import Particles from 'react-particles-js'
import ParticleStar from '../particle_.json'


import './globalStyle'

const BigBox = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Index = props => {
  return (
    <div>
      <Head>
        <title> Alchemist Timer </title>
      </Head>
      <div className="index-layouts">
        <div className="bigbox">
          {/* <Link route="/time/taehub"> taehub</Link>
          <Link route="/time-admin/taehub"> admin taehub</Link> */}
          <h1 className="heading animated fadeInUp">Alchemist Timer</h1>
          <div className="pin-style animated fadeInUp">
            <form style={{ flexDirection: 'column' }}>
              <input
                type="password"
                size="1"
                value={props.pin === undefined ? '' : props.pin}
                autoFocus={true}
                onChange={e => props.changePin(e)}
                className="input input-style"
              />
              <br />
              <br />
              <Link route={props.url}>
                <a onClick={()=>{ props.login(props) }} className="btn">
                  Login
                  <span className="line-style" />
                </a>
              </Link>
            </form>
          </div>
        </div>
        <Particles
          style={{
            position: 'absolute',
            width: '100vw',
            minHeight: '95vh',
            zIndex: 0,
            left: 0,
            top: 0
          }}
          params={ParticleStar} />
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
    props.setPin('')
  }
 })
)(Index)

export default IndexCompose
