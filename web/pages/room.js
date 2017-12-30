import React from 'react'
import withRedux from 'next-redux-wrapper'

import initStore from '../ducks/store'
import RoomContainer from '../components/Room/Container'

class Room extends React.Component {
  render () {
    return <RoomContainer {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default withRedux(
  initStore,
  mapStateToProps,
  null
)(Room)
