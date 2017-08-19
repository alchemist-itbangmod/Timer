import React, { Component } from 'react';
import Link from 'next/link';
import {compose, 
        withState, 
        lifecycle, 
        withHandlers} from 'recompose';

const Nav = props => {
  return (
    <div>
      {props.name} <br />
      <button onClick={() => props.changeName(props) }>Change Name</button> <br />
      <Link href='/room'><a>Room</a></Link> <br />
      <Link href='/time'><a>Time</a></Link> <br />
    </div>
  )
}

const NavCompose = compose(
 withState('name', 'setName', ''),
 withState('id', 'setId', 0),
 lifecycle({
   async componentWillMount() {
     let name = 'tae'
     this.props.setName(name)
   }
 }),
 withHandlers({
   changeName: props => () => {
     props.setId(props.id+1)
     props.setName(`Count ${props.id}`)
   }
 })
)(Nav)

export default NavCompose