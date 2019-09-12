import React from 'react';
import { Asset } from '@burner-wallet/assets';
const classes = require('./BalanceRow.module.css');
import { Card, Box, Flex } from 'rimble-ui';

interface BalanceRowProps {
  asset: Asset,
  usdBalance?: string | null,
  balance?: string | null,
}


const BalanceRow: React.FC<BalanceRowProps> = ({ asset, usdBalance, balance }) => (
    <li className={classes.balanceRow}>
      <Card maxWidth={160} borderRadius={4} p={3}>
      <Flex flexDirection="row" justifyContent="space-between" alignContent="center">
        <div class="circle"></div>
          <Flex flexDirection="column" p={2}>
          <div className={classes.assetBalance}>
            {!(usdBalance || balance) && '-'}
            {usdBalance ? `$${usdBalance}` : balance}
          </div>
          <div className={classes.assetName}>{asset.name}</div>
          </Flex>
      </Flex>
    </Card>
  </li>
);

export default BalanceRow;
