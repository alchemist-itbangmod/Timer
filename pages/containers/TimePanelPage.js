import React from 'react';
import {
  compose,
  withState,
  withHandlers,
  lifecycle
} from 'recompose';

import styled from 'styled-components';
import Container from '../components/layouts'

import Moment from 'react-moment';
import moment from 'moment'
import timer from 'moment-timer'

const TimePage = props => (
  <Container style={{ flexDirection: 'column' }} >
    <span> display {props.display}</span>
    <span> current time {props.time.format('HH:mm:ss')}</span>
    <br />
    {props.hours}:{props.minutes}:{props.seconds}
    <br />
    Hr
    <input onChange={(e) => { props.setPropsTime(e.target.value, 'h') }} type="number" min="0" />
    Min
    <input onChange={(e) => { props.setPropsTime(e.target.value, 'm') }} type="number" min="0" />
    Sec
    <input onChange={(e) => { props.setPropsTime(e.target.value, 's') }} type="number" min="0" />

    <br />
    <button onClick={() => { props.setTimer(props) }}> set time </button>
    <br />

    <button onClick={() => { props.startTime(props) }}> Start </button>
    <button onClick={() => { props.stopTime(props) }}> Stop </button>
  </Container>
)

const TimePageCompose = compose(
  withState('time', 'setCurrentTime', moment(0).subtract(7, 'h')),
  withState('zeroTime', 'setZeroTime', moment(0).subtract(7, 'h')),
  withState('reduceTime', 'setReduce', ''),
  withState('display', 'setDisplay', '00:00:00'),
  withState('hours', 'setHour', '00'),
  withState('minutes', 'setMinute', '00'),
  withState('seconds', 'setSecond', '00'),
  withHandlers({
    startTime: props => () => {
      console.log('start')
      if (props.display !== '00:00:00') {
        props.reduceTime.start()
      }
    },
    stopTime: props => () => {
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
    },
    setPropsTime: props => (val, key) => {
      if (val.length <= 1)
        val = '0' + val
      switch (key) {
        case 'h': props.setHour(val); break;
        case 'm': props.setMinute(val); break;
        default: props.setSecond(val); break;
      }
    }
  }),
  lifecycle({
    async componentWillMount() {
      let { setReduce, time, setCurrentTime } = this.props

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
    }
  })
)(TimePage)

export default TimePageCompose