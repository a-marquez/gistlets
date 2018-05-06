import styled from 'styled-components'

const Card = styled.div`
  box-shadow: 0 2px 15px rgba(0,0,0,0.30);
  padding: 2em;
  ${props => props.width ? `width: ${props.width};` : ''};
`

export default Card
