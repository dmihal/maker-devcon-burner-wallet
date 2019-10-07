import { Asset } from '@burner-wallet/assets';
import { BurnerPluginContext, Plugin } from '@burner-wallet/ui';
import Pair from './pairs/Pair';
import ExchangePage from './ui/ExchangePage';

interface ExchangeConstructor {
  pairs: Pair[],
};

export default class Exchange implements Plugin {
  private _pluginContext: BurnerPluginContext | null;
  private pairs: Pair[];

  constructor({ pairs }: ExchangeConstructor) {
    this.pairs = pairs;
    this._pluginContext = null;
  }

  async initializePlugin(pluginContext: BurnerPluginContext) {
    this._pluginContext = pluginContext;

    this.pairs.forEach(pair => pair.setExchange(this));

    await pluginContext.addPage('/exchange', ExchangePage);
    await pluginContext.addButton('apps', 'Exchange', '/exchange', { description: 'Convert between different currencies' });
  }

  getPairs() {
    return this.pairs;
  }

  getAsset(id: string): Asset {
    for (const asset of this.pluginContext.getAssets()) {
      if (asset.id === id) {
        return asset;
      }
    }
    throw new Error(`Can not find asset ${id}`);
  }

  getWeb3(network: string) {
    return this.pluginContext.getWeb3(network);
  }

  get pluginContext() {
    if (!this._pluginContext) {
      throw new Error('Exchange not initialized');
    }
    return this._pluginContext;
  }
}
