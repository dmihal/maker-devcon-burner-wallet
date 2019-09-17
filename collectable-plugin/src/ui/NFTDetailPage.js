import React from 'react';

const NFTDetailPage = ({ burnerComponents, match }) => {
  const { Page } = burnerComponents;
  return (
    <Page title="NFT">
      {match.params.id}
    </Page>
  );
};

export default NFTDetailPage;
