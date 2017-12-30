import React from 'react'

import socket from '../Core/socket'
import {Layout, Nav, Time} from '../Core/global'

const emit = () => socket.emit(`setTime`, {room: `alchemist`, time: `00:00:11`})

const AdminContainer = () => (
  <Layout>
    <Nav className='level'>
      <p className='level-item is-left'>
        <a href='/' className='link is-info'>
          Home
        </a>
      </p>
    </Nav>
    <section className='section'>
      <div className='container'>
        <div className='columns is-centered'>
          <Time>
              00:00:00
          </Time>
        </div>
        <div className='columns is-mobile'>
          <div className='column'>
            <input type='number' className='input is-large' />
          </div>
          <div className='column'>
            <input type='number' className='input is-large' />
          </div>
          <div className='column'>
            <input type='number' className='input is-large' />
          </div>
        </div>
        <div className='columns is-mobile'>
          <div className='column'>
            <div className='field is-grouped is-grouped-centered'>
              <p className='control'>
                <button
                  onClick={emit}
                  className='button is-info is-outlined is-large is-rounded'
                >
                      Start Countdown
                </button>
              </p>
              <p className='control'>
                <button className='button is-danger is-outlined is-large is-rounded'>
                      Pause / Resume
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default AdminContainer
