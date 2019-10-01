import React, { Component } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import {
  TransactionCardBody,
  QrWrapper
} from '../../components/TransactionCard';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Text from '../../components/Text';
import { Flex, Box } from 'rimble-ui';

const QR = styled(QRCode)`
  width: 70vw;
  height: 70vw;
`;

const domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');

interface CustomRequestQrProps {
  amount?: number;
  address?: string;
  token?: string;
  history: any;
  location: any;
  match: any;
  props: any;
  defaultAccount: string;
}

class CustomRequestQr extends Component<CustomRequestQrProps> {
  constructor(props: CustomRequestQrProps) {
    super(props);
  }
  render() {
    const sendUrl = `${domain}/send/${this.props.defaultAccount}/${this.props.match.params.amount}/${this.props.match.params.token}`;
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
              Amount: {this.props.match.params.amount}
              <br />
              Token: {this.props.match.params.token}
            </Text>
          </Box>
        </TransactionCardBody>
      </Flex>
    );
  }
}

export default withBurner(CustomRequestQr);
