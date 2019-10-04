import React from 'react';
import { Asset } from '@burner-wallet/assets';
import { Card, Box, Flex } from 'rimble-ui';
import styled from 'styled-components';
import Text from '../Text';
import { Eth, Xdai, Dai } from '../TokenIcons';

interface BalanceItemProps {
  asset: Asset | string;
  usdBalance?: string | null;
  balance?: string | null;
}

const base = `
  width: 100%;
  max-width: 60px;
  height: 60px;
`;

const ETH = styled(Eth)`
  ${base}
`;

const XDAI = styled(Xdai)`
  ${base}
`;

const DAI = styled(Dai)`
  ${base}
`;

const assetIcons = {
  eth: <ETH />,
  geth: <ETH />,
  keth: <ETH />,
  xdai: <XDAI />,
  dai: <DAI />
};

const BalanceCard = styled(Card)`
  display: flex;
  flex: 1;
  border-radius: 8px;
  padding: 8px;
  padding-right: 12px;
  font-size: 48px;
  font-weight: 400;
  text-align: right;
  /* Use monospaced characters and leverage ch unit */
  min-width: calc(4ch + 24px);
  max-width: calc(6ch + 24px);
  align-items: center;
  &:not(:first-of-type) {
    margin-left: 12px;
  }
  & > span {
    display: block;
  }
`;

const BalanceItem: React.FC<BalanceItemProps> = ({
  asset,
  usdBalance,
  balance
}) => (
  <BalanceCard>
    {assetIcons[asset.id.toLowerCase()] && assetIcons[asset.id.toLowerCase()]}
    <Flex flexDirection={'column'} flex={'1'}>
      {!(usdBalance || balance) && '-'}
      {usdBalance
        ? `$${Number(usdBalance).toFixed(2)}`
        : Number(balance).toFixed(2)}
      <Text as={'span'} level={4}>
        {asset.name}
      </Text>
    </Flex>
  </BalanceCard>
);

export default BalanceItem;
