import Enum from 'es6-enum'

export const permissionTypes = new Enum(
  'R',
  'RW'
)

export const views = new Enum(
  'SAVED',
  'PERSONAL',
  'SEARCH'
)
