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

const TimeDisplay = styled.span`
  font-family: digital;
  font-size: 7em;
  color: #fff;
`
const RoomDisplay = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1em;
  font-size: 40px;
  color: #fff;
`
const Container = Layouts.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  `

const TimePage = props => (
  <div>
    <Head>
      <title> Alchemist Timer | {props.room.substr(0, 6).toUpperCase()} </title>
    </Head>
    <Container className="background" style={{ flexDirection: 'column' }} >
      <span style={{
        fontFamily: 'digital',
        fontSize: '7em',
        color: '#fff'
      }}>{props.display}</span>
    </Container>
    <RoomDisplay className="font"> Room : <b> {props.room.toUpperCase()} </b></RoomDisplay>
  </div>
)

const TimePageCompose = compose(
  withState('room', 'setRoom', ''),
  withState('time', 'setCurrentTime', moment(0).subtract(7, 'h')),
  withState('reduceTime', 'setReduce', ''),
  withState('display', 'setDisplay', '00:00:00'),
  withState('hours', 'setHour', '00'),
  withState('minutes', 'setMinute', '00'),
  withState('seconds', 'setSecond', '00'),
  withHandlers({
    startTime : props => () => {
      if(props.display !== '00:00:00') {
        props.reduceTime.start()
      }
    },
    stopTime : props => () => {
      props.reduceTime.stop()
    },
    setTimer : props => (val) => {
      let { hours, minutes, seconds, time } = props
      let newTime = moment(val)
      props.setCurrentTime(newTime)
      props.setDisplay(newTime.format('HH:mm:ss'))
    },
    setPropsTime: props => (val, key) => {
      if (val.length <= 1) 
        val = '0' + val
      switch (key) {
        case 'h': props.setHour(val);break;
        case 'm': props.setMinute(val);break;
        default: props.setSecond(val);break;
      }
    }
  }),
  lifecycle({
    async componentWillMount() {
      let { setReduce, time, setCurrentTime , setRoom } = this.props
      await setRoom(this.props.url.query.slug)
      let reduceTime = moment.duration(1, "s").timer({ loop: true, start: false }, () => {
        let { time, setCurrentTime } = this.props
        setCurrentTime(time.subtract(1, 's'))
        let displayTime = time.format("HH:mm:ss")
        this.props.setDisplay(displayTime)
        if (this.props.display === '00:00:00') {
          this.props.reduceTime.stop();
        }
      })
      this.props.setReduce(reduceTime)
    },
    async componentDidMount() {
      socket.on(this.props.url.query.slug, (val) => {
        switch (val.header) {
          case 'setTime': this.props.setTimer(val.newTime); break;
          case 'startTime': this.props.startTime(); break;
          case 'stopTime': this.props.stopTime(); break;
          default: break;
        }
      })
    }
  })
)(TimePage)

export default TimePageCompose