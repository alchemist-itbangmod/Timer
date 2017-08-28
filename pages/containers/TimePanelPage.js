import React from 'react';
import Head from 'next/head'
import { compose,
         withState,
         withHandlers,
         lifecycle } from 'recompose';
import socket from '../libs/socket';

import styled from 'styled-components';
import Layouts from '../components/layouts'

import moment from 'moment'
import timer from 'moment-timer'

const TimeDisplay = styled.div`
  font-size: 4em;
  line-height: 1.1em;
`

const SelectTime = styled.div`
  font-size: 2em;
`
const Form = styled.div`
  padding-left: 0.2em;
  padding-right: 0.2em;
`
const Control = styled.div`
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  height: 90px;    
  width: 75%;
  text-align: center;
  font-size: 3.6em;
`

const TimePanelPage = props => (
  <div style={{ minHeight: '100vh'}}>
    <Head>
      <title> Control Panel | {props.room.substr(0, 6).toUpperCase()} </title>
    </Head>
    <Layouts style={{ color: 'white' }} >
      <div className="columns">
        <div className="column">
          <div className="card level-item has-text-centered">
            <div className="card-content">
              <span> <span className="font">Time On Display : <b>{props.room.substr(0, 6).toUpperCase()}</b> </span> <br /> <TimeDisplay>{props.display}</TimeDisplay></span>
            </div>
          </div>
        </div>
      </div>
        <div className="columns" style={{marginTop:'2em'}}>
          <div className="column level-item has-text-centered">
          <span> <span className="font">Select Time</span> <br /> <SelectTime>{props.hours}:{props.minutes}:{props.seconds}</SelectTime> </span>
          </div>
        </div>
        <div style={{ padding: '0 1em 1em 1em', margin: '0 0 2em 0'}}>
          <div className="columns is-desktop">
            <div className="column">
              <Control className="control">
                <Input className="input" placeholder="Hours" onChange={(e) => { props.setPropsTime(e.target.value, 'h') }} type="number" min="0" />
              </Control>
            </div>
            <div className="column">
              <Control className="control">
                <Input className="input" placeholder="Minutes" onChange={(e) => { props.setPropsTime(e.target.value, 'm') }} type="number" min="0" />
              </Control>
            </div>
            <div className="column">
              <Control className="control">
                <Input className="input" placeholder="Seconds" onChange={(e) => { props.setPropsTime(e.target.value, 's') }} type="number" min="0" />
              </Control>
            </div>
          </div>
        </div>
        <div className="card level-item has-text-centered">
          <div style={{ width: '100%'}} className="card-content">
            <div className="columns" style={{ padding: '0 1em', marginTop: '2em' }}>
              <div className="column is-12 level-item has-text-centered">
                <a style={{ fontSize: '1.9em',color: 'hsl(217, 71%, 53%)' }} onClick={() => { props.setTimer(props) }}>
                  <span className="icon is-large">
                    <i className="fa fa-cog"></i>
                  </span>
                  <div>
                    Set Time
                  </div>
                </a>
              </div>
            </div>
            <div className="columns" style={{ padding: '0 1em', justifyContent: 'center', marginTop: '2.3em', marginBottom: '1em' }}>
              <div className="column is-4 level-item has-text-centered">
                <a style={{ fontSize: '1.9em',color: 'hsl(171, 100%, 41%)'}} onClick={() => { props.startTime(props) }}>
                  <span className="icon is-large">
                    <i className="fa fa-play-circle"></i>
                  </span>
                  <div>
                    Start
                  </div>
                </a>
              </div>
              <div className="column is-4 level-item has-text-centered">
                <a style={{ fontSize: '1.9em',color: '#ff3860'}} onClick={() => { props.stopTime(props) }}>
                  <span className="icon is-large">
                    <i className="fa fa-stop-circle"></i>
                  </span>
                  <div>
                    Stop
                  </div>
                </a>
              </div>
              <div className="column is-4 level-item has-text-centered">
                <a style={{ fontSize: '1.9em',color: 'rgb(255, 204, 1)'}} onClick={() => { props.clearTime(props) }}>
                  <span className="icon is-large">
                    <i className="fa fa-repeat"></i>
                  </span>
                  <div>
                    Clear
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
    </Layouts>
  </div>
)

const TimePanelPageCompose = compose(
  withState('room', 'setRoom', ''),
  withState('time', 'setCurrentTime', moment(0).subtract(7, 'h')),
  withState('zeroTime', 'setZeroTime', moment(0).subtract(7, 'h')),
  withState('reduceTime', 'setReduce', ''),
  withState('display', 'setDisplay', '00:00:00'),
  withState('hours', 'setHour', '00'),
  withState('minutes', 'setMinute', '00'),
  withState('seconds', 'setSecond', '00'),
  withHandlers({
    startTime: props => () => {
      socket.emit(`${props.room}`, { header: 'startTime' })
      console.log('start')
      if (props.display !== '00:00:00') {
        props.reduceTime.start()
      }
    },
    stopTime: props => () => {
      socket.emit(`${props.room}`, { header: 'stopTime' })
      console.log('stop')
      props.reduceTime.stop()
    },
    setTimer: props => () => {
      let { hours, minutes, seconds, setMs, time, zeroTime } = props
      let newTime = moment(0).subtract(7, 'h')
      newTime.set({
        'hour': +hours,
        'minute': +minutes,
        'second': +seconds
      });
      props.setCurrentTime(newTime)
      props.setDisplay(newTime.format('HH:mm:ss'))
      socket.emit(`${props.room}`, { header: 'setTime', newTime: newTime})
    },
    setPropsTime: props => (val, key) => {
      switch (val.length) {
        case (0): val = '00';break;
        case (1): val = '0' + val;break;
        default: val = val.substring(0,2) ;break;
      }
      switch (key) {
        case 'h': props.setHour(val); break;
        case 'm': props.setMinute(val); break;
        default: props.setSecond(val); break;
      }
    },
    clearTime: props => () => {
      props.setHour('00')
      props.setMinute('00')
      props.setSecond('00')
      props.setDisplay('00:00:00')
      socket.emit(`${props.room}`, { header: 'setTime', newTime: moment(0).subtract(7, 'h') })
    }
  }),
  lifecycle({
    async componentWillMount() {
      let { setReduce, time, setCurrentTime, setRoom } = this.props
      setRoom(`${this.props.url.query.slug}-admin`)

      let reduceTime = moment.duration(1, "s").timer({ loop: true, start: false }, () => {
        let { time, setCurrentTime } = this.props
        setCurrentTime(time.subtract(1, 's'))
        let displayTime = time.format("HH:mm:ss")
        this.props.setDisplay(displayTime)
        if (this.props.display === '00:00:00') {
          console.log('stop')
          this.props.reduceTime.stop();
        }
      })
      this.props.setReduce(reduceTime)
    },
    async componentDidMount() {
    }
  })
)(TimePanelPage)

export default TimePanelPageCompose