import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Tooltip, Button, Icon, Input, QR } from 'rimble-ui';

import Text from '../../components/Text';
import Clipboard from '../../components/Clipboard';

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
  history: any;
}

class ReceiveModal extends Component<AddressQrModalProps> {
  constructor(props: AddressQrModalProps) {
    super(props);
  }

  render() {
    const { address } = this.props;

    return (
      <>
        <Text level={3} as={'p'} margin={0} center>
          Custom request text here
        </Text>
        <h1>Request</h1>
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
