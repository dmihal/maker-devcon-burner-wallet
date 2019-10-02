import React, { useState, useEffect } from 'react';
import Card from './Card';
const classes = require('./NFTDrawer.module.css');
import styled from 'styled-components';
import Text from '../../../burner-ui/src/components/Text';
import { Flex, Box } from 'rimble-ui';

const Row = styled(Flex)`
  padding: 32px var(--page-margin);
  min-height: 160px;
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

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
    <Row justifyContent={'center'}>
      {nfts.length === 0 ? (
        <Text level={2} as="h2">No collectables yet... Go find some!</Text>
      ) : (
        <ul className={classes.nftList}>
          {nfts.map((nft, i) => (
            <li key={nft.id} className={classes.nftIcon}>
              <Card name={nft.name} image={nft.image} onClick={() => actions.navigateTo(`/nft/${nft.id}`)} />
            </li>
          ))}
        </ul>
      )}
    </Row>
  );
};

export default NFTDrawer;
