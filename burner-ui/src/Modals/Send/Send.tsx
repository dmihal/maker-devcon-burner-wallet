import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {
  RouteComponentProps,
  Link,
  withRouter,
  Redirect
} from 'react-router-dom';
import { Asset } from '@burner-wallet/assets';
import CurrencyInput from 'react-currency-input';
import { Portal, Box, Flex, Button } from 'rimble-ui';

import { ModalBackdrop, ModalCard } from '../Modals';

import { BurnerContext, withBurner, SendParams } from '../../BurnerProvider';
import { Account } from '../../';
import AddressInputField from '../../components/AddressInputField';
import Text from '../../components/Text';
import AccountBalance, {
  AccountBalanceData
} from '../../data-providers/AccountBalance';
import { TransferMessageInput } from '../../components/RimbleInput';
import { TransactionCardFooter } from '../../components/TransactionCard';
import AssetSelector from '../../components/AssetSelector';

const AmountWrapper = styled(Flex)`
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

// Have to pass object because Button as='', with styled component
// will delete all button/link styles.
const buttonSend = {
  flex: '1',
  marginLeft: 'var(--page-margin)'
};

interface SendPageState {
  to?: string | null;
  value?: string;
  maxVal?: number | string | null;
  sending?: boolean;
  txHash?: string | null;
  account?: Account | null;
  accounts?: Account[];
  asset: Asset;
  assets?;
  message?: string | null;
  fieldValue?: string | Number;
  location?: any;
  match?: {
    params?: {
      to: string;
      amount: number | string;
    };
  };
  buttonDisabled: boolean;
  displayVal: number;
  backTo?: string | null;
}

type SendPageProps = BurnerContext & RouteComponentProps;

const isValid = to => {
  const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
  return !ADDRESS_REGEX.test(to);
};

class SendModal extends Component<SendPageProps, SendPageState> {
  constructor(props: SendPageProps) {
    super(props);

    this.state = {
      displayVal: this.props.match.params.amount || 0,
      value: this.props.match.params.amount || '',
      to: this.props.match.params.to || '',
      maxVal: null,
      message: '',
      asset: props.assets[0],
      sending: false,
      txHash: null,
      account: null,
      accounts: [],
      buttonDisabled:
        isValid(this.props.match.params.to) && this.props.match.amount > 0
    };
  }

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
      message,
      buttonDisabled
    } = this.state;
    const { actions, assets } = this.props;

    if (txHash && asset) {
      return <Redirect to={`/receipt/${asset.id}/${txHash}`} />;
    }

    return (
      <Portal>
        <ModalBackdrop>
          <ModalCard title='Send'>
            <Box width={1} px={3}>
              <AddressInputField
                value={this.state.to || ''}
                account={account}
                backTo={this.props.location.pathname || ''}
                onChange={(_to: string, _account: Account | null) => {
                  this.setState({ to: _to, account: _account });
                  if (_account) {
                    this.setState({ accounts: [] });
                  } else {
                    this.getAccounts(_to);
                  }
                }}
                scan={() => this.scanCode()}
              />
            </Box>

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
                thousandSeparator=''
                maxLength='7'
                onChangeEvent={e =>
                  this.setState({
                    value: e.target.value,
                    displayVal: e.target.value
                  })
                }
              />

              {/* not functional */}
              <AccountBalance
                asset={asset}
                render={(data: AccountBalanceData | null) => {
                  return (
                    <MaxButton
                      onClick={() =>
                        this.setState({
                          value: data.displayMaximumSendableBalance || '0'
                          // maxVal: data.maximumSendableBalance
                        })
                      }
                    >
                      Max
                    </MaxButton>
                  );
                }}
              />
            </AmountWrapper>
            <Flex px={3} width={1} flexDirection='column'>
              {/* <AssetSelector
                selected={asset}
                assets={assets}
                onChange={() => this.setState({ asset: newAsset })}
                disabled={sending}
              /> */}
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
            </Flex>
          </ModalCard>
          <Flex width={1} pt={16}>
            {/* Persist close button */}
            <Button as={Link} to='/' style={{ width: '30%' }}>
              Close
            </Button>
            {!buttonDisabled && (
              <Button
                onClick={() => this.send()}
                children='Review &amp; Confirm'
                style={buttonSend}
              />
            )}
          </Flex>
        </ModalBackdrop>
      </Portal>
    );
  }
}

export default withRouter(withBurner(SendModal));
