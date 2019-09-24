import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { TransactionCard,
         TransactionCardHeader,
         TransactionCardBody,
         TransactionCardFooter }
         from '../../components/TransactionCard';
import Text from '../../components/Text';

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin: 16px;
  border: 1px solid #999;
  border-radius: 8px;
`

const DisplayRequestPage = ({ history, actions }) => {
  if (!history.location.state) {
    history.replace('/request');
    return null;
  }
  const { amount } = history.location.state;

  return (
    <Page title="Requesting" back>
      <TransactionCard>
        <TransactionCardHeader>
        <Text level={3} as="h1" center>Please scan this QR code to complete the transaction.</Text>
        </TransactionCardHeader>
        <TransactionCardBody>
          <QRWrapper>
            <QRCode width={240} height={240} value="0x0" renderAs="svg"/>
          </QRWrapper>
          <Text level={3} as="h2">Amount: {amount}</Text>
        </TransactionCardBody>
      </TransactionCard>
      <Button onClick={() => actions.navigateTo('/request', { amount })}>Back</Button>
    </Page>
  );
};

export default withBurner(DisplayRequestPage);
