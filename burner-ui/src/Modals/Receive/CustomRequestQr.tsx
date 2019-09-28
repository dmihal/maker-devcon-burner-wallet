import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import { TransactionCardBody } from '../../components/TransactionCard';
import Text from '../../components/Text';
import { Flex } from 'rimble-ui';
import { Redirect } from 'react-router-dom';

const QRWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin: 16px;
  border: 1px solid #999;
  border-radius: 8px;
`;

const CustomRequestQr = ({ history, actions }) => {
  return (
    <Flex flexDirection='column' p={3}>
      <TransactionCardBody>
        <QRWrapper>
          <QRCode width={240} height={240} value='0x00000' renderAs='svg' />)
        </QRWrapper>
        <Text level={3} as='h2'>
          Amount: 12345
        </Text>
      </TransactionCardBody>
    </Flex>
  );
};

export default withBurner(CustomRequestQr);
