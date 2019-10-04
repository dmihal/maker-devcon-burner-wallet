import { ComponentType } from 'react';
import { Asset } from '@burner-wallet/assets';
import { RouteComponentProps } from 'react-router-dom';
import { withBurner, Actions } from './BurnerProvider';
import BurnerUI from './BurnerUI';
import { Plugin, PluginPage, BasePluginContext, PluginElement } from './';

interface PluginPageData {
  path: string,
  Component: ComponentType<BasePluginContext & RouteComponentProps>,
  plugin: Plugin,
}

export interface PluginElementData {
  Component: ComponentType<BasePluginContext>,
  plugin: Plugin,
  options: any,
}

interface PluginButton {
  title: string,
  path: string,
  options: any,
}

interface PluginContext {
  actions: Actions,
}

interface SentData {
  asset: Asset,
  from: string,
  to: string,
  ether: string,
  message: string | null,
  receipt: any,
  hash: string,
  id?: string | null,
}

type AccountSearchFn = (query: string) => Promise<Account[]>;
type QRScannedFn = (qr: string, context?: PluginContext) => boolean;
type TXSentFn = (data: SentData) => string | void | null;

export interface BurnerPluginData {
  pages: PluginPageData[],
  buttons: { [position:string]: PluginButton[] },
  elements: { [position:string]: PluginElementData[] },
  accountSearches: AccountSearchFn[],
  tryHandleQR: (qr: string, context: PluginContext) => boolean,
  sent: TXSentFn,
}

export interface BurnerPluginContext {
  addElement: (position: string, Component: PluginElement, options?: any) => void,
  addHomeButton: (title: string, path: string) => any,
  addButton: (position: string, title: string, path: string, options?: any) => void,
  addPage: (path: string, Component: PluginPage) => any,
  getAssets: () => Asset[],
  getWeb3: (network: string, options?: any) => any,
  onAccountSearch: (callback: AccountSearchFn) => void,
  onQRScanned: (callback: QRScannedFn) => void,
  onSent: (callback: TXSentFn) => void,
}

export const DEFAULT_PLUGIN_DATA = {
  pages: [],
  buttons: {},
  elements: {},
  accountSearches: [],
  tryHandleQR: () => false,
  sent: () => null,
};

export default class Plugins {
  private changeListeners: ((data: BurnerPluginData) => void)[];
  private qrHandlers: QRScannedFn[];
  private sentHandlers: TXSentFn[];
  private pluginData: BurnerPluginData;
  private ui: BurnerUI;

  constructor(plugins: Plugin[], ui: BurnerUI) {
    this.changeListeners = [];
    this.sentHandlers = [];
    this.qrHandlers = [];
    this.ui = ui;
    this.pluginData = {
      ...DEFAULT_PLUGIN_DATA,
      tryHandleQR: this.tryHandleQR.bind(this),
      sent: this.sent.bind(this),
    };

    plugins.forEach(plugin => plugin.initializePlugin(this.getPluginContext(plugin)));
  }

  onDataChange(listener: (data: BurnerPluginData) => void) {
    this.changeListeners.push(listener);
  }

  getData() {
    return this.pluginData;
  }

  getPluginContext(plugin: Plugin): BurnerPluginContext {
    return {
      addElement: (position: string, Component: PluginElement, options?: any) =>
        this.addPluginElement(plugin, position, Component, options),
      onAccountSearch: (callback: AccountSearchFn) => this.addAccountSearch(callback),
      onQRScanned: (callback: QRScannedFn) => this.qrHandlers.push(callback),
      onSent: (callback: TXSentFn) => this.sentHandlers.push(callback),
      addPage: (path: string, Component: PluginPage) => this.addPluginPage(plugin, path, Component),
      addHomeButton: (title: string, path: string) =>
        this.addPluginButton(plugin, 'home', title, path),
      addButton: (position: string, title: string, path: string, options?: any) =>
        this.addPluginButton(plugin, position, title, path, options),
      getAssets: () => this.ui.getAssets(),
      getWeb3: (network: string, options?: any) => this.ui.getCore().getWeb3(network, options),
    };
  }

  setPluginData(newData: any) {
    this.pluginData = {
      ...this.pluginData,
      ...newData,
    };
    this.changeListeners.forEach(listener => listener(this.pluginData));
  }

  addPluginPage(plugin: Plugin, path: string, Component: PluginPage) {
    const WrappedComponent = withBurner(Component);
    this.setPluginData({
      pages: [...this.pluginData.pages, { plugin, path, Component: WrappedComponent }],
    });
  }

  addPluginButton(plugin: Plugin, position: string, title: string, path: string, options: any) {
    const existingButtons = this.pluginData.buttons[position] || [];
    this.setPluginData({
      buttons: {
        ...this.pluginData.buttons,
        [position]: [...existingButtons, { plugin, title, path, options }],
      },
    });
  }

  addPluginElement(plugin: Plugin, position: string, Component: PluginElement, options?: any) {
    const WrappedComponent = withBurner(Component);
    const existingElements = this.pluginData.elements[position] || [];
    this.setPluginData({
      elements: {
        ...this.pluginData.elements,
        [position]: [...existingElements, { plugin, Component: WrappedComponent, options }],
      },
    });
  }

  addAccountSearch(callback: AccountSearchFn) {
    this.setPluginData({
      accountSearches: [...this.pluginData.accountSearches, callback],
    });
  }

  tryHandleQR(qr: string, context: PluginContext) {
    for (const handler of this.qrHandlers) {
      if (handler(qr, context)) {
        return true;
      }
    }
    return false;
  }

  sent(data: SentData) {
    let redirect = null;
    for (const listener of this.sentHandlers) {
      const response = listener(data);
      if (!redirect && response && response.length) {
        redirect = response;
      }
    }
    return redirect;
  }
}
