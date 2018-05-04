import React from 'react'
import CenterContainer from './center-container'
import Card from './card'
import Header from './header'
import TabContainer from './tab-container'
import Footer from './footer'

const App = () => (
  <div>
    <CenterContainer>
      <Card width='500px'>
        <Header/>
        <TabContainer activeTab='Search' tabs={['Saved', 'Personal', 'Search']}>
          <div>Saved</div>
          <div>Personal</div>
          <div>Search</div>
        </TabContainer>
        <Footer/>
      </Card>
    </CenterContainer>
  </div>
)

export default App
