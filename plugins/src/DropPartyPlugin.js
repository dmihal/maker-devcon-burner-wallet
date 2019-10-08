// https://dropparty.tech/apps/galaxy/kknknxap

export default class DropPartyPlugin {
    initializePlugin(pluginContext) {

    pluginContext.onQRScanned((qr, pluginCtx) => {
      if (qr.indexOf('https://dropparty.tech/apps/galaxy') === 0) {
        fetch(`https://burnerfactory.com/getTokenId/${encodeURIComponent(qr)}`)
          .then(response => response.json())
          .then(({ redirect }) => pluginCtx.actions.navigateTo(redirect));
        return true;
      }
    });
  }
}
