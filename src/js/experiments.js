import React from 'react'
import Github from '@octokit/rest'
import {normalize, schema} from 'normalizr'
import {camelizeKeys} from 'humps'
import * as r  from 'ramda'
import {compose as c} from 'ramda'

import userByUsername from './fixtures/user-by-username'

const users = new schema.Entity(
  'users'
)

export default function () {
  console.log(
    c(
      input => normalize(input, {data: users}),
      camelizeKeys
    )(userByUsername)
  )
}
