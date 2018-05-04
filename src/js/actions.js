import {compose as c} from 'ramda'
import Enum from 'es6-enum'
import Github from '@octokit/rest'
import {normalize} from 'normalizr'
import {camelizeKeys} from 'humps'

import * as schemas from './schemas'

const github = new Github()
// github.authenticate({
//   type: 'token',
//   token: ''
// })

const normalizeUserByUsername = c(
  input => normalize(input, schemas.userByUsername),
  camelizeKeys
)

export const actionTypes = new Enum(
  'RETRIEVE_USER_BY_USERNAME',
  // 'RETRIEVE_GISTS_BY_USER',
  // 'RETRIEVE_GISTS_BY_SEARCH',
  'ACTIVATE_VIEW',
  // 'ACTIVATE_USER'
)

const _retrieveUserByUsername = (username, response, error) => ({
  type: actionTypes.RETRIEVE_USER_BY_USERNAME,
  username,
  response,
  error
})

export const retrieveUserByUsername = username => dispatch => {
  dispatch(_retrieveUserByUsername(username))
  return github.users.getForUser({username})
    .then(
      response => dispatch(_retrieveUserByUsername(username, normalizeUserByUsername(response))),
      error => dispatch(_retrieveUserByUsername(username, undefined, error))
    )
}

const _retrieveGistsByUser = (user, response) => ({
  type: actionTypes.RETRIEVE_GISTS_BY_USER,
  user,
  response
})

export const retrieveGistsByUser = user => dispatch => {
  dispatch(_retrieveGistsByUser(user))
  return github.gists.getForUser({username: user})
    .then(
      response => dispatch(_retrieveGistsByUser(user, response)),
      console.error
    )
}

export const activateView = view => ({
  type: actionTypes.ACTIVATE_VIEW,
  view
})
