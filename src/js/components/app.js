import React from 'react'
import {injectGlobal} from 'styled-components'

import ViewTabList from '../containers/view-tab-list'
import ActiveView from '../containers/active-view'
import CenterContainer from './center-container'
import Card from './card'
import Header from './header'
import Footer from './footer'

injectGlobal`
  html,
  body,
  form {
    padding: 0px;
    margin: 0px;
  }

  button {
    cursor: pointer;
  }
`

const App = () => (
  <div>
    <CenterContainer width='100%' height='100%'>
      <Card width='500px'>
        <Header/>
        <section>
          <ViewTabList/>
          <a href='https://gist.github.com/search' target='_blank'>
            Search
          </a>
        </section>
        <ActiveView/>
        <Footer/>
      </Card>
    </CenterContainer>
  </div>
)

export default App
