// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime/runtime'
import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import ValuePre from 'value-pre'

import App from './components/app'
import * as reducers from './reducers'
// import initialState from './fixtures/initial-state'
import {
  retrieveGistsByUser,
  retrieveUserByUsername
} from './actions'

const reduxApp = combineReducers(reducers)

const store = createStore(
  reduxApp,
  {},
  // initialState,
  applyMiddleware(
    thunk,
    logger,
  )
)

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))

// store.dispatch(retrieveUserByUsername('a-marquez'))
