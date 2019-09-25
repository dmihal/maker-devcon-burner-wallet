import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Asset } from '@burner-wallet/assets';
import Color from 'color';
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
import RimbleAmountInput from '../../components/RimbleAmountInput';
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
  isOpen: boolean;
  hide: Function;
  address: string;
}

const MaxButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-content: center;
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

const PurpleCard = styled(Card)`
  background-color: var(--modal-background);
`;

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
            <PurpleCard
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

              <Text
                color={'inherit'}
                p={3}
                borderBottom={1}
                borderColor={'blacks.4'}
                lineHeight={'solid'}
                textAlign={'center'}
                fontWeight={3}
              >
                Send
              </Text>
              <AccountBalance
                asset={asset}
                render={(data: AccountBalanceData | null) => {
                  {
                    /* // const exceedsBalance =
                  //   !!data &&
                  //   parseFloat(value) >
                  //     parseFloat(data.displayMaximumSendableBalance); */
                  }
                  return (
                    <>
                      <Flex flexDirection='column' p={3}>
                        <TransactionCard>
                          <TransactionCardHeader>
                            <Text level={2} as='p'>
                              Send to
                            </Text>
                            <AddressInputField
                              value={to}
                              account={account}
                              onChange={(
                                to: string,
                                account: Account | null
                              ) => {
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
                          </TransactionCardHeader>
                          <TransactionCardBody>
                            <Text level={3} as='h3'>
                              How much do you want to send?
                            </Text>
                            <RimbleAmountInput
                              asset={asset}
                              value={value}
                              onChange={e =>
                                this.setState({ value: e.target.value })
                              }
                              disabled={sending}
                            />
                            <MaxButton>Max</MaxButton>
                            <AssetSelector
                              selected={asset}
                              onChange={newAsset =>
                                this.setState({ asset: newAsset })
                              }
                              disabled={sending}
                            />
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
                                  onChange={e =>
                                    this.setState({ message: e.target.value })
                                  }
                                />
                              </Fragment>
                            )}
                          </TransactionCardFooter>
                        </TransactionCard>
                      </Flex>

                      <div>
                        <Button
                          onClick={() => this.send()}
                          // disabled={!canSend || exceedsBalance}
                        >
                          Send
                        </Button>
                      </div>
                    </>
                  );
                }}
              />
            </PurpleCard>
          </ModalBackdrop>
        </Portal>
      )
    );
  }
}

export default withBurner(SendModal);
