import React, { useEffect, useState } from 'react';

const NFTClonePage = ({ burnerComponents, match, plugin, history, defaultAccount }) => {
  const [status, setStatus] = useState('');

  const clone = async () => {
    if (!(await plugin.canClone(match.params.id))) {
      return setStatus('This collectable can\'t be claimed');
    }

    setStatus('Claiming...')
    const newId = await plugin.cloneNFT(match.params.id, defaultAccount)
    history.replace(`/nft/${newId}`);
  };

  useEffect(() => {
    clone().catch(err => {
      console.error(err);
      setStatus('Error claiming');
    });
  }, [match]);

  const { Page } = burnerComponents;
  return (
    <Page title="Claim Collectable" back={status !== 'Claiming...'}>
      {status}
    </Page>
  );
};

export default NFTClonePage;
