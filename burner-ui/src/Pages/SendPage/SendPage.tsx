import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Asset } from '@burner-wallet/assets';
import { BurnerContext, withBurner } from '../../BurnerProvider';
import { Account } from '../../';
import AddressInputField from '../../components/AddressInputField';
import AddressInputSearchResults from '../../components/AddressInputSearchResults';
import AssetSelector from '../../components/AssetSelector';
import AmountInput from '../../components/AmountInput';
import Button from '../../components/Button';
import Page from '../../components/Page';
import { Card } from 'rimble-ui';
import RimbleAmountInput from '../../components/RimbleAmountInput';
import RimbleInput from '../../components/RimbleInput';

const TransactionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 0px;
  color: #4E3FCE;
  background: #E1DEFF;
`

const TransactionCardHeader = styled.div`
  background: #CAC4FF;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const TransactionCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TransactionCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  background: #D1CCFC;
  padding: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-sizing: border-box;
`

const TransferMessageInput = styled(RimbleInput)`
  background: transparent;
  box-shadow: none;
  border: 0px;
  outline: 0px;
`

interface SendPageState {
  to: string;
  value: string;
  asset: Asset | null;
  sending: boolean;
  txHash: string | null;
  account: Account | null;
  accounts: Account[];
  message: string;
}

type SendPageProps = BurnerContext & RouteComponentProps & { classes: any };

const styles = {
  sendContainer: {
    marginTop: 16
  }
};

class SendPage extends Component<SendPageProps, SendPageState> {
  constructor(props: SendPageProps) {
    super(props);
    this.state = {
      to: (props.location.state && props.location.state.address) || '',
      value: '',
      message: '',
      asset: null,
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

  send() {
    const { asset, to, value, message } = this.state;
    const { actions } = this.props;
    if (!asset) {
      throw new Error('Asset not selected');
    }
    actions.send({
      to,
      ether: value,
      asset: asset.id,
      message: message.length > 0 ? message : null
    });
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

    const canSend = asset !== null && !sending && to.length == 42 && to;
    return (
      <Page>
        <TransactionCard>
          <TransactionCardHeader>
            <h3>Sending</h3>

            <h4>Send to</h4>
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
          </TransactionCardHeader>
          <TransactionCardBody>
            <h4>How much do you want to send?</h4>
            <RimbleAmountInput
              asset={asset}
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
              disabled={sending}
            />
            <AssetSelector selected={asset} onChange={newAsset => this.setState({ asset: newAsset })} disabled={sending} />
          </TransactionCardBody>

        <AddressInputSearchResults
          accounts={accounts}
          onSelect={(account: Account) =>
            this.setState({ account, accounts: [] })
          }
        />
        <TransactionCardFooter>
        {asset && asset.supportsMessages() && (
          <Fragment>
              <div>For:</div>
              <TransferMessageInput
                value={message}
                onChange={e => this.setState({ message: e.target.value })}

              />
          </Fragment>
        )}
        </TransactionCardFooter>



        </TransactionCard>
        <div className={classes.sendContainer}>
          <Button onClick={() => this.send()} disabled={!canSend}>
            Send
          </Button>
        </div>
      </Page>
    );
  }
}

export default injectSheet(styles)(withBurner(SendPage));
