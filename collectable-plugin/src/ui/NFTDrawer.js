import React, { useState, useEffect } from 'react';
const classes = require('./NFTDrawer.module.css');

const NFTDrawer = ({ accounts, actions, plugin }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      let timer;
      const queryNfts = async () => {
        const _nfts = await plugin.getNFTs(accounts[0]);
        setNfts(_nfts);
        timer = setTimeout(queryNfts, 1000);
      }
      queryNfts();
      return () => timer && clearInterval(timer);
    }
  }, [accounts]);

  return (
    <div className={classes.container}>
      <h4 className={classes.heading}>Collectables</h4>
      <ul className={classes.nftList}>
        {nfts.map((nft, i) => (
          <li
            key={nft.id}
            className={classes.nftIcon}
            onClick={() => actions.navigateTo(`/nft/${nft.id}`)}
            style={{
              zIndex: nfts.length - i,
              backgroundImage: nft.image && `url(${nft.image})`
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default NFTDrawer;
