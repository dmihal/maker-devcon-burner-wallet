import abi from './abi/ERC721Full.json';
import NFTDrawer from './ui/NFTDrawer';
import NFTDetailPage from './ui/NFTDetailPage';

export default class CollectablePlugin {
  constructor(network, address) {
    this.network = network;
    this.address = address;
  }

  initializePlugin(pluginContext) {
    this.pluginContext = pluginContext;
    pluginContext.addElement('home-middle', NFTDrawer);
    pluginContext.addPage('/nft/:id', NFTDetailPage);
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
      const uri = await contract.methods.tokenURI(nftId).call();
      const response = await fetch(uri);
      const metadata = await response.json();
      return {
        ...metadata,
        id: nftId,
      };
    }));
    return nfts;
  }
}
