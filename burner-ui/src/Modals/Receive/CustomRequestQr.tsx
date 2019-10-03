import React, { Component } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { withBurner } from '../../BurnerProvider';
import { Asset } from '@burner-wallet/assets';
import {
  TransactionCardBody,
  QrWrapper
} from '../../components/TransactionCard';
import Text from '../../components/Text';
import { Flex, Box } from 'rimble-ui';

const domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');

interface CustomRequestQrProps {
  amount?: number;
  address?: string;
  asset?: Asset;
  history: any;
  location: any;
  match: any;
  props: any;
  defaultAccount: string;
}

const CustomRequestQr: React.FC<CustomRequestQrProps> = ({
  defaultAccount,
  match: {
    params: { amount, token }
  }
}) => {
  const sendUrl = `${domain}/send/${defaultAccount}/${amount}/${token}`;
  const infoText = 'Display this code to somebody with a Burner Wallet';
  return (
    <Flex flexDirection='column' p={3}>
      <TransactionCardBody>
        <Text level={3} as='h2' margin='0 0 16px 0'>
          {infoText}
        </Text>
        <QrWrapper>
          <QRCode value={sendUrl} renderAs='svg' />
        </QrWrapper>
        <Box>
          <Text level={3} as='p'>
            Amount: {amount}
            <br />
            Token: {token}
          </Text>
        </Box>
      </TransactionCardBody>
    </Flex>
  );
};

export default withBurner(CustomRequestQr);
