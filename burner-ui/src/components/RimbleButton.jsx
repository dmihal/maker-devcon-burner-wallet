import React from 'react';
import styled from 'styled-components'
import { Button } from 'rimble-ui'

const RimbleButton = styled(Button)`

`

export default (props) => (
  <RimbleButton>{props.buttonText}</RimbleButton>
)
