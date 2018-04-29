// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime/runtime'
import React from 'react'
import {connect, Provider} from 'react-redux'
import {render} from 'react-dom'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import ValuePre from 'value-pre'

import * as reducers from './reducers'
// import initialState from './fixtures/initial-state'
import experiment from './experiments'
import {
  retrieveGistsByUser,
  retrieveUserByUsername
} from './actions'

// experiment()
// console.clear()

const reduxApp = combineReducers(reducers)

const store = createStore(
  reduxApp,
  {},
  applyMiddleware(
    thunk,
    // logger,
  )
)

const App = connect(state => ({value: state}))(ValuePre)

render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))

// render(<ValuePre value={initialState}/>, document.getElementById('root'))

// store.dispatch(retrieveGistsByUser('a-marquez'))
store.dispatch(retrieveUserByUsername('a-marquez'))
