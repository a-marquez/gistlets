import styled from 'styled-components'

const CenterContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  ${props => props.height ? `height: ${props.height};` : ''};
  ${props => props.width ? `width: ${props.width};` : ''};
  ${props => props.gridTemplateColumns ? `grid-template-columns: ${props.gridTemplateColumns};` : ''};

  & > div {
    align-self: center;
    justify-self: center;
  }
`

export default CenterContainer
