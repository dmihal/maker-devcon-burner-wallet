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
const classes = require('./ReceivePage.module.css');

const ReceivePage: React.FC<BurnerContext> = ({ defaultAccount, actions }) => {
  const [showCopied, setShowCopied] = useState(false);
  return (
    <Page title="Request" close>
      <TransactionCard>
        <div className={classes.qrContainer}>
          <QRCode value={defaultAccount} renderAs='svg' />
        </div>
        <div className={classes.addressContainer}>
          <input
            value={defaultAccount}
            readOnly
            className={classes.address}
            onClick={() => {
              navigator.clipboard.writeText(defaultAccount);
              setShowCopied(true);
              setTimeout(() => setShowCopied(false), 5000);
            }}
          />
        </div>
        <div className={showCopied ? classes.copied : classes.copyHidden}>
          Address copied to clipboard
        </div>
      </TransactionCard>

      <div onClick={() => actions.navigateTo('/request')}>
        <h3>Create Request</h3>
        <p>Request a payment by generating a QR code</p>
      </div>
    </Page>
  );
};

export default withBurner(ReceivePage);
