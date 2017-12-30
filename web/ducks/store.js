import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// Actions
const actions = {
  ADD: 'ADD'
}

const initState = {
  room: 'alchemist',
  time: '00:00:00'
}

// Reducer
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ADD:
      return { ...state, time: action.payload }
    default:
      return state
  }
}

// Action Creators
export const action = {
  ADD: time => {
    return { type: actions.ADD, payload: time }
  }
}

export default (initialState = initState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
