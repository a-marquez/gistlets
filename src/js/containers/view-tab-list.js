/* eslint-disable react/no-array-index-key */
import React from 'react'
import {connect} from 'react-redux'

import Tab from '../components/tab'
import {activateViewType} from '../actions'

const ViewTabList = ({views, activeViewType, onTabClick}) => (
  <div style={{display: 'inline-block'}}>
    {Object.values(views).map(
      (view, index) => (
        <Tab
          key={`tab-${index}`}
          active={(view.id === activeViewType)}
          onClick={() => onTabClick(view.type)}
        >
          {view.name}
        </Tab>
      )
    )}
  </div>
)

const mapState = state => ({
  views: state.entities.views,
  activeViewType: state.activeViewType
})

const mapDispatch = dispatch => ({
  onTabClick: viewType => dispatch(activateViewType(viewType))
})

export default connect(
  mapState,
  mapDispatch,
)(ViewTabList)
