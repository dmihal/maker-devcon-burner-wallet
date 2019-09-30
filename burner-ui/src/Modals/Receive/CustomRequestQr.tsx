import React, { Component } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { TransactionCardBody } from '../../components/TransactionCard';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import Text from '../../components/Text';
import { Flex, Box } from 'rimble-ui';

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin: 16px;
  border: 1px solid #999;
  border-radius: 8px;
`;

const QR = styled(QRCode)`
  width: 70vw;
  height: 70vw;
`;

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
    const sendUrl = `https://burner.io/send/${this.props.defaultAccount}/${this.props.match.params.amount}/${this.props.match.params.token}`;
    const infoText = 'Show this QR code to somebody else with a Burner Wallet';
    return (
      <Flex flexDirection='column' p={3}>
        <TransactionCardBody>
          <Text level={3} as='h2'>
            {infoText}
          </Text>
          <QR value={sendUrl} renderAs='svg' />
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
