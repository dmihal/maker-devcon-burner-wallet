import ConfigStyle from "./config/Config.scss";
import FollowUsOnTwitter from "./plugins/FollowUsOnTwitter/FollowUsOnTwitter";
import WithdrawFromStream from "./plugins/WithdrawFromStream/WithdrawFromStream";

class SablierPlugin {
  constructor() {
    this.pluginContext = null;
  }

  initializePlugin(pluginContext) {
    this.pluginContext = pluginContext;

    pluginContext.addPage("/stream/:id?", WithdrawFromStream);
    pluginContext.addHomeButton("Withdraw from Stream", "/stream");

    pluginContext.addPage("/follow-us", FollowUsOnTwitter);
    pluginContext.addHomeButton("Follow Us", "/follow-us");
  }

  getWeb3() {
    const mainnetId = "1";
    return this.pluginContext.getWeb3(mainnetId);
  }
}

export default SablierPlugin;
