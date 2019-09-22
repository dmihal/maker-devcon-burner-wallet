import React from 'react';
import { Asset } from '@burner-wallet/assets';
import { Card, Box, Flex } from 'rimble-ui';
import styled from 'styled-components';
import Text from '../Text';

interface BalanceItemProps {
  asset: Asset | string;
  usdBalance?: string | null;
  balance?: string | null;
}

const BalanceCard = styled(Card)`
  display: inline-block;
  font-size: 48px;
  font-weight: 400;
  /* Use monospaced characters and leverage ch unit */
  min-width: calc(4ch + 24px);
  max-width: calc(6ch + 24px);
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
  <BalanceCard flex={1} borderRadius={'8px'} p={'8px'}>
    {!(usdBalance || balance) && '-'}
    {usdBalance
      ? `$${Number(usdBalance).toFixed(2)}`
      : Number(balance).toFixed(2)}
    <Text as={'span'} level={4}>
      {asset.name}
    </Text>
  </BalanceCard>
);

export default BalanceItem;
