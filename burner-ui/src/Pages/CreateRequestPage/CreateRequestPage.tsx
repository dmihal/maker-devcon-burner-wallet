import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
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
import RimbleInput from '../../components/RimbleInput';
import RimbleAmountInput from '../../components/RimbleAmountInput';


// To Do: This is also used by SendPage.tsx & should be migrated to an independent component to avoid consistency errors.
const TransferMessageInput = styled(RimbleInput)`
  background: transparent;
  box-shadow: none;
  border: 0px;
  outline: 0px;
`

const ReceivePage: React.FC<BurnerContext> = ({ actions, history, assets }) => {
  const [amount, setAmount] = useState(history.location.state ? history.location.state.amount : '0');
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState(assets[0])
  return (
    <Page title='Request' close>
      <TransactionCard>
        <TransactionCardHeader>
          <h3>Scan Request</h3>
          <p>Creates a QR code with your transaction request for someone to scan</p>
        </TransactionCardHeader>
        <TransactionCardBody>
          <h3>How much do you want to request?</h3>
          <RimbleAmountInput value={amount} placeholder="0" onChange={e => setAmount(e.target.value)} />
        </TransactionCardBody>
        <AssetSelector selected={asset} onChange={newAsset => setAsset(newAsset) } />
        <TransactionCardFooter>
          {asset.supportsMessages() && (
            <Fragment>
                <div>For:</div>
                <TransferMessageInput
                  value={message}
                  onChange={e => this.setState({ message: e.target.value })}

                />
            </Fragment>
          )}
        </TransactionCardFooter>
      </TransactionCard>
      <Button onClick={() => actions.navigateTo('/receive')}>Cancel</Button>
      <Button onClick={() => actions.navigateTo('/request/display', { amount })}>Next</Button>
    </Page>
  );
};

export default withBurner(ReceivePage);
