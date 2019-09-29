import abi from './abi/Collectable.json';
import NFTDrawer from './ui/NFTDrawer';
import NFTDetailPage from './ui/NFTDetailPage';
import NFTClonePage from './ui/NFTClonePage';

export default class CollectablePlugin {
  constructor(network, address) {
    this.network = network;
    this.address = address;
    this.nftCache = {};
  }

  initializePlugin(pluginContext) {
    this.pluginContext = pluginContext;
    pluginContext.addElement('home-tab', NFTDrawer, { title: 'Collectables' });
    pluginContext.addPage('/nft/:id', NFTDetailPage);
    pluginContext.addPage('/clone/:id', NFTClonePage);
  }

  getContract() {
    if (!this.contract) {
      const web3 = this.pluginContext.getWeb3(this.network);
      this.contract = new web3.eth.Contract(abi, this.address);
    }
    return this.contract;
  }

  async getNFTs(address) {
    const contract = this.getContract();
    const numNFTs = await contract.methods.balanceOf(address).call();
    const nfts = await Promise.all([...Array(numNFTs.toNumber()).keys()].map(async index => {
      const nftId = await contract.methods.tokenOfOwnerByIndex(address, index).call();
      return await this.getNFT(nftId);
    }));
    return nfts;
  }

  async getNFT(id) {
    if (!this.nftCache[id]) {
      const contract = this.getContract();
      const uri = await contract.methods.tokenURI(id).call();
      const response = await fetch(uri);
      const metadata = await response.json();
      const attributes = metadata.attributes.reduce((obj, { trait_type, value }) => {
        obj[trait_type] = value;
        return obj;
      }, {});
      this.nftCache[id] = {
        ...metadata,
        attributes,
        id,
      };
    }

    return this.nftCache[id];
  }

  async canClone(id) {
    const contract = this.getContract();
    const { numClonesAllowed, numClonesInWild } = await contract.methods.getCollectablesById(id).call();
    return numClonesInWild.lt(numClonesAllowed);
  }

  async cloneNFT(id, account) {
    const contract = this.getContract();

    const previouslyClonedId = await contract.methods.getClonedTokenByAddress(account, id).call();
    if (previouslyClonedId.toNumber() !== 0) {
      return previouslyClonedId;
    }

    const receipt = await contract.methods.clone(account, id).send({ from: account });
    return receipt.events.Transfer.returnValues.tokenId.toNumber();
  }
}
