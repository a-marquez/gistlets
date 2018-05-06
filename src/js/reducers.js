import {cond, prop, propEq, T} from 'ramda'
import {combineReducers} from 'redux'

import {actionTypes} from './actions'
import {permissionTypes, viewTypes} from './constants'

const files = (state = {}, action) => {
  if (
    (
      action.type === actionTypes.RETRIEVE_GISTS_BY_USERNAME ||
      action.type === actionTypes.RETRIEVE_GISTS_BY_AUTHENTICATION ||
      action.type === actionTypes.RETRIEVE_STARRED_GISTS_BY_AUTHENTICATION
    ) && action.response
  ) {
    return {
      ...state,
      ...action.response.entities.files
    }
  }
  return state
}

const gists = (state = {}, action) => {
  if (
    (
      action.type === actionTypes.RETRIEVE_GISTS_BY_USERNAME ||
      action.type === actionTypes.RETRIEVE_GISTS_BY_AUTHENTICATION ||
      action.type === actionTypes.RETRIEVE_STARRED_GISTS_BY_AUTHENTICATION
    ) && action.response
  ) {
    return {
      ...state,
      ...action.response.entities.gists
    }
  }
  return state
}

const users = (state = {}, action) => {
  if (action.type === actionTypes.RETRIEVE_USER_BY_USERNAME && action.response) {
    return {
      ...state,
      ...action.response.entities.users
    }
  }
  return state
}

const views = () => ({
  [viewTypes.SAVED]: {
    type: viewTypes.SAVED,
    name: 'Saved'
  },
  [viewTypes.PERSONAL]: {
    type: viewTypes.PERSONAL,
    name: 'Personal'
  }
})

export const entities = combineReducers({files, gists, users, views})

export const activeUser = (state = null, action) => {
  if (
    (
      action.type === actionTypes.RETRIEVE_USER_BY_USERNAME ||
      action.type === actionTypes.RETRIEVE_USER_BY_AUTHENTICATION
    ) && action.response
  ) {
    return action.response.result
  }
  return state
}

export const permission = (state = permissionTypes.R) => state

export const activeViewType = (state = viewTypes.PERSONAL, action) => {
  if (action.type === actionTypes.ACTIVATE_VIEW_TYPE) {
    return action.viewType
  }
  return state
}
