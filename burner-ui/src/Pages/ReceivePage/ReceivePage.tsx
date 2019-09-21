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

const ReceivePage: React.FC<BurnerContext> = ({ defaultAccount }) => {
  const [showCopied, setShowCopied] = useState(false);
  return (
    <Page title='Receive' close>
    <TransactionCard>
      <TransactionCardHeader>
      <h3>Scan Request</h3>
      <p>Creates a QR code for someone to scan</p>
      </TransactionCardHeader>
      <TransactionCardBody>
      <h3>How much do you want to request?</h3>
      <AmountInput />
      </TransactionCardBody>
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
    <Button>Cancel</Button>
    <Button>Next</Button>
    </Page>
  );
};

export default withBurner(ReceivePage);
