import React, { useState } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import { TransactionCard,
         TransactionCardHeader,
         TransactionCardBody,
         TransactionCardFooter }
         from '../../components/TransactionCard';
import { Card, Flex, Box } from 'rimble-ui';
import AmountInput from '../../components/AmountInput';
import AssetSelector from '../../components/AssetSelector';
import Button from '../../components/Button';
import Text from '../../components/Text';
import GlobalStyle from './GlobalStyle';
const classes = require('./ReceivePage.module.css');

const AddressWrapper = styled(Flex)`
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
`

const QRWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 16px;
`

const ScanRequestCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 8px 0px;
  border-radius: 8px;
  background: var(--background-secondary);
`

const ScanRequestHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const IcoScanRequest = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  border-radius: 100px;
  background: #999;
`



const ReceivePage: React.FC<BurnerContext> = ({ defaultAccount, actions }) => {
  const [showCopied, setShowCopied] = useState(false);
  return (
    <Page title="Request" close>
    <AddressWrapper>
     <Text level={3} as={'h1'}>
     Your Address
     </Text>
     <Text level={3} as={'p'}>
     Show this to someone and let them scan it in order to get your wallet address
     </Text>
        <QRWrapper>
          <QRCode width={240} height={240} value={defaultAccount} renderAs='svg' />
        </QRWrapper>
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
      </AddressWrapper>

      <ScanRequestCard onClick={() => actions.navigateTo('/request')}>
          <ScanRequestHeader>
            <IcoScanRequest></IcoScanRequest>
            <Text level={3} as={'h1'}>Create Request</Text>
          </ScanRequestHeader>
        <Text level={3} as={'p'}>Creates a QR code that someone can scan to pay you.</Text>
      </ScanRequestCard>
    </Page>
  );
};

export default withBurner(ReceivePage);
