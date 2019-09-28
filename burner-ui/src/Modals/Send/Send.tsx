import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { Asset } from '@burner-wallet/assets';
import CurrencyInput from 'react-currency-input';
import { Box, Flex, Button } from 'rimble-ui';

import { ModalBackdrop, ModalCard } from '../Modal';

import { BurnerContext, withBurner, SendParams } from '../../BurnerProvider';
import { Account } from '../../';
import AddressInputField from '../../components/AddressInputField';
// import AddressInputSearchResults from '../../components/AddressInputSearchResults';
// import AssetSelector from '../../components/AssetSelector';
// import Button from '../../components/Button';
import Text from '../../components/Text';
import AccountBalance, {
  AccountBalanceData
} from '../../data-providers/AccountBalance';
// import RimbleAmountInput from '../../components/RimbleAmountInput';
import { TransferMessageInput } from '../../components/RimbleInput';
import { TransactionCardFooter } from '../../components/TransactionCard';

interface AddressQrModalProps {
  isOpen: boolean;
  hide: Function;
  address: string;
}

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

// const AssetPicker = styled(select)`
//   display: inline;
//   outline: none;
//   border: none;
//   background: transparent;
// `;

// interface AssetPickerProps {
//   assets?: any;
//   selected?: string;
//   onChange?: Function;
//   disabled?: boolean;
// }

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

interface SendPageState {
  to?: string | null;
  value?: number | string;
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
}

type SendPageProps = BurnerContext & RouteComponentProps & { classes: any };

class SendModal extends Component<SendPageProps, SendPageState, BurnerContext> {
  constructor(props: SendPageProps) {
    super(props);
    this.state = {
      value: 0,
      to: (props.location.state && props.location.state.address) || '',
      fieldValue: '',
      maxVal: null,
      message: null,
      asset: props.assets[0],
      sending: false,
      txHash: null,
      account: null,
      accounts: []
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

    const { actions, classes, assets } = this.props;

    // if (txHash && asset) {
    //   return <Redirect to={`/receipt/${asset.id}/${txHash}`} />;
    // }

    return (
      <ModalBackdrop>
        <ModalCard title='Send'>
          <Box padding={'24px var(--page-margin)'}>
            <AddressInputField
              value={this.state.to || ''}
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
                  value: e.target.value
                })
              }
            />
            <MaxButton
              onClick={() => this.setState({ value: asset[0].amount })}
            >
              Max
            </MaxButton>
            {/* <AssetSelector
                  selected={asset}
                  assets={assets}
                  // onChange={() => this.setState({ asset: newAsset })}
                  disabled={sending}
                /> */}
          </AmountWrapper>

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
        </ModalCard>
        <Button.outline as={Link} to='/'>
          Close
        </Button.outline>
        <Button
          as={Link}
          to={{
            pathname: '/confirm',
            state: {
              to: to,
              asset: asset.id,
              message: message && (message.length > 0 && message)
            }
          }}
        >
          Send
        </Button>
      </ModalBackdrop>
    );
  }
}

export default withRouter(withBurner(SendModal));
