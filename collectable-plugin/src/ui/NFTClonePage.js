import React, { Fragment, useEffect } from 'react';

const NFTClonePage = ({ burnerComponents, match, plugin, history, defaultAccount }) => {
  useEffect(() => {
    plugin.cloneNFT(match.params.id, defaultAccount)
      .then(newId => history.replace(`/nft/${newId}`));
  }, [match]);

  const { Page } = burnerComponents;
  return (
    <Page title="Unlocking..." />
  );
};

export default NFTClonePage;
