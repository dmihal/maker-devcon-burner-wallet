import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import { TransactionCard,
         TransactionCardHeader,
         TransactionCardBody,
         TransactionCardFooter }
         from '../../components/TransactionCard';
import AmountInput from '../../components/AmountInput';
import AssetSelector from '../../components/AssetSelector';
import Button from '../../components/Button';

const ReceivePage: React.FC<BurnerContext> = ({ actions, history }) => {
  const [amount, setAmount] = useState(history.location.state ? history.location.state.amount : '0');
  return (
    <Page title='Receive' close>
      <TransactionCard>
        <TransactionCardHeader>
          <h3>Scan Request</h3>
          <p>Creates a QR code for someone to scan</p>
        </TransactionCardHeader>
        <TransactionCardBody>
          <h3>How much do you want to request?</h3>
          <AmountInput value={amount} onChange={e => setAmount(e.target.value)} />
        </TransactionCardBody>
      </TransactionCard>
      <Button onClick={() => actions.navigateTo('/receive')}>Cancel</Button>
      <Button onClick={() => actions.navigateTo('/request/display', { amount })}>Next</Button>
    </Page>
  );
};

export default withBurner(ReceivePage);
