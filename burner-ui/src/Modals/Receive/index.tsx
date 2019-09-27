import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Box,
  Flex,
  Card,
  Tooltip,
  Button,
  Icon,
  Input,
  QR,
  Portal
} from 'rimble-ui';

import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody,
  TransactionCardFooter
} from '../../components/TransactionCard';
import Text from '../../components/Text';

import Tabs, { Tab } from '../../components/Tabs';
import Clipboard from '../../components/Clipboard';
import CurrencyInput from 'react-currency-input';
import AssetSelector from '../../components/AssetSelector';
import {
  RimbleInput,
  TransferMessageInput
} from '../../components/RimbleInput';

const AmountWrapper = styled(Flex)`
  background: var(--modal-background);
  padding: 0 var(--page-margin);
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AmountInput = styled(CurrencyInput)`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  font-size: 80px;
  height: 80px;
  margin-top: auto;
  margin-bottom: auto;
  background-color: transparent;
  appearance: none;
`;

const ModalBackdrop = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column;
    place-items: center;
    place-content: center;
  }
`;

const SendButton = styled(Button)`
  font-size: var(--l2-fs);
  width: 100%;
  margin-top: 1rem;
`;

ModalBackdrop.defaultProps = {
  bg: 'blacks.10',
  p: 3
};

const StyledInput = styled(Input)`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface AddressQrModalProps {
  address: string;
}

class ReceiveModal extends Component<AddressQrModalProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
  }

  closeModal = () => {
    this.props.hide();
  };

  render() {
    const { isOpen, address } = this.props;

    const text = {
      title: 'Receive',
      descriptionForAddress: 'Scan this QR code to obtain the address',
      descriptionForRequest: 'How much do you want to request?'
    };

    const colors = {
      foreground: 'black',
      background: 'white'
    };

    const displayAddressQr = (
      <>
        <Text level={3} as={'p'} margin={0} center>
          {text.descriptionForAddress}
        </Text>
        <Box
          // size={['100%', '200px']}
          width={1}
          maxWidth={'220px'}
          mx={'auto'}
          mt={3}
          mb={4}
          p={4}
          bg={'white'}
          border={1}
          borderColor={'blacks.3'}
          borderRadius={2}
          boxShadow={2}
        >
          <QR value={address} size={'100%'} />
        </Box>
        <Box p={[3, 4]} pt={0} overflow={'scroll'}></Box>
      </>
    );

    const displayCustomRequest = (
      <>
        <Text level={3} as={'p'} margin={0} center>
          {text.descriptionForRequest}
        </Text>
        <AmountWrapper>
          <AmountInput placeholder='00.00' />
          {/*
        <AssetSelector
          selected={asset}
          onChange={newAsset => this.setState({ asset: newAsset })}
          disabled={sending}
        />
        */}
        </AmountWrapper>
      </>
    );

    return (
      <>
        <Tabs>
          <Tab title='Your Address' children={displayAddressQr}></Tab>
          <Tab
            default
            title='Custom Request'
            children={displayCustomRequest}
          ></Tab>
        </Tabs>
      </>
    );
  }
}

const CopyButton = ({ clipboardText, ...props }) => {
  const text = {
    tooltip: 'Copy to clipboard',
    button: 'Copy'
  };

  if (!props.textLabels) {
    return (
      <Clipboard text={clipboardText}>
        {isCopied => (
          <Tooltip message={text.tooltip}>
            <Button size={'small'} p={0}>
              <Icon name={isCopied ? 'Check' : 'Assignment'} />
            </Button>
          </Tooltip>
        )}
      </Clipboard>
    );
  }
  return (
    <Clipboard text={clipboardText}>
      {isCopied => (
        <Button size={'small'}>{!isCopied ? text.button : 'Copied!'}</Button>
      )}
    </Clipboard>
  );
};

export default ReceiveModal;
