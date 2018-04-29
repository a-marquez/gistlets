import {permissionTypes} from '../constants.js'

const initialState = {
  entitites: {
    users: {
      al: {
        username: 'albert',
        gists: ['g1', 'g2']
      }
    },
    gists: {
      g1: {
        author: 'al',
        public: true,
        invalidated: true
      },
      g2: {
        author: 'al',
        public: false,
        invalidated: false
      }
    },
    matchPatterns: {
      p1: {
        pattern: /localhost:1234/,
        gists: ['g1']
      }
    },
  },
  permission: permissionTypes.RW,
  activeUser: 'al'
}

export default initialState
