import {compose as c} from 'ramda'
import Enum from 'es6-enum'
import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import {log} from 'js-utilities'

import * as schemas from './schemas'

const githubBaseOptions = {
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
}

const github = (path, options) => fetch(
  `https://api.github.com${path}`,
  {
    ...githubBaseOptions,
    ...options
  }
).then(response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  const error = new Error(response.statusText || response.status)
  error.response = response
  return Promise.reject(error)
})

export const actionTypes = new Enum(
  'ACTIVATE_VIEW_TYPE',
  'AUTHENTICATE_WITH_TOKEN',
  'RETRIEVE_USER_BY_AUTHENTICATION',
  'RETRIEVE_GISTS_BY_AUTHENTICATION',
  'RETRIEVE_STARRED_GISTS_BY_AUTHENTICATION',
  'RETRIEVE_USER_BY_USERNAME',
  'RETRIEVE_GISTS_BY_USERNAME'
)

export const activateViewType = viewType => ({
  type: actionTypes.ACTIVATE_VIEW_TYPE,
  viewType
})

const _retrieveGistsByUsername = (username, response, error) => ({
  type: actionTypes.RETRIEVE_GISTS_BY_USERNAME,
  username,
  response,
  error
})

export const retrieveGistsByUsername = username => dispatch => {
  dispatch(_retrieveGistsByUsername(username))
  return github(`/users/${username}/gists`)
    .then(response => response.json())
    .then(json => normalize(json, [schemas.gists]))
    .then(data => dispatch(_retrieveGistsByUsername(username, data)))
    .catch(error => dispatch(_retrieveGistsByUsername(username, null, error)))
}

const _retrieveUserByUsername = (username, response, error) => ({
  type: actionTypes.RETRIEVE_USER_BY_USERNAME,
  username,
  response,
  error
})

export const retrieveUserByUsername = username => dispatch => {
  dispatch(_retrieveUserByUsername(username))
  return github(`/users/${username}`)
    .then(response => response.json())
    .then(json => normalize(json, schemas.users))
    .then(data => {
      dispatch(_retrieveUserByUsername(username, data))
      dispatch(retrieveGistsByUsername(username))
    })
    .catch(error => dispatch(_retrieveUserByUsername(username, null, error)))
}

const _retrieveUserByAuthentication = (response, error) => ({
  type: actionTypes.RETRIEVE_USER_BY_AUTHENTICATION,
  response,
  error
})

export const retrieveUserByAuthentication = () => dispatch => {
  dispatch(_retrieveUserByAuthentication())
  return github('/user')
    .then(response => response.json())
    .then(json => normalize(json, schemas.users))
    .then(data => dispatch(_retrieveUserByAuthentication(data)))
    .catch(error => dispatch(_retrieveUserByAuthentication(null, error)))
}

const _retrieveGistsByAuthentication = (response, error) => ({
  type: actionTypes.RETRIEVE_GISTS_BY_AUTHENTICATION,
  response,
  error
})

export const retrieveGistsByAuthentication = () => dispatch => {
  dispatch(_retrieveGistsByAuthentication())
  return github('/gists')
    .then(response => response.json())
    .then(json => normalize(json, [schemas.gists]))
    .then(data => dispatch(_retrieveGistsByAuthentication(data)))
    .catch(error => dispatch(_retrieveGistsByAuthentication(null, error)))
}

const _retrieveStarredGistsByAuthentication = (response, error) => ({
  type: actionTypes.RETRIEVE_STARRED_GISTS_BY_AUTHENTICATION,
  response,
  error
})

export const retrieveStarredGistsByAuthentication = () => dispatch => {
  dispatch(_retrieveStarredGistsByAuthentication())
  return github('/gists/starred')
    .then(response => response.json())
    .then(json => normalize(json, [schemas.gists]))
    .then(data => dispatch(_retrieveStarredGistsByAuthentication(data)))
    .catch(error => dispatch(_retrieveStarredGistsByAuthentication(null, error)))
}

const _authenticateWithToken = () => ({
  type: actionTypes.AUTHENTICATE_WITH_TOKEN
})

export const authenticateWithToken = token => dispatch => {
  githubBaseOptions.headers.Authorization = `token ${token}`
  dispatch(_authenticateWithToken())
  dispatch(retrieveUserByAuthentication())
  dispatch(retrieveGistsByAuthentication())
  dispatch(retrieveStarredGistsByAuthentication())
}
