import React, { Fragment, useState, useEffect } from 'react';

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
          <img src={nft.image} style={{ margin: '8px auto', display: 'block' }} />
          <div style={{ margin: '16px' }}>{nft.name}</div>
        </Fragment>
      ) : null}
    </Page>
  );
};

export default NFTDetailPage;
