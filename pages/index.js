import React, { Component } from 'react'

import Head from 'next/head'
import Router from 'next/router'

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

const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 90vh;
  height: auto;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-family: sans-serif;
  z-index: 10;
`

const PinStyled = styled.div`
  padding: 4em 1em;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  width: 760px;
`

const Input = styled.input`
  text-align: center;
  font-size: 4.5em;
  margin: 0 10px;
  width: 50%;
  height: 150px;
`

const H1 = styled.h1`
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
`

const BigBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Line = styled.span`
  position: absolute;
  left: 0;
  bottom: 7px;
  display: block;
  width: 200%;
  height: 4px;
  background: linear-gradient(to right, #E67207 10%, #EF4E7B 15%, #A166AB 50%);
  z-index: -1;
  transition: all 0.8s ease-out;
`

const Nav = props => {
  return (
    <div>
      <Head>
        <title> Alchemist Timer </title>
        <meta name="viewport" content="width=device-width,initial-scale=0.3,maximum-scale=0.3,user-scalable=no" />
      </Head>
      <Container>
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          {/* <br />
          <Link route='/time/train1'>
            <a>Time</a>
          </Link>
          <br />
          <Link route='/time-admin/train1'>
            <a>Time Admin</a>
          </Link> */}
          <BigBox>
            <H1>Alchemist Timer</H1>
            <PinStyled>
              <form style={{ flexDirection: 'column' }}>
                <Input
                  type="password"
                  size="1"
                  value={props.pin === undefined ? '' : props.pin}
                  onChange={e => props.changePin(e)}
                  className="input"
                />
                <br />
                <br />
                <Link route={props.url}>
                  <a onClick={()=>{ props.login(props) }} style={{ fontSize: '2.8rem' }} className="btn">
                    Login
                    <Line />
                  </a>
                </Link>
              </form>
            </PinStyled>
          </BigBox>
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
      </Container>
    </div>
  )
}

const NavCompose = compose(
 withState('pin','setPin', ''),
 withState('url','setUrl', '/'),
 lifecycle({
   async componentDidMount() {
     socket.on('auth',(data) => {
       let url = `/${data.room}`
       console.log(url)
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
)(Nav)

export default NavCompose
