import React from 'react'
import styled from 'styled-components'

import AppLayout from '../Core/AppLayout'
import { Layout } from '../Core/global'

const Heading = styled.h1`
  letter-spacing: 3px;
  margin-bottom: 0.5em;
  display: inline-block;
  background-image: linear-gradient(
    90deg,
    #f79533 0%,
    #f37055 15%,
    #ef4e7b 30%,
    #a166ab 44%,
    #5073b8 58%,
    #1098ad 72%,
    #07b39b 86%,
    #6dba82 100%
  );
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

export default AppLayout(() => (
  <Layout>
    <section className='section'>
      <div className='container'>
        <div className='columns is-mobile'>
          <div className='animated fadeInUp column has-text-centered'>
            <Heading>Alchemist Timer</Heading>
          </div>
        </div>
        <div className='columns'>
          <div className='column has-text-centered'>
            <input type='password' />
          </div>
        </div>
        <div className='columns'>
          <div className='column has-text-centered'>
            <a href='/admin' className='button is-info'>Join Room</a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
))
