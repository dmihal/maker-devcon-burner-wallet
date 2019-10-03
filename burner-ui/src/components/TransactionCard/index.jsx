import React from 'react';
import styled from 'styled-components';
import { Card } from 'rimble-ui';

export const TransactionCard = styled(Card)`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  padding: 0px;
  background: #fff;
`;

export const TransactionCardHeader = styled.div`
  /* background: #cac4ff; */
  padding: 12px 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
`;

export const TransactionCardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

export const TransactionCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  background: #fff;
  padding: 8px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
`;

export const QrWrapper = styled(Card)`
  display: flex;
  align-self: center;
  justify-content: center;
  width: 75%;
  padding: 24px;
  margin: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;
