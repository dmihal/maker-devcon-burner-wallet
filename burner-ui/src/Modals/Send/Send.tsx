import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
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
    flex-direction: column;
    align-items: center;
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

interface AddressQrModalProps {
  isOpen: boolean;
  hide: Function;
  address: string;
}

const TitleBar = styled(Box)`
  padding: 0;
`;

const AmountWrapper = styled(Flex)`
  align-items: center;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;


const MaxButton = styled(Button)`
  text-align: center;
  border-radius: 100px;
  font-size: 18px;
  color: var(--color-primary);
  background: var(--color-tertiary);
  padding: 4px 16px;
  margin: 8px 0px;
  border: 0px;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:before {
    background: var(--color-tertiary);
  }
`;

const SendButton = styled(Button)`
  background: var(--color-primary);
  color: var(--color-tertiary);

  &:before {
    background: var(--color-primary);
    color: var(--color-tertiary);
  }

  &:disabled {
  opacity: 1;
  background: var(--color-disabled);
  }
`

// const AssetPicker = styled(select)`
//   display: inline;
//   outline: none;
//   border: none;
//   background: transparent;
// `;

interface AssetPickerProps {
  assets?: any;
  selected?: string;
  onChange?: Function;
  disabled?: boolean;
}

{
  /* <AccountBalance
  key={asset.id}
  asset={asset.id}
  account={account}
  render={(data: AccountBalanceData | null) => (
    <BalanceItem
      asset={asset}
      usdBalance={data && data.usdBalance}
      balance={data && data.displayBalance}
    />
  )}
/>; */
}

// const AssetSelector: React.FC<AssetPickerProps> = ({
//   assets,
//   selected,
//   onChange
// }) => {
//   // console.log(AccountBalanceData);
//   const vals = ['Volvo', 'Saab', 'Mercedes', 'Audi'];
//   return (
//     <select onChange={() => onChange}>
//       {assets.map(asset => (
//         <AccountBalance
//           key={asset.id}
//           asset={asset.id}
//           account={Account}
//           render={(data: AccountBalanceData | null) => {
//             return (
//               <select
//                 value={asset.id}
//                 children={`${asset.name}: ${asset.balance}`}
//               />
//             );
//           }}
//         />
//       ))}
//     </select>
//   );
// };

const StyledWrapper = styled(Box)`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    position: relative;
  }
`;

const StyledInput = styled(Input)`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopyButton = ({ clipboardText, ...props }) => {
  const text = {
    tooltip: 'Copy to clipboard',
    button: 'Copy'
  };
};

interface SendPageState {
  to: string;
  value: string;
  maxVal: string | null;
  asset: Asset;
  sending: boolean;
  txHash: string | null;
  account: Account | null;
  accounts: Account[];
  assets;
  message: string;
  hide: Function;
  fieldValue?: string | Number;
}

interface SendPageProps extends BurnerContext {
  isOpen: boolean;
  to?: string;
}

class SendModal extends Component<SendPageProps, SendPageState> {
  constructor(props: SendPageProps) {
    super(props);
    this.state = {
      // to: (props.location.state && props.location.state.address) || '',
      to: '',
      value: '',
      fieldValue: '',
      maxVal: null,
      message: '',
      asset: props.assets[0],
      sending: false,
      txHash: null,
      account: null,
      accounts: [],
    };
  }

  componentDidMount() {
    if (this.props.to) {
      this.setState({ to: this.props.to });
    }
  }

  componentDidUpdate(oldProps) {
    if (this.props.isOpen && !oldProps.isOpen && this.props.to) {
      this.setState({ to: this.props.to });
    }
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
      message,
    } = this.state;
    const { assets, isOpen } = this.props;

    if (txHash && asset) {
      return <Redirect to={`/receipt/${asset.id}/${txHash}`} />;
    }

    const colors = {
      foreground: 'black',
      background: 'white',
    };

    const canSend = !sending && to.length === 42 && to && parseFloat(value) > 0;
    return (
      isOpen && (
        <AccountBalance
          asset={asset}
          render={(data: AccountBalanceData | null) => {
            const exceedsBalance = !!data
              && parseFloat(value) > parseFloat(data.displayMaximumSendableBalance);
            return (
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
                    <TransactionCardHeader
                    backgroundColor={'var(--color-makergradient)'}
                    >
                    <TitleBar>
                      <Text level={1} as={'h1'} margin='8px 0px 16px 0px' color={'var(--color-primary)'}>
                        Send To
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

                    <Box>
                      <AddressInputField
                        value={to}
                        account={account}
                        onChange={(_to: string, _account: Account | null) => {
                          this.setState({ to: _to, account: _account });
                          if (_account) {
                            this.setState({ accounts: [] });
                          } else {
                            this.getAccounts(_to);
                          }
                        }}
                        scan={() => this.scanCode()}
                        disabled={sending}
                      />
                    </Box>
                    </TransactionCardHeader>
                    <TransactionCardBody>
                    <AmountWrapper>
                      <Text level={2} as={'h2'} color={'var(--color-nearblack)'} textAlign={'center'}>
                        How much do you want to send?
                      </Text>
                      <RimbleAmountInput
                        asset={asset}
                        value={value}
                        onChange={(e) => this.setState({ value: e.target.value })}
                        disabled={sending}
                      />
                      <MaxButton
                        onClick={() => this.setState({
                          value: data.displayMaximumSendableBalance,
                          maxVal: data.maximumSendableBalance,
                        })}
                      >
                        Max
                      </MaxButton>
                      <AssetSelector
                        selected={asset}
                        assets={assets}
                        onChange={newAsset => this.setState({ asset: newAsset })}
                        disabled={sending}
                      />
                    </AmountWrapper>
                    </TransactionCardBody>
                    <TransactionCardFooter>
                      {asset.supportsMessages() && (
                        <Fragment>
                          <Text level={3} as="h3" margin={0}>
                            For:
                          </Text>
                          <TransferMessageInput
                            placeholder="Optional"
                            value={message}
                            onChange={(e) => this.setState({ message: e.target.value })}
                          />
                        </Fragment>
                      )}
                    </TransactionCardFooter>
                  </TransactionCard>
                  <SendButton
                    width={'100%'}
                    mt={2}
                    onClick={() => this.send()}
                    disabled={!canSend || exceedsBalance}
                  >
                    Send
                  </SendButton>
                </ModalBackdrop>
              </Portal>
            );
          }}/>
      )
    );
  }
}

export default withBurner(SendModal);
