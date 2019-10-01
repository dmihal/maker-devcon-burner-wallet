import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { Asset } from '@burner-wallet/assets';
import CurrencyInput from 'react-currency-input';
import { Portal, Box, Flex, Button } from 'rimble-ui';

import Modal, { ModalBackdrop, ModalCard } from '../Modal';

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
  params?;
  match?;
  buttonDisabled: boolean;
  displayVal: number;
}

type SendPageProps = BurnerContext & RouteComponentProps;

const isValid = to => {
  const ADDRESS_REGEX = /^(?:0x)?[0-9a-f]{40}$/i;
  return !ADDRESS_REGEX.test(to);
};
class SendModal extends Component<SendPageProps, SendPageState, BurnerContext> {
  constructor(props: SendPageProps) {
    super(props);

    this.state = {
      value: '',
      to: this.props.match.params.to || '',
      maxVal: null,
      message: null,
      asset: props.assets[0],
      sending: false,
      txHash: null,
      account: null,
      accounts: [],
      buttonDisabled: isValid(this.props.match.params.to || ''),
      displayVal: 0
    };
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
      message,
      buttonDisabled
    } = this.state;

    const { actions, assets } = this.props;

    return (
      <Portal>
        <ModalBackdrop>
          <ModalCard title='Send'>
            <Box padding={'24px var(--page-margin)'} width={1}>
              <AddressInputField
                value={this.state.to || ''}
                account={account}
                onChange={(to: string) => {
                  this.setState({
                    to: to,
                    buttonDisabled: isValid(to)
                  });
                }}
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
              <MaxButton
                onClick={() => this.setState({ value: asset[0].amount })}
              >
                Max
              </MaxButton>
              <AssetSelector
                selected={asset}
                assets={assets}
                onChange={() => this.setState({ asset: newAsset })}
                disabled={sending}
              />
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
            </AmountWrapper>
          </ModalCard>
          <Flex width={1} pt={16}>
            {/* Persist close button */}
            <Button as={Link} to='/' style={{ width: '30%' }}>
              Close
            </Button>
            {!buttonDisabled && (
              <Button
                style={buttonSend}
                as={Link}
                disabled={buttonDisabled}
                to={{
                  pathname: '/confirm',
                  state: {
                    from: this.props.defaultAccount,
                    to: to,
                    value: value,
                    asset: asset.id,
                    message: message && (message.length > 0 && message)
                  }
                }}
                children='Review &amp; Confirm'
              />
            )}
          </Flex>
        </ModalBackdrop>
      </Portal>
    );
  }
}

export default withBurner(SendModal);
