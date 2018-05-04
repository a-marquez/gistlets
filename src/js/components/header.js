import styled from 'styled-components'
import React from 'react'

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
`

export default () => (
  <Header>
    <div>Gistlets</div>
    <div>Sign In</div>
  </Header>
)
