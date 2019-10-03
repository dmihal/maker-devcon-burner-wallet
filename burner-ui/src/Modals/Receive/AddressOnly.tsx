import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { withBurner } from '../../BurnerProvider';
import { TransactionCardBody } from '../../components/TransactionCard';
import Text from '../../components/Text';
import { QrWrapper } from '../../components/TransactionCard';
import { Box, Flex, Button, Icon, Input } from 'rimble-ui';
import Clipboard from '../../components/Clipboard';

const StyledInput = styled(Input)`
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const domain =
  location.protocol +
  '//' +
  location.hostname +
  (location.port ? ':' + location.port : '');
const AddressOnly = ({ defaultAccount }) => {
  const sendUrl = `${domain}/send/${defaultAccount}`;
  const infoText = 'Show this QR code to somebody else with a Burner Wallet';

  return (
    <Flex
      flexDirection='column'
      p={3}
      justifyContent={'space-between'}
      flex={1}
      alignItems={'stretch'}
    >
      {/* <TransactionCardBody> */}
      <Text level={3} as='h2' margin='0'>
        {infoText}
      </Text>

      <QrWrapper>
        <QRCode value={sendUrl} renderAs='svg' />
      </QrWrapper>
      <Clipboard text={defaultAccount} width='100%'>
        {isCopied => (
          <Box
            color={'inherit'}
            position={'relative'}
            display={'flex'}
            alignItems={'center'}
          >
            <StyledInput
              readOnly
              value={defaultAccount}
              width={1}
              pr={'5rem'}
              fontWeight={3}
            />
            <Button
              size={'small'}
              width={'4rem'}
              mx={2}
              position={'absolute'}
              right={0}
            >
              {!isCopied ? 'Copy' : <Icon name={'Check'} />}
            </Button>
          </Box>
        )}
      </Clipboard>
    </Flex>
  );
};

export default withBurner(AddressOnly);
