import React from 'react';
import styled from 'styled-components'
import { Card } from 'rimble-ui'



export const TransactionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 0px;
  color: #4E3FCE;
  background: #E1DEFF;
`

export const TransactionCardHeader = styled.div`
  background: #CAC4FF;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const TransactionCardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`

export const TransactionCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #D1CCFC;
  padding: 8px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
`
