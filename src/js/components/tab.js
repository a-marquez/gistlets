import styled from 'styled-components'

const Tab = styled.button`
  border-radius: 0px;
  color: #000;
  background-color: #FFF;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`

export default Tab
