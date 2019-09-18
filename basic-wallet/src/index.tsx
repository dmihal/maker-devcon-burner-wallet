import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { xdai, dai, eth, NativeAsset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange from '@burner-wallet/exchange';
import { xdaiBridge, uniswapDai } from '@burner-wallet/exchange/pairs';
import BurnerUI from '../../burner-ui/src';
import LegacyPlugin from '@burner-wallet/plugins/legacy';
import CollectablePlugin from '../../collectable-plugin';

// Github Pages hack
if (localStorage.getItem('path')) {
  window.history.replaceState(null, 'MakerDAO Burner Wallet', localStorage.getItem('path'));
  localStorage.removeItem('path');
}

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  // assets: [xdai, dai, eth],
  assets: [new NativeAsset({
    id: 'keth',
    name: 'kETH',
    network: '42',
  })],
});

// const exchange = new Exchange({
//   pairs: [xdaiBridge, uniswapDai],
// });

const BurnerWallet = () =>
  <BurnerUI
    title="MakerDAO Wallet"
    core={core}
    plugins={[
      // exchange,
      new LegacyPlugin(),
      new CollectablePlugin('42', '0x0ACf5Ab7B4a80DEe293cC8DdE06b29C5798e2A72'),
    ]}
  />



ReactDOM.render(<BurnerWallet />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
