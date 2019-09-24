import React from 'react';
import styled from 'styled-components'
import { Input } from 'rimble-ui'

export const RimbleInput = styled(Input)`

`

export const TransferMessageInput = styled(Input)`
  background-color: transparent;
  box-shadow: none;
  outline: none;
  border: none;
  width: 100%;
  margin-left: 16px;
  text-align: right;
  font-size: 18px;
  transition: 0.15s ease-in-out;

  &:focus {
    background: #E1DEFF;
    box-shadow: none;
    text-align: center;
  }

  &:hover {
    box-shadow: none;
  }
`

export default (props) => (
  <RimbleInput placeholder={props.Placeholder} />
)
