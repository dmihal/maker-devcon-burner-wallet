import FollowUsOnTwitter from "./plugins/FollowUsOnTwitter/FollowUsOnTwitter";
import WithdrawFromStream from "./plugins/WithdrawFromStream/WithdrawFromStream";

class SablierPlugin {
  constructor() {
    this.pluginContext = null;
  }

  initializePlugin(pluginContext) {
    this.pluginContext = pluginContext;

    pluginContext.addPage("/stream/:id?", WithdrawFromStream);
    pluginContext.addButton("apps", "Sablier", "/stream", {
      description: 'Continuous payment streams you can access instantly.',
      logo: 'https://pbs.twimg.com/profile_images/1163480930910199809/nlJtmWT1_400x400.jpg',
    });

    pluginContext.addPage("/sablier-follow-us", FollowUsOnTwitter);
  }

  getWeb3() {
    const mainnetId = "1";
    return this.pluginContext.getWeb3(mainnetId);
  }
}

export default SablierPlugin;
