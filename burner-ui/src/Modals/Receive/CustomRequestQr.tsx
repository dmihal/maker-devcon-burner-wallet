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

const CustomRequestQr = props => {
  console.log(props);
  const sendUrl = `https://burner.io/send/${props.address}/${props.amount}`;
  return (
    <Flex flexDirection='column' p={3}>
      <TransactionCardBody>
        <QRWrapper>
          <QRCode width={240} height={240} value={sendUrl} renderAs='svg' />)
        </QRWrapper>
        <Text level={3} as='h2'>
          Amount: {props.amount}
          Address: {props.address}
        </Text>
      </TransactionCardBody>
    </Flex>
  );
};

export default withBurner(CustomRequestQr);
