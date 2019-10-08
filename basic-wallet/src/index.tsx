import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { xdai, dai, eth, NativeAsset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange from '../../exchange/src';
import { xdaiBridge, uniswapDai } from '../../exchange/src/pairs';
import BurnerUI from '../../burner-ui/src';
import LegacyPlugin from '@burner-wallet/plugins/legacy';
import CollectablePlugin from '../../collectable-plugin';
import AboutPlugin from '../../plugins/src/AboutPlugin';
import DropPartyPlugin from '../../plugins/src/DropPartyPlugin';
import ChingPlugin from '../../ching-plugin';
// import SablierPlugin from '../../sablier';

// Github Pages hack
if (localStorage.getItem('path')) {
  window.history.replaceState(null, 'MakerDAO Burner Wallet', localStorage.getItem('path'));
  localStorage.removeItem('path');
}

const keth = new NativeAsset({
  id: 'keth',
  name: 'kETH',
  network: '42',
});

const core = new BurnerCore({
  signers: [new InjectedSigner(), new LocalSigner()],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  assets: [xdai, dai, eth, keth],
});

const exchange = new Exchange({
  pairs: [xdaiBridge, uniswapDai],
});

const BurnerWallet = () =>
  <BurnerUI
    title="MakerDAO Wallet"
    core={core}
    plugins={[
      exchange,
      new LegacyPlugin(),
      new CollectablePlugin('100', '0xdc6Bc87DD19a4e6877dCEb358d77CBe76e226B8b'),
      // new SablierPlugin(),
      new ChingPlugin(),
      new AboutPlugin(),
      new DropPartyPlugin(),
    ]}
  />



ReactDOM.render(<BurnerWallet />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
