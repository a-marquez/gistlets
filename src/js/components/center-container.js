import styled from 'styled-components'

const CenterContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 2em 0em;

  & > div {
    align-self: center;
    justify-self: center;
  }
`

export default CenterContainer
