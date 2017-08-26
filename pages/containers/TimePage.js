import React from 'react';
import { compose,
         withState,
         withHandlers,
         lifecycle } from 'recompose';

import styled from 'styled-components';
import Container from '../components/layouts'

import Moment from 'react-moment';
import moment from 'moment'
import timer from 'moment-timer'

const TimePage = props => (
  <Container style={{ flexDirection: 'column' }} >
    <span> display { props.display }</span>
    <span> current time { props.time }</span>
    <span> futureTime time { props.futureTime }</span>
    {}
    <br/>
    {props.hours} : {props.minutes} : {props.seconds}
    <br/>
    Hr 
    <input onChange={(e) => { if(e.target.value.length === 1) e.target.value = '0' + e.target.value; props.setHour(e.target.value); }} type="number" min="0" />
    Min
    <input onChange={(e) => { if (e.target.value.length === 1) e.target.value = '0' + e.target.value; props.setMinutes(e.target.value); }} type="number" />
    Sec
    <input onChange={(e) => { if (e.target.value.length === 1) e.target.value = '0' + e.target.value; props.setSecond(e.target.value); }} type="number" />
    
    <br/>
    <button onClick={() => { console.log('set time') }}> set time </button>
    <br/>

    <button onClick={() => { props.startTime(props) }}> Start </button>
    <button onClick={() => { props.stopTime(props) }}> Stop </button>
    <button onClick={() => { props.currentTime(props) }}> Current </button>
    <button onClick={() => { props.getCountTime(props) }}> getCountTime </button>
  </Container>
)

const TimePageCompose = compose(
  withState('time', 'setTime', moment().format()),
  withState('display', 'setDisplay', '00:00:00'),
  withState('futureTime', 'setFutureTime', moment().add(10, 's').format()),
  withState('countTime', 'setCountTime', moment().format('HH:mm:ss')),
  withState('countdown', 'setCountdown', moment().format('HH:mm:ss')),
  withState('hours', 'setHour', '00'),
  withState('minutes', 'setMinutes', '00'),
  withState('seconds', 'setSecond', '00'),
  withHandlers({
    startTime : props => () => {
      console.log('start')
      props.countTime.start()
    },
    stopTime : props => () => {
      console.log('stop')
      props.countTime.stop()
    },
    currentTime : props => () => {
      console.log(props.time)
    },
    setFuture : props => () => {
      console.log(props.setFutureTime(''))
    },
    getCountTime : props => () => {
      console.log(props.countdown)
      console.log(props.futureTime)
      console.log(moment().add(1,'s').diff(moment()))
    },
  }),
  lifecycle({
    async componentWillMount() {
      let current = moment(this.props.time);
      let future = moment(this.props.futureTime);
      let timemil = future.diff(current);
      console.log(current)
      console.log(future)
      console.log('displaytime ', timemil)
      console.log(moment(timemil).subtract(7,'h').format("HH:mm:ss"))

      let { setCountTime, time, futureTime } = this.props
      // setCountTime(time.diff(futureTime,'h'))
      // console.log(moment().format('HH:mm:ss'))
      this.props.setFutureTime(moment().add(10, 's').format())
      // this.props.setFuture(moment().add())
      let countTime = moment.duration(1, "seconds").timer({ loop: true, start: false },() =>{
        console.log(this.props.time)
        this.props.setTime(moment().format())
        // this.props.setDisplay(moment(this.props.futureTime).diff(moment(this.props.time)))
        let current = moment(this.props.time);
        let future = moment(this.props.futureTime);
        console.log(current)
        console.log(future)
        let timeConvert = future.diff(current);
        console.log('displaytime ', timeConvert)
        let displayTime = moment(timeConvert).subtract(7, 'h').format("HH:mm:ss")
        this.props.setDisplay(displayTime)
        if (this.props.display === '00:00:00') {
          this.props.countTime.stop();
        }
      })
      this.props.setCountTime(countTime)
    }
  })
)(TimePage)

export default TimePageCompose