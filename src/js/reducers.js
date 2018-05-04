import {cond, prop, propEq, T} from 'ramda'
import {combineReducers} from 'redux'

import {actionTypes} from './actions'
import {permissionTypes, views} from './constants'

const gists = (state = {}, action) => {
  switch (action.type) {
    case (actionTypes.RETRIEVE_GISTS_BY_USER):
      if (action.response) {
        return action.response.data
      }
      return state
    default:
      return state
  }
}

const users = (state = {}, action) => cond([
  [propEq('type', actionTypes.RETRIEVE_USER_BY_USERNAME), cond([
    [prop('error'), action => {
      console.error(action.error)
      return state
    }],
    [prop('response'), action => {
      console.clear()
      console.log(action.response)
      return {
        ...state,
        ...action.response.entities.users
      }
    }],
    [T, () => state]
  ])],
  [T, () => state]
])(action)

export const entities = combineReducers({gists, users})

export const permission = (state = permissionTypes.R) => state

export const activeUser = (state = null) => state

export const activeView = (state = views.SAVED, action) => {
  if (action.type === actionTypes.ACTIVATE_VIEW) {
    return action.view
  }
  return state
}
