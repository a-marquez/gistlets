import {schema} from 'normalizr'

export const files = new schema.Entity(
  'files',
  {},
  {idAttribute: (file, gist) => `${gist.id}-${file.filename}`}
)

export const users = new schema.Entity(
  'users'
)

export const gists = new schema.Entity(
  'gists',
  {
    owner: users,
    files: [files]
  }
)
