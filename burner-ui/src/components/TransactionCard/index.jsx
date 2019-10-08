import React from 'react';
import styled from 'styled-components'
import { Card, Flex } from 'rimble-ui'



export const TransactionCard = styled(Card)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0px;
  color: var(--color-primary);
`

export const TransactionCardHeader = styled(Flex)`
  flex-direction: column;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: var(--color-makergradient);
`

export const TransactionCardBody = styled(Flex)`
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

export const TransactionCardFooter = styled(Flex)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid hsla(0, 0%, 90%, 1);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
`
