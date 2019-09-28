import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Asset } from '@burner-wallet/assets';
import Color from 'color';
import CurrencyInput from 'react-currency-input';
import {
  Box,
  Card,
  Flex,
  // Text,
  Tooltip,
  Button,
  Icon,
  Input,
  QR,
  Portal
} from 'rimble-ui';

import { BurnerContext, withBurner, SendParams } from '../../BurnerProvider';
import { Account } from '../../';
import AddressInputField from '../../components/AddressInputField';
import AddressInputSearchResults from '../../components/AddressInputSearchResults';
import AssetSelector from '../../components/AssetSelector';
// import Button from '../../components/Button';
import Text from '../../components/Text';
import Page from '../../components/Page';
import AccountBalance, {
  AccountBalanceData
} from '../../data-providers/AccountBalance';
// import RimbleAmountInput from '../../components/RimbleAmountInput';
import {
  RimbleInput,
  TransferMessageInput
} from '../../components/RimbleInput';
import {
  TransactionCard,
  TransactionCardHeader,
  TransactionCardBody,
  TransactionCardFooter
} from '../../components/TransactionCard';

import Clipboard from '../../components/Clipboard';

const ModalBackdrop = styled(Box)`
  & {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    height: ${window.innerHeight};
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`;

const PurpleCard = styled(Card)`
  background-color: var(--modal-header-background);
  height: 100%;
  flex: 1;
  margin-bottom: var(--page-margin);
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
  isOpen: boolean;
  hide: Function;
  address: string;
}

const TitleBar = styled(Box)`
`;

const AmountWrapper = styled(Flex)`
  background: var(--modal-background);
  padding: 0 var(--page-margin);
  align-items: center;
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

const MaxButton = styled(Button)`
  text-align: center;
  border-radius: 100px;
  font-size: 18px;
  color: #e1deff;
  padding: 4px 16px;
  margin: 8px 0px;
  border: 0px;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled(Button)`
  font-size: var(--l2-fs);
`

interface SendPageState {
  to: string;
  value: string;
  maxVal: string | null;
  asset: Asset;
  sending: boolean;
  txHash: string | null;
  account: Account | null;
  accounts: Account[];
  message: string;
  hide: Function;
  isOpen: boolean;
}

type SendPageProps = BurnerContext & RouteComponentProps & { classes: any };

class SendModal extends Component<SendPageProps, SendPageState> {
  constructor(props: SendPageProps) {
    super(props);
    this.state = {
      // to: (props.location.state && props.location.state.address) || '',
      to: '',
      value: '',
      maxVal: null,
      message: '',
      asset: props.assets[0],
      sending: false,
      txHash: null,
      account: null,
      accounts: []
    };
  }

  closeModal = () => {
    this.props.hide();
  };

  async getAccounts(search: string) {
    const { pluginData } = this.props;
    const _accounts = await Promise.all(
      pluginData.accountSearches.map(searchFn => searchFn(search))
    );
    const accounts = Array.prototype.concat(..._accounts);
    this.setState({ accounts });
  }

  async scanCode() {
    try {
      const address = await this.props.actions.scanQrCode();
      this.setState({ to: address });
    } catch (e) {}
  }

  send() {
    const { asset, to, value, message, maxVal } = this.state;
    const { actions } = this.props;
    if (!asset) {
      throw new Error('Asset not selected');
    }
    const sendProps: SendParams = {
      to,
      asset: asset.id,
      message: message.length > 0 ? message : null
    };

    if (maxVal) {
      sendProps.value = maxVal;
    } else {
      sendProps.ether = value;
    }

    actions.send(sendProps);
  }

  render() {
    const {
      to,
      value,
      asset,
      sending,
      txHash,
      account,
      accounts,
      message
    } = this.state;
    const { actions, classes } = this.props;

    if (txHash && asset) {
      return <Redirect to={`/receipt/${asset.id}/${txHash}`} />;
    }

    const { isOpen } = this.props;

    const colors = {
      foreground: 'black',
      background: 'white'
    };

    const canSend = !sending && to.length == 42 && to;
    return (
      isOpen && (
        <Portal>
          <ModalBackdrop>
            <TransactionCard
              width={1}
              maxWidth={6}
              color={colors.foreground}
              border={'none'}
              borderRadius={2}
              p={0}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
            <TransactionCardHeader>
              <TitleBar pl={2}>
                <Text level={1} as={'h1'} margin={'0'}>
                  Sending
                </Text>
                <Button.Text
                  icon={'Close'}
                  mainColor={'inherit'}
                  p={0}
                  borderRadius={'100%'}
                  position={'absolute'}
                  top={0}
                  right={0}
                  onClick={this.closeModal}
                />
              </TitleBar>

              <Box pt={3} pl={2}>
                <Text level={3} as={'p'} margin={'0'}>
                Address
                </Text>
                <AddressInputField
                  value={to}
                  account={account}
                  onChange={(to: string, account: Account | null) => {
                    this.setState({ to, account });
                    if (account) {
                      this.setState({ accounts: [] });
                    } else {
                      this.getAccounts(to);
                    }
                  }}
                  scan={() => this.scanCode()}
                  disabled={sending}
                />
              </Box>
              </TransactionCardHeader>
              <TransactionCardBody>
              <AmountWrapper>
                <Text level={3} as={'h2'}>
                  How much do you want to send?
                </Text>
                <AmountInput
                  // type='number'
                  precision={2}
                  pattern='\d*'
                  value={this.state.value}
                  placeholder='00.00'
                  onChangeEvent={e =>
                    this.setState({
                      value: e.target.value
                    })
                  }
                />
                <MaxButton
                  onClick={() => this.setState({ value: asset.amount })}
                >
                  Max
                </MaxButton>
                <AssetSelector
                  selected={asset}
                  onChange={newAsset => this.setState({ asset: newAsset })}
                  disabled={sending}
                />
              </AmountWrapper>
              </TransactionCardBody>
              <TransactionCardFooter>
                {asset.supportsMessages() && (
                  <Fragment>
                    <Text level={3} as='h3' margin={0}>
                      For:
                    </Text>
                    <TransferMessageInput
                      placeholder='Optional'
                      value={message}
                      onChange={e => this.setState({ message: e.target.value })}
                    />
                  </Fragment>
                )}
              </TransactionCardFooter>
            </TransactionCard>
            <SendButton
              mt={2}
              onClick={() => this.send()}
              // disabled={!canSend || exceedsBalance}
            >
              Send
            </SendButton>
          </ModalBackdrop>
        </Portal>
      )
    );
  }
}

export default withBurner(SendModal);
