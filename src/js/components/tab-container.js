/* eslint-disable react/no-array-index-key */
import React from 'react'

const TabContainer = ({tabs, activeTab, children}) => (
  <div>
    <div>
      {tabs.map((tab, index) => (
        <span key={`tab-${index}`}>{tab}</span>
      ))}
    </div>
    <div>
      {children[tabs.indexOf(activeTab)]}
    </div>
  </div>
)

export default TabContainer
