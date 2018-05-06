import {filter} from 'ramda'
import React from 'react'
import {connect} from 'react-redux'

import PersonalView, {PersonalViewPlaceholder} from '../components/personal-view'
import {viewTypes} from '../constants'
import * as actions from '../actions'

const ActiveView = ({
  activeUser,
  activeViewType,
  gists,
  files,
  onUsernameEnter,
  onAuthenticateWithToken
}) => (
  <section>
    {activeViewType === viewTypes.SAVED ?
      <div>Saved View</div> :
      ''
    }
    {activeViewType === viewTypes.PERSONAL ?
      (activeUser ?
        <PersonalView
          publicGists={filter(gist => gist.owner === activeUser && gist.public === true)(gists)}
          privateGists={filter(gist => gist.owner === activeUser && gist.public === false)(gists)}
          starredGists={filter(gist => gist.owner !== activeUser)(gists)}
          {...{
            files
          }}
        /> :
        <PersonalViewPlaceholder
          {...{
            onUsernameEnter,
            onAuthenticateWithToken
          }}
        />) :
      ''
    }
  </section>
)

const mapState = state => ({
  activeUser: state.activeUser,
  activeViewType: state.activeViewType,
  gists: state.entities.gists,
  files: state.entities.files
})

const mapDispatch = dispatch => ({
  onUsernameEnter: username => dispatch(actions.retrieveUserByUsername(username)),
  onAuthenticateWithToken: token => dispatch(actions.authenticateWithToken(token))
})

export default connect(
  mapState,
  mapDispatch
)(ActiveView)

