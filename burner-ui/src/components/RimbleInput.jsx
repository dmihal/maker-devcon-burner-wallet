import React from 'react';
import styled from 'styled-components'
import { Input } from 'rimble-ui'

const RimbleInput = styled(Input)`

`

export const TransferMessageInput = styled(Input)`
  background-color: transparent;
  box-shadow: none;
  outline: none;
  border: none;

  &:focus {
    background: #E1DEFF;
    box-shadow: none;
  }
`

export default (props) => (
  <RimbleInput placeholder={props.Placeholder} />
)
