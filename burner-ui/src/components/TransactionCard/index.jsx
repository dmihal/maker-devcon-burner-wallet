import React from 'react';
import styled from 'styled-components'
import { Card, Flex } from 'rimble-ui'



export const TransactionCard = styled(Card)`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 8px;
  padding: 0px;
  color: #4E3FCE;
`

export const TransactionCardHeader = styled(Flex)`
  flex-direction: column;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const TransactionCardBody = styled(Flex)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 0px 16px;
`

export const TransactionCardFooter = styled(Flex)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
`
