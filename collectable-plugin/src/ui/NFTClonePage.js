import React, { Fragment, useEffect } from 'react';

const NFTClonePage = ({ burnerComponents, match, plugin, actions, accounts }) => {
  useEffect(() => {
    if (accounts.length > 0) {
      plugin.cloneNFT(match.params.id, accounts[0])
        .then(newId => actions.navigateTo(`/nft/${newId}`));
    }
  }, [match, accounts]);

  const { Page } = burnerComponents;
  return (
    <Page title="Unlocking..." />
  );
};

export default NFTClonePage;
