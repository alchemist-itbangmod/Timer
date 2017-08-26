import React from 'react';
import { compose,
         withState,
         withHandlers,
         lifecycle } from 'recompose';
import socket from '../libs/socket';

import styled from 'styled-components';
import Layouts from '../components/layouts'

import Moment from 'react-moment';
import moment from 'moment'
import timer from 'moment-timer'

const Heading = styled.span`
  font-family: BlinkMacSystemFont, -apple-system, 
  "Segoe UI", "Roboto", "Oxygen", 
  "Ubuntu", "Cantarell", "Fira Sans", 
  "Droid Sans", "Helvetica Neue", "Helvetica", "
  Arial", sans-serif;
`

const TimeDisplay = styled.div`
  font-size: 3em;
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
  // height: 90px;
  // width: 150px;
  font-size: 1.6em;
`

const TimePanelPage = props => (
  <Layouts style={{ color: 'white' }} >
    <div className="columns is-mobile">
      <div className="column level-item has-text-centered">
        <div className="card">
          <div className="card-content">
            <span> <Heading>Time On Display</Heading> <br /> <TimeDisplay>{props.display}</TimeDisplay></span>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="columns is-mobile">
        <div className="column level-item has-text-centered">
          <span> <Heading>Select Time</Heading> <br /> <SelectTime>{props.hours}:{props.minutes}:{props.seconds}</SelectTime> </span>
        </div>
      </div>
      <div className="columns" style={{ padding: '0 1em'}}>
        <div className="column is-3">
          <Control className="control">
            <Input className="input" placeholder="Hours" onChange={(e) => { props.setPropsTime(e.target.value, 'h') }} type="number" min="0" />
          </Control>
        </div>
        <div className="column is-3">
          <Control className="control">
            <Input className="input" placeholder="Minutes" onChange={(e) => { props.setPropsTime(e.target.value, 'm') }} type="number" min="0" />
          </Control>
        </div>
        <div className="column is-3">
          <Control className="control">
            <Input className="input" placeholder="Seconds" onChange={(e) => { props.setPropsTime(e.target.value, 's') }} type="number" min="0" />
          </Control>
        </div>
      </div>
      <div className="columns is-mobile" style={{ padding: '0 1em' }}>
        <div className="column is-12 level-item has-text-centered">
          <br />
          <button className="button is-info is-large" onClick={() => { props.setTimer(props) }}> Set Time </button>
        </div>
      </div>
      <div className="columns is-mobile" style={{ padding: '0 1em', marginTop: '0.6em' }}>
        <div className="column level-item has-text-centered">
          <button className="button is-primary is-large" onClick={() => { props.startTime(props) }}> Start </button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="button is-danger is-large" onClick={() => { props.stopTime(props) }}> Stop </button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="button is-warning is-large" onClick={() => { props.clearTime(props) }}> Clear </button>
        </div>
      </div>
    </div>
  </Layouts>
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
      console.log(this.props.url.query.slug)
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