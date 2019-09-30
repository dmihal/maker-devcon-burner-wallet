import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { withBurner } from '../../BurnerProvider';
import { TransactionCardBody } from '../../components/TransactionCard';
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

const CustomRequestQr = ({ defaultAccount, amount }) => {
  const sendUrl = `https://burner.io/send/${defaultAccount}/${amount}`;
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
            Amount: {amount}
          </Text>
        </Box>
      </TransactionCardBody>
    </Flex>
  );
};

export default withBurner(CustomRequestQr);
