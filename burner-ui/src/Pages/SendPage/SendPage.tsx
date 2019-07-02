import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Asset } from '@burner-wallet/assets';
import { BurnerContext } from '../../BurnerProvider';
import { Account } from '../../';
import AddressInputField from '../../components/AddressInputField';
import AddressInputSearchResults from '../../components/AddressInputSearchResults';
import AssetSelector from '../../components/AssetSelector';
import Page from '../../components/Page';

interface SendPageState {
  to: string,
  value: string,
  asset: Asset | null,
  sending: boolean,
  txHash: string | null,
  account: Account | null,
  accounts: Account[],
}

export default class SendPage extends Component<BurnerContext, SendPageState> {
  constructor(props: BurnerContext) {
    super(props);
    this.state = {
      to: '',
      value: '',
      asset: null,
      sending: false,
      txHash: null,
      account: null,
      accounts: [],
    };
  }

  componentDidMount() {
    this.getAccounts('');
  }

  async getAccounts(search: string) {
    const { pluginData } = this.props;
    const _accounts = await Promise.all(pluginData.accountSearches.map(searchFn => searchFn(search)));
    const accounts = Array.prototype.concat(..._accounts);
    this.setState({ accounts });
  }

  async scanCode() {
    try {
      const address = await this.props.actions.scanQrCode();
      this.setState({ to: address });
    } catch (e) {}
  }

  async send() {
    const { asset, to, value } = this.state;
    const { accounts } = this.props;
    if (!asset) {
      throw new Error('Asset not selected');
    }
    try {
      this.setState({ sending: true });
      const receipt = await asset.send({ from: accounts[0], to, ether: value });
      this.setState({
        sending: false,
        txHash: receipt.transactionHash,
      })
    } catch (err) {
      this.setState({ sending: false });
      console.error(err);
    }
  }

  render() {
    const { to, value, asset, sending, txHash, account, accounts } = this.state;
    const { actions } = this.props;

    if (txHash && asset) {
      return (
        <Redirect to={`/receipt/${asset.id}/${txHash}`} />
      )
    }

    const canSend = asset !== null && !sending && to.length == 42 && to;
    return (
      <Page title="Send To Address">
        <AssetSelector selected={asset} onChange={newAsset => this.setState({ asset: newAsset })} disabled={sending} />
        <div>To address:</div>
        <AddressInputField
          value={to}
          account={account}
          onChange={(to: string, account: Account | null) => this.setState({ to, account })}
          scan={() => this.scanCode()}
          disabled={sending}
        />
        <AddressInputSearchResults accounts={accounts} onSelect={(account: Account) => this.setState({ account })} />

        <div>Send Amount:</div>
        <div>
          <input value={value} type="num" onChange={e => this.setState({ value: e.target.value })} disabled={sending} />
        </div>

        <button type="button" onClick={() => this.send()} disabled={!canSend}>Send</button>
      </Page>
    );
  }
}
