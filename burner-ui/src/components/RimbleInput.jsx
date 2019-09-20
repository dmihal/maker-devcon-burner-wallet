import React from 'react';
import styled from 'styled-components'
import { Input } from 'rimble-ui'

const RimbleInput = styled(Input)`

`

export default (props) => (
  <RimbleInput placeholder={props.Placeholder} />
)
