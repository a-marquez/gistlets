import {schema} from 'normalizr'

export const users = new schema.Entity(
  'users'
)

export const userByUsername = {
  data: users
}
