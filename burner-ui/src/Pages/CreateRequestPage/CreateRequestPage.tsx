import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Page from '../../components/Page';
import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody,
  TransactionCardFooter
} from '../../components/TransactionCard';
import AssetSelector from '../../components/AssetSelector';
import Button from '../../components/Button';
import {
  RimbleInput,
  TransferMessageInput
} from '../../components/RimbleInput';
import RimbleAmountInput from '../../components/RimbleAmountInput';
import Text from '../../components/Text';
import { Flex } from 'rimble-ui';


const ReceivePage: React.FC<BurnerContext> = ({ actions, history, assets }) => {
  const [amount, setAmount] = useState(
    history.location.state ? history.location.state.amount : '0'
  );
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState(assets[0]);
  return (
    <Page>
      <Flex flexDirection='column' p={3}>
        <TransactionCard>
          <TransactionCardHeader>
            <Text level={1} as={'h1'} margin='8px 0px 16px 0px' color={'var(--color-primary)'}>
              Request
            </Text>
            <Text level={2} as='p' color={'var(--color-nearblack)'}>
              Creates a QR code with your transaction request for someone to
              scan
            </Text>
          </TransactionCardHeader>
          <TransactionCardBody>
            <Text level={3} as="p" color={'var(--color-nearblack)'}>How much do you want to request?</Text>
            <RimbleAmountInput
              value={amount}
              placeholder='0'
              onChange={e => setAmount(e.target.value)}
            />
          </TransactionCardBody>
          <AssetSelector
            selected={asset}
            onChange={newAsset => setAsset(newAsset)}
          />
          <TransactionCardFooter>
          {/*
          {asset.supportsMessages() && (
            <Fragment>
              <Text level={3} as="h3" margin={0} color={'var(--color-nearblack)'}>
                For:
              </Text>
              <TransferMessageInput
                placeholder="Optional"
                value={message}
                onChange={(e) => this.setState({ message: e.target.value })}
              />
            </Fragment>

          )}
          */}
          </TransactionCardFooter>
        </TransactionCard>
      </Flex>
      <Flex justifyContent={'space-between'} margin={'0 var(--page-margin)'}>
      <Button
       background='var(--color-tertiary)'
       onClick={() => actions.navigateTo('/')}>Back</Button>
      <Button
        width={'100%'}
        background='var(--color-primary)'
        onClick={() => actions.navigateTo('/request/display', { amount })}
      >
        Next
      </Button>
      </Flex>
    </Page>
  );
};

export default withBurner(ReceivePage);
