import React from 'react';
import styled from 'styled-components'
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import Button from '../../components/Button';

const QRWrapper = styled.div`
width: 100%;
max-width: 320px;
`

const DisplayRequestPage = ({ history, actions }) => {
  if (!history.location.state) {
    history.replace('/request');
    return null;
  }
  const { amount } = history.location.state;

  return (
    <Page>
      <QRCode value="0x0" />
      <div>Amount: {amount}</div>
      <Button onClick={() => actions.navigateTo('/request', { amount })}>Back</Button>
    </Page>
  );
};

export default withBurner(DisplayRequestPage);
