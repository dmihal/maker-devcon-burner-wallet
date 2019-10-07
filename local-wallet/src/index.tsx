import React from 'react';
import ReactDOM from 'react-dom';
import { NativeAsset } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { HTTPGateway } from '@burner-wallet/core/gateways';
import BurnerUI from '../../burner-ui/src';
import LegacyPlugin from '../../plugins/src/legacy';
import CollectablePlugin from '../../collectable-plugin';
import AboutPlugin from '../../plugins/src/AboutPlugin';

const core = new BurnerCore({
  signers: [
    new InjectedSigner(),
    new LocalSigner({ privateKey: process.env.REACT_APP_PK, saveKey: false }),
  ],
  gateways: [
    new HTTPGateway('http://localhost:8545', '5777'),
  ],
  assets: [
    new NativeAsset({ id: 'gETH', name: 'Ganache ETH', network: '5777' }),
  ],
});

const BurnerWallet = () =>
  <BurnerUI
    title="Local Wallet"
    core={core}
    plugins={[
      new LegacyPlugin(),
      new CollectablePlugin('5777', process.env.REACT_APP_NFT_ADDRESS),
      new AboutPlugin(),
    ]}
  />


ReactDOM.render(<BurnerWallet />, document.getElementById('root'));
