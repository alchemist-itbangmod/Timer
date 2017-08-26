import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Link } from './routes'
import styled, { injectGlobal }from 'styled-components'
import {compose, 
        withState, 
        lifecycle, 
        withHandlers} from 'recompose'
import Particles from 'react-particles-js'
import ParticleStar from '../particle_.json'

injectGlobal`
  body {
    margin: 0;
    background-color: #17182f;
  }
`

const Div = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-family: sans-serif;
  z-index: 10;
`

const PinStyled = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: white;
  width: 760px;
  margin: auto;
`

const Input = styled.input`
  text-align: center;
  font-size: 24px;
  margin: 0 10px;
`

const Nav = props => {
  return (
    <div>
      <Head>
        <title>timer | Pin</title>
      </Head>

      <Link route='room'>
        <a>Room</a>
      </Link>
      <br />
      <Link route='time'>
        <a>Time</a>
      </Link>
      
      <Particles 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
        params={ ParticleStar }/>
      <Div>
        <div>
          <h1>Alchemist Timer</h1>
          <PinStyled>
            test
            <form>
              {
                [0,1,2,3,4,5].map((e)=>(
                  <Input
                    key={e}
                    type="text"
                    size="1"
                    value={props.pin[e] === undefined ? '':props.pin[e]}
                    autoFocus={props.chkIndex[e]}
                    onChange={value => props.changePin(value)}
                  />
                ))
              }
            </form>
          </PinStyled>
        </div>
      </Div>
      {/* <PinStyled>

      </PinStyled> */}

      {/* {props.name} <br />
      <button onClick={() => props.changeName(props) }>Change Name</button> <br /> */}
      {/* <Link href={{ pathname: '/room' }}><a>Room</a></Link> <br />
      <Link href={{ pathname: '/time' }}><a>Time</a></Link> <br /> */}
    </div>
  )
}

const NavCompose = compose(
 withState('name','setName',''),
 withState('pin','setPin', ''),
 withState('chkIndex','setChk', []*6),
 lifecycle({
   async componentWillMount() {
     let name = 'tae'
     this.props.setName(name)
   }
 }),
 withHandlers({
   changeName: props => () => {
     props.setName(newName)
   },
   changePin: props => (e) => {
    console.log(e)
  }
 })
)(Nav)

export default NavCompose
