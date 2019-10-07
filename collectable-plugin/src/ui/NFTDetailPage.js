import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex, Box, Card, } from 'rimble-ui';



const NFTDetailPage = ({ burnerComponents, match, plugin }) => {
  const [nft, setNft] = useState(null);

  useEffect(() => {
    plugin.getNFT(match.params.id).then(_nft => setNft(_nft));
  }, [match])

  const { Page } = burnerComponents;
  return (
    <Page title={nft ? nft.name : 'Loading...'} back>
      {nft ? (
        <Fragment>
          <Card>
          <img src={nft.image} style={{ margin: '8px auto', display: 'block' }} />
          <div style={{ margin: '16px' }}>{nft.name}</div>
          <div style={{ margin: '16px' }}>{nft.description}</div>
          <div style={{ margin: '16px' }}>1 of {nft.attributes.supplyCap} copies</div>
          </Card>
        </Fragment>
      ) : null}
    </Page>
  );
};

export default NFTDetailPage;
