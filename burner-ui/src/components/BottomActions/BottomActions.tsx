import React, { Component } from 'react';
import { Box, Card, Flex } from 'rimble-ui';
import styled from 'styled-components';
import ReceiveModal from '../../Modals/Receive';
import Button, { Link } from '../../components/Button';
import { SCAN_QR_DATAURI } from '../../constants';

const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
const PK_REGEX = /^(?:0x)?[0-9a-f]{64}$/i;

const ScanButton = styled(Button)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 72px;
    width: 72px;
    border-radius: 50%;
    border: none;
    order: 3;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 20;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: center no-repeat url("${SCAN_QR_DATAURI}");
      background-size: 60%;
      z-index:21;
    }
`;

// override default styles
const BottomButton = styled(Link)`
  color: var(--color-primary);
  background-color: transparent;
  width: calc((100% - 72px - 8px) / 2);
  z-index: 10;
  border: none;
  box-shadow: none;
  &:hover,
  &:focus,
  &:active {
    outline: none;
    background: transparent;
    box-shadow: none;
  }
  &:before {
    display: none;
  }
`;

// override default styles
const BottomButtonButton = styled(Button)`
  color: var(--color-primary);
  background-color: transparent;
  width: calc((100% - 72px - 8px) / 2);
  z-index: 10;
  border: none;
  box-shadow: none;
  &:hover,
  &:focus,
  &:active {
    outline: none;
    background: transparent;
    box-shadow: none;
  }
  &:before {
    display: none;
  }
`;

interface BottomActionsProps {
  actions: any;
  pluginData: any;
  defaultAccount: any;
  className?: string;
}

class BottomActions extends Component<BottomActionsProps> {
  constructor(props: BottomActionsProps) {
    super(props);
    this.state = {
      receiveModalVisible: false
    };
  }

  openModal = () => {
    this.setState({
      receiveModalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      receiveModalVisible: false
    });
  };

  render() {
    const { actions, pluginData, defaultAccount, className } = this.props;

    return (
      <>
        <Box margin={'0 var(--page-margin)'} className={className}>
          <Card width='auto' padding={0}>
            <Flex justifyContent='space-between' alignItems='center'>
              <BottomButtonButton
                onClick={() => this.openModal()}
                children='Request'
                shadow
              />
              <ScanButton
                onClick={async () => {
                  try {
                    const result = await actions.scanQrCode();
                    if (pluginData.tryHandleQR(result, { actions })) {
                      return;
                    } else if (ADDRESS_REGEX.test(result)) {
                      actions.navigateTo('/send', { address: result });
                    } else if (PK_REGEX.test(result)) {
                      actions.callSigner('writeKey', defaultAccount, result);
                    } else if (result.indexOf(location.origin) === 0) {
                      actions.navigateTo(result.substr(location.origin.length));
                    }
                  } catch (e) {}
                }}
              />
              <BottomButton to='/send' children='Send' />
            </Flex>
          </Card>
          {pluginData.homeButtons.map(({ title, path }) => (
            <Link children={title} to={path} key={title} />
          ))}
        </Box>
        <ReceiveModal
          address={this.props.defaultAccount}
          isOpen={this.state.receiveModalVisible}
          hide={() => this.closeModal()}
        />
      </>
    );
  }
}

export default BottomActions;
