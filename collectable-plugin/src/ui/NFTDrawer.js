import React, { useState, useEffect } from 'react';
import Card from './Card';
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
      {nfts.length === 0 ? (
        <div className={classes.empty}>No collectables yet... Go find some!</div>
      ) : (
        <ul className={classes.nftList}>
          {nfts.map((nft, i) => (
            <li key={nft.id} className={classes.nftIcon}>
              <Card name={nft.name} image={nft.image} onClick={() => actions.navigateTo(`/nft/${nft.id}`)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NFTDrawer;
